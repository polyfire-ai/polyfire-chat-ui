import { Meta, StoryFn } from '@storybook/react';

import { RoundedUserMessageSkeleton } from '../../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/User/Skeleton',
  component: RoundedUserMessageSkeleton,
  argTypes: {},
} as Meta<typeof RoundedUserMessageSkeleton>;

export const Skeleton: StoryFn<typeof RoundedUserMessageSkeleton> = () => (
  <RoundedUserMessageSkeleton />
);
