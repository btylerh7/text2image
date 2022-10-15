import { converterOptions } from "../config/index"
import { ConverterObject } from "../interfaces/index"
import { Request, Response, NextFunction } from 'express'


export const createConverterObject = (req:Request, res:Response, next:NextFunction) => {
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        res.status(401)
        throw new Error('Must include fileType, textType, and text')
    }
    const filetypes = ['png', 'jpeg', 'pdf']
    if (req.query.fileType.toString() in filetypes == false) {
        res.status(401)
        throw new Error('Filetype must be png, jpeg, or pdf')
    }
    for (let key of Object.keys(req.query)) {
        if (converterOptions.hasOwnProperty(key)) {
            converterOptions[key] = req.query[key].toString()
        }
    }
    const converterObject: ConverterObject = {
        request: {
            fileType: req.query.fileType.toString(), // png, jpeg, pdf
            textType: req.query.textType.toString(), // ex. html or plainText
            text: req.query.text.toString(),
        },
        options: converterOptions,
    }
    res.locals.converterObject = converterObject  
    next()
}
