import { Meta, StoryFn } from '@storybook/react';

import IconButton, { IconButtonProps } from '../components/Button/IconButton';

export default {
  title: 'Buttons',
  component: IconButton,
  argTypes: {},
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = ({
  icon,
  label,
  ...props
}: IconButtonProps) => <IconButton icon={icon} label={label} {...props} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Default Button',
  icon: <span>🔍</span>,
};
