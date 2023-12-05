import React, { useCallback } from 'react';
import { useChatContext, ChatComponent } from '../../../contexts/ChatProvider';
import ChatItem, { Skeleton } from './Item';
import { ChatInfos } from '../../../hooks/useChat';

const ChatList = () => {
  const { chats, utils, component } = useChatContext();

  const { onSelectChat, onDeleteChat, onRenameChat } = utils;
  const { data, loading } = chats;

  const onClick = useCallback(() => {
    component.onChange('chat' as ChatComponent);
  }, [component]);

  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={index} />
        ))}
      </>
    );
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      className="mb-10"
      onClick={onClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      {data?.map((item: ChatInfos) => (
        <ChatItem
          key={item.id}
          chat={item}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
          onRenameChat={onRenameChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
