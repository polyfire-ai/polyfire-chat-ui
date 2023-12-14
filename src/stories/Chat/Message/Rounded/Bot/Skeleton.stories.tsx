import { Meta, StoryFn } from '@storybook/react';

import { RoundedBotMessageSkeleton } from '../../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/Bot/Skeleton',
  component: RoundedBotMessageSkeleton,
  argTypes: {},
} as Meta<typeof RoundedBotMessageSkeleton>;

export const Skeleton: StoryFn<typeof RoundedBotMessageSkeleton> = () => (
  <RoundedBotMessageSkeleton />
);
