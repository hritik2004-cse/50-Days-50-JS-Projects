import { Content } from '../models/content.models.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// Create new content
export const createContent = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        const { projectName, description, tags, liveLink, githubLink } = req.body;
        
        // Validate required fields
        if (!projectName || !projectName.trim()) {
            return res.status(400).json({ message: 'Project name is required' });
        }
        
        if (!description || !description.trim()) {
            return res.status(400).json({ message: 'Project description is required' });
        }
        
        if (!liveLink || !liveLink.trim()) {
            return res.status(400).json({ message: 'Live link is required' });
        }
        
        if (!githubLink || !githubLink.trim()) {
            return res.status(400).json({ message: 'GitHub link is required' });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: 'Project image is required' });
        }

        // Get the highest existing ID and increment by 1
        const lastContent = await Content.findOne().sort({ id: -1 });
        const newId = lastContent ? lastContent.id + 1 : 1;

        // Process tags - handle both array and string cases
        let processedTags = [];
        if (tags) {
            if (Array.isArray(tags)) {
                processedTags = tags.filter(tag => tag && tag.trim());
            } else if (typeof tags === 'string') {
                processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            }
        }

        console.log('Processed tags:', processedTags);

        const content = new Content({
            id: newId,
            projectImg: req.file.path, // Cloudinary URL
            projectName: projectName.trim(),
            description: description.trim(),
            tags: processedTags,
            liveLink: liveLink.trim(),
            githubLink: githubLink.trim(),
            cloudinaryPublicId: req.file.filename // Cloudinary public ID
        });

        const savedContent = await content.save();
        res.status(201).json({
            message: 'Content created successfully',
            data: savedContent
        });
    } catch (error) {
        console.error('Error creating content:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            message: 'Error creating content', 
            error: error.message 
        });
    }
};

// Get all content
export const getAllContent = async (req, res) => {
    try {
        const content = await Content.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Content retrieved successfully',
            data: content
        });
    } catch (error) {
        console.error('Error getting content:', error);
        res.status(500).json({ 
            message: 'Error retrieving content', 
            error: error.message 
        });
    }
};

// Get content by ID
export const getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findOne({ id: parseInt(id) });
        
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({
            message: 'Content retrieved successfully',
            data: content
        });
    } catch (error) {
        console.error('Error getting content by ID:', error);
        res.status(500).json({ 
            message: 'Error retrieving content', 
            error: error.message 
        });
    }
};

// Update content
export const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { projectName, description, tags, liveLink, githubLink } = req.body;
        
        const content = await Content.findOne({ id: parseInt(id) });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Update fields
        if (projectName) content.projectName = projectName;
        if (description) content.description = description;
        if (tags) content.tags = Array.isArray(tags) ? tags : [tags];
        if (liveLink) content.liveLink = liveLink;
        if (githubLink) content.githubLink = githubLink;

        // If new image is uploaded, delete old one and update
        if (req.file) {
            // Delete old image from Cloudinary
            await deleteFromCloudinary(content.cloudinaryPublicId);
            
            // Update with new image
            content.projectImg = req.file.path;
            content.cloudinaryPublicId = req.file.filename;
        }

        const updatedContent = await content.save();
        res.status(200).json({
            message: 'Content updated successfully',
            data: updatedContent
        });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ 
            message: 'Error updating content', 
            error: error.message 
        });
    }
};

// Delete content
export const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        
        const content = await Content.findOne({ id: parseInt(id) });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Delete image from Cloudinary
        await deleteFromCloudinary(content.cloudinaryPublicId);
        
        // Delete content from database
        await Content.deleteOne({ id: parseInt(id) });
        
        res.status(200).json({
            message: 'Content deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ 
            message: 'Error deleting content', 
            error: error.message 
        });
    }
};