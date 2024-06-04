import { HttpException } from '@nestjs/common';

export const getResponse = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new HttpException(
      "Couldn't get the data. Value as input in POST request in status:never. Or data doesn't exist.",
      response.status,
    );
  return response;
};
