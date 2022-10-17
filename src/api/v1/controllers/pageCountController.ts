import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { calculatePages } from '../services/pageCalculatorService'

export const getPages = asyncHandler(async (req: Request, res: Response) => {
    res.set('Content-Type', 'application/json')
    const converterObject = res.locals.converterObject
    const textInfo = calculatePages(converterObject)
    res.status(200)
    res.json({pages: textInfo.totalPages, textByLine: textInfo.textbyLine, linesPerPage: textInfo.linesPerPage})
})