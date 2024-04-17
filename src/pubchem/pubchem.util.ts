export const getResponse = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Response(response.body, {
      status: response.status,
      headers: response.headers,
      statusText: response.statusText,
    });
  return response;
};
