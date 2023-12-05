import { ReactNode } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md/index.js';
import { useChatContext } from '../../../contexts/ChatProvider';

const SidebarHeader = ({
  Logo = <MdChatBubbleOutline className="h-5 w-5 text-white" />,
  name,
}: {
  Logo?: ReactNode;
  name?: string | ReactNode;
}) => {
  const { chats } = useChatContext();
  const chatsLength = chats?.data?.length;

  return (
    <div className="flex items-center px-4">
      {Logo}
      <h2 className="px-2 text-lg font-medium text-stone-800 dark:text-stone-200">
        {name || 'Chats'}
        {chatsLength && (
          <span className="mx-2 rounded-full bg-stone-700 px-2 py-1 text-xs text-stone-200">
            {chatsLength}
          </span>
        )}
      </h2>
    </div>
  );
};

export default SidebarHeader;
