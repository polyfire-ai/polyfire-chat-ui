import React from 'react';

export type SidebarButtonProps = {
  className?: string;
  icon?: React.ReactNode;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  className,
  icon,
  label,
  ...props
}) => (
  <button type="button" className={className} {...props}>
    {icon}
    {label}
  </button>
);
