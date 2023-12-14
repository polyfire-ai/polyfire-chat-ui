import { Meta, StoryFn } from '@storybook/react';

import { MinimalBotMessageSkeleton } from '../../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/Bot/Skeleton',
  component: MinimalBotMessageSkeleton,
  argTypes: {},
} as Meta<typeof MinimalBotMessageSkeleton>;

export const Skeleton: StoryFn<typeof MinimalBotMessageSkeleton> = () => (
  <MinimalBotMessageSkeleton />
);
