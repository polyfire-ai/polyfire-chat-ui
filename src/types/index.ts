import React, { ReactNode } from 'react';
import type { ChatInstance, Message } from 'polyfire-js/hooks/useChat.js';

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

export type ChatWithProps = {
  [key: string]: any;
  chatInstance?: ChatContextValue;
  content?: string;
};

export type CustomComponentProps = (props: ChatWithProps) => React.ReactNode;

type ConversationRef = React.HTMLAttributes<HTMLDivElement>;

type ChatComponents = {
  BotLoading: CustomComponentProps;
  BotReply: CustomComponentProps;
  ChatWelcomeScreen: CustomComponentProps;
  HistoryLoading: CustomComponentProps;
  Prompt: CustomComponentProps;
  UserReply: CustomComponentProps;
};

export interface ConversationProps
  extends ConversationRef,
    Omit<ChatComponents, 'Prompt'> {
  answer: ChatInstance['answer'];
  chatInstance: ChatContextValue;
  containerStyle?: React.CSSProperties;
  conversation: Message[];
  loading: boolean;
}

export interface PromptProps {
  inputClass?: string;
  inputPlaceholder?: string;
  inputStyle?: InputStyle;
  suggestions?: Suggestion[];
}

export type ChatProps = Partial<ChatComponents> & {
  chatInstance: ChatContextValue;
  suggestions?: Suggestion[];
};

export type ChatContextValue = ChatInstance & {
  chat: ChatInstance['chat'] & {
    isAtBottom: boolean;
    ref: React.RefObject<HTMLDivElement>;
  };
  component: {
    onChange: (component: ChatMode) => void;
    selected: ChatMode;
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

// Chat UI Types
export type ChatUIProps = {
  LogoComponent?: ReactNode;
  SettingsComponent?: CustomComponentProps;
  SidebarComponent?: CustomComponentProps;
  baseChatColor?: string;
  chatName?: string | ReactNode;
  includeSidebar?: boolean;
  showLogoutButton?: boolean;
  showNewChatButton?: boolean;
} & Omit<ChatProps, 'chatInstance'>;
