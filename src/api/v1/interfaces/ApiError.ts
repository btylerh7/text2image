export class ApiError {
    status: number
    message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }
    static internal(message: string) {
        return new ApiError(500, message)
    }
}