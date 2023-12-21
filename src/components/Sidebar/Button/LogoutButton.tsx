import React from 'react';
import { MdLogout } from 'react-icons/md/index.js';
import { SidebarButton } from './SidebarButton';

export type LogoutButtonProps = {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className,
  icon = <MdLogout className="h-6 w-6" />,
  label = 'Sign Out',
  ...props
}) => (
  <SidebarButton
    className={`flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 focus:outline-none text-custom-100 hover:bg-custom-800 ${className}`}
    icon={icon}
    label={label}
    {...props}
  />
);
