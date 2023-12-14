import { Meta, StoryFn } from '@storybook/react';

import CopyButton, { CopyButtonProps } from '../components/Buttons/CopyButton';

export default {
  title: 'Buttons/Icon/Copy',
  component: CopyButton,
  argTypes: {},
} as Meta<typeof CopyButton>;

const Template: StoryFn<typeof CopyButton> = ({
  textToCopy,
  ...props
}: CopyButtonProps) => <CopyButton textToCopy={textToCopy} {...props} />;

export const Copy = Template.bind({});

Copy.args = {
  textToCopy: 'Example Content to Copy',
  className: 'hover:text-red-600',
  style: {},
};
