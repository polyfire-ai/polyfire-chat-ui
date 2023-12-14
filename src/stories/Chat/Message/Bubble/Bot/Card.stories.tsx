import { Meta, StoryFn } from '@storybook/react';

import { BubbleBotReplyComponent } from '../../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/Bot/Card',
  component: BubbleBotReplyComponent,
  argTypes: {},
} as Meta<typeof BubbleBotReplyComponent>;

export const Card: StoryFn<typeof BubbleBotReplyComponent> = ({
  content,
}: {
  content: string;
}) => <BubbleBotReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
