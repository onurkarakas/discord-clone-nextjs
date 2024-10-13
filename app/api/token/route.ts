import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const serverClient = StreamChat.getInstance(
    "mdkc5yvursf6",
    process.env.STREAM_SECRET_KEY
  );
  const body = await request.json();
  console.log("[/api/token] Body:", body);

  const userId = body?.userId;

  if (!userId) {
    return Response.error();
  }

  const token = serverClient.createToken(userId);

  const response = {
    userId: userId,
    token: token,
  };

  return Response.json(response);
}
