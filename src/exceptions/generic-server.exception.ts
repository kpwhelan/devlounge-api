import { HttpException, HttpStatus } from "@nestjs/common"

export class GenericServerException extends HttpException {
    constructor() {
        super('Something went wrong, it\'s not you...it\'s us.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}