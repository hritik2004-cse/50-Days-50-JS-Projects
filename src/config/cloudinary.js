import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Function to ensure Cloudinary is configured
export const ensureCloudinaryConfig = () => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.warn('Cloudinary environment variables not found:', {
            cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
            api_key: !!process.env.CLOUDINARY_API_KEY,
            api_secret: !!process.env.CLOUDINARY_API_SECRET
        });
        throw new Error('Cloudinary environment variables are not set');
    }
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary configured successfully');
    return true;
};

// Lazy storage creation
let storage = null;
const getStorage = () => {
    if (!storage) {
        ensureCloudinaryConfig();
        storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: 'project-images',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                transformation: [
                    { width: 1200, height: 800, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' }
                ]
            }
        });
    }
    return storage;
};

// Multer middleware with lazy storage initialization
export const upload = multer({ 
    storage: {
        _handleFile(req, file, cb) {
            getStorage()._handleFile(req, file, cb);
        },
        _removeFile(req, file, cb) {
            getStorage()._removeFile(req, file, cb);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Function to delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
    try {
        // Ensure Cloudinary is configured before attempting delete
        ensureCloudinaryConfig();
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Successfully deleted from Cloudinary:', publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

export { cloudinary };