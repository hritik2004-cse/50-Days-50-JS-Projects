import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
    FiPlus,
    FiSearch,
    FiTrash2,
    FiSave,
    FiX,
    FiExternalLink,
    FiGithub,
    FiTag,
    FiImage,
    FiTrendingUp,
    FiFolder,
    FiUpload,
    FiEdit3
} from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

const AdminPanel = ({ onLogout }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        tags: '',
        liveLink: '',
        githubLink: '',
        projectImg: null
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/content`);
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data.data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                toast.error('Cannot connect to server. Please make sure the backend is running on port 8080.');
            } else {
                toast.error('Failed to load projects. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        const filtered = projects.filter(project =>
            project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProjects(filtered);
    }, [projects, searchTerm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Show loading toast
        const loadingToast = toast.loading(editingProject ? 'Updating project...' : 'Creating project...');

        const form = new FormData();
        form.append('projectName', formData.projectName);
        form.append('description', formData.description);

        // Process tags: split comma-separated string and clean up whitespace
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        tagsArray.forEach(tag => {
            form.append('tags', tag);
        });

        form.append('liveLink', formData.liveLink);
        form.append('githubLink', formData.githubLink);

        if (formData.projectImg) {
            form.append('projectImg', formData.projectImg);
        }

        try {
            const url = editingProject
                ? `${API_URL}/api/content/${editingProject.id}`
                : `${API_URL}/api/content`;

            const method = editingProject ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: form
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save project');
            }

            await fetchProjects();
            resetForm();
            setShowModal(false);
            toast.success(editingProject ? 'Project updated successfully!' : 'Project created successfully!', {
                id: loadingToast,
            });
        } catch (error) {
            toast.error(`Failed to save project: ${error.message}`, {
                id: loadingToast,
            });
        }
    };

    const handleDelete = async (id) => {
        const loadingToast = toast.loading('Deleting project...');

        try {
            const response = await fetch(`${API_URL}/api/content/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete project');

            await fetchProjects();
            toast.success('Project deleted successfully!', {
                id: loadingToast,
            });
        } catch {
            toast.error('Failed to delete project. Please try again.', {
                id: loadingToast,
            });
        }
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
    };

    const openDeleteDialog = (project) => {
        setProjectToDelete(project);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            handleDelete(projectToDelete.id);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            projectName: project.projectName,
            description: project.description || '',
            tags: project.tags.join(', '),
            liveLink: project.liveLink,
            githubLink: project.githubLink,
            projectImg: null
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            projectName: '',
            description: '',
            tags: '',
            liveLink: '',
            githubLink: '',
            projectImg: null
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, projectImg: file }));
    };

    return (
        <div className="min-h-screen bg-[#06020d] relative">
            {/* Background Gradient Effects */}
            <div className="fixed inset-0">
                <div className="h-[30vh] w-[30vh] blur-3xl rounded-full absolute top-[10%] left-[50%] bg-[#7200ff]/30 animate-glow-slow"></div>
                <div className="h-[30vh] w-[30vh] rounded-full absolute blur-3xl top-[40%] left-[20%] bg-[#fb3c5f]/30 animate-glow-slow-delayed"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#fb3c5f] via-[#d237b1] to-[#7200ff] bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-300 mt-1">Manage your projects and content</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                                className="bg-gradient-to-r from-[#fb3c5f] to-[#d237b1] hover:from-[#d237b1] hover:to-[#7200ff] text-white"
                                size="lg"
                            >
                                <FiPlus size={20} />
                                Add Project
                            </Button>
                            <Button
                                onClick={onLogout}
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300"
                                size="lg"
                            >
                                <FiX size={20} />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="relative z-10 container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardDescription className="text-gray-300">Total Projects</CardDescription>
                                    <CardTitle className="text-3xl text-white">{projects.length}</CardTitle>
                                </div>
                                <FiFolder className="text-[#d237b1]" size={32} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardDescription className="text-gray-300">Total Tags</CardDescription>
                                    <CardTitle className="text-3xl text-white">
                                        {new Set(projects.flatMap(p => p.tags)).size}
                                    </CardTitle>
                                </div>
                                <FiTag className="text-[#7200ff]" size={32} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardDescription className="text-gray-300">Recent Projects</CardDescription>
                                    <CardTitle className="text-3xl text-white">
                                        {projects.filter(p => {
                                            const weekAgo = new Date();
                                            weekAgo.setDate(weekAgo.getDate() - 7);
                                            return new Date(p.createdAt) > weekAgo;
                                        }).length}
                                    </CardTitle>
                                </div>
                                <FiTrendingUp className="text-[#fb3c5f]" size={32} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Bar */}
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 mb-8">
                    <CardContent className="p-6">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects by name or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Table */}
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden">
                    <CardHeader className="border-b border-white/10">
                        <CardTitle className="text-white">Projects ({filteredProjects.length})</CardTitle>
                    </CardHeader>

                    {loading ? (
                        <CardContent className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fb3c5f]"></div>
                        </CardContent>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-gray-300 font-medium">Project</th>
                                        <th className="text-left py-4 px-6 text-gray-300 font-medium">Tags</th>
                                        <th className="text-left py-4 px-6 text-gray-300 font-medium">Created</th>
                                        <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.map((project, index) => (
                                        <tr key={project.id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={project.projectImg}
                                                        alt={project.projectName}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-white font-medium">{project.projectName}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            <a
                                                                href={project.liveLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-green-400 hover:text-green-300"
                                                            >
                                                                <FiExternalLink size={14} />
                                                            </a>
                                                            <a
                                                                href={project.githubLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-400 hover:text-gray-300"
                                                            >
                                                                <FiGithub size={14} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {project.tags.slice(0, 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 bg-[#7200ff]/20 text-[#d237b1] text-xs rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.tags.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                                                            +{project.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-gray-300 text-sm">
                                                    {new Date(project.createdAt).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="icon"
                                                        onClick={() => handleEdit(project)}
                                                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                                    >
                                                        <FiEdit3 size={16} />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        onClick={() => openDeleteDialog(project)}
                                                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <Card className="bg-[#06020d]/90 backdrop-blur-lg border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <CardHeader className="border-b border-white/20">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-white">
                                    {editingProject ? 'Edit Project' : 'Add New Project'}
                                </CardTitle>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <FiX size={24} />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Project Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.projectName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                                        placeholder="Enter project name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent resize-none"
                                        placeholder="Enter project description (max 500 characters)"
                                        maxLength={500}
                                    />
                                    <div className="text-right text-xs text-gray-400 mt-1">
                                        {formData.description.length}/500 characters
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Tags * (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.tags}
                                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Live Link *
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.liveLink}
                                        onChange={(e) => setFormData(prev => ({ ...prev, liveLink: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        GitHub Link *
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.githubLink}
                                        onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                                        placeholder="https://github.com/username/repo"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Project Image {!editingProject && '*'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            required={!editingProject}
                                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-[#fb3c5f] file:to-[#d237b1] file:text-white file:cursor-pointer hover:file:from-[#d237b1] hover:file:to-[#7200ff]"
                                        />
                                        <FiImage className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-[#fb3c5f] to-[#d237b1] hover:from-[#d237b1] hover:to-[#7200ff] text-white"
                                    >
                                        <FiSave size={16} />
                                        {editingProject ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{projectToDelete?.projectName}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminPanel;