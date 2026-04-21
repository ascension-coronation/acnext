import { NextResponse } from "next/server"
import { LoopsClient } from "loops";

const apiKey = process.env.LOOPS_API_KEY;
if (!apiKey) {
  throw new Error("LOOPS_API_KEY environment variable is required");
}
const loops = new LoopsClient(apiKey);

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { errors: { email: "Please enter a valid email address." } },
      { status: 422 },
    )
  }
  // Note: updateContact() will create or update a contact

  // const resp: {
  //   success: boolean;
  //   id?: string;
  //   message?: string;
  // } = await loops.updateContact({email});
  const resp = await loops.sendEvent({
    email: email,
    eventName: "RSVP",
  });
  return NextResponse.json({ success: resp.success });
}
