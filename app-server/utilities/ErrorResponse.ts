import { StatusCodes } from 'http-status-codes'

export default class ErrorResponse extends Error {
    public statusCode

    constructor(statusCode: number | undefined, message: string | undefined) {
        super(message || 'Something went wrong.')
        this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        Error.captureStackTrace(this, this.constructor)
    }
}
