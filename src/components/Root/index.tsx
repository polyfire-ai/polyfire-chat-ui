import React, { ReactNode, useEffect } from 'react';
import { ChatOptions } from 'polyfire-js/chats';
import { ChatProvider } from '../../contexts/ChatProvider';
import { ChatUIProps, CustomChatColor } from '../../types';
import { generateColorVariations } from '../../utils/color';
import { AuthGuard } from './AuthGuard';

const darkTheme: CustomChatColor = {
  50: '#f8fafc',
  100: '#f1f5f9',
  300: '#d1d5db',
  400: '#9ca3af',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};

const lightTheme: CustomChatColor = {
  50: '#111827',
  100: '#1f2937',
  300: '#374151',
  400: '#4b5563',
  600: '#9ca3af',
  700: '#d1d5db',
  800: '#f1f5f9',
  900: '#f8fafc',
};

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (theme: CustomChatColor) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-custom-${key}`, value);
  });
};

export const Root: React.FC<ChatUIProps> = ({
  children,
  UnauthenticatedViewComponent,
  baseChatColor,
  options,
  fullscreen = false,
  onSuccess,
  onError,
  ...props
}) => {
  useEffect(() => {
    let theme;
    try {
      if (typeof baseChatColor === 'string') {
        switch (baseChatColor) {
          case 'dark':
            theme = darkTheme;
            break;
          case 'light':
            theme = lightTheme;
            break;
          case 'auto':
            theme = isDarkMode() ? darkTheme : lightTheme;
            break;
          default:
            theme = generateColorVariations(baseChatColor);
            break;
        }
      } else if (typeof baseChatColor === 'object') {
        theme = baseChatColor;
      } else {
        theme = darkTheme;
      }

      applyTheme(theme);
    } catch (error) {
      applyTheme(darkTheme);
    }
  }, [baseChatColor]);

  const display = fullscreen ? 'screen' : 'full';
  return (
    <ChatProvider
      options={options as ChatOptions}
      onError={onError}
      onSuccess={onSuccess}
    >
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
} & React.HTMLAttributes<HTMLDivElement>;

export const View: React.FC<ViewProps> = ({ children, ...props }) => (
  <div className="relative flex flex-col flex-grow" {...props}>
    {children}
  </div>
);
