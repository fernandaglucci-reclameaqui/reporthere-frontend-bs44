import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  index: number;
  totalSections: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  index,
  totalSections,
  onMoveUp,
  onMoveDown,
  children,
  className
}) => {
  const { isEditing } = useEditor();

  return (
    <div className={cn("relative group/section", className)} id={id}>
      {children}
      
      {isEditing && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40 opacity-0 group-hover/section:opacity-100 transition-opacity duration-200">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow-md bg-white hover:bg-gray-100 border border-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp(index);
            }}
            disabled={index === 0}
            title="Move Section Up"
          >
            <ArrowUp className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow-md bg-white hover:bg-gray-100 border border-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown(index);
            }}
            disabled={index === totalSections - 1}
            title="Move Section Down"
          >
            <ArrowDown className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
      )}
      
      {isEditing && (
        <div className="absolute inset-0 border-2 border-transparent group-hover/section:border-primary/20 pointer-events-none transition-colors duration-200" />
      )}
    </div>
  );
};

export default SectionWrapper;
