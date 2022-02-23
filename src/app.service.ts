import { Injectable } from '@nestjs/common';

let counter = 0;
@Injectable()
export class AppService {
  getHello(): string {
    counter++;
    return `Hello World! This site has been visited ${counter}`;
  }
}
