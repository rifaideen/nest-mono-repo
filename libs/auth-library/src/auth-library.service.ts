import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from './users/users.service';
import { randomBytes } from 'crypto';
import { User } from './users/user.schema';

@Injectable()
export class AuthLibraryService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate the user credentials. Called from local strategy during login process.
   * @param email string
   * @param password string
   * @returns any
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  /**
   * Sign the payload and issue the jwt token.
   *
   * @param user
   * @returns jwt token
   */
  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Create reset password token for the given user
   * @param email 
   * @returns 
   */
  async createResetPasswordToken(email): Promise<User> {
    let user = await this.userService.findByEmail(email);

    if (!user) {
      return;
    }

    user = await this.userService.findOneAndUpdate({ _id: user._id }, {
      passwordResetToken: this.generateRandomToken(),
      passwordTokenExpiry: new Date(Date.now() + 3600000)
    });

    return user;
  }

  /**
   * Reset password for the given token, if the token is still valid
   * @param token 
   * @param password 
   * @returns 
   */
  async resetPassword(token: string, password: string): Promise<User | undefined> {
    const result = await this.userService.findOneAndUpdate({
      passwordResetToken: token,
      passwordTokenExpiry: {
        $gte: new Date(Date.now())
      }
    }, {
      passwordResetToken: null,
      passwordTokenExpiry: null,
      password: (await hash(password, 10)).toString(),
    });

    return result;
  }

  /**
   * Generatest the random token for the given size
   * @param size 
   * @returns 
   */
  generateRandomToken(size = 32): string {
    return randomBytes(size).toString('hex');
  }
}
