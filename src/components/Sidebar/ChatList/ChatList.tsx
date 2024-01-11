import React, { HTMLAttributes } from 'react';
import { ChatInfos } from 'polyfire-js/chats';
import { SkeletonChatItem, ChatItem } from './ChatListItem';
import { useChatContext } from '../../../contexts/ChatProvider';

export const ChatList: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { chats, utils } = useChatContext();

  const { selectChat, deleteChat, renameChat } = utils;
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
            onSelectChat={selectChat}
            onDeleteChat={deleteChat}
            onRenameChat={renameChat}
          />
        ))}
    </div>
  );
};
