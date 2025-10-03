/**
 * API configuration and endpoints
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

/**
 * API utility for project-related operations
 */
export const projectsAPI = {
  /**
   * Fetch all projects from the backend
   * @returns {Promise<Array>} Array of project objects
   */
  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects. Please try again later.');
    }
  },

  /**
   * Get a single project by ID
   * @param {string} id - Project ID
   * @returns {Promise<Object>} Project object
   */
  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error('Failed to fetch project. Please try again later.');
    }
  }
};

/**
 * Error handling utility
 */
export const handleAPIError = (error) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Unable to connect to server. Please check your connection.';
  }
  return error.message || 'An unexpected error occurred.';
};