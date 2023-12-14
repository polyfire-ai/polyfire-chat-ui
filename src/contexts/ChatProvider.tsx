import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ChatOptions } from 'polyfire-js/chats/index.js';
// import { useChat } from 'polyfire-js/hooks/index.js';

import useChat from '../hooks/useChat';
import { ChatMode, ChatContextValue } from '../types';
import useScrollToBottom from '../hooks/useScrollToBottom';

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider: React.FC<{
  children: ReactNode;
  options?: Partial<ChatOptions>;
}> = ({ children, options }) => {
  const chatInstance = useChat(options);
  const [showComponent, setShowComponent] = useState<ChatMode>('chat');

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
        onScrollToBottom: scrollToBottom,
      } as ChatContextValue['utils'],
      component: { selected: showComponent, onChange: setShowComponent },
    }),
    [JSON.stringify(chatInstance), showComponent, isAtBottom]
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
