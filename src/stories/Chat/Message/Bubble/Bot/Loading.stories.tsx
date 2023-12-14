import { Meta, StoryFn } from '@storybook/react';

import { BubbleBotLoadingComponent } from '../../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/Bot/Loading',
  component: BubbleBotLoadingComponent,
  argTypes: {},
} as Meta<typeof BubbleBotLoadingComponent>;

export const Loading: StoryFn<typeof BubbleBotLoadingComponent> = () => (
  <BubbleBotLoadingComponent />
);
