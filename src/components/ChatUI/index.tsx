import React, { useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import Chat from '../Chat';
import { ChatProvider, useChatContext } from '../../contexts/ChatProvider';
import { ChatUIProps } from '../../types';
import { generateColorVariations } from '../../utils/color';

const ChatUI: React.FC<ChatUIProps> = ({
  LogoComponent,
  SettingsComponent,
  SidebarComponent = Sidebar,
  includeSidebar = false,
  chatName,
  showLogoutButton = true,
  showNewChatButton = true,
  baseChatColor,
  ...chatProps
}) => {
  const chatInstance = useChatContext();

  useEffect(() => {
    if (baseChatColor) {
      const colorVariations = generateColorVariations(baseChatColor);

      Object.entries(colorVariations).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, []);

  const renderSidebar = () => {
    if (includeSidebar) {
      return SidebarComponent({
        chatInstance,
        hasSettingsButton: Boolean(SettingsComponent),
        hasLogoutButton: showLogoutButton,
        hasNewChatButton: showNewChatButton,
        Logo: LogoComponent,
        name: chatName,
      });
    }
    return null;
  };

  const renderChat = () => {
    if (chatInstance.component.selected === 'chat') {
      return <Chat {...chatProps} chatInstance={chatInstance} />;
    }
    return null;
  };

  const renderSettings = () => {
    if (SettingsComponent && chatInstance.component.selected === 'setting') {
      return SettingsComponent({ chatInstance });
    }
    return null;
  };

  return (
    <div className="flex">
      {renderSidebar()}
      <div className="flex h-[100svh] w-full flex-col">
        {renderChat()}
        {renderSettings()}
      </div>
    </div>
  );
};
const ChatUIWrapper: React.FC<ChatUIProps> = (props) => (
  <ChatProvider>
    <ChatUI {...props} />
  </ChatProvider>
);

export default ChatUIWrapper;
