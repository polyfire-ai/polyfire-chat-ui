import React, { ReactNode, useState } from 'react';
import ChatList from './ChatList';
import SidebarHeader from './Header';
import LogoutButton from './LogoutButton';
import NewChatButton from './NewChatButton';
import SettingsButton from './SettingButton';

type Props = {
  Logo?: ReactNode;
  hasLogoutButton?: boolean;
  hasNewChatButton?: boolean;
  hasSettingsButton?: boolean;
  name?: string | ReactNode;
};

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
      <div className="w-4 h-0.5 bg-white" />
      <div className="w-4 h-0.5 bg-white" />
      <div className="w-4 h-0.5 bg-white" />
    </div>
  );
};

export const Sidebar: React.FC<Props> = ({
  hasSettingsButton,
  hasNewChatButton,
  hasLogoutButton,
  Logo,
  name,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <BurgerMenuIcon onClick={toggleSidebar} />
      <aside
        className={`fixed top-0 ${
          isSidebarOpen ? 'left-0' : '-left-full'
        } h-full z-50 transition-all sm:relative sm:left-0 bg-stone-900`}
      >
        <div className="flex h-[100vh] w-60 flex-col overflow-y-auto pt-8 border-r border-stone-700 sm:h-[100vh]">
          <SidebarHeader Logo={Logo} name={name} />

          {hasNewChatButton && (
            <div className="mx-2 mt-8">
              <NewChatButton />
            </div>
          )}
          <div className="space-y-4 overflow-y-auto px-2 py-4">
            <ChatList />
          </div>
          {(hasSettingsButton || hasLogoutButton) && (
            <div className="mt-auto w-full border-t border-stone-700 space-y-4 px-2 py-4">
              {hasSettingsButton && <SettingsButton />}
              {hasLogoutButton && <LogoutButton />}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
