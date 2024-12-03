import "server-only";

import type { SessionPayload } from "@/lib/definitions";

import { SignJWT, jwtVerify } from "jose";
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

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(
  userId: string,
  role: string,
  name: string
) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, role, name });

  const getCookies = await cookies();

  getCookies.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
}

export async function updateSession() {
  const getCookies = await cookies();
  const session = getCookies.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  getCookies.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const getCookies = await cookies();
  const cookie = getCookies.get("session")?.value;

  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/auth/signin");
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: session.role,
    name: session.name,
    expiresAt: session.expiresAt,
  };
}

export async function getSession() {
  const getCookies = await cookies();
  const cookie = getCookies.get("session")?.value;

  const session = await decrypt(cookie);

  return {
    isAuth: session?.userId ? true : false,
    userId: session?.userId || "",
    role: session?.role || "",
    name: session?.name || "",
    expiresAt: session?.expiresAt || "",
  };
}

export async function deleteSession() {
  const getCookies = await cookies();

  getCookies.delete("session");
  redirect("/");
}
