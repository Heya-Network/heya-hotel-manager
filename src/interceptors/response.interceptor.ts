import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor {
  intercept(_, next) {
    return next.handle().pipe(map(data => {
        return { data };
    }));
  }
}