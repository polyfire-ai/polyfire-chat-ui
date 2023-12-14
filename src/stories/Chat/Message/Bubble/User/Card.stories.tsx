import { Meta, StoryFn } from '@storybook/react';

import { BubbleUserReplyComponent } from '../../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/User/Card',
  component: BubbleUserReplyComponent,
  argTypes: {},
} as Meta<typeof BubbleUserReplyComponent>;

export const Card: StoryFn<typeof BubbleUserReplyComponent> = ({
  content,
}: {
  content: string;
}) => <BubbleUserReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
