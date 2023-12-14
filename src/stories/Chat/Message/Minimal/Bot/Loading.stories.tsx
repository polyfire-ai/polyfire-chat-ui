import { Meta, StoryFn } from '@storybook/react';

import { MinimalBotLoadingCard } from '../../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/Bot/Loading',
  component: MinimalBotLoadingCard,
  argTypes: {},
} as Meta<typeof MinimalBotLoadingCard>;

export const Loading: StoryFn<typeof MinimalBotLoadingCard> = () => (
  <MinimalBotLoadingCard />
);
