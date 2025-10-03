import React from 'react';
import { FaHeart, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";
import { SiDiscord, SiTelegram, SiLeetcode, SiCodechef } from "react-icons/si";
import { useFooterData } from '../hooks/useFooterData';

// Icon mapping for database mode
const iconMap = {
    'FaGithub': FaGithub,
    'FaLinkedin': FaLinkedin,
    'FaTwitter': FaTwitter,
    'FaInstagram': FaInstagram,
    'FaEnvelope': FaEnvelope,
    'FaPhone': FaPhone,
    'FaYoutube': FaYoutube,
    'SiDiscord': SiDiscord,
    'SiTelegram': SiTelegram,
    'SiLeetcode': SiLeetcode,
    'SiCodechef': SiCodechef
};

const Footer = () => {
    // Use database mode (set to true to use database, false for local data)
    const { footerData, loading, error } = useFooterData(true); // Changed to true for database mode
    
    if (loading) {
        return (
            <footer className='w-full bg-gradient-to-b from-transparent to-black/60 backdrop-blur-sm border-t border-white/10 mt-auto'>
                <div className='w-full bg-black/40 backdrop-blur-md'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
                        <div className='text-center text-gray-300'>
                            <div className='animate-pulse'>Loading footer data...</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    if (error) {
        console.warn('Footer data error:', error);
        // Fallback content is handled by the hook
    }

    const { socialLinks, contactInfo, quickLinks, technologies } = footerData;

    return (
        <footer className='w-full bg-gradient-to-b from-transparent to-black/60 backdrop-blur-sm border-t border-white/10 mt-auto'>
            {/* Main Footer Content */}
            <div className='w-full bg-black/40 backdrop-blur-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                        
                        {/* About Section */}
                        <div className='lg:col-span-2'>
                            <h3 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#fb3c5f] via-[#d237b1] to-[#7200ff] bg-clip-text text-transparent mb-4'>
                                {contactInfo?.name || 'Loading...'}
                            </h3>
                            <p className='text-gray-300 text-sm lg:text-base mb-6 leading-relaxed max-w-md'>
                                {contactInfo?.bio || 'Loading bio...'}
                            </p>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3 text-gray-300 text-sm'>
                                    <FaMapMarkerAlt className='text-[#d237b1] flex-shrink-0' />
                                    <span>{contactInfo?.location || 'Loading location...'}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-300 text-sm'>
                                    <FaEnvelope className='text-[#d237b1] flex-shrink-0' />
                                    <a href={`mailto:${contactInfo?.email || ''}`} className='hover:text-white transition-colors'>
                                        {contactInfo?.email || 'Loading email...'}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className='text-lg font-semibold text-white mb-6'>Quick Links</h4>
                            <ul className='space-y-3'>
                                {quickLinks.map((link) => (
                                    <li key={link.id}>
                                        <a 
                                            href={link.url} 
                                            className='text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group'
                                        >
                                            <span className='w-1 h-1 bg-[#d237b1] rounded-full group-hover:scale-150 transition-transform'></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                            <h4 className='text-lg font-semibold text-white mb-6'>Technologies</h4>
                            <div className='grid grid-cols-2 gap-2'>
                                {technologies.map((tech) => (
                                    <div key={tech._id || tech.name} className='flex items-center gap-2 text-gray-300 text-sm py-1'>
                                        <div 
                                            className='w-2 h-2 rounded-full'
                                            style={{ backgroundColor: tech.color }}
                                        ></div>
                                        <span>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className='mt-12 pt-8 border-t border-white/10'>
                        <div className='text-center mb-8'>
                            <h4 className='text-lg font-semibold text-white mb-6'>Connect With Me</h4>
                            <div className='flex justify-center items-center gap-4 flex-wrap'>
                                {socialLinks.map((social) => {
                                    const IconComponent = iconMap[social.iconName];
                                    if (!IconComponent) {
                                        console.warn(`Icon not found: ${social.iconName}`);
                                        return null;
                                    }
                                    
                                    return (
                                        <a
                                            key={social.id}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`
                                                p-3 bg-white/5 rounded-lg transition-all duration-300 hover:scale-110 
                                                border border-white/10 group
                                            `}
                                            style={{
                                                '--hover-bg': `${social.color}20`,
                                                '--hover-border': `${social.color}50`
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = `${social.color}20`;
                                                e.target.style.borderColor = `${social.color}50`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            }}
                                            title={social.description || social.name}
                                        >
                                            <IconComponent 
                                                className='text-xl text-gray-300 transition-colors group-hover:text-white'
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = social.color;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = '#d1d5db';
                                                }}
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='w-full bg-black/60 backdrop-blur-sm border-t border-white/5'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className='flex items-center gap-2 text-gray-300 text-sm'>
                            <span>© 2025 {contactInfo?.name || 'Loading...'}. All rights reserved.</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-300 text-sm'>
                            <span>Made with</span>
                            <FaHeart className='text-red-500 animate-pulse text-sm' />
                            <span>by {contactInfo?.name || 'Loading...'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
