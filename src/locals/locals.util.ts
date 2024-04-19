export const getResponse = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }
  return response;
};
