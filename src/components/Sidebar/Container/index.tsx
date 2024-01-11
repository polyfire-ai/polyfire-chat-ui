import React, { useEffect, useRef, useState } from 'react';

export type SidebarProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const BurgerMenuIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };
  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="absolute top-2 right-2 z-50 flex flex-col space-y-1 cursor-pointer p-4 lg:hidden xl:hidden 2xl:hidden"
      role="button"
      tabIndex={0}
      aria-labelledby="menu"
    >
      <div className="w-4 h-0.5 bg-custom-50" />
      <div className="w-4 h-0.5 bg-custom-50" />
      <div className="w-4 h-0.5 bg-custom-50" />
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  ...props
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <BurgerMenuIcon onClick={toggleSidebar} />

      <aside
        ref={sidebarRef}
        className={`fixed top-0 ${
          isSidebarOpen ? 'left-0' : '-left-full'
        } h-full z-50 transition-all sm:relative sm:left-0`}
      >
        <div
          className={`flex h-full w-60 flex-col overflow-y-auto p-1 bg-custom-900 border-r border-custom-700 ${className}`}
          {...props}
        >
          {children}
        </div>
      </aside>
    </>
  );
};
