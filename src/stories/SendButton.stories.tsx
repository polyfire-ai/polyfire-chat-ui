import { Meta, StoryFn } from '@storybook/react';

import SendButton from '../components/Buttons/SendButton';

export default {
  title: 'Buttons/Icon/Send',
  component: SendButton,
  argTypes: {},
} as Meta<typeof SendButton>;

const Template: StoryFn<typeof SendButton> = (props) => (
  <SendButton {...props} />
);

export const Send = Template.bind({});

Send.args = {};
