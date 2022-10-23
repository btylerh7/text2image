import { Request, Response, NextFunction } from 'express'

export const returnError = (res:Response, error: string, test:boolean) => {
    if( test == true ) {
        const data = {
            data: {
                status: 400,
                error: error
            }
        }
        return data
    }
    res.status(400)
    res.json({
        error: {
            message: error
        }
    })
}

export const validateConverterData = (req:Request, res:Response, next:NextFunction, test?:boolean) => {
    console.log('hello from validate function', req.query)
    const testCheck = test ? test : false
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        return returnError(res, 'Must include fileType, textType, and text', testCheck)
    }
    if (typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' || typeof(req.query.fileType) != 'string' ) {
        return returnError(res, 'fileType, textType, and text must be strings', testCheck)
    }
    const query = req.query.fileType
    console.log(query)

    if (query != 'png' && query != 'jpeg') {
        return returnError(res, 'Filetype must be png or jpeg', testCheck)
    }
    if (req.query.padding) {
        // if (typeof(req.query.padding) != 'string') {
        //     return returnError(res, 'Padding must be a string', testCheck)
        // }
        if (isNaN(Number(req.query.padding))) {
            return returnError(res, 'Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".', testCheck)
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