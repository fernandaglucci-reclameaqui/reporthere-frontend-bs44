import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EditorContextType {
  isEditing: boolean;
  toggleEditing: () => void;
  content: Record<string, string>;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  const updateContent = (key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveChanges = () => {
    localStorage.setItem('site_content', JSON.stringify(content));
    alert('Changes saved locally! (In a real app, this would save to the database)');
    setIsEditing(false);
  };

  return (
    <EditorContext.Provider value={{ isEditing, toggleEditing, content, updateContent, saveChanges }}>
      {children}
    </EditorContext.Provider>
  );
};
