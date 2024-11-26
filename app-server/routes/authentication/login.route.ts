import { NextFunction, Request, Response } from 'express'

import express from 'express'
import authenticationService from '../../services/authentication.service'
import httpResponse from '../../utilities/httpResponse'
import { StatusCodes } from 'http-status-codes'
const router = express.Router()

router.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await authenticationService.login()
            res.json(httpResponse(data)).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
