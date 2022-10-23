import { next } from 'cheerio/lib/api/traversing'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../interfaces/ApiError'



export const validateConverterData = (req:Request, res:Response, next:NextFunction) => {
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        const err = ApiError.badRequest('Must include fileType, textType, and text')
        next(err)
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        const err = ApiError.badRequest('fileType, textType, and text must be strings')
        next(err)
    }
    const query = req.query.fileType

    if (query != 'png' && query != 'jpeg') {
        const err = ApiError.badRequest('Filetype must be png or jpeg')
        next(err)
        
    }
    if (req.query.padding) {
        // if (typeof(req.query.padding) != 'string') {
        //     return returnError(res, 'Padding must be a string', testCheck)
        // }
        if (isNaN(Number(req.query.padding))) {
            const err = ApiError.badRequest('Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".')
            next(err)
        }
    }
    else {
        next()
    }
}