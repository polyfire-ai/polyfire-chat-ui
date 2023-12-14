import { Meta, StoryFn } from '@storybook/react';

import { MinimalBotReplyComponent } from '../../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/Bot/Card',
  component: MinimalBotReplyComponent,
  argTypes: {},
} as Meta<typeof MinimalBotReplyComponent>;

export const Card: StoryFn<typeof MinimalBotReplyComponent> = ({
  content,
}: {
  content: string;
}) => <MinimalBotReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
