import { Meta, StoryFn } from '@storybook/react';

import { BubbleBotMessageSkeleton } from '../../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/Bot/Skeleton',
  component: BubbleBotMessageSkeleton,
  argTypes: {},
} as Meta<typeof BubbleBotMessageSkeleton>;

export const Skeleton: StoryFn<typeof BubbleBotMessageSkeleton> = () => (
  <BubbleBotMessageSkeleton />
);
