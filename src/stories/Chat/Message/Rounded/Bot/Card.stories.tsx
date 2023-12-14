import { Meta, StoryFn } from '@storybook/react';

import { RoundedBotReplyComponent } from '../../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/Bot/Card',
  component: RoundedBotReplyComponent,
  argTypes: {},
} as Meta<typeof RoundedBotReplyComponent>;

export const Card: StoryFn<typeof RoundedBotReplyComponent> = ({
  content,
}: {
  content: string;
}) => <RoundedBotReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
