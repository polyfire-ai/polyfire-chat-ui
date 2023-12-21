import React from 'react';

type SidebarButtonGroupProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const SidebarButtonGroup: React.FC<SidebarButtonGroupProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    {...props}
    className={`mt-auto w-full border-t border-custom-700 space-y-4 px-2 py-4 ${className}`}
  >
    {children}
  </div>
);
