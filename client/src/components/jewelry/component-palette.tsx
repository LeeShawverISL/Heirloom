import { useDrag } from 'react-dnd';
import { Card } from "@/components/ui/card";
import { chains, gems, charms } from "@/lib/jewelry-data";
import type { JewelryComponent } from "@shared/schema";
import { useState } from 'react';

interface ComponentItemProps {
  component: JewelryComponent;
}

interface ComponentPaletteProps {
  jewelryType: 'necklace' | 'bracelet' | 'ring';
}

function ComponentItem({ component }: ComponentItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: component.type,
    item: component,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="aspect-square bg-gray-50 hover:shadow-lg transition-shadow">
        <div className="w-full h-full p-2">
          <img
            src={component.imageUrl}
            alt={`${component.type} ${component.id}`}
            className="w-full h-full object-contain"
          />
        </div>
      </Card>
    </div>
  );
}

export function ComponentPalette({ jewelryType }: ComponentPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<'bangles' | 'jewels' | 'accs' | 'metal'>(
    jewelryType === 'bracelet' ? 'bangles' : 'chains'
  );

  const getComponentsForCategory = () => {
    switch (activeCategory) {
      case 'bangles':
      case 'chains':
        return chains;
      case 'jewels':
        return gems;
      case 'accs':
      case 'metal':
        return charms;
      default:
        return [];
    }
  };

  const categories = jewelryType === 'bracelet' 
    ? ['bangles', 'jewels', 'accs', 'metal'] as const
    : ['chains', 'jewels', 'accs', 'metal'] as const;

  return (
    <div className="relative flex h-full">
      {/* Category Labels/Tabs */}
      <div className="flex flex-col justify-between py-4 pr-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`writing-mode-vertical text-sm font-semibold transition-colors ${
              activeCategory === category 
                ? 'text-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
        {getComponentsForCategory().map((component) => (
          <ComponentItem key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}