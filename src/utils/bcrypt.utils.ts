import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async hashPassword(pwd: string) {
    const salt = await bcrypt.genSalt();
    const password = pwd;
    return await bcrypt.hash(password, salt);
  }

  async compare(unhashed: string, hashed: string) {
    return bcrypt.compare(unhashed, hashed);
  }
}
