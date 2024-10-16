import Image from "next/image";
import { useState } from "react";
import { Gear, LeaveServer, Mic, Speaker } from "../Icons";
import { useChatContext } from "stream-chat-react";
import { useClerk } from "@clerk/nextjs";
import ChannelListMenuRow from "../TopBar/ChannelListMenuRow";
import { useStreamVideoClient } from "@stream-io/video-react-sdk"; // Importing the hook for accessing video client

export default function ChannelListBottomBar({
  videoClient,
}: {
  videoClient: any;
}): JSX.Element {
  // Accept videoClient as a prop
  const { client } = useChatContext();
  const [micActive, setMicActive] = useState(true); // Set to true initially if you want the mic active by default
  const [audioActive, setAudioActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const { signOut } = useClerk();

  const toggleMic = () => {
    if (videoClient) {
      if (micActive) {
        videoClient?.localParticipant?.microphone.disable(); // Disable the microphone
      } else {
        videoClient?.localParticipant?.microphone.enable(); // Enable the microphone
      }
      setMicActive(!micActive); // Toggle state
    }
  };

  const toggleAudio = () => {
    if (videoClient) {
      if (audioActive) {
        videoClient?.localParticipant?.audio.disable(); // Disable audio
      } else {
        videoClient?.localParticipant?.audio.enable(); // Enable audio
      }
      setAudioActive(!audioActive); // Toggle state
    }
  };

  return (
    <div className="mt-auto p-2 bg-light-gray w-full flex items-center space-x-3 relative">
      <button
        className="flex flex-1 items-center space-x-2 p-1 pr-2 rounded-md hover:bg-hover-gray"
        onClick={() => setMenuOpen((currentValue) => !currentValue)}
      >
        {client.user?.image && (
          <div
            className={`relative ${client.user?.online ? "online-icon" : ""}`}
          >
            <Image
              src={client.user?.image ?? "https://thispersondoesnotexist.com/"}
              alt="User image"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        )}
        <p className="flex flex-col items-start space-y-1">
          <span className="block max-w-24 text-gray-700 text-sm font-medium -mb-1.5 tracking-tight text-ellipsis overflow-x-clip">
            {client.user?.name}
          </span>
          <span className="text-xs text-gray-500 inline-block">
            {client.user?.online ? "Online" : "Offline"}
          </span>
        </p>
      </button>
      <button
        className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
          !micActive ? "inactive-icon text-red-400" : "text-gray-700"
        }`}
        onClick={toggleMic} // Call toggleMic on click
      >
        <Mic />
      </button>
      <button
        className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
          !audioActive ? "inactive-icon text-red-400" : "text-gray-700"
        }`}
        onClick={toggleAudio} // Call toggleAudio on click
      >
        <Speaker />
      </button>
      <button className="w-7 h-7 p-1 flex items-center justify-center relative rounded-md hover:bg-gray-300 transition-all duration-100 ease-in-out text-gray-700">
        <Gear className="w-full h-full" />
      </button>
      {menuOpen && (
        <button
          className="absolute -top-12 -left-1 w-52 p-2 bg-white rounded-md shadow-md"
          onClick={() => signOut()}
        >
          <ChannelListMenuRow
            name="Sign out"
            icon={<LeaveServer />}
            bottomBorder={false}
            red
          />
        </button>
      )}
    </div>
  );
}
