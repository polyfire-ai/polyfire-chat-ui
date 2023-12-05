import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import Chat from '../Chat/Minimal';
import { ChatProvider, useChatContext } from '../../contexts/ChatProvider';

export type ChatUIProps = {
  LogoRender?: ReactNode;
  SettingRender?: ReactNode;
  chatName?: string | ReactNode;
  hasLogoutButton?: boolean;
  hasNewChatButton?: boolean;
};

const ChatUI: React.FC<ChatUIProps> = ({
  SettingRender,
  LogoRender,
  hasLogoutButton = true,
  hasNewChatButton = true,
  chatName,
}) => {
  const { component } = useChatContext();

  return (
    <div className="flex">
      <Sidebar
        hasSettingsButton={Boolean(SettingRender)}
        hasLogoutButton={hasLogoutButton}
        hasNewChatButton={hasNewChatButton}
        Logo={LogoRender}
        name={chatName}
      />
      <div className="flex h-[100svh] w-full flex-col">
        {component.selected === 'chat' && <Chat />}
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
