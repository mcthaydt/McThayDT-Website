import React, { useEffect, useRef, useState } from 'react';

const AsciiGlobe = ({ className }: { className?: string }) => {
  const preRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    let frameId: number;
    const width = 60; // Characters wide
    const height = 30; // Characters tall
    const radius = 12; // Radius in characters (approx)
    
    // Center of the screen
    const cx = width / 2;
    const cy = height / 2;
    
    let angle = 0;

    const render = () => {
      const grid = new Array(height).fill(null).map(() => new Array(width).fill(' '));
      const zBuffer = new Array(height).fill(null).map(() => new Array(width).fill(-Infinity));
      
      // Draw sphere
      // We'll iterate over angles to form the sphere surface (latitude/longitude lines)
      
      // Adjust these steps for density of the wireframe
      const latStep = Math.PI / 12; 
      const longStep = Math.PI / 12;

      const rotationMatrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
      ];

      // Draw Latitude Lines
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += latStep) {
        const r = Math.cos(lat) * radius;
        const y = Math.sin(lat) * radius;
        
        for (let long = 0; long <= 2 * Math.PI; long += 0.1) { // finer step for smooth lines
          const x = r * Math.cos(long);
          const z = r * Math.sin(long);
          
          // Rotate
          const rx = x * rotationMatrix[0][0] + z * rotationMatrix[0][2];
          const ry = y;
          const rz = x * rotationMatrix[2][0] + z * rotationMatrix[2][2];
          
          // Project
          // Simple orthographic projection for ASCII
          // Add perspective if desired, but ortho is cleaner for ASCII
          
          const px = Math.floor(rx + cx);
          const py = Math.floor(ry + cy);
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            if (rz > zBuffer[py][px]) {
              zBuffer[py][px] = rz;
              grid[py][px] = '.'; // Latitude char
            }
          }
        }
      }

      // Draw Longitude Lines
      for (let long = 0; long < 2 * Math.PI; long += longStep) {
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
          const r = Math.cos(lat) * radius;
          const y = Math.sin(lat) * radius;
          const x = r * Math.cos(long);
          const z = r * Math.sin(long);

          // Rotate
          const rx = x * rotationMatrix[0][0] + z * rotationMatrix[0][2];
          const ry = y;
          const rz = x * rotationMatrix[2][0] + z * rotationMatrix[2][2];

          const px = Math.floor(rx + cx);
          const py = Math.floor(ry + cy);

          if (px >= 0 && px < width && py >= 0 && py < height) {
             if (rz > zBuffer[py][px]) {
               zBuffer[py][px] = rz;
               grid[py][px] = grid[py][px] === '.' ? '+' : ':'; // Longitude char, + at intersections
             }
          }
        }
      }

      // Convert grid to string
      const text = grid.map(row => row.join('')).join('\n');
      if (preRef.current) {
        preRef.current.textContent = text;
      }

      angle += 0.01;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <pre 
      ref={preRef} 
      className={`font-mono text-[10px] leading-[10px] text-primary select-none pointer-events-none whitespace-pre ${className}`}
      aria-hidden="true"
    />
  );
};

export { AsciiGlobe };
