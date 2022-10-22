import { Request, Response, NextFunction } from 'express'

export const validateConverterData = (req:Request, res:Response, next:NextFunction) => {
    console.log(req.url)
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        res.status(400)
        res.json({
            error: {
                message:'Must include fileType, textType, and text'
            }
        })
        return
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        res.status(400)
        res.json({
            error: {
                message:'fileType, textType, and text must be strings'
            }
        })
        return
    }
    const query = req.query.fileType
    if (query != 'png' && query != 'jpeg') {
        res.status(400)
        res.json({
            error: {
                message:'Filetype must be png or jpeg'
            }
        })
        return
    }
    next()
}