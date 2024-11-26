import { NextFunction, Request, Response } from 'express'
import ErrorResponse from './ErrorResponse'
import { StatusCodes } from 'http-status-codes'
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError
} from '@prisma/client/runtime/library'

export function handleErrors(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ErrorResponse) {
        res.status(err.statusCode).json({ error: err.message })
    } else if (
        err instanceof PrismaClientUnknownRequestError ||
        err instanceof PrismaClientRustPanicError ||
        err instanceof PrismaClientValidationError ||
        err instanceof PrismaClientKnownRequestError ||
        err instanceof PrismaClientInitializationError
    ) {
        let prismaCode = undefined
        if (err instanceof PrismaClientKnownRequestError) {
            prismaCode = err.code
        } else if (err instanceof PrismaClientInitializationError) {
            prismaCode = err.errorCode
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message,
            name: err.name,
            prismaCode: prismaCode
        })
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal Server Error'
        })
    }
}
