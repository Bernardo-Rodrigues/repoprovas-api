import HttpError from "./HttpError.js"

const  badRequest = (message: string) => new HttpError(400, message)
const  unauthorized = (message: string) => new HttpError(401, message)
const  notFound = (message: string) => new HttpError(404, message)
const  conflict = (message: string) => new HttpError(409, message)
const  unprocessableEntity = (message: string) => new HttpError(422, message)

export {
    badRequest,
    unauthorized,
    notFound,
    conflict,
    unprocessableEntity
}
 