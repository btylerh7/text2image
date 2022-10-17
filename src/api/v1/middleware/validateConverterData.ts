import { Request, Response, NextFunction } from 'express'

export const validateConverterData = (req:Request, res:Response, next:NextFunction) => {
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        res.status(400)
        throw new Error('Must include fileType, textType, and text')
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        res.status(400)
        throw new Error('fileType, textType, and text must be strings')
    }
    const query = req.query.fileType
    if (query != 'png' && query != 'jpeg' && query != 'pdf') {
        res.status(400)
        throw new Error('Filetype must be png, jpeg, or pdf')
    }
    next()
}