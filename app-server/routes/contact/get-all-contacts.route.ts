import express, { NextFunction, Request, Response } from 'express'
import contactService from '../../services/contact.service'
import httpResponse from '../../utilities/httpResponse'
import { StatusCodes } from 'http-status-codes'
const router = express.Router()

router.get(
    '/get-all-contacts',
    async (req: Request, res: Response, next: NextFunction) => {
        let loggedInId = req.query.id
        if (loggedInId) loggedInId = String(loggedInId)

        try {
            const data = await contactService.getAll(loggedInId || '')
            res.json(httpResponse(data)).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
