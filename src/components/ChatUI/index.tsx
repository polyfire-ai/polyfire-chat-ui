import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import Chat from '../Chat';
import { ChatProvider, useChatContext } from '../../contexts/ChatProvider';

export type MessageTheme = 'classic' | 'bubble';

export type ChatUIProps = {
  LogoRender?: ReactNode;
  SettingRender?: ReactNode;
  chatName?: string | ReactNode;
  hasLogoutButton?: boolean;
  hasNewChatButton?: boolean;
  hasSidebar?: boolean;
  messageTheme?: MessageTheme;
};

const ChatUI: React.FC<ChatUIProps> = ({
  SettingRender,
  LogoRender,
  hasLogoutButton = true,
  hasNewChatButton = true,
  hasSidebar = false,
  chatName,
  messageTheme = 'classic',
}) => {
  const { component } = useChatContext();

  return (
    <div className="flex">
      {hasSidebar && (
        <Sidebar
          hasSettingsButton={Boolean(SettingRender)}
          hasLogoutButton={hasLogoutButton}
          hasNewChatButton={hasNewChatButton}
          Logo={LogoRender}
          name={chatName}
        />
      )}
      <div className="flex h-[100svh] w-full flex-col">
        {component.selected === 'chat' && <Chat theme={messageTheme} />}
        {SettingRender && component.selected === 'setting' && (
          <div>{SettingRender}</div>
        )}
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
