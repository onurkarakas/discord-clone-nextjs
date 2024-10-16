import { NextResponse } from "next/server";

interface WebhookRequestBody {
  data: {
    email_addresses: {
      email_address: string;
    }[];
  };
}

const allowedEmails: string[] = [
  "onur9415@gmail.com",
  "talhaarslan3535@gmail.com",
  "1345muratcan1345@gmail.com",
  "alifidan024@gmail.com",
  "abdulsamedkul7@gmail.com",
  "murathanklc@gmail.com",
  "lvntfdn@gmail.com",
  "gkhnkadioglu@gmail.com",
  "",
  "",
];

export async function POST(req: Request) {
  try {
    // Parse the request body as JSON
    const body: WebhookRequestBody = await req.json();

    // Extract the email address from the webhook payload
    const userEmail: string = body.data.email_addresses[0].email_address;

    // Check if the email is in the allowed list
    if (allowedEmails.includes(userEmail)) {
      // Allow the sign-in
      return NextResponse.json({ message: "User is allowed" }, { status: 200 });
    } else {
      // Reject the sign-in
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 403 }
      );
    }
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
