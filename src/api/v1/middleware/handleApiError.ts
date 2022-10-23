import { NextFunction, Request, Response } from "express";
import { ApiError } from "../interfaces/ApiError";


export const handleApiError = (err: any ,req:Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status)
        res.json({
            "error": {
                "message": err.message
            }
        })
        return
    }
    res.status(500)
    res.json({
        "error": {
            "message": "Something went wrong on the server end"
        }
    })
}