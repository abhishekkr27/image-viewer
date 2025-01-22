import React, { useState } from 'react';
import { fabric } from 'fabric';

const CanvasImageEditor = ({ canvas }) => {
  const [text, setText] = useState('');

  if (!canvas) {
    console.error("Canvas is not passed correctly");
    return null;
  }

  // Add text layer to canvas
  const addTextLayer = () => {
    if (!text.trim()) {
      alert('Please enter some text!');
      return;
    }
    const newText = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      width: 300,
      fontSize: 20,
    });
    canvas.add(newText);
    setText('');
  };

  // Add shapes
  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: 'blue',
          selectable: true,
        });
        break;
      case 'rectangle':
        shape = new fabric.Rect({
          left: 200,
          top: 100,
          width: 100,
          height: 100,
          fill: 'green',
          selectable: true,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 300,
          top: 100,
          width: 100,
          height: 100,
          fill: 'red',
          selectable: true,
        });
        break;
      default:
        break;
    }
    canvas.add(shape);
  };

  return (
    <div className="canvas-controls">
      <input
        type="text"
        placeholder="Add caption..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTextLayer}>Add Text</button>
      <div>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
      </div>
    </div>
  );
};

export default CanvasImageEditor;
