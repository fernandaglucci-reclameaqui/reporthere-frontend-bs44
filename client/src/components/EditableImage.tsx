import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
    console.log('Saving image:', id, tempUrl);
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
        key={currentSrc}
        src={currentSrc} 
        alt={alt} 
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
      
      {isEditing && (
        <>
          <div className={cn(
            "absolute inset-0 z-[60] pointer-events-none",
            isEditing ? "opacity-100" : "opacity-0"
          )}>
            {!isEditingUrl && (
              <div className="absolute top-4 right-4 pointer-events-auto">
                <Button 
                  onClick={handleEditClick}
                  variant="secondary" 
                  size="sm"
                  className="gap-2 shadow-lg"
                >
                  <Pencil className="h-4 w-4" />
                  Change Image
                </Button>
              </div>
            )}
          </div>

          {isEditingUrl && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-background p-4 rounded-lg shadow-2xl w-[90%] max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-200 border border-border">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Image URL</label>
                  <Input 
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-10"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste a direct link to an image (e.g. ending in .jpg, .png)
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    onClick={handleCancel}
                    variant="outline" 
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
};

export default EditableImage;
