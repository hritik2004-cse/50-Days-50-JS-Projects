import React from 'react'

const Heading = () => {
    return (
        <div className="w-full text-center py-16 relative z-20">
            <h1 className="text-3xl md:text-4xl lg:text-6xl capitalize font-bold bg-gradient-to-r inline from-[#fb3c5f] via-[#d237b1] to-[#7200ff] bg-clip-text text-transparent drop-shadow-lg">
                50 days 50 js projects
            </h1>
            <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Explore my collection of web development projects, built with modern technologies and best practices.
            </p>
        </div>
    )
}

export default Heading
