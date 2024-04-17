import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UseCreateCompound = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    data;
    const request = context.switchToHttp().getRequest();
    const transformedCompound = request.transformedCompound;
    return transformedCompound;
  },
);
