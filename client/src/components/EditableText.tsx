import React, { useState, useRef, useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const COLORS = [
  { name: 'Default', value: 'inherit' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#ffffff' },
  { name: 'Green', value: '#16a34a' }, // green-600
  { name: 'Dark Green', value: '#14532d' }, // green-900
  { name: 'Gray', value: '#4b5563' }, // gray-600
  { name: 'Red', value: '#dc2626' }, // red-600
];

const EditableText = ({ id, defaultText, className, as: Component = 'p' }: EditableTextProps) => {
  const { isEditing, content, updateContent } = useEditor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Content structure: { "id": "text content", "id_color": "#hexcode" }
  const text = content[id] || defaultText;
  const color = content[`${id}_color`];

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    updateContent(id, e.currentTarget.innerText);
  };

  const handleColorSelect = (colorValue: string) => {
    updateContent(`${id}_color`, colorValue);
    setShowColorPicker(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block group">
        <Component
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          className={cn(
            className,
            "outline-dashed outline-2 outline-blue-400 cursor-text min-w-[20px] transition-colors duration-200"
          )}
          style={{ color: color !== 'inherit' ? color : undefined }}
        >
          {text}
        </Component>
        
        {/* Color Picker Trigger - Shows on Hover */}
        <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
            <PopoverTrigger asChild>
              <button 
                className="bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-100 border border-gray-200"
                title="Change Text Color"
              >
                <Palette className="w-3 h-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="flex gap-1">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorSelect(c.value)}
                    className={cn(
                      "w-6 h-6 rounded-full border border-gray-200 shadow-sm hover:scale-110 transition-transform",
                      color === c.value && "ring-2 ring-blue-500 ring-offset-1"
                    )}
                    style={{ backgroundColor: c.value === 'inherit' ? 'transparent' : c.value }}
                    title={c.name}
                  >
                    {c.value === 'inherit' && (
                      <span className="block w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

  return (
    <Component 
      className={className}
      style={{ color: color !== 'inherit' ? color : undefined }}
    >
      {text}
    </Component>
  );
};

export default EditableText;
