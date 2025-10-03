import React from 'react'

const Gradient = () => {
  return (
    <>
      {/* Background Gradient Layer */}
      <div className='fixed inset-0 bg-gradient-to-br from-[#06020d] via-[#0a0612] to-[#0d0a1a] z-0'></div>
      
      {/* Animated Gradient Orbs */}
      <div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
        {/* Primary Purple-Pink Orb */}
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] blur-3xl rounded-full bg-gradient-to-br from-[#7200ff] to-[#d237b1] opacity-60 animate-glow-slow"></div>
        
        {/* Secondary Red-Pink Orb */}
        <div className="absolute top-[30%] left-[20%] -translate-x-1/2 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] blur-3xl rounded-full bg-gradient-to-tr from-[#fb3c5f] to-[#d237b1] opacity-50 animate-glow-slow-delayed"></div>
        
        {/* Tech Color Orbs */}
        <div className="absolute bottom-[20%] right-[25%] translate-x-1/2 w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] blur-2xl rounded-full bg-gradient-to-bl from-[#61DAFB] to-[#339933] opacity-40 animate-glow-slow"></div>
        
        <div className="absolute top-[15%] right-[15%] translate-x-1/2 w-[28vw] h-[28vw] max-w-[350px] max-h-[350px] blur-3xl rounded-full bg-gradient-to-tr from-[#F7DF1E] to-[#E34F26] opacity-35 animate-glow-slow-delayed"></div>
      </div>
    </>
  )
}

export default Gradient
