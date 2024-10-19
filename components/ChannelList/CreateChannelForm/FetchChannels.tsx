import { useChatContext } from "stream-chat-react";
import { useEffect, useState } from "react";
import { Channel, StreamChat } from "stream-chat"; // Correct import for Channel

export default function ChannelList() {
  const { client } = useChatContext(); // Get the Stream chat client

  // Define the state with the correct type for channels (using the default generics)
  const [channels, setChannels] = useState<Channel[]>([]);

  // Function to fetch the latest channel list
  const fetchChannels = async () => {
    try {
      // Query the channels using the Stream client
      const channels = await client.queryChannels({});
      setChannels(channels); // Set channels in the state
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  useEffect(() => {
    fetchChannels(); // Fetch channels when component mounts
  }, []);

  // Call this after creating/deleting a channel to refresh the channel list
  const refreshChannelList = () => {
    fetchChannels(); // Re-fetch the channels
  };

  return (
    <div>
      <button onClick={refreshChannelList}>Refresh Channel List</button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.data?.name}</li> // Channel names are stored in `channel.data.name`
        ))}
      </ul>
    </div>
  );
}
