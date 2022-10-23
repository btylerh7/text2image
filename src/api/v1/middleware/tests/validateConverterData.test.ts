import chai from 'chai'
import {Request, Response, NextFunction} from 'express'
import { validateConverterData } from '../validateConverterData'
import chaiHttp from 'chai-http'
import { app } from '../../../../index'
import { Done } from 'mocha'
const expect = chai.expect
chai.use(chaiHttp)


describe('Validate Required Text', () => {
    it('Check no file type', (done:Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            textType: 'plainText',
            text: 'test',
        })
        .end((err, res) => {
            console.log(res.body)
            const data = res.body
            expect(data, 'Function returned nothing').to.be.not.empty
            expect(res.status, 'Status was not 400').to.be.equal(400)
            expect(data.error.message, 'Error not correct').to.be.equal('Must include fileType, textType, and text')
        })
        done()
    })

    it('Check no text type', (done: Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'png',
            text: 'test'
        })
        .end((err, res) => {
            const data = res.body
            expect(data.data, 'Function returned nothing').to.be.not.empty
            expect(res.status, 'Status was not 400').to.be.equal(400)
            expect(data.error.message, 'Error not correct').to.be.equal('Must include fileType, textType, and text')
        })
        done()
    })

    it('Check no text', (done:Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'png',
            textType: 'plainText'
        })
        .end((err, res) => {
            const data = res.body
            expect(data.data, 'Function returned nothing').to.be.not.empty
            expect(res.status, 'Status was not 400').to.be.equal(400)
            expect(data.error.message, 'Error not correct').to.be.equal('Must include fileType, textType, and text')
        })
        done()
    })

    it('Check correct request', (done: Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'png',
            textType: 'plainText',
            text: 'test'
        })
        .end((err, res) => {
            const data = res.body
            expect(data.data, 'Function returned nothing').to.be.not.empty
            expect(data.data.files, 'no files returned').to.be.not.empty
            expect(res.status, 'Status was not 200').to.be.equal(200)
        })
        done()
    })
})
describe('Validate file type', () => {
    it('Check incorrect file type', (done:Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'pdf',
            textType: 'plainText',
            text: 'test'
        })
        .end((err, res) => {
            const data = res.body
            expect(data.data, 'Function returned nothing').to.be.not.empty
            expect(res.status, 'Status was not 400').to.be.equal(400)
            expect(data.error.message, 'Error not correct').to.be.equal('Filetype must be png or jpeg')
        })
        done()
    })
})

// Validate text type

// Validate padding

describe('Testing Converter Options', () => {
    it('Check if padding is written with numbers, not letters', (done: Done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'png',
            textType: 'plainText',
            text: 'test',
            padding: 'thirty',
        })
        .end((err, res) => {
            const data = res.body
            expect(data.data, 'Function returned nothing').to.be.not.empty
            expect(res.status, 'Status was not 400').to.be.equal(400)
            expect(data.error.message, 'Error not correct').to.be.equal('Padding must be in numerical format (ex. 30). For example, it cannot be "thirty".')
        })
        done()
    })
})