import { PrismaClient } from '@prisma/client'
import ErrorResponse from '../utilities/ErrorResponse'
import { StatusCodes } from 'http-status-codes'

class ContactService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAll(loggedInId: string) {
        return this.prisma.user
            .findMany({ where: { id: { not: loggedInId } } })
            .then((res) => res)
            .catch((err) => {
                throw new ErrorResponse(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Something went wrong fetching users.'
                )
            })
            .finally(async () => await this.prisma.$disconnect())
    }
}

const contactService = new ContactService()
export default contactService
