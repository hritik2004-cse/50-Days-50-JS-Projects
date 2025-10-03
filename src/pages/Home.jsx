import React from 'react';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Gradient from '../components/Gradient';
import ProjectCards from '../components/ProjectCards';

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col relative scroll-smooth'>
      {/* Enhanced Background Gradient */}
      <Gradient />
      
      {/* Main Content */}
      <main className='flex-1 relative z-10 overflow-x-hidden'>
        <Heading />
        <ProjectCards />
      </main>
      
      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Home;