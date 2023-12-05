import React, { ButtonHTMLAttributes } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import NewChatButton from '../components/Button/NewChatButton';

export default {
  title: 'NewChatButton',
  component: NewChatButton,
  argTypes: {},
} as Meta<typeof NewChatButton>;

const Template: StoryFn<typeof NewChatButton> = (
  args: ButtonHTMLAttributes<HTMLButtonElement>
) => <NewChatButton {...args} />;

export const Default = Template.bind({});
