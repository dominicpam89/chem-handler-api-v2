export const getResponse = async (url: string) => {
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'X-Master-Key':
        '$2a$10$fgrvg7v6KXU7/XDalHzkj./xMT16i/DXTJLaaNpEW/wNlpNlclL4m',
      'X-Access-Key':
        '$2a$10$hPDPvvhjC2LyTXlQFyL.1.BshaB1FDz5wjiIxoWRKemFUINF6Mj3q',
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
