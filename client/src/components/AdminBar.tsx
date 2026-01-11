import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from 'lucide-react';

const AdminBar = () => {
  const { isEditing, toggleEditing, saveChanges } = useEditor();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex gap-2">
      {isEditing ? (
        <>
          <Button 
            onClick={saveChanges} 
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full px-6"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            onClick={toggleEditing} 
            variant="destructive"
            className="shadow-lg rounded-full px-4"
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Button 
          onClick={toggleEditing} 
          className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full px-6 h-12"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Page
        </Button>
      )}
    </div>
  );
};

export default AdminBar;
