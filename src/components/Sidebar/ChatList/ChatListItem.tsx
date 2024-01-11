import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { HiDotsHorizontal, HiTrash, HiPencil } from 'react-icons/hi/index.js';
import { ChatInfos } from 'polyfire-js/chats';

import { isValideDate, formatDate } from '../../../utils/date';

export const SkeletonChatItem: React.FC = () => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <div className="animate-pulse bg-custom-800 my-2 rounded-lg px-3 py-2">
    <div className="h-4 rounded mb-2" />
    <div className="h-3 rounded w-1/2" />
  </div>
);

export type ChatItemProps = {
  chat: ChatInfos;
  onDeleteChat?: (id: string) => void;
  onRenameChat?: (id: string, name: string) => void;
  onSelectChat: (id: string) => void;
};

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}) => {
  const title = chat.name || chat.latest_message_content || 'No name';
  const date = chat.latest_message_created_at;

  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSelectChatHandler = () => {
    onSelectChat(chat.id);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const onDeleteChatHanlder = () => {
    onDeleteChat?.(chat.id);
    toggleDropdown();
  };

  const onRenameChatHandler = () => {
    toggleDropdown();
    toggleInput();
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    setShowInput(false);

    if (newTitle === title) {
      return;
    }

    if (newTitle.length === 0) {
      setNewTitle(title);
      return;
    }

    onRenameChat?.(chat.id, newTitle);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full flex flex-col gap-y-2 rounded-lg px-2 py-2 text-left transition-colors duration-200 focus:outline-none hover:bg-custom-800"
        onClick={onSelectChatHandler}
      >
        {showInput ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleSubmit}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleTitleSubmit();
                }
              }}
              className="text-sm font-medium capitalize text-custom-100 bg-custom-700 rounded px-2 py-1 w-full"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </div>
        ) : (
          <h1 className="text-sm font-medium capitalize text-custom-100 truncate max-w-full pr-10">
            {newTitle}
          </h1>
        )}

        <p className="text-xs text-custom-300">
          {isValideDate(date) ? formatDate(date) : 'Date not available'}
        </p>
      </button>
      <button
        onClick={toggleDropdown}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full p-2 focus:outline-none hover:bg-custom-700"
        aria-label="More options"
        type="button"
      >
        <HiDotsHorizontal className="text-custom-50" />
      </button>
      {showDropdown && (
        <div
          className="absolute -bottom-10 right-0 mt-2 py-2 w-48 bg-custom-700 rounded-md shadow-xl z-30"
          ref={dropdownRef}
        >
          {onDeleteChat && (
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-custom-600 text-red-600"
              onClick={onDeleteChatHanlder}
              type="button"
            >
              <HiTrash className="text-red-600" />
              Delete chat
            </button>
          )}
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-custom-100 hover:bg-custom-600"
            onClick={onRenameChatHandler}
            type="button"
          >
            <HiPencil className="text-custom-50" />
            Rename
          </button>
        </div>
      )}
    </div>
  );
};
