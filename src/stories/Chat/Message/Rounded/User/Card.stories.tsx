import { Meta, StoryFn } from '@storybook/react';

import { RoundedUserReplyComponent } from '../../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/User/Card',
  component: RoundedUserReplyComponent,
  argTypes: {},
} as Meta<typeof RoundedUserReplyComponent>;

export const Card: StoryFn<typeof RoundedUserReplyComponent> = ({
  content,
}: {
  content: string;
}) => <RoundedUserReplyComponent content={content} />;

Card.args = {
  content: 'Example Content',
};
