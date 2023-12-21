import React, { HTMLAttributes } from 'react';
import { SkeletonChatItem, ChatItem } from './ChatListItem';
import { ChatInfos } from '../../../hooks/useChat';
import { useChatContext } from '../../../contexts/ChatProvider';

export const ChatList: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { chats, utils } = useChatContext();

  const { onSelectChat, onDeleteChat, onRenameChat } = utils;
  const { data, loading } = chats;

  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonChatItem key={index} />
        ))}
      </>
    );
  }

  return (
    <div
      className={`pb-10 max-h-[80vh] overflow-y-scroll ${className}`}
      {...props}
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
