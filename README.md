# 🚀 50 Days 50 JS Projects Portfolio

A modern, responsive portfolio we# 50 JavaScript Projects in 50 Days 🚀

A showcase of my coding journey - building 50 JavaScript projects in 50 consecutive days to master frontend development and explore creative coding concepts.

## 🌟 Challenge Overview

This portfolio website showcases my commitment to consistent learning and skill development through practical project-based coding. Each project demonstrates different JavaScript concepts, frameworks, and creative problem-solving approaches.

### 📅 Challenge Rules
- ✅ Build 1 project every day for 50 days
- ✅ Focus on JavaScript fundamentals and modern techniques
- ✅ Explore different frameworks and libraries
- ✅ Document the learning journey
- ✅ Share progress and insights

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and context
- **Vite 7.1.7** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hot Toast** - Elegant notifications
- **React Icons** - Comprehensive icon library
- **Shadcn/UI** - Beautiful and accessible UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Cloudinary** - Image upload and management

## 🎯 Project Categories

The 50 projects cover various aspects of JavaScript development:

- **🎨 UI/UX Projects** - Interactive components and animations
- **🎮 Games & Entertainment** - Browser games and fun interactions
- **🔧 Utility Tools** - Practical applications and calculators
- **📊 Data Visualization** - Charts, graphs, and data displays
- **🌐 API Integration** - Working with external APIs
- **📱 Responsive Design** - Mobile-first applications
- **⚡ Performance** - Optimized and efficient solutions

## 🚀 Features

- **Dynamic Project Gallery** - Interactive showcase of all 50 projects
- **Technology Filtering** - Filter projects by tech stack used
- **Live Demos** - Direct links to working projects
- **Source Code Access** - GitHub links for each project
- **Progress Tracking** - Visual representation of challenge progress
- **Responsive Design** - Perfect viewing on all devices
- **Admin Panel** - Easy project management and updates

## � Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database
- Cloudinary account (for project images)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hritik2004-cse/50-js-projects.git
   cd 50-js-projects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Cloudinary (for project images)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Server
   PORT=8080
   NODE_ENV=development
   
   # Admin Access
   VITE_ADMIN_PASSWORD=your_secure_admin_password
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev          # Frontend (http://localhost:5173)
   npm run dev:server   # Backend (http://localhost:8080)
   
   # Production mode
   npm run build        # Build frontend
   npm start           # Start backend server
   ```

## 📁 Project Structure

```
50-js-projects/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn/UI components
│   │   ├── AdminPanel.jsx  # Project management
│   │   ├── Footer.jsx      # Dynamic footer
│   │   └── ProjectCards.jsx # Project showcase
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Static data and fallbacks
│   ├── models/             # MongoDB schemas
│   ├── routes/             # Express API routes
│   ├── controllers/        # Business logic
│   └── db/                 # Database connection
├── public/                 # Static assets
├── server.js              # Express server
└── package.json           # Dependencies and scripts
```

## 🎨 Adding New Projects

### Through Admin Panel
1. Access admin panel at `/admin`
2. Click "Add New Project"
3. Fill in project details:
   - Project name and description
   - Technologies used
   - GitHub repository link
   - Live demo link
   - Project image
4. Save and publish

### Project Information Required
- **Name**: Clear, descriptive project name
- **Description**: Brief explanation of what the project does
- **Technologies**: JavaScript frameworks/libraries used
- **GitHub Link**: Source code repository
- **Live Demo**: Working project URL
- **Image**: Screenshot or preview of the project
- **Day Number**: Which day of the challenge (1-50)

## 🏆 Challenge Progress

Track your progress through the 50-day journey:
- Daily project completion
- Technology mastery progress
- Skill development milestones
- Community engagement
- Learning insights and reflections

## 🌐 Deployment

### Frontend (Vercel)
1. Build the project: `npm run build`
2. Deploy `dist` folder to Vercel
3. Set environment variables:
   ```env
   VITE_API_URL=https://your-backend-domain.com
   VITE_ADMIN_PASSWORD=your_secure_password
   ```

### Backend (Railway/Render)
1. Deploy to your preferred platform
2. Set environment variables for database and Cloudinary
3. Ensure MongoDB is accessible from production

## 🎯 Challenge Goals

- **Consistency**: Build something every single day
- **Learning**: Explore new JavaScript concepts and techniques
- **Documentation**: Share insights and learning experiences
- **Community**: Engage with other developers and learners
- **Portfolio**: Create a comprehensive showcase of skills

## � Technologies Explored

Throughout the 50 projects, various technologies and concepts are covered:
- Vanilla JavaScript ES6+
- React.js and component patterns
- API integration and async programming
- Local storage and data persistence
- CSS animations and transitions
- Responsive design principles
- Modern JavaScript frameworks
- Browser APIs and web standards

## 🤝 Contributing

This is a personal challenge repository, but feedback and suggestions are welcome:
- Open issues for bugs or suggestions
- Share similar challenge experiences
- Provide constructive feedback on projects

## 📄 License

This project is personal and educational. Individual projects may have their own licenses.

## 👨‍💻 Challenge Participant

**Hritik Sharma**
- GitHub: [@hritik2004-cse](https://github.com/hritik2004-cse)
- LinkedIn: [Hritik Sharma](https://www.linkedin.com/in/hritik-sharma-oct04/)
- Email: hritiksharma08725@gmail.com
- YouTube: [@Hritik_is_coding](https://www.youtube.com/@Hritik_is_coding)

## 🎉 Follow the Journey

Watch the 50-day challenge unfold:
- **Daily Updates**: New project every day
- **Technical Insights**: Learning experiences shared
- **Code Quality**: Continuous improvement focus
- **Community Engagement**: Sharing progress and getting feedback

---

*"The best way to learn is by doing. 50 projects, 50 days, endless learning opportunities!"* 

**Challenge Status**: 🔥 Active | **Current Day**: [Day X/50] | **Projects Completed**: [X/50]

Built with ❤️ and lots of ☕ during the 50-day coding challenge!showcasing JavaScript projects with a beautiful gradient background and admin panel for content management.

## ✨ Features

### 🎨 Frontend
- **Modern Design**: Beautiful gradient backgrounds with animated glow effects
- **Responsive Layout**: Works perfectly on all device sizes
- **Project Cards**: Elegant cards displaying project information
- **Smooth Animations**: CSS animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing

### 🛠 Backend
- **Express.js Server**: RESTful API for content management
- **MongoDB Database**: Document storage for projects
- **Image Upload**: Cloudinary integration for image storage
- **File Processing**: Multer for handling file uploads
- **Environment Config**: Secure environment variable management

### 👨‍💼 Admin Panel
- **Development Only**: Admin access only in localhost/development
- **Password Protection**: Secure admin authentication
- **CRUD Operations**: Create, Read, Update, Delete projects
- **Search & Filter**: Find projects by name or tags
- **Dashboard Analytics**: Project statistics and metrics
- **Modern UI**: Beautiful glass-morphism design

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd mainfolder
npm install
```

### 2. Environment Setup

Create `.env` file with your MongoDB and Cloudinary credentials.

Create `.env.local` file:
```env
VITE_API_URL=http://localhost:5000
VITE_ENABLE_ADMIN=true
VITE_ADMIN_PASSWORD=admin123
```

### 3. Start Development

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## 📱 Usage

- **Portfolio**: Visit `http://localhost:5173`
- **Admin Panel**: Visit `http://localhost:5173/admin` (development only)

## 🚀 Deployment

Set `VITE_ENABLE_ADMIN=false` in production to hide admin panel.

Built with ❤️ using React, Node.js, MongoDB, and Cloudinary+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
