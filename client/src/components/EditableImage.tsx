import React, { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  id: string;
  defaultSrc: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ 
  id, 
  defaultSrc, 
  className, 
  alt,
  ...props 
}) => {
  const { isEditing, content, updateContent } = useEditor();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const currentSrc = content[id] || defaultSrc;

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempUrl(currentSrc);
    setIsEditingUrl(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tempUrl.trim()) {
      updateContent(id, tempUrl.trim());
    }
    setIsEditingUrl(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingUrl(false);
  };

  return (
    <div 
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={currentSrc} 
        alt={alt} 
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
      
      {isEditing && (
        <div className={cn(
          "absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200 z-50",
          isHovered || isEditingUrl ? "opacity-100" : "opacity-0"
        )}>
          {!isEditingUrl ? (
            <Button 
              onClick={handleEditClick}
              variant="secondary" 
              size="sm"
              className="gap-2 shadow-lg"
            >
              <Pencil className="h-4 w-4" />
              Change Image
            </Button>
          ) : (
            <div className="bg-background p-3 rounded-lg shadow-xl w-[90%] max-w-md space-y-3 animate-in fade-in zoom-in-95 duration-200 z-[60]">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Image URL</label>
                <Input 
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="h-8"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  onClick={handleCancel}
                  variant="ghost" 
                  size="sm"
                  className="h-7 px-2"
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  size="sm"
                  className="h-7 px-2"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableImage;
