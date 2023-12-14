import { Meta, StoryFn } from '@storybook/react';

import { MinimalUserReplyComponent } from '../../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/User/Card',
  component: MinimalUserReplyComponent,
  argTypes: {},
} as Meta<typeof MinimalUserReplyComponent>;

export const Card: StoryFn<typeof MinimalUserReplyComponent> = ({
  content,
}: {
  content: string;
}) => <MinimalUserReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
