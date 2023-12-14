import { Meta, StoryFn } from '@storybook/react';

import { MinimalHistoryLoadingComponent } from '../../../../components/Chat/Minimal';

export default {
  title: 'Chat/Message/Minimal/SkeletonGroup',
  component: MinimalHistoryLoadingComponent,
  argTypes: {},
} as Meta<typeof MinimalHistoryLoadingComponent>;

export const SkeletonGroup: StoryFn<
  typeof MinimalHistoryLoadingComponent
> = () => <MinimalHistoryLoadingComponent />;
