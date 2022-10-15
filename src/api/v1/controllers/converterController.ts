import { textToImage } from '../services/converterService'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

export const createImage = asyncHandler(async (req: Request, res: Response) => {
    const converterObject = res.locals.converterObject
    const canvases = textToImage(converterObject)

    const files = []
    for (let canvas of canvases){
        let file
        switch(converterObject.request.fileType){
            case 'png':
                // res.set('Content-Type', 'image/png')
                file = canvas.toBuffer('image/png').toJSON()
                break
            case 'jpeg':
                // res.set('Content-Type', 'image/jpeg')
                file = canvas.toBuffer('image/jpeg').toJSON()
                break
            case 'pdf':
                // res.set('Content-Type', 'application/pdf')
                file = canvas.toBuffer('application/pdf').toJSON()
                break
            default:
                // res.set('Content-Type', 'image/png')
                file = canvas.toBuffer('image/png').toJSON()
                break
        }
        files.push(file)
    }
    res.json({files: files})
})