import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SessionData } from './middlewares/current-user.middleware';
// import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    // private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signout')
  signOut(@Session() session: SessionData) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: SessionData,
  ) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: SessionData) {
    console.log('Signin body:', body);
    const user = await this.authService.signin(body.email, body.password);

    session.userId = user.id;
    return user;
  }
}
