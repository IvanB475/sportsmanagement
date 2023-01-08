import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config/app.config.service';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';


@Injectable()
export class UtilsService {
    constructor(private appConfigService: AppConfigService) { }

    async hashPassword(password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds)
        return hash;

    }


    generateToken(id: number, role: string) {
        const TOKEN_SECRET = this.appConfigService.token_secret;

        const token = jwt.sign({ userId: id, userRole: role }, TOKEN_SECRET, {
            expiresIn: '1h'
        })

        return token;

    }

    getUserIdFromToken(token: string) {
        const decoded = jwt.decode(token);
        const userId = decoded['userId'];
        return userId;
    }

    getUserRoleFromToken(token: string) {
        const decoded = jwt.decode(token);
        const userRole = decoded['userRole'];
        return userRole;
    }


    async validateLogin(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async sendMail(email: string, subject: string, text: string) {
        const GMAIL_USER = this.appConfigService.gmail_password;
        const GMAIL_PASSWORD = this.appConfigService.gmail_password;
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASSWORD
            }
        });
        const mailOptions = {
            to: email,
            from: GMAIL_USER,
            subject,
            text
        };

        await smtpTransport.sendMail(mailOptions);
    }


}
