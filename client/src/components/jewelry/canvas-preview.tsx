import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import type { JewelryComponent } from '@shared/schema';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CanvasPreviewProps {
  components: JewelryComponent[];
  onDrop: (item: JewelryComponent, position: { x: number; y: number }) => void;
  jewelryType: 'necklace' | 'bracelet' | 'ring';
}

export function CanvasPreview({ components, onDrop, jewelryType }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['chain', 'gem', 'charm'],
    drop: (item: JewelryComponent, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        onDrop(item, {
          x: offset.x - rect.left,
          y: offset.y - rect.top
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw appropriate silhouette based on jewelry type
    ctx.fillStyle = 'black';

    if (jewelryType === 'necklace') {
      // Draw necklace bust (black silhouette)
      ctx.fillStyle = '#000000';  // Set fill color to black
      
      ctx.beginPath();
      // Neck top
      ctx.moveTo(250, 80);  
      ctx.lineTo(350, 80);  
      
      // Right side of neck and shoulder
      ctx.quadraticCurveTo(380, 100, 390, 140);  
      ctx.quadraticCurveTo(430, 220, 450, 280);  
      
      // Bottom curve
      ctx.quadraticCurveTo(400, 350, 300, 380);  
      ctx.quadraticCurveTo(200, 350, 150, 280);  
      
      // Left side of neck and shoulder
      ctx.quadraticCurveTo(170, 220, 210, 140);  
      ctx.quadraticCurveTo(220, 100, 250, 80);  
      
      ctx.closePath();
      ctx.fill();
      
      // Add shadow underneath
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(300, 400, 120, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (jewelryType === 'bracelet') {
      // Draw T-shaped bracelet stand
      ctx.beginPath();

      // Horizontal bar (thicker)
      ctx.rect(100, 80, 400, 100);  // Increased height from 60 to 100

      // Vertical stand
      ctx.rect(250, 180, 100, 160);  // Adjusted y position due to thicker top

      // Base
      ctx.rect(200, 340, 200, 40);

      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';
    } else if (jewelryType === 'ring') {
      // Draw ring box 
      ctx.fillStyle = '#333333';  // Dark gray/black for the box exterior
      
      // Main box
      ctx.beginPath();
      ctx.rect(150, 150, 300, 200);
      ctx.fill();
      
      // Top lid
      ctx.beginPath();
      ctx.rect(150, 120, 300, 30);
      ctx.fill();
      
      // Inner padding (white)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.rect(170, 170, 260, 160);
      ctx.fill();
      
      // Create shadow for box
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
    }

    // Draw components
    components.forEach(async (component) => {
      const img = new Image();
      img.src = component.imageUrl;
      img.onload = () => {
        ctx.drawImage(
          img,
          component.position.x,
          component.position.y,
          100,
          100
        );
      };
    });
  }, [components, jewelryType]);

  return (
    <div ref={drop} className="relative bg-white rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className={`w-full h-full ${
          isOver ? 'border-2 border-primary' : 'border border-gray-200'
        }`}
      />
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute bottom-6 left-6 rounded-full w-12 h-12 bg-green-700 hover:bg-green-800"
      >
        <Search className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}