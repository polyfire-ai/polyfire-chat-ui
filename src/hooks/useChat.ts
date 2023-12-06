/* eslint-disable camelcase */

import { useState, useEffect, useCallback } from 'react';

import { generateUUIDV4 } from 'polyfire-js/helpers/uuid.js';

import type { Chat as ChatType, ChatOptions } from 'polyfire-js/chats';
import { usePolyfire } from 'polyfire-js/hooks/index.js';

export type Message = {
  chat_id: string;
  content: string;
  created_at: string | null;
  id: string | null;
  is_user_message: boolean;
};

export type ChatInfos = {
  created_at: string;
  id: string;
  latest_message_content: string;
  latest_message_created_at: string;
  name: string | null;
  system_prompt: string | null;
  system_prompt_id: string | null;
  user_id: string;
};

const getChatList = async (
  getToken: () => Promise<string>
): Promise<ChatInfos[]> => {
  const token = await getToken();

  return fetch(`https://api.polyfire.com/chats`, {
    method: 'GET',
    headers: {
      'X-Access-Token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res && res instanceof Array) return res.reverse();
      return [];
    })
    .catch((err) => err);
};

const deleteChat = async (
  chatId: string,
  getToken: () => Promise<string>
): Promise<boolean> => {
  const token = await getToken();

  return fetch(`https://api.polyfire.com/chat/${chatId}`, {
    method: 'DELETE',
    headers: {
      'X-Access-Token': token,
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

const renameChat = async (
  chatId: string,
  name: string,
  getToken: () => Promise<string>
): Promise<boolean> => {
  const token = await getToken();

  return fetch(`https://api.polyfire.com/chat/${chatId}`, {
    method: 'PUT',
    headers: {
      'X-Access-Token': token,
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

type ChatBase<T> = {
  data: T | undefined;
  error: string | undefined;
  loading: boolean;
};

export type Chats = ChatBase<ChatInfos[]>;
export type ChatHistory = ChatBase<Message[]>;
export type ChatAnswer = ChatBase<Message>;

export type ChatUtils = {
  onDeleteChat: (chatId: string) => Promise<void>;
  onRenameChat: (chatId: string, name: string) => Promise<void>;
  onResetChat: () => void;
  onSelectChat: (chatId: string) => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
};

export type ChatInstance = {
  answer: ChatAnswer;
  chat: ChatInfos | undefined;
  chats: Chats;
  history: ChatHistory;
  utils: ChatUtils;
};

export default function useChat(
  options?: Omit<ChatOptions, 'chatId'>,
  onError?: (error: string) => void,
  onSuccess?: () => void
): ChatInstance {
  const {
    auth: {
      status,
      user: { getToken },
    },
    utils: { Chat },
  } = usePolyfire();

  const [chatInstance, setChatInstance] = useState<ChatType>();
  const [chatId, setChatId] = useState<string>();
  // Chats list
  const [chatsData, setChatsData] = useState<ChatInfos[]>([]);
  const [chatsLoading, setChatsLoading] = useState<boolean>(false);
  const [chatsError, setChatsError] = useState<string | undefined>();

  // Chat
  const [chatData, setChatData] = useState<ChatInfos>();

  // Chat history
  const [history, setHistory] = useState<Message[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyError, setHistoryError] = useState<string | undefined>();

  // Chat answer
  const [answer, setAnswer] = useState<Message>();
  const [AnswerError, setAnswerError] = useState<string | undefined>();
  const [AnswerLoading, setAnswerLoading] = useState<boolean>(false);

  const getChats = useCallback(async () => {
    setChatsLoading(true);
    getChatList(getToken)
      .then(setChatsData)
      .catch(setChatsError)
      .finally(() => {
        setChatsLoading(false);
      });
  }, []);

  const resetStates = useCallback(() => {
    setHistory([]);
    setHistoryError(undefined);
    setAnswer(undefined);
    setAnswerError(undefined);
    setChatInstance(undefined);
    setChatData(undefined);
    setChatId(undefined);
  }, []);

  const retrieveChat = useCallback(async (id: string) => {
    setHistoryLoading(true);
    const prevchatInstance = new Chat({
      ...options,
      chatId: id,
    } as ChatOptions);

    setChatInstance(chatInstance);
    setChatId(id);

    prevchatInstance
      .getMessages()
      .then(setHistory)
      .catch(setHistoryError)
      .finally(() => {
        setHistoryLoading(false);
      });
  }, []);

  const onSelectChat = useCallback(
    async (id: string) => {
      if (chatId === id) return;

      const chat = chatsData.find((c) => c.id === id);

      if (!chat) return;

      setChatData(chatsData.find((c) => c.id === id));
      retrieveChat(id);
    },
    [chatsData, chatId]
  );

  const onCreateChat = useCallback(
    async (message: string) =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise<ChatType>(async (resolve) => {
        const newChatInstance = new Chat(options as ChatOptions);
        setChatInstance(newChatInstance);

        const newChatId = await newChatInstance.chatId;
        setChatId(newChatId);

        const newChatInfos = {
          id: newChatId,
          name: message,
          system_prompt: newChatInstance?.options?.systemPrompt || null,
          system_prompt_id: newChatInstance?.options?.systemPromptId || null,
          created_at: new Date().toISOString(),
          user_id: '',
          latest_message_content: message,
          latest_message_created_at: new Date().toISOString(),
        };

        setChatsData((prev) => [newChatInfos, ...prev]);

        await onSelectChat(newChatId);

        setHistory([]);
        setHistoryError(undefined);

        setAnswer(undefined);
        setAnswerError(undefined);

        resolve(newChatInstance);
      }),
    []
  );

  const onRenameChat = useCallback(
    async (id: string, name: string): Promise<void> => {
      const chat = chatsData.find((c) => c.id === id);

      if (!chat) return;

      renameChat(id, name, getToken).then(() => {
        chat.name = name;
        setChatsData(chatsData);
      });
    },
    [chatsData]
  );

  const onDeleteChat = useCallback(
    async (id: string): Promise<void> =>
      deleteChat(id, getToken).then(() => {
        if (chatId === id) {
          setChatId(undefined);
          setHistory([]);
          setChatInstance(undefined);
        }
        setChatsData(chatsData.filter((chat) => chat.id !== id));
      }),
    [chatsData, chatId]
  );

  const onSendMessage = useCallback(
    async (message: string): Promise<void> => {
      try {
        console.log({ chatInstance, AnswerLoading });
        if (AnswerLoading) return;

        setAnswerLoading(true);
        setAnswerError(undefined);

        let newChatInstance = chatInstance;
        if (!chatInstance) {
          newChatInstance = await onCreateChat(message);
        }

        if (!newChatInstance) {
          throw new Error(
            'sendMessage: You need to be authenticated to use this function'
          );
        }

        const userMessage: Message = {
          id: generateUUIDV4(),
          chat_id: await newChatInstance.chatId,
          is_user_message: true,
          content: message,
          created_at: new Date().getTime().toString(),
        };
        const aiMessage: Message = {
          id: generateUUIDV4(),
          chat_id: await newChatInstance.chatId,
          is_user_message: false,
          content: '',
          created_at: null,
        };

        setHistory((prev) => [userMessage, ...prev]);

        const stream = newChatInstance.sendMessage(message);

        stream.on('data', (chunk: string) => {
          aiMessage.content += chunk;
          setAnswer({ ...aiMessage });
          setAnswerLoading(false);
          console.log('in data');
        });

        stream.on('error', (error: string) => {
          console.error({ error3: error });
          setAnswerError(error);
          onError?.(error);
          stream.stop();
        });

        stream.on('end', async () => {
          setAnswer(undefined);
          aiMessage.created_at = new Date().getTime().toString();
          setHistory((prev) => [aiMessage, ...prev]);
          onSuccess?.();
          console.log('in end');
        });
      } catch (error) {
        console.error({ error2: error });
        if (error instanceof Error) {
          setAnswerError(error.message);
          onError?.(error.message);
        }
      }
    },
    [chatInstance, AnswerLoading]
  );

  useEffect(() => {
    if (status === 'authenticated') getChats();
  }, [status]);

  const onResetChat = useCallback(() => {
    resetStates();
  }, []);

  return {
    chats: {
      loading: chatsLoading,
      error: chatsError,
      data: chatsData,
    },
    chat: chatData,
    history: {
      loading: historyLoading,
      error: historyError,
      data: history,
    },
    answer: {
      loading: AnswerLoading,
      error: AnswerError,
      data: answer,
    },
    utils: {
      onSendMessage,
      onDeleteChat,
      onSelectChat,
      onRenameChat,
      onResetChat,
    },
  };
}
