import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fabric } from 'fabric'; 
import './EditImagePage.css';

const EditImagePage = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  useEffect(() => {
    if (!image) {
      console.error('No image found in location.state');
      navigate('/');
      return;
    }

    // Initialize the Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#fff',
    });

    // Load the image onto the canvas
    fabric.Image.fromURL(image.src.large, (img) => {
      img.set({ crossOrigin: 'Anonymous' });
      img.scaleToWidth(800);
      img.scaleToHeight(600);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }, { crossOrigin: 'Anonymous' }); 

    // Store the canvas reference
    canvasRef.current = canvas;

    // Cleanup on component unmount
    return () => {
      canvas.dispose();
    };
  }, [image, navigate]);

  const addTextLayer = () => {
    const canvas = canvasRef.current;
    const text = new fabric.Textbox('Your Text', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
    });
    canvas.add(text);
  };

  const addShape = (type) => {
    const canvas = canvasRef.current;
    let shape;
    switch (type) {
      case 'circle':
        shape = new fabric.Circle({ radius: 50, fill: 'MediumSeaGreen', left: 100, top: 100 });
        break;
      case 'rectangle':
        shape = new fabric.Rect({ width: 100, height: 50, fill: 'DarkSalmon', left: 150, top: 100 });
        break;
      case 'triangle':
        shape = new fabric.Triangle({ width: 100, height: 100, fill: 'DarkOrange', left: 200, top: 100 });
        break;
      case 'polygon':
        // Add a polygon shape
        shape = new fabric.Polygon([
          { x: 200, y: 100 },
          { x: 250, y: 150 },
          { x: 225, y: 200 },
          { x: 175, y: 200 },
          { x: 150, y: 150 }, 
        ], {
          fill: 'Violet',
          left: 100,
          top: 100,
          selectable: true,
        });
        break;
      default:
        break;
    }
    canvas.add(shape);
  };

  const handleDownload = () => {
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL({ format: 'png', quality: 0.8 });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'edited-image.png';
      link.click();
    } catch (e) {
      console.error('Error exporting image:', e);
      alert('Unable to download the image due to cross-origin restrictions.');
    }
  };

  return (
    <div className="edit-image-page">
      <h1>Edit Image</h1>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
      <div className="controls">
        <button onClick={addTextLayer}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={() => addShape('polygon')}>Add Polygon</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={() => navigate('/')}>Back to Search</button>
      </div>
    </div>
  );
};

export default EditImagePage;
