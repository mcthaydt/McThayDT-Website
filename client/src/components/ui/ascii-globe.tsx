import React, { useEffect, useRef } from 'react';

const AsciiGlobe = ({ className }: { className?: string }) => {
  const preRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    let frameId: number;
    const width = 64; // Characters wide
    const height = 64; // Characters tall (buffer size, not necessarily render size)
    
    // Center of the screen
    const cx = width / 2;
    const cy = height / 2;
    
    // Radius in characters for the X axis. 
    // We'll scale Y axis to compensate for font aspect ratio (approx 2:1 usually)
    const radius = 20; 
    
    let angle = 0;

    const render = () => {
      const grid = new Array(height).fill(null).map(() => new Array(width).fill(' '));
      const zBuffer = new Array(height).fill(null).map(() => new Array(width).fill(-Infinity));
      
      const rotationMatrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
      ];

      // Draw the sphere
      // We iterate over the surface of a sphere
      for (let i = 0; i < 3000; i++) { // Number of points
          // Golden angle distribution for even point spread
          const theta = Math.acos(1 - 2 * (i + 0.5) / 3000);
          const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

          const x = radius * Math.sin(theta) * Math.cos(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(theta);

          // Rotate
          const rx = x * rotationMatrix[0][0] + z * rotationMatrix[0][2];
          const ry = y;
          const rz = x * rotationMatrix[2][0] + z * rotationMatrix[2][2];

          // Project
          // We scale ry by 0.55 to compensate for line-height vs character width
          // making it look spherical rather than egg-shaped
          const px = Math.floor(rx + cx);
          const py = Math.floor(ry * 0.55 + cy);

          if (px >= 0 && px < width && py >= 0 && py < height) {
            if (rz > zBuffer[py][px]) {
              zBuffer[py][px] = rz;
              // Simple shading based on z-depth or just a dot
              // Can alternate chars for texture
              const char = Math.random() > 0.8 ? '+' : '.';
              grid[py][px] = char;
            }
          }
      }

      // Draw lat/long lines for structure if desired, 
      // but point cloud is often cleaner for ASCII spheres.
      // Let's add some ring lines for that "wireframe" look
      
      // Equator
      for (let long = 0; long < 2 * Math.PI; long += 0.05) {
         const x = radius * Math.cos(long);
         const y = 0;
         const z = radius * Math.sin(long);
         
         const rx = x * rotationMatrix[0][0] + z * rotationMatrix[0][2];
         const ry = y;
         const rz = x * rotationMatrix[2][0] + z * rotationMatrix[2][2];
         
         const px = Math.floor(rx + cx);
         const py = Math.floor(ry * 0.55 + cy);
         
         if (px >= 0 && px < width && py >= 0 && py < height) {
             if (rz > zBuffer[py][px] + 0.5) { // Bias slightly to show over points
                 zBuffer[py][px] = rz;
                 grid[py][px] = '-';
             }
         }
      }
      
      // 90 deg meridian
      for (let lat = 0; lat < 2 * Math.PI; lat += 0.05) {
         const x = radius * Math.cos(lat);
         const y = radius * Math.sin(lat);
         const z = 0;

         // We need to rotate this ring to be vertical relative to initial state if we want a meridian
         // Actually, (radius*cos, radius*sin, 0) is a flat ring on Z plane.
         // Let's just use it as is, it creates a nice orbiting ring effect.
         
         const rx = x * rotationMatrix[0][0] + z * rotationMatrix[0][2];
         const ry = y;
         const rz = x * rotationMatrix[2][0] + z * rotationMatrix[2][2];
         
         const px = Math.floor(rx + cx);
         const py = Math.floor(ry * 0.55 + cy);
         
         if (px >= 0 && px < width && py >= 0 && py < height) {
             if (rz > zBuffer[py][px] + 0.5) {
                 zBuffer[py][px] = rz;
                 grid[py][px] = '|';
             }
         }
      }


      // Convert grid to string
      // Trim empty lines from top/bottom to keep it tight? 
      // Or just render fixed size. Fixed size prevents jitter.
      const text = grid.map(row => row.join('')).join('\n');
      if (preRef.current) {
        preRef.current.textContent = text;
      }

      angle += 0.015;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <pre 
      ref={preRef} 
      className={`font-mono text-[10px] leading-[10px] font-bold tracking-tighter select-none pointer-events-none whitespace-pre overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ fontFamily: '"Geist Mono", monospace' }} 
    />
  );
};

export { AsciiGlobe };
