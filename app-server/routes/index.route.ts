import { Application } from 'express'
import fs from 'fs'
import path from 'path'

export default function setupRoutes(app: Application) {
    const INDEX_FILE = 'index.route.ts'
    const allFiles = fs.readdirSync(__dirname)

    for (let fileName of allFiles) {
        if (fileName !== INDEX_FILE) {
            const filePath = path.join(__dirname, fileName)

            if (fs.statSync(filePath).isDirectory()) {
                useExpressPath(filePath, app, `/api/${fileName}`)
            } else if (
                fs.statSync(filePath).isFile() &&
                path.extname(fileName) === '.ts'
            ) {
                const route = require(filePath)
                app.use(`/api/${fileName}`, route)
            }
        }
    }
}

function useExpressPath(selectedPath: string, app: Application, url: string) {
    fs.readdirSync(selectedPath).forEach((file) => {
        const routePath = path.join(selectedPath, file)
        if (
            fs.statSync(routePath).isFile() &&
            path.extname(routePath) === '.ts'
        ) {
            const route = require(routePath)
            app.use(`${url}`, route)
        }
    })
}
