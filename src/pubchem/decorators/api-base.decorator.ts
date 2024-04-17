import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PubchemAPIRequest } from '../middlewares/pubchem-api.middleware';

export const UsePubchemAPI = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    data;
    const request: PubchemAPIRequest = context.switchToHttp().getRequest();
    if (request.pubchemAPIUrl) {
      return request.pubchemAPIUrl;
    } else throw new Error('API middleware pubchem is not set');
  },
);
