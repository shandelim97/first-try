import { NextFunction, Request, Response } from 'express'

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import chatService from '../../services/chat.service'
import httpResponse from '../../utilities/httpResponse'
const router = express.Router()

router.get(
    '/get-chat',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loggedInId = req.query.loggedInId
            const selectedUserId = req.query.selectedUserId

            const chat = await chatService.getChat({
                loggedInId: String(loggedInId),
                selectedUserId: String(selectedUserId)
            })

            res.json(httpResponse(chat)).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
