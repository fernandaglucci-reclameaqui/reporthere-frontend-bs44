import React from 'react';
import { useEditor } from '@/contexts/EditorContext';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const EditableText = ({ id, defaultText, className, as: Component = 'p' }: EditableTextProps) => {
  const { isEditing, content, updateContent } = useEditor();
  const text = content[id] || defaultText;

  if (isEditing) {
    return (
      <Component
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: React.FocusEvent<HTMLElement>) => updateContent(id, e.currentTarget.innerText)}
        className={`${className} outline-dashed outline-2 outline-blue-400 cursor-text min-w-[20px]`}
      >
        {text}
      </Component>
    );
  }

  return <Component className={className}>{text}</Component>;
};

export default EditableText;
