import { converterOptions } from "../config/index"
import { ConverterObject } from "../interfaces/index"
import { Request, Response, NextFunction } from 'express'
import LZString from "lz-string"


export const createConverterObject = (req:Request, res:Response, next:NextFunction) => {
    if (!req.query.fileType || !req.query.textType || !req.query.text) {
        res.status(401)
        throw new Error('Must include fileType, textType, and text')
    }
    let text = req.query.text.toString()
    if (req.query.textType.toString() == 'lz-string'){
        text =     LZString.decompressFromEncodedURIComponent(text)

    }
    const query = req.query.fileType.toString()
    if (query != 'png' && query != 'jpeg' && query != 'pdf') {
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
            text: text,
        },
        options: converterOptions,
    }
    res.locals.converterObject = converterObject  
    next()
}
