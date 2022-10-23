import { textToImage } from '../services/converterService'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

export const createImage = asyncHandler(async (req: Request, res: Response) => {
    res.set('Content-Type', 'application/json')
    const converterObject = res.locals.converterObject
    const canvases = await textToImage(converterObject)

    const files = []
    //TODO add pdf support
    for (let canvas of canvases){
        let file
        switch(converterObject.request.fileType){
            case 'png':
                file = canvas.toBuffer('image/png').toJSON()
                break
            case 'jpeg':
                file = canvas.toBuffer('image/jpeg').toJSON()
                break
            default:
                file = canvas.toBuffer('image/png').toJSON()
                break
        }
        files.push(file)
    }
    res.status(200)
    res.json({files: files})
})

