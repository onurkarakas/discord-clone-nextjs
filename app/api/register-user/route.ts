import { clerkClient } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const secretKey = process.env.STREAM_SECRET_KEY;
  if (!apiKey) {
    throw new Error("Stream API key is not defined");
  }
  if (!secretKey) {
    throw new Error("Stream Secret Key is not defined");
  }
  const serverClient = StreamChat.getInstance(apiKey, secretKey);
  const body = await request.json();
  console.log("[/api/register-user] Body:", body);

  const userId = body?.userId;
  const mail = body?.email;
  console.log(userId, mail);
  if (!userId || !mail) {
    return Response.error();
  }

  const user = await serverClient.upsertUser({
    id: userId,
    role: "user",
    name: mail,
    imageUrl: `https://getstream.io/random_png/?id=${userId}&name=${mail}`,
  });

  const params = {
    publicMetadata: {
      streamRegistered: true,
    },
  };
  const updatedUser = await clerkClient.users.updateUser(userId, params);
  console.log("[/api/register-user] User:", updatedUser);
  const response = {
    userId: userId,
    userName: mail,
  };

  return Response.json(response);
}
