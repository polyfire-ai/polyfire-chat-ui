import { Meta, StoryFn } from '@storybook/react';

import { RoundedHistoryLoadingComponent } from '../../../../components/Chat/Rounded';

export default {
  title: 'Chat/Message/Rounded/SkeletonGroup',
  component: RoundedHistoryLoadingComponent,
  argTypes: {},
} as Meta<typeof RoundedHistoryLoadingComponent>;

export const SkeletonGroup: StoryFn<
  typeof RoundedHistoryLoadingComponent
> = () => <RoundedHistoryLoadingComponent />;
