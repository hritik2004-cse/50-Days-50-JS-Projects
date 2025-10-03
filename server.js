// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/db/db.js';
import contentRoutes from './src/routes/content.routes.js';
import footerRoutes from './src/routes/footer.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    'https://50-days-50-js-projects.vercel.app'
];

// Add any additional origins from environment variable
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed or if it's a Vercel preview deployment
        if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/footer', footerRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Server URL: http://localhost:${PORT}`);
            console.log(`Server accessible on all interfaces: http://0.0.0.0:${PORT}`);
            console.log('Server is ready to accept connections');
            
            // Test that the server is actually accessible
            setTimeout(() => {
                import('http').then(http => {
                    const req = http.request(`http://localhost:${PORT}`, (_res) => {
                        console.log('✅ Server self-test successful');
                    });
                    req.on('error', (err) => {
                        console.error('❌ Server self-test failed:', err.message);
                    });
                    req.end();
                });
            }, 1000);
        });
        
        server.on('error', (error) => {
            console.error('Server error:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use`);
                console.log('Trying to start on port', PORT + 1);
                process.env.PORT = PORT + 1;
                startServer();
            }
        });
        
        // Add timeout to ensure server starts
        server.timeout = 120000;
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();