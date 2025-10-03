import mongoose from "mongoose";

/**
 * Social Links Schema for Database Storage
 * This allows you to manage social links through the admin panel
 */
const socialLinkSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)|(mailto:)|(tel:)/.test(v);
            },
            message: 'Please provide a valid URL (http/https/mailto/tel)'
        }
    },
    iconName: {
        type: String,
        required: true,
        enum: [
            'FaGithub', 'FaLinkedin', 'FaTwitter', 'FaInstagram', 
            'FaEnvelope', 'FaPhone', 'FaYoutube', 'SiLeetcode', 'SiCodechef', 
            'SiDiscord', 'SiTelegram', 'FaMedium',
            'SiDevdotto', 'SiHashnode', 'FaStackOverflow'
        ]
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i // Hex color validation
    },
    category: {
        type: String,
        required: true,
        enum: ['development', 'professional', 'social', 'coding', 'contact', 'community', 'messaging', 'content']
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        maxlength: 200
    }
}, {
    timestamps: true
});

/**
 * Contact Information Schema
 */
const contactInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return v === '' || /^\+?[\d\s-()]+$/.test(v);
            },
            message: 'Please provide a valid phone number'
        }
    },
    bio: {
        type: String,
        required: true,
        maxlength: 500
    },
    website: {
        type: String,
        validate: {
            validator: function(v) {
                return v === '' || /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid website URL'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

/**
 * Quick Links Schema
 */
const quickLinkSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isExternal: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

/**
 * Technology Schema
 */
const technologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'tools', 'deployment', 'mobile', 'other'],
        default: 'other'
    }
}, {
    timestamps: true
});

// Create Models
export const SocialLink = mongoose.model("SocialLink", socialLinkSchema);
export const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export const QuickLink = mongoose.model("QuickLink", quickLinkSchema);
export const Technology = mongoose.model("Technology", technologySchema);

/**
 * Seed Data Function - Run this once to populate initial data
 */
export const seedFooterData = async () => {
    try {
        // Check if data already exists
        const existingSocialLinks = await SocialLink.countDocuments();
        if (existingSocialLinks > 0) {
            console.log('Footer data already exists, skipping seed...');
            return;
        }

        // Seed Social Links - Updated to match current socialLinks.js
        const socialLinksData = [
            {
                id: 'github',
                name: 'GitHub',
                url: 'https://github.com/hritik2004-cse',
                iconName: 'FaGithub',
                color: '#24292e',
                category: 'development',
                priority: 1,
                isActive: true,
                description: 'My code repositories and open source projects'
            },
            {
                id: 'linkedin',
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/hritik-sharma-oct04/',
                iconName: 'FaLinkedin',
                color: '#0077B5',
                category: 'professional',
                priority: 2,
                isActive: true,
                description: 'Professional network and career updates'
            },
            {
                id: 'email',
                name: 'Email',
                url: 'mailto:hritiksharma08725@gmail.com',
                iconName: 'FaEnvelope',
                color: '#EA4335',
                category: 'contact',
                priority: 3,
                isActive: true,
                description: 'Get in touch via email'
            },
            {
                id: 'youtube',
                name: 'YouTube',
                url: 'https://www.youtube.com/@Hritik_is_coding',
                iconName: 'FaYoutube',
                color: '#FF0000',
                category: 'content',
                priority: 4,
                isActive: true,
                description: 'My coding tutorials and tech content'
            },
            {
                id: 'twitter',
                name: 'Twitter',
                url: 'https://x.com/Shar7176Hritik',
                iconName: 'FaTwitter',
                color: '#1DA1F2',
                category: 'social',
                priority: 5,
                isActive: true,
                description: 'Tech tweets and industry insights'
            },
            {
                id: 'instagram',
                name: 'Instagram',
                url: 'https://www.instagram.com/hritik_sharma_2004/',
                iconName: 'FaInstagram',
                color: '#E4405F',
                category: 'social',
                priority: 6,
                isActive: false,
                description: 'Personal updates and lifestyle content'
            },
            {
                id: 'discord',
                name: 'Discord',
                url: 'https://discord.gg/hritiksharma5272',
                iconName: 'SiDiscord',
                color: '#5865F2',
                category: 'community',
                priority: 6,
                isActive: true,
                description: 'Join our coding community server'
            },
            {
                id: 'telegram',
                name: 'Telegram',
                url: 'https://t.me/hritiksharma08725',
                iconName: 'SiTelegram',
                color: '#0088CC',
                category: 'messaging',
                priority: 7,
                isActive: false,
                description: 'Direct messaging and updates'
            }
        ];

        await SocialLink.insertMany(socialLinksData);

        // Seed Contact Info
        const contactData = {
            name: 'Hritik Sharma',
            title: 'Full Stack Developer',
            location: 'Aligarh, Uttar Pradesh',
            email: 'hritiksharma08725@gmail.com',
            phone: '+91-XXXXXXXXXX',
            bio: 'Full Stack Developer passionate about creating innovative web solutions. Specialized in React, Node.js, and modern web technologies.',
            website: 'https://hritiksharma.dev',
            isActive: true
        };

        await ContactInfo.create(contactData);

        // Seed Quick Links
        const quickLinksData = [
            { id: 'projects', name: 'Projects', url: '#projects', priority: 1, isActive: true },
            { id: 'about', name: 'About Me', url: '#about', priority: 2, isActive: true },
            { id: 'skills', name: 'Skills', url: '#skills', priority: 3, isActive: true },
            { id: 'contact', name: 'Contact', url: '#contact', priority: 4, isActive: true }
        ];

        await QuickLink.insertMany(quickLinksData);

        // Seed Technologies
        const technologiesData = [
            { name: 'React', color: '#61DAFB', priority: 1, category: 'frontend', isActive: true },
            { name: 'Node.js', color: '#339933', priority: 2, category: 'backend', isActive: true },
            { name: 'MongoDB', color: '#47A248', priority: 3, category: 'database', isActive: true },
            { name: 'Tailwind', color: '#06B6D4', priority: 4, category: 'frontend', isActive: true },
            { name: 'Vite', color: '#646CFF', priority: 5, category: 'tools', isActive: true },
            { name: 'JavaScript', color: '#F7DF1E', priority: 6, category: 'frontend', isActive: true }
        ];

        await Technology.insertMany(technologiesData);

        console.log('✅ Footer data seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding footer data:', error);
    }
};