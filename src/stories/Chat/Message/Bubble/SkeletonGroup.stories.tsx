import { Meta, StoryFn } from '@storybook/react';

import { BubbleHistoryLoadingComponent } from '../../../../components/Chat/Bubble';

export default {
  title: 'Chat/Message/Bubble/SkeletonGroup',
  component: BubbleHistoryLoadingComponent,
  argTypes: {},
} as Meta<typeof BubbleHistoryLoadingComponent>;

export const SkeletonGroup: StoryFn<
  typeof BubbleHistoryLoadingComponent
> = () => <BubbleHistoryLoadingComponent />;
