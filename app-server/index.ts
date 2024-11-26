import http from 'http'
import configureExpress from './loaders/express'
import { Server } from 'socket.io'
import isDevelopment from './utilities/isDevelopment'

require('dotenv').config()

// initialise database
// pingDb()

// initialise express
const expressApp = configureExpress()

// handle errors during runtime
process
    .on('unhandledRejection', (reason, p) => {
        console.error(
            `${new Date().toLocaleString()} Unhandled Rejection:`,
            reason,
            p
        )
    })
    .on('uncaughtException', (error) => {
        console.error(
            `${new Date().toLocaleString()} Uncaught Exception:`,
            error
        )
        process.exit(1)
    })

const portList = process.env.PORT?.split(';;') || []
const serverInstances = <any>[]

portList.forEach((port) => {
    const httpServer = http.createServer(expressApp)

    const io = new Server(httpServer, {
        cors: {
            ...(isDevelopment() && { origin: '*' })
        }
    })

    // server-side
    io.on('connection', (socket) => {
        console.log(socket.id) // x8WIv7-mJelg7on_ALbx
        socket.on('connection', (message) => {
            console.log('connection message: ', message)
            io.emit(message)
        })

        socket.on('connect', () => {
            console.log('connected')
            // io.emit('connected', 'successfully connected')
        })

        socket.on('joinRoom', (chatId, callback) => {
            console.log('chat id : ', chatId)
            socket.join(chatId)
            callback(`user ${socket.id} joined room ${chatId}`)
            console.log('rooms: ', socket.rooms)
        })

        socket.on('sendMessage', async ({ text, chatId, userId }, callback) => {
            io.to(chatId).emit(text)
            callback('message received and saved')
        })

        // socket.on('daniel', (message, callback) => {
        //     console.log("daniel's ", message)
        //     callback('got it')
        // })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

    // io.on('connection', (socket) => {
    //     console.log('User connected:', socket.id)

    //     socket.on('joinRoom', ({ chatRoomId }) => {
    //         socket.join(chatRoomId)
    //         console.log(`User ${socket.id} joined room ${chatRoomId}`)
    //     })

    //     socket.on('sendMessage', async ({ chatRoomId, userId, content }) => {
    //         const message = await prisma.message.create({
    //             data: {
    //                 content,
    //                 userId,
    //                 chatRoomId,
    //             },
    //             include: {
    //                 user: true,
    //             },
    //         })
    //         io.to(chatRoomId).emit('receiveMessage', message)
    //     })

    //     socket.on('disconnect', () => {
    //         console.log('User disconnected:', socket.id)
    //     })
    // })

    httpServer.listen(parseInt(port), () => {
        console.log(`Listening on port ${port}`)
    })
    serverInstances.push(httpServer)
})

export { serverInstances }
