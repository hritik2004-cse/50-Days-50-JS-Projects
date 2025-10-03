import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaYoutube } from "react-icons/fa";
import { SiDiscord, SiTelegram } from "react-icons/si";

/**
 * Social Media Links Configuration
 * 
 * This file contains all social media links and their configurations.
 * Easy to maintain and update from a single location.
 */

export const socialLinks = [
    {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/hritik2004-cse',
        icon: FaGithub,
        color: '#24292e',
        hoverColor: '#24292e',
        bgHover: '#24292e/20',
        borderHover: '#24292e/50',
        category: 'development',
        priority: 1,
        isActive: true
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hritik-sharma-oct04/',
        icon: FaLinkedin,
        color: '#0077B5',
        hoverColor: '#0077B5',
        bgHover: '#0077B5/20',
        borderHover: '#0077B5/50',
        category: 'professional',
        priority: 2,
        isActive: true
    },
    {
        id: 'email',
        name: 'Email',
        url: 'mailto:hritiksharma08725@gmail.com',
        icon: FaEnvelope,
        color: '#EA4335',
        hoverColor: '#EA4335',
        bgHover: '#EA4335/20',
        borderHover: '#EA4335/50',
        category: 'contact',
        priority: 3,
        isActive: true
    },
    {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com/@Hritik_is_coding',
        icon: FaYoutube,
        color: '#FF0000',
        hoverColor: '#FF0000',
        bgHover: '#FF0000/20',
        borderHover: '#FF0000/50',
        category: 'content',
        priority: 4,
        isActive: true
    },
    {
        id: 'twitter',
        name: 'Twitter',
        url: 'https://x.com/Shar7176Hritik',
        icon: FaTwitter,
        color: '#1DA1F2',
        hoverColor: '#1DA1F2',
        bgHover: '#1DA1F2/20',
        borderHover: '#1DA1F2/50',
        category: 'social',
        priority: 5,
        isActive: true
    },
    {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/hritik_sharma_2004/',
        icon: FaInstagram,
        color: '#E4405F',
        hoverColor: '#E4405F',
        bgHover: '#E4405F/20',
        borderHover: '#E4405F/50',
        category: 'social',
        priority: 6,
        isActive: false // Set to false to hide by default
    },
    {
        id: 'discord',
        name: 'Discord',
        url: 'https://discord.gg/hritiksharma5272',
        icon: SiDiscord,
        color: '#5865F2',
        hoverColor: '#5865F2',
        bgHover: '#5865F2/20',
        borderHover: '#5865F2/50',
        category: 'community',
        priority: 6,
        isActive: true
    },
    {
        id: 'telegram',
        name: 'Telegram',
        url: 'https://t.me/hritiksharma08725',
        icon: SiTelegram,
        color: '#0088CC',
        hoverColor: '#0088CC',
        bgHover: '#0088CC/20',
        borderHover: '#0088CC/50',
        category: 'messaging',
        priority: 7,
        isActive: false // Set to false to hide by default
    }
];

/**
 * Utility functions for social links
 */

// Get active social links sorted by priority
export const getActiveSocialLinks = () => {
    return socialLinks
        .filter(link => link.isActive)
        .sort((a, b) => a.priority - b.priority);
};

// Get social links by category
export const getSocialLinksByCategory = (category) => {
    return socialLinks
        .filter(link => link.category === category && link.isActive)
        .sort((a, b) => a.priority - b.priority);
};

// Get all categories
export const getSocialCategories = () => {
    const categories = [...new Set(socialLinks.map(link => link.category))];
    return categories;
};

// Toggle social link active status
export const toggleSocialLink = (id) => {
    const link = socialLinks.find(link => link.id === id);
    if (link) {
        link.isActive = !link.isActive;
    }
    return link;
};

// Update social link URL
export const updateSocialLinkUrl = (id, newUrl) => {
    const link = socialLinks.find(link => link.id === id);
    if (link) {
        link.url = newUrl;
    }
    return link;
};

/**
 * Contact Information
 */
export const contactInfo = {
    name: 'Hritik Sharma',
    title: 'Full Stack Developer',
    location: 'Aligarh, Uttar Pradesh',
    email: 'hritiksharma08725@gmail.com',
    phone: '+919548474709', // Add your phone number
    bio: 'Full Stack Developer passionate about creating innovative web solutions. Specialized in React, Node.js, and modern web technologies.',
    website: 'https://hritiksharma.dev' // Add your website
};

/**
 * Navigation Links
 */
export const quickLinks = [
    {
        id: 'projects',
        name: 'Projects',
        url: '#projects',
        isActive: true
    },
    {
        id: 'about',
        name: 'About Me',
        url: '#about',
        isActive: true
    },
    {
        id: 'skills',
        name: 'Skills',
        url: '#skills',
        isActive: true
    },
    {
        id: 'contact',
        name: 'Contact',
        url: '#contact',
        isActive: true
    },
    {
        id: 'resume',
        name: 'Resume',
        url: '/resume.pdf',
        isActive: false // Enable when you have a resume
    }
];

/**
 * Technologies for footer display
 */
export const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Vite', color: '#646CFF' },
    { name: 'JavaScript', color: '#F7DF1E' }
];