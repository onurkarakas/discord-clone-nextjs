'use client';

import { ChannelFilters, ChannelOptions, ChannelSort, User } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  Thread,
  LoadingIndicator,
  ChannelList,
} from 'stream-chat-react';

import { useClient } from '../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';

const userId = '7cd445eb-9af2-4505-80a9-aa8543c3343f';
const userName = 'Harry Potter';

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
};

const apiKey = '7cu55d72xtjs';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2NkNDQ1ZWItOWFmMi00NTA1LTgwYTktYWE4NTQzYzMzNDNmIn0.TtrCA5VoRB2KofI3O6lYjYZd2pHdQT408u7ryeWO4Qg';

const sort: ChannelSort = { last_message_at: -1 };
const filters: ChannelFilters = {
  type: 'messaging',
  members: { $in: [userId] },
};
const options: ChannelOptions = {
  limit: 10,
};

export default function Home() {
  const chatClient = useClient({
    apiKey,
    user,
    tokenOrProvider: userToken,
  });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='str-chat__theme-light'>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}