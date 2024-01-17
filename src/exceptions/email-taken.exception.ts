import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailTakenException extends HttpException {
    constructor() {
        super('That email is already being used.', HttpStatus.CONFLICT);
    }
}