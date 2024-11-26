import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            {
                passwordHash: '123',
                phoneNumber: '00000001',
                username: 'Koh Zhi Xian'
            },
            {
                passwordHash: '123',
                phoneNumber: '00000002',
                username: 'Shandy'
            },
            {
                passwordHash: '123',
                phoneNumber: '00000003',
                username: 'Daniel'
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
