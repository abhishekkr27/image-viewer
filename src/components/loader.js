import React, { useState, useEffect } from "react";
import './loader.css'; // Make sure to create a CSS file for styling

const LoadingExample = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch or delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <h1>Data Loaded Successfully!</h1>
      )}
    </div>
  );
};

export default LoadingExample;
