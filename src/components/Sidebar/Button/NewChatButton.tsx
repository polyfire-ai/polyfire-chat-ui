import React from 'react';
import { AddIcon } from '../../Icons';
import { SidebarButton } from './SidebarButton';
import { useChatContext } from '../../../contexts/ChatProvider';

export type NewChatButtonProps = {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const NewChatButton: React.FC<NewChatButtonProps> = ({
  className,
  icon = <AddIcon />,
  label = 'New Chat',
  onClick,
  ...props
}) => {
  const { utils } = useChatContext();

  const onPressNewChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    utils.onResetChat();
    onClick?.(e);
  };

  return (
    <SidebarButton
      className={`flex w-full gap-x-4 rounded-lg border p-4 text-left text-sm font-medium transition-colors duration-200 focus:outline-none border-custom-700 text-custom-100 hover:bg-custom-800 ${className}`}
      icon={icon}
      label={label}
      onClick={onPressNewChat}
      {...props}
    />
  );
};
