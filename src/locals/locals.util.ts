export const getResponse = async (url: string, keys?: any) => {
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'X-Master-Key': keys.master,
      'X-Access-Key': keys.access,
    },
  });
  if (!response.ok) {
    throw new Response(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }
  return response;
};
