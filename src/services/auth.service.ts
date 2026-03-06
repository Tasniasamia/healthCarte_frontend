import { cookies } from "next/headers";

export const getNewTokens = async (refreshToken: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
      {
        method: "GET",
        headers: { Cookie: `refreshToken=${refreshToken}` },
      }
    );

    if (!res.ok) return null;
    const responseData = await res.json();
    if (!responseData?.success) return null;

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = responseData?.data;

    return { accessToken, refreshToken: newRefreshToken, sessionToken };
  } catch (error: any) {
    return null;
  }
};

export async function getUserInfo() {
  try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;

      if (!accessToken) {
          return null;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Cookie: `accessToken=${accessToken}`
          }
      });

      if (!res.ok) {
          console.error("Failed to fetch user info:", res.status, res.statusText);
          return null;
      }

      const { data } = await res.json();

      return data;
  } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
  }
}