import express from 'express';
import { upload } from '../config/cloudinary.js';
import { 
    createContent, 
    getAllContent, 
    getContentById, 
    updateContent, 
    deleteContent 
} from '../controllers/content.controller.js';

const router = express.Router();

// Routes
router.post('/', upload.single('projectImg'), createContent);
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.put('/:id', upload.single('projectImg'), updateContent);
router.delete('/:id', deleteContent);

export default router;