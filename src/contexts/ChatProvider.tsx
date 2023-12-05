import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ChatOptions } from 'polyfire-js/chats/index.js';
import { useChat } from 'polyfire-js/hooks/index.js';
import type { ChatInstance } from 'polyfire-js/hooks/useChat.js';

export type ChatComponent = 'chat' | 'setting';

export type ChatContextValue = ChatInstance & {
  component: {
    onChange: (component: ChatComponent) => void;
    selected: ChatComponent;
  };
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider: React.FC<{
  children: ReactNode;
  options?: Partial<ChatOptions>;
}> = ({ children, options }) => {
  const chat = useChat(options);
  const [showComponent, setShowComponent] = useState<ChatComponent>('chat');

  const chatContextValue = useMemo(
    () => ({
      ...chat,
      component: { selected: showComponent, onChange: setShowComponent },
    }),
    [JSON.stringify(chat), showComponent]
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
