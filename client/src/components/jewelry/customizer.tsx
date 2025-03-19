import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ComponentPalette } from './component-palette';
import { CanvasPreview } from './canvas-preview';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { JewelryComponent } from '@shared/schema';
import { useIsMobile } from '@/hooks/use-mobile';

interface CustomizerProps {
  jewelryType: 'necklace' | 'bracelet' | 'ring';
}

export function Customizer({ jewelryType }: CustomizerProps) {
  const [components, setComponents] = useState<JewelryComponent[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDrop = (item: JewelryComponent, position: { x: number; y: number }) => {
    setComponents((prev) => [
      ...prev,
      { ...item, position }
    ]);
  };

  const handleSave = () => {
    const designs = JSON.parse(localStorage.getItem('favoriteDesigns') || '[]');
    designs.push({
      id: Date.now(),
      type: jewelryType,
      components,
      date: new Date().toISOString()
    });
    localStorage.setItem('favoriteDesigns', JSON.stringify(designs));

    toast({
      title: "Design saved!",
      description: "Your design has been added to favorites."
    });
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="grid md:grid-cols-2 gap-8 p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Components</h2>
          <ComponentPalette jewelryType={jewelryType} />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Preview</h2>
            <Button onClick={handleSave}>Save Design</Button>
          </div>
          <CanvasPreview
            components={components}
            onDrop={handleDrop}
            jewelryType={jewelryType}
          />
        </div>
      </div>
    </DndProvider>
  );
}