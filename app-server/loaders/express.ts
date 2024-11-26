import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import ERROR_MESSAGES from '../globals/ERROR_MESSAGES'
import setupRoutes from '../routes/index.route'
import { handleErrors } from '../utilities/loader.utility'
import qs from 'qs'

const app: express.Application = express()

function configureExpress() {
    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))

    app.set('query parser', function (str: any) {
        return qs.parse(str, {})
    })

    app.use(cors())
    app.use(compression())
    app.use(helmet())
    app.disable('x-powered-by')

    // security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('X-Frame-Options', 'SAMEORIGIN')
        next()
    })

    setupRoutes(app)

    // if (isProduction()) {
    //     // Serve static files from the React app
    //     app.use(
    //         express.static(path.join(__dirname, '..', 'web-server', 'dist'))
    //     )

    //     // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
    //     app.get('*', (req, res) => {
    //         res.sendFile(
    //             path.join(__dirname, '..', 'web-server', 'dist', 'index.html')
    //         )
    //     })
    // }

    // middleware to handle errors thrown anywhere in the application
    app.use(handleErrors)

    // reject unregistered routes
    app.all('*', (req, res) => {
        res.status(StatusCodes.NOT_FOUND).json({
            error: ERROR_MESSAGES.INVALID_ROUTE
        })
    })

    return app
}

export default configureExpress
