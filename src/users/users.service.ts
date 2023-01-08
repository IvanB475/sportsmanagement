import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UtilsService } from "src/utils/utils.service";
import { SignUpDto } from "./dtos/signUpDto";
import { UsersDAL } from "./users.DAL";


@Injectable()
export class UsersService {
    constructor(private utilsService: UtilsService,
        private usersDAL: UsersDAL) { }

    async signUpService({ username, password, email }: SignUpDto) {
        const hashedPassword = await this.utilsService.hashPassword(password);
        const user = await this.usersDAL.signUp(username, hashedPassword, email)
        const token = this.utilsService.generateToken(user.id, 'user');
        //currently disabled mailer as google removed support for less secure apps and logging in via app password doesnt work either
        //once debugged will be re-enabled
        /*         const EMAIL_SUBJECT = 'Zahvaljujemo vam na registraciji!';
                const EMAIL_BODY = 'Šaljemo vam ovaj mail kao potvrdu vaše registracije\n\n' +
                    'username:' + '\n\n' +
                    'Ako se niste vi registrirali, molimo vas obrišite račun\n';
                await this.utilsService.sendMail(email, EMAIL_SUBJECT, EMAIL_BODY); */
        const SUCCESS_RESPONSE_MESSAGE = 'welcome to sports management app!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE,
            token
        }
        return responseToUser;
    }

    async loginService(username: string, password: string) {
        const user = await this.usersDAL.login(username);
        const isUser = await this.utilsService.validateLogin(password, user.password)
        if (!isUser) {
            const FAILURE_RESPONSE_MESSAGE = 'wrong username or password';
            throw new UnauthorizedException(FAILURE_RESPONSE_MESSAGE);
        }

        const token = this.utilsService.generateToken(user.id, user.role.name);

        const SUCCESS_RESPONSE_MESSAGE = 'Welcome!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE,
            token
        }

        return responseToUser;
    }

    async updateUser(userId: number, role: string) {
        await this.usersDAL.updateUser(userId, role);
        const SUCCESS_RESPONSE_MESSAGE = { message: 'successfully updated user' };
        return SUCCESS_RESPONSE_MESSAGE;
    }

    async deleteUser(userId: number) {
        await this.usersDAL.deleteUser(userId);
        const SUCCESS_RESPONSE_MESSAGE = { message: 'successfully deleted user' };
        return SUCCESS_RESPONSE_MESSAGE;
    }
}