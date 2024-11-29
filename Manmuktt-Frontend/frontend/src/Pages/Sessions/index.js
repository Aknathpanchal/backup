import React from 'react';

const Session = () => {
  return (
    <div
      style={{
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundImage: `url('https://your-image-url.com/your-image.jpg')`, // Replace with your image URL
        backgroundSize: 'cover', // Cover the whole screen
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent repeating
      }}
    >
      {/* Add any additional content here if needed */}
    </div>
  );
};

export default Session;
