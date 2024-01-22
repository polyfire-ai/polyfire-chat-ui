import { Root, View } from './components/Root';

import {
  BubbleHistoryLoadingComponent,
  BubbleChatListItem,
} from './components/Chat/Bubble';
import {
  MinimalHistoryLoadingComponent,
  MinimalChatListItem,
} from './components/Chat/Minimal';

import {
  RoundedHistoryLoadingComponent,
  RoundedChatListItem,
} from './components/Chat/Rounded';

import { HistoryEmptyComponent } from './components/Chat/Empty';
import { History, HistoryProps } from './components/Chat/History';

import { CopyButton, CopyButtonProps } from './components/Buttons/CopyButton';
import { SendButton, SendButtonProps } from './components/Buttons/SendButton';
import {
  ScrollToBottomButton,
  ScrollToBottomButtonProps,
} from './components/Buttons/ScrollToBottomButton';

import { Prompt, Input } from './components/Inputs/Prompt';

import {
  AudioRecorderButton,
  AudioRecorderButtonProps,
} from './components/Buttons/AudioRecorderButton';

import {
  LogoutButton,
  LogoutButtonProps,
} from './components/Sidebar/Button/LogoutButton';

import {
  NewChatButton,
  NewChatButtonProps,
} from './components/Sidebar/Button/NewChatButton';

import {
  SidebarButton,
  SidebarButtonProps,
} from './components/Sidebar/Button/SidebarButton';

import { SidebarButtonGroup } from './components/Sidebar/Button/SidebarButtonGroup';

import { ChatList } from './components/Sidebar/ChatList/ChatList';
import {
  ChatItem,
  SkeletonChatItem,
  ChatItemProps,
} from './components/Sidebar/ChatList/ChatListItem';

import { Sidebar, SidebarProps } from './components/Sidebar/Container';

import { SidebarHeader, SidebarHeaderProps } from './components/Sidebar/Header';

import { useChatContext } from './contexts/ChatProvider';

export { useChatContext };

export type * from './types';

export type {
  HistoryProps,
  CopyButtonProps,
  SendButtonProps,
  ScrollToBottomButtonProps,
  LogoutButtonProps,
  NewChatButtonProps,
  SidebarButtonProps,
  ChatItemProps,
  SidebarProps,
  SidebarHeaderProps,
  AudioRecorderButtonProps,
};

export default {
  Root,
  View,
  BubbleHistoryLoadingComponent,
  BubbleChatListItem,
  MinimalHistoryLoadingComponent,
  MinimalChatListItem,
  RoundedHistoryLoadingComponent,
  RoundedChatListItem,
  HistoryEmptyComponent,
  History,
  CopyButton,
  SendButton,
  ScrollToBottomButton,
  Prompt,
  Input,
  LogoutButton,
  NewChatButton,
  SidebarButton,
  SidebarButtonGroup,
  AudioRecorderButton,
  ChatList,
  ChatItem,
  SkeletonChatItem,
  Sidebar,
  SidebarHeader,
};
