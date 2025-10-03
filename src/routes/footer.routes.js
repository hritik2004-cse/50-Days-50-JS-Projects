import express from 'express';
import { 
    SocialLink, 
    ContactInfo, 
    QuickLink, 
    Technology,
    seedFooterData 
} from '../models/footer.models.js';

const router = express.Router();

// Icon mapping for frontend use
const iconMapping = {
    'FaGithub': 'FaGithub',
    'FaLinkedin': 'FaLinkedin', 
    'FaTwitter': 'FaTwitter',
    'FaInstagram': 'FaInstagram',
    'FaEnvelope': 'FaEnvelope',
    'FaPhone': 'FaPhone',
    'FaYoutube': 'FaYoutube',
    'SiLeetcode': 'SiLeetcode',
    'SiCodechef': 'SiCodechef',
    'SiDiscord': 'SiDiscord',
    'SiTelegram': 'SiTelegram'
};

// ========================================
// SOCIAL LINKS ROUTES
// ========================================

// Get all active social links
router.get('/social-links', async (req, res) => {
    try {
        const socialLinks = await SocialLink.find({ isActive: true })
            .sort({ priority: 1 })
            .select('-__v');
        
        res.status(200).json({
            message: 'Social links retrieved successfully',
            data: socialLinks
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving social links', 
            error: error.message 
        });
    }
});

// Get all social links (admin)
router.get('/social-links/admin', async (req, res) => {
    try {
        const socialLinks = await SocialLink.find()
            .sort({ priority: 1 })
            .select('-__v');
        
        res.status(200).json({
            message: 'All social links retrieved successfully',
            data: socialLinks
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving social links', 
            error: error.message 
        });
    }
});

// Create new social link
router.post('/social-links', async (req, res) => {
    try {
        const socialLink = new SocialLink(req.body);
        const savedSocialLink = await socialLink.save();
        
        res.status(201).json({
            message: 'Social link created successfully',
            data: savedSocialLink
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating social link', 
            error: error.message 
        });
    }
});

// Update social link
router.put('/social-links/:id', async (req, res) => {
    try {
        const updatedSocialLink = await SocialLink.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedSocialLink) {
            return res.status(404).json({ message: 'Social link not found' });
        }
        
        res.status(200).json({
            message: 'Social link updated successfully',
            data: updatedSocialLink
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating social link', 
            error: error.message 
        });
    }
});

// Delete social link
router.delete('/social-links/:id', async (req, res) => {
    try {
        const deletedSocialLink = await SocialLink.findOneAndDelete({ id: req.params.id });
        
        if (!deletedSocialLink) {
            return res.status(404).json({ message: 'Social link not found' });
        }
        
        res.status(200).json({
            message: 'Social link deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting social link', 
            error: error.message 
        });
    }
});

// ========================================
// CONTACT INFO ROUTES
// ========================================

// Get active contact info
router.get('/contact-info', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findOne({ isActive: true })
            .select('-__v');
        
        if (!contactInfo) {
            return res.status(404).json({ message: 'Contact info not found' });
        }
        
        res.status(200).json({
            message: 'Contact info retrieved successfully',
            data: contactInfo
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving contact info', 
            error: error.message 
        });
    }
});

// Update contact info
router.put('/contact-info/:id', async (req, res) => {
    try {
        const updatedContactInfo = await ContactInfo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedContactInfo) {
            return res.status(404).json({ message: 'Contact info not found' });
        }
        
        res.status(200).json({
            message: 'Contact info updated successfully',
            data: updatedContactInfo
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating contact info', 
            error: error.message 
        });
    }
});

// ========================================
// QUICK LINKS ROUTES
// ========================================

// Get active quick links
router.get('/quick-links', async (req, res) => {
    try {
        const quickLinks = await QuickLink.find({ isActive: true })
            .sort({ priority: 1 })
            .select('-__v');
        
        res.status(200).json({
            message: 'Quick links retrieved successfully',
            data: quickLinks
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving quick links', 
            error: error.message 
        });
    }
});

// Create new quick link
router.post('/quick-links', async (req, res) => {
    try {
        const quickLink = new QuickLink(req.body);
        const savedQuickLink = await quickLink.save();
        
        res.status(201).json({
            message: 'Quick link created successfully',
            data: savedQuickLink
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating quick link', 
            error: error.message 
        });
    }
});

// Update quick link
router.put('/quick-links/:id', async (req, res) => {
    try {
        const updatedQuickLink = await QuickLink.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedQuickLink) {
            return res.status(404).json({ message: 'Quick link not found' });
        }
        
        res.status(200).json({
            message: 'Quick link updated successfully',
            data: updatedQuickLink
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating quick link', 
            error: error.message 
        });
    }
});

// Delete quick link
router.delete('/quick-links/:id', async (req, res) => {
    try {
        const deletedQuickLink = await QuickLink.findOneAndDelete({ id: req.params.id });
        
        if (!deletedQuickLink) {
            return res.status(404).json({ message: 'Quick link not found' });
        }
        
        res.status(200).json({
            message: 'Quick link deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting quick link', 
            error: error.message 
        });
    }
});

// ========================================
// TECHNOLOGIES ROUTES
// ========================================

// Get active technologies
router.get('/technologies', async (req, res) => {
    try {
        const technologies = await Technology.find({ isActive: true })
            .sort({ priority: 1 })
            .select('-__v');
        
        res.status(200).json({
            message: 'Technologies retrieved successfully',
            data: technologies
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving technologies', 
            error: error.message 
        });
    }
});

// Create new technology
router.post('/technologies', async (req, res) => {
    try {
        const technology = new Technology(req.body);
        const savedTechnology = await technology.save();
        
        res.status(201).json({
            message: 'Technology created successfully',
            data: savedTechnology
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating technology', 
            error: error.message 
        });
    }
});

// Update technology
router.put('/technologies/:id', async (req, res) => {
    try {
        const updatedTechnology = await Technology.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedTechnology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        
        res.status(200).json({
            message: 'Technology updated successfully',
            data: updatedTechnology
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating technology', 
            error: error.message 
        });
    }
});

// Delete technology
router.delete('/technologies/:id', async (req, res) => {
    try {
        const deletedTechnology = await Technology.findByIdAndDelete(req.params.id);
        
        if (!deletedTechnology) {
            return res.status(404).json({ message: 'Technology not found' });
        }
        
        res.status(200).json({
            message: 'Technology deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting technology', 
            error: error.message 
        });
    }
});

// ========================================
// UTILITY ROUTES
// ========================================

// Get all footer data in one request
router.get('/all', async (req, res) => {
    try {
        const [socialLinks, contactInfo, quickLinks, technologies] = await Promise.all([
            SocialLink.find({ isActive: true }).sort({ priority: 1 }).select('-__v'),
            ContactInfo.findOne({ isActive: true }).select('-__v'),
            QuickLink.find({ isActive: true }).sort({ priority: 1 }).select('-__v'),
            Technology.find({ isActive: true }).sort({ priority: 1 }).select('-__v')
        ]);
        
        res.status(200).json({
            message: 'All footer data retrieved successfully',
            data: {
                socialLinks,
                contactInfo,
                quickLinks,
                technologies
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving footer data', 
            error: error.message 
        });
    }
});

// Seed initial data
router.post('/seed', async (req, res) => {
    try {
        await seedFooterData();
        res.status(200).json({
            message: 'Footer data seeded successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error seeding footer data', 
            error: error.message 
        });
    }
});

// Get available icons list
router.get('/icons', (req, res) => {
    res.status(200).json({
        message: 'Available icons retrieved successfully',
        data: Object.keys(iconMapping)
    });
});

export default router;