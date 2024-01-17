import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ChatOptions } from 'polyfire-js/chats/index.js';
import { useChat } from 'polyfire-js/hooks/index.js';

import { ChatMode, ChatContextValue } from '../types';
import useScrollToBottom from '../hooks/useScrollToBottom';

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider: React.FC<{
  children: ReactNode;
  onError?: (error: string) => void;
  onSuccess?: () => void;
  options?: Partial<ChatOptions>;
}> = ({ children, options, onSuccess, onError }) => {
  const chatInstance = useChat(options, onError, onSuccess);
  const [showComponent, setShowComponent] = useState<ChatMode>('chat');
  const [prompt, setPrompt] = useState('');

  const { ref, isAtBottom, scrollToBottom } = useScrollToBottom<HTMLDivElement>(
    [chatInstance.history.data, chatInstance.answer.data]
  );

  const chatContextValue = useMemo(
    () => ({
      ...chatInstance,
      chat: {
        ...chatInstance.chat,
        ref,
        isAtBottom,
      } as ChatContextValue['chat'],
      utils: {
        ...chatInstance.utils,
        scrollToBottom,
      } as ChatContextValue['utils'],
      component: { selected: showComponent, onChange: setShowComponent },
      prompt: { value: prompt, onChange: setPrompt },
    }),
    [JSON.stringify(chatInstance), showComponent, isAtBottom, prompt]
  );

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
