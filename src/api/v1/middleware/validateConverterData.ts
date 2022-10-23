import { next } from 'cheerio/lib/api/traversing'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../interfaces/ApiError'

const returnError = (res:Response, error: string, next: NextFunction, test:boolean) => {
    if( test == true ) {
        const data = {
            data: {
                status: 400,
                error: error
            }
        }
        return data
    }
    const err = ApiError.badRequest(error)
    next(err)
}

export const validateConverterData = (req:Request, res:Response, next:NextFunction) => {
    console.log('hello from validate function', req.query)
    const testCheck = req.query.test ? true : false
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        return returnError(res, 'Must include fileType, textType, and text', next, testCheck)
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        return returnError(res, 'fileType, textType, and text must be strings', next, testCheck)
    }
    const query = req.query.fileType
    console.log(query)

    if (query != 'png' && query != 'jpeg') {
        return returnError(res, 'Filetype must be png or jpeg', next, testCheck)
    }
    if (req.query.padding) {
        // if (typeof(req.query.padding) != 'string') {
        //     return returnError(res, 'Padding must be a string', testCheck)
        // }
        if (isNaN(Number(req.query.padding))) {
            return returnError(res, 'Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".', next, testCheck)
        }
    }
    if(testCheck == true) {
        const data = {
            data: {
                status: 200,
                error: 'none'
            }
        }
        return data
    }
    next()
}