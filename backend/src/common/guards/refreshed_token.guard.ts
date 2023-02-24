import { AuthGuard } from '@nestjs/passport';

export class RefreshedTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}