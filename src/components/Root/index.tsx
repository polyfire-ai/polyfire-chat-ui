import React, { ReactNode, useEffect } from 'react';
import { ChatOptions } from 'polyfire-js/chats';
import { ChatProvider } from '../../contexts/ChatProvider';
import { ChatUIProps, CustomChatColor } from '../../types';
import { generateColorVariations } from '../../utils/color';
import { AuthGuard } from './AuthGuard';

export const Root: React.FC<ChatUIProps> = ({
  children,
  UnauthenticatedViewComponent,
  baseChatColor,
  options,
  fullscreen = false,
  ...props
}) => {
  const link = document.createElement('link');
  link.href = './styles.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  useEffect(() => {
    if (!baseChatColor) return;

    const colorVariations =
      typeof baseChatColor === 'string'
        ? (generateColorVariations(baseChatColor) as CustomChatColor)
        : baseChatColor;

    Object.entries(colorVariations).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--color-custom-${key}`,
        value
      );
    });
  }, []);

  const display = fullscreen ? 'screen' : 'full';
  return (
    <ChatProvider options={options as ChatOptions}>
      <AuthGuard UnauthenticatedViewComponent={UnauthenticatedViewComponent}>
        <div
          className={`flex flex-row h-${display} w-${display} overflow-y-hidden`}
          {...props}
        >
          {children}
        </div>
      </AuthGuard>
    </ChatProvider>
  );
};

export type ViewProps = {
  children: ReactNode;
};

export const View: React.FC<ViewProps> = ({ children, ...props }) => (
  <div className="relative flex flex-col flex-grow" {...props}>
    {children}
  </div>
);
