import { next } from 'cheerio/lib/api/traversing'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../interfaces/ApiError'



export const validateConverterData = (req:Request, res:Response, next:NextFunction) => {
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        req.query.isError = 'true'
        const err = ApiError.badRequest('Must include fileType, textType, and text')
        next(err)
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        req.query.isError = 'true'
        const err = ApiError.badRequest('fileType, textType, and text must be strings')
        next(err)
    }
    const query = req.query.fileType

    if (query != 'png' && query != 'jpeg') {
        const err = ApiError.badRequest('Filetype must be png or jpeg')
        req.query.isError = 'true'
        next(err)
        
    }
    if (req.query.padding) {
        const padding = Number(req.query.padding)
        // if (typeof(req.query.padding) != 'string') {
        //     return returnError(res, 'Padding must be a string', testCheck)
        // }
        if (isNaN(padding)) {
            const err = ApiError.badRequest('Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".')
            req.query.isError = 'true'
            next(err)
        }
    }
    next()
}