import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ChatInstance, Message } from 'polyfire-js/hooks/useChat';

import Conversation from '../../../../components/Chat/Conversation';
import {
  BubbleBotLoadingComponent,
  BubbleBotReplyComponent,
  BubbleUserReplyComponent,
  BubbleHistoryLoadingComponent,
} from '../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Conversation',
  component: Conversation,
  argTypes: {},
} as Meta<typeof Conversation>;

// Mock conversation data
const mockConversation: Message[] = [
  {
    id: '1',
    content: 'Hello',
    is_user_message: true,
    chat_id: '1',
    created_at: '2021-08-10T00:00:00.000Z',
  },
  {
    id: '2',
    content: 'How can I help you?',
    is_user_message: false,
    chat_id: '1',
    created_at: '2021-08-10T00:00:00.000Z',
  },
  {
    id: '3',
    content: 'Test.',
    is_user_message: true,
    chat_id: '1',
    created_at: '2021-08-10T00:00:00.000Z',
  },
  // Add more mock messages as needed
];

// Mock answer data
const mockAnswer: ChatInstance['answer'] = {
  loading: false,
  error: undefined,
  data: {
    content: 'Test answer.',
    id: '3',
    is_user_message: false,
    chat_id: '1',
    created_at: '2021-08-10T00:00:00.000Z',
  },
};

export const DefaultConversation: StoryFn<typeof Conversation> = () => (
  <Conversation
    conversation={mockConversation}
    className="flex-1 overflow-y-auto text-sm leading-6 shadow-md bg-custom-800 text-custom-200 sm:text-base sm:leading-7"
    loading={false}
    answer={mockAnswer}
    BotReplyComponent={BubbleBotReplyComponent}
    UserReplyComponent={BubbleUserReplyComponent}
    HistoryLoadingComponent={BubbleHistoryLoadingComponent}
    BotLoadingComponent={BubbleBotLoadingComponent}
  />
);
