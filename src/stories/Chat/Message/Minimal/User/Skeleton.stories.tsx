import { Meta, StoryFn } from '@storybook/react';

import { MinimalUserMessageSkeleton } from '../../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/User/Skeleton',
  component: MinimalUserMessageSkeleton,
  argTypes: {},
} as Meta<typeof MinimalUserMessageSkeleton>;

export const Skeleton: StoryFn<typeof MinimalUserMessageSkeleton> = () => (
  <MinimalUserMessageSkeleton />
);
