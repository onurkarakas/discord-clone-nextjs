import { NextResponse } from "next/server";

// Define the interface for the webhook request body
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
];
export async function POST(req: Request) {
  try {
    const body: WebhookRequestBody = await req.json(); // Parse the JSON body with the defined interface
    const userEmail = body.data.email_addresses[0].email_address;

    if (allowedEmails.includes(userEmail)) {
      // Allow the sign-in
      return NextResponse.json({ message: "User is allowed" }, { status: 200 });
    } else {
      // Reject the sign-in and redirect
      return NextResponse.redirect("https://bascord.com", 302);
    }
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
