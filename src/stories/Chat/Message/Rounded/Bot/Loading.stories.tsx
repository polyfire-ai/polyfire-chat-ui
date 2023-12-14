import { Meta, StoryFn } from '@storybook/react';

import { RoundedBotLoadingCard } from '../../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/Bot/Loading',
  component: RoundedBotLoadingCard,
  argTypes: {},
} as Meta<typeof RoundedBotLoadingCard>;

export const Loading: StoryFn<typeof RoundedBotLoadingCard> = () => (
  <RoundedBotLoadingCard />
);
