import "server-only";

import type { SessionPayload } from "@/lib/definitions";

import {
  SignJWT,
  //jwtVerify
} from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET_PROD || process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const getCookies = await cookies();

  getCookies.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  redirect("/");
}

export async function deleteSession() {
  const getCookies = await cookies();

  getCookies.delete("session");
  redirect("/");
}
