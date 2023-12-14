import { ReactNode } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md/index.js';

const SidebarHeader = ({
  Logo = <MdChatBubbleOutline className="h-5 w-5 text-white" />,
  name,
  children,
}: {
  Logo?: ReactNode;
  children?: ReactNode;
  name?: string | ReactNode;
}) => (
  <div className="flex items-center px-4">
    {Logo}
    <h2 className="px-2 text-lg font-medium text-custom-700 dark:text-custom-100">
      {name || 'Chats'}
      {children}
    </h2>
  </div>
);

export default SidebarHeader;
