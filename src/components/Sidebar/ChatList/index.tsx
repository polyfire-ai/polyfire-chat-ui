import React, { useCallback } from 'react';
import ChatItem, { Skeleton } from './Item';
import { ChatInfos } from '../../../hooks/useChat';
import { ChatContextValue, ChatMode } from '../../../types';

type Props = {
  chatInstance: ChatContextValue;
};

const ChatList = ({ chatInstance }: Props) => {
  const { chats, utils, component } = chatInstance;

  const { onSelectChat, onDeleteChat, onRenameChat } = utils;

  console.log('utils', utils);
  const { data, loading } = chats;

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

  const onClick = useCallback(() => {
    component.onChange('chat' as ChatMode);
  }, [component]);

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
      {data &&
        data?.map((item: ChatInfos) => (
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
