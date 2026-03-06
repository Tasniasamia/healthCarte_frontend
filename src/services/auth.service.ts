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