'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { CircularProgress } from '@/components/ui/CircularProgress';

// Define Zod schema for component props
const richTextEditorSchema = z.object({
value: z.string(),
onChange: z.function()
  .args(z.string())
  .returns(z.void()),
placeholder: z.string().optional(),
className: z.string().optional(),
maxLength: z.number().int().positive().optional(),
showCharCount: z.boolean().optional(),
onCharCountChange: z.function().args(z.number()).returns(z.void()).optional(),
});

// Infer TypeScript type from Zod schema
type RichTextEditorProps = z.infer<typeof richTextEditorSchema>;

export function RichTextEditor(props: RichTextEditorProps) {
// Validate props using Zod
const { 
  value, 
  onChange, 
  placeholder, 
  className, 
  maxLength, 
  showCharCount = maxLength !== undefined,
  onCharCountChange
} = richTextEditorSchema.parse(props);

const editorRef = useRef<HTMLDivElement>(null);
const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
const selectionRef = useRef<Range | null>(null);
const { theme } = useTheme();
const [charCount, setCharCount] = useState(0);

// Calculate initial character count
useEffect(() => {
  if (editorRef.current) {
    // Use textContent to count actual characters without HTML
    const textContent = editorRef.current.textContent || '';
    setCharCount(textContent.length);
    if (onCharCountChange) onCharCountChange(textContent.length);
  }
}, []);

// Only set innerHTML when value prop changes
useEffect(() => {
  if (editorRef.current && editorRef.current.innerHTML !== value) {
    editorRef.current.innerHTML = value;
  }
}, [value]);

// Add event listener to prevent image drops
useEffect(() => {
  const preventImageDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const editor = editorRef.current;
  if (editor) {
    editor.addEventListener('dragover', preventImageDrop);
    editor.addEventListener('drop', preventImageDrop);
  }
  
  return () => {
    if (editor) {
      editor.removeEventListener('dragover', preventImageDrop);
      editor.removeEventListener('drop', preventImageDrop);
    }
  };
}, []);

// Save selection before opening emoji picker
const handleOpenEmojiPicker = () => {
  setIsEmojiPickerOpen(true);
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selectionRef.current = selection.getRangeAt(0);
  }
};

// Restore selection and insert emoji
const handleEmojiSelect = (emoji: any) => {
  setIsEmojiPickerOpen(false);
  if (editorRef.current) {
    editorRef.current.focus();
    const selection = window.getSelection();
    if (selection && selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
    
    // Check if adding emoji would exceed character limit
    if (maxLength && getTextContent().length + emoji.emoji.length > maxLength) {
      return; // Don't insert emoji if it would exceed limit
    }
    
    document.execCommand('insertText', false, emoji.emoji);
    // Update value after emoji insert
    onChange(editorRef.current.innerHTML);
    updateCharCount();
  }
};

const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
  if (editorRef.current) {
    const text = updateCharCount();
    
    // Check if content is only whitespace
    if (text.trim().length === 0) {
      // Prevent the input and restore previous content
      e.preventDefault();
      editorRef.current.innerHTML = value;
      return;
    }
    
    // Check if character limit is exceeded
    if (maxLength && text.length > maxLength) {
      // Prevent further input by restoring previous content
      e.preventDefault();
      
      // Truncate content to maxLength
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      if (range) {
        // Store current selection
        const currentSelection = {
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset
        };
        
        // Set HTML directly to truncated text
        const currentHTML = editorRef.current.innerHTML;
        onChange(currentHTML);
        
        // Restore selection if possible
        setTimeout(() => {
          try {
            if (selection && editorRef.current) {
              selection.removeAllRanges();
              const newRange = document.createRange();
              newRange.setStart(currentSelection.startContainer, currentSelection.startOffset);
              newRange.setEnd(currentSelection.endContainer, currentSelection.endOffset);
              selection.addRange(newRange);
            }
          } catch (err) {
            console.error('Error restoring selection:', err);
          }
        }, 0);
      }
      
      return;
    }
    
    onChange(editorRef.current.innerHTML);
  }
};

const handleFormat = (command: string) => {
  document.execCommand(command, false);
  editorRef.current?.focus();
};

// Prevent pasting images and handle paste events
const handlePaste = (e: React.ClipboardEvent) => {
  e.preventDefault();
  // Get only plain text from clipboard to prevent image pasting
  const text = e.clipboardData.getData('text/plain');
  
  // Check if pasting would exceed character limit
  if (maxLength) {
    const currentText = getTextContent();
    if (currentText.length + text.length > maxLength) {
      // Only paste what fits within the limit
      const availableSpace = maxLength - currentText.length;
      if (availableSpace <= 0) return; // No space left
      
      // Insert truncated text
      document.execCommand('insertText', false, text.substring(0, availableSpace));
      updateCharCount();
      onChange(editorRef.current?.innerHTML || '');
      return;
    }
  }
  
  document.execCommand('insertText', false, text);
  updateCharCount();
  onChange(editorRef.current?.innerHTML || '');
};

// Helper function to get text content and count
const getTextContent = (): string => {
  return editorRef.current?.textContent || '';
};

// Update character count when content changes
const updateCharCount = () => {
  const text = getTextContent();
  setCharCount(text.length);
  if (onCharCountChange) onCharCountChange(text.length);
  return text;
};


return (
  <div className={cn('border rounded-lg overflow-hidden', className)}>
    <div className="p-2 pb-0">
      <div className="flex items-center gap-1 border-b pb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" onClick={handleOpenEmojiPicker}>
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <EmojiPicker onEmojiClick={handleEmojiSelect} theme={theme as Theme} className='dark:bg-[#09090b]'/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
    <div className="relative">
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[100px] focus:outline-none"
        onInput={handleInput}
        onPaste={handlePaste}
        placeholder={placeholder}
        suppressContentEditableWarning
      />
      {maxLength && charCount > 0 && (
        <div className="absolute bottom-2 right-2">
          <CircularProgress
            progress={Math.min((charCount / maxLength) * 100, 100)}
            size={28}
            strokeWidth={4}
          />
        </div>
      )}
    </div>
  </div>
);
}