import { converterOptions } from "../config/index"
import { ConverterObject } from "../interfaces/index"
import { Request, Response, NextFunction } from 'express'
import LZString from "lz-string"


export const createConverterObject = (req:Request, res:Response, next:NextFunction) => {    
    for (let key of Object.keys(req.query)) {
        if (converterOptions.hasOwnProperty(key)) {
            converterOptions[key] = req.query[key].toString()
        }
    }
    
    let text = req.query.text.toString()
    if (req.query.textType.toString() == 'lz-string'){
        text = LZString.decompressFromEncodedURIComponent(text)

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
