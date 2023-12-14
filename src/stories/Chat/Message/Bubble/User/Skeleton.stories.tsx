import { Meta, StoryFn } from '@storybook/react';

import { BubbleUserMessageSkeleton } from '../../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/User/Skeleton',
  component: BubbleUserMessageSkeleton,
  argTypes: {},
} as Meta<typeof BubbleUserMessageSkeleton>;

export const Skeleton: StoryFn<typeof BubbleUserMessageSkeleton> = () => (
  <BubbleUserMessageSkeleton />
);
