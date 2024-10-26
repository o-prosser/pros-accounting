import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  (await cookies()).delete("session_id");

  return NextResponse.json({ message: "success" });
};