import React from 'react';
import natureBackground from './img.jpg'; // Import your background image

const ComingSoon = () => {
    return (
        <div 
            className="flex items-center justify-center h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${natureBackground})` }}
        >
            <div className="text-center">
                <h1 className="text-5xl text-white font-bold">Coming Soon</h1>
                <p className="text-xl text-white mt-4">Our website is under construction. Stay tuned for something amazing!</p>
            </div>
        </div>
    );
}

export default ComingSoon;
