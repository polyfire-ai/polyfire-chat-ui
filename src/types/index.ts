import React, { ReactNode } from 'react';
import type { ChatInstance } from 'polyfire-js/hooks/useChat.js';
import { ChatOptions } from 'polyfire-js/chats';
import {
  Login,
  Provider,
} from '../components/Root/AuthGuard/UnauthenticatedView';

// General UI Types
export type ScrollBehavior = 'auto' | 'instant' | 'smooth';

export type WithRequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Input and Textarea Types
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputStyle = Omit<
  NonNullable<TextareaProps['style']>,
  'maxHeight' | 'minHeight'
> & {
  height?: number;
};

// Chat Component Specific Types
export type ChatMode = 'chat' | 'setting';

export interface PromptProps {
  inputClass?: string;
  inputPlaceholder?: string;
  inputStyle?: InputStyle;
  suggestions?: Suggestion[];
}

export type ChatContextValue = ChatInstance & {
  chat: ChatInstance['chat'] & {
    isAtBottom: boolean;
    ref: React.RefObject<HTMLDivElement>;
  };
  component: {
    onChange: (component: ChatMode) => void;
    selected: ChatMode;
  };
  prompt: {
    onChange: (value: string) => void;
    value: string;
  };
  utils: ChatInstance['utils'] & {
    onScrollToBottom: (behavior: ScrollBehavior) => void;
  };
};

export type Suggestion = {
  prompt: string;
  title: string;
};

// Chat Action Types
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type ActionDisplayOptions = {
  icon: ReactNode;
  label: string;
};

export type MessageAction = {
  for: 'user' | 'bot' | undefined;
  onClick: (messageId: string) => void;
} & AtLeastOneOf<ActionDisplayOptions>;

export type CustomChatColor = {
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  50?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
};

// Chat UI Types
export type ChatUIProps = {
  UnauthenticatedViewComponent?: React.ComponentType<{
    login: Login;
    providers?: Provider[];
  }>;
  baseChatColor?: string | CustomChatColor;
  children?: ReactNode;
  options?: Omit<ChatOptions, 'chatId'>;
};
