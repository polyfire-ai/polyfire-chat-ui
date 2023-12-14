import React, { ReactNode, useCallback, useState } from 'react';
import ChatList from './ChatList';
import SidebarHeader from './Header';
import LogoutButton from '../Buttons/LogoutButton';
import NewChatButton from '../Buttons/NewChatButton';
import SettingsButton from '../Buttons/SettingButton';
import { ChatContextValue, ChatMode } from '../../types';

type Props = {
  Logo?: ReactNode;
  chatInstance: ChatContextValue;
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

export const Sidebar = ({
  hasSettingsButton,
  hasNewChatButton,
  hasLogoutButton,
  Logo,
  name,
  chatInstance,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { utils, component, chats } = chatInstance;

  const { onResetChat } = utils;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onPressNewChat = useCallback(() => {
    component.onChange('chat' as ChatMode);
    onResetChat();
  }, []);

  return (
    <>
      <BurgerMenuIcon onClick={toggleSidebar} />
      <aside
        className={`fixed top-0 ${
          isSidebarOpen ? 'left-0' : '-left-full'
        } h-full z-50 transition-all sm:relative sm:left-0 bg-custom-900`}
      >
        <div className="flex h-[100vh] w-60 flex-col overflow-y-auto pt-8 border-r border-custom-700 sm:h-[100vh]">
          <SidebarHeader Logo={Logo} name={name}>
            {chats?.data?.length && (
              <span className="mx-2 rounded-full bg-custom-700 px-2 py-1 text-xs text-custom-100">
                {chats?.data?.length}
              </span>
            )}
          </SidebarHeader>

          {hasNewChatButton && (
            <div className="mx-2 mt-8">
              <NewChatButton onClick={onPressNewChat} />
            </div>
          )}
          <div className="space-y-4 overflow-y-auto px-2 py-4">
            <ChatList chatInstance={chatInstance} />
          </div>
          {(hasSettingsButton || hasLogoutButton) && (
            <div className="mt-auto w-full border-t border-custom-700 space-y-4 px-2 py-4">
              {hasSettingsButton && (
                <SettingsButton onClick={() => component.onChange('setting')} />
              )}
              {hasLogoutButton && <LogoutButton />}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
