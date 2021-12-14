import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ListResponseInterceptor {
  intercept(_, next) {
    return next.handle().pipe(map(data => {
        return { data: data[0], total: data[1] }}));
  }
}