import { Prisma } from '@prisma/client'
import ErrorResponse from './ErrorResponse'

export default function <T, K>(res: T, err?: K) {
    // mostly not needed due to express middleware set up
    if (err) {
        if (err instanceof ErrorResponse) {
            return {
                errorMessage: err.message
            }
        }

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                errorMessage: err.message
            }
        }

        if (typeof err == 'object' && 'message' in err) {
            return {
                errorMessage: err.message || 'Something went wrong.'
            }
        }

        return {
            errorMessage: 'Something went wrong'
        }
    }

    if (res) {
        if (typeof res == 'object' && 'data' in res) {
            return res.data
        }

        return res
    }

    return null
}
