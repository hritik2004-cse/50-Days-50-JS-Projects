import { useState, useEffect, useCallback } from 'react';
import { 
    getActiveSocialLinks, 
    contactInfo as localContactInfo, 
    quickLinks as localQuickLinks, 
    technologies as localTechnologies 
} from '../data/socialLinks';

/**
 * Custom hook to fetch footer data
 * Can fetch from either database (via API) or local data file
 */
export const useFooterData = (useDatabase = false) => {
    const [footerData, setFooterData] = useState({
        socialLinks: [],
        contactInfo: null,
        quickLinks: [],
        technologies: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

    useEffect(() => {
        const fetchFooterData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (useDatabase) {
                    // Fetch from database via API
                    const response = await fetch(`${API_URL}/api/footer/all`);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    
                    setFooterData({
                        socialLinks: data.data.socialLinks || [],
                        contactInfo: data.data.contactInfo || localContactInfo,
                        quickLinks: data.data.quickLinks || [],
                        technologies: data.data.technologies || []
                    });
                } else {
                    // Use local data
                    setFooterData({
                        socialLinks: getActiveSocialLinks(),
                        contactInfo: localContactInfo,
                        quickLinks: localQuickLinks.filter(link => link.isActive),
                        technologies: localTechnologies
                    });
                }
            } catch (err) {
                console.error('Error fetching footer data:', err);
                setError(err.message);
                
                // Fallback to local data on error
                setFooterData({
                    socialLinks: getActiveSocialLinks(),
                    contactInfo: localContactInfo,
                    quickLinks: localQuickLinks.filter(link => link.isActive),
                    technologies: localTechnologies
                });
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, [useDatabase, API_URL]);

    return { footerData, loading, error };
};

/**
 * Hook specifically for social links management (admin use)
 */
export const useSocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

    const fetchSocialLinks = useCallback(async (includeInactive = false) => {
        setLoading(true);
        setError(null);

        try {
            const endpoint = includeInactive ? '/social-links/admin' : '/social-links';
            const response = await fetch(`${API_URL}/api/footer${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setSocialLinks(data.data || []);
        } catch (err) {
            console.error('Error fetching social links:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    const createSocialLink = async (linkData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/footer/social-links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(linkData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setSocialLinks(prev => [...prev, data.data]);
            return data.data;
        } catch (err) {
            console.error('Error creating social link:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateSocialLink = async (id, linkData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/footer/social-links/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(linkData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setSocialLinks(prev => 
                prev.map(link => link.id === id ? data.data : link)
            );
            return data.data;
        } catch (err) {
            console.error('Error updating social link:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteSocialLink = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/footer/social-links/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            setSocialLinks(prev => prev.filter(link => link.id !== id));
        } catch (err) {
            console.error('Error deleting social link:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, [fetchSocialLinks]);

    return {
        socialLinks,
        loading,
        error,
        fetchSocialLinks,
        createSocialLink,
        updateSocialLink,
        deleteSocialLink
    };
};

/**
 * Hook for contact info management (admin use)
 */
export const useContactInfo = () => {
    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const fetchContactInfo = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/footer/contact-info`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setContactInfo(data.data);
        } catch (err) {
            console.error('Error fetching contact info:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    const updateContactInfo = async (id, contactData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/footer/contact-info/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setContactInfo(data.data);
            return data.data;
        } catch (err) {
            console.error('Error updating contact info:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactInfo();
    }, [fetchContactInfo]);

    return {
        contactInfo,
        loading,
        error,
        fetchContactInfo,
        updateContactInfo
    };
};