import { NextFunction, Request, Response } from 'express'

import express from 'express'
import authenticationService from '../../services/authentication.service'
const router = express.Router()

router.put(
    '/test-update',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body as { hello: string }
            const users = await authenticationService.testUpdate()
            res.json({
                data: {
                    params: `Test update successful:  ${params.hello}`,
                    users: users
                }
            })
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
