import chai from 'chai'
import {Request, Response, NextFunction} from 'express'
import { validateConverterData } from '../validateConverterData'

const expect = chai.expect

describe('Validate Required Text', async () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let next: Partial<NextFunction>
    beforeEach(() => {
        mockRequest = {
            query: {}
        }
        mockResponse = {}
    })
    it('Check no file type', async () => {
        mockRequest.query = {
            textType: 'plainText',
            text: 'test'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 400').to.be.equal(400)
        expect(data.data.error, 'Error not correct').to.be.equal('Must include fileType, textType, and text')

    })

    it('Check no text type', async () => {
        mockRequest.query = {
            fileType: 'png',
            text: 'test'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 400').to.be.equal(400)
        expect(data.data.error, 'Error not correct').to.be.equal('Must include fileType, textType, and text')
    })

    it('Check no text', async () => {
        mockRequest.query = {
            fileType: 'png',
            textType: 'plainText'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 400').to.be.equal(400)
        expect(data.data.error, 'Error not correct').to.be.equal('Must include fileType, textType, and text')
    })

    it('Check correct request', async () => {
        mockRequest.query = {
            fileType: 'png',
            textType: 'plainText',
            text: 'test'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 200').to.be.equal(200)
        expect(data.data.error, 'Error happened').to.be.equal('none')
    })
})
describe('Validate file type', async () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let next: Partial<NextFunction>
    beforeEach(() => {
        mockRequest = {
            query: {}
        }
        mockResponse = {}
    })

    it('Check incorrect file type', async () => {
        mockRequest.query = {
            fileType: 'pdf',
            textType: 'plainText',
            text: 'test'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 400').to.be.equal(400)
        expect(data.data.error, 'Error not correct').to.be.equal('Filetype must be png or jpeg')
        return 'done'
    })
})

// Validate text type

// Validate padding

describe('Testing Converter Options', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let next: Partial<NextFunction>
    beforeEach(() => {
        mockRequest = {
            query: {}
        }
        mockResponse = {}
    })

    it('Check if padding is written with numbers, not letters', async () => {
        mockRequest.query = {
            fileType: 'png',
            textType: 'plainText',
            text: 'test',
            padding: 'thirty'
        }
        const data = await validateConverterData(mockRequest as Request, mockResponse as Response, next as NextFunction, true)
        expect(data.data, 'Function returned nothing').to.be.not.empty
        expect(data.data.status, 'Status was not 400').to.be.equal(400)
        expect(data.data.error, 'Error not correct').to.be.equal('Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".')
        return 'done'
    })
})