import { converterOptions } from "../config/index"
import { ConverterObject } from "../interfaces/index"
import { Request, Response, NextFunction } from 'express'
import LZString from "lz-string"


export const createConverterObject = (req:Request, res:Response, next:NextFunction) => {    
    console.log('hello from create converter object function', req.query)
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
            fileType: req.query.fileType.toString(), // png, jpeg
            textType: req.query.textType.toString(), // ex. plainText or lz-string
            text: text,
        },
        options: converterOptions,
    }
    res.locals.converterObject = converterObject  
    next()
}
