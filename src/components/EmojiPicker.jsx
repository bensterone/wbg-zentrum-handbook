import React, { useState, useRef, useEffect, useCallback } from 'react';
import EmojiPicker from 'emoji-picker-react';

const CustomEmojiPicker = ({ onEmojiClick, isDarkMode, trigger, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef();
  const triggerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiData, event) => {
    onEmojiClick(emojiData.emoji);
    setIsOpen(false);
  };

  const TriggerComponent = trigger || (
    <button
      className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
      title="Emoji auswählen"
    >
      😀
    </button>
  );

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {TriggerComponent}
      </div>

      {isOpen && (
        <div 
          ref={pickerRef}
          className="absolute z-50 mt-2 right-0 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600"
          style={{ transform: 'translateX(-50%)', left: '50%' }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={isDarkMode ? 'dark' : 'light'}
            searchDisabled={false}
            skinTonesDisabled={false}
            width={320}
            height={400}
            previewConfig={{
              showPreview: true,
              defaultEmoji: '1f60a',
              defaultCaption: 'Wähle dein Emoji!'
            }}
            categories={[
              'smileys_people',
              'animals_nature',
              'food_drink',
              'travel_places',
              'activities',
              'objects',
              'symbols',
              'flags'
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default CustomEmojiPicker;
