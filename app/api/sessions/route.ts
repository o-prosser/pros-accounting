import { cookies } from "next/headers";

export const DELETE = async (request: Request) => {
  const cookieStore = await cookies();

  cookieStore.delete("session_id");

  return Response.json({ message: "success" });
};