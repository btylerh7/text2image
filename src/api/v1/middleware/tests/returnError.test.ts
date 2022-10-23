import chai from 'chai'
import chaiHttp from "chai-http"
import { app } from '../../../../index'

//TODO chai-http isn't running middleware
describe('Verify that returnError function works', () => {
    const expect = chai.expect
    chai.use(chaiHttp)

    it('incorrect request', (done) => {
        chai.request(app).keepOpen()
        .get(`/api/converter`)
        .query({
            fileType: 'png',
            text: 'test'
        })
        .end((err, res) => {
            expect(res.status, 'status was not 400').to.be.equal(400)
            expect(res.body, 'did not return json').to.be.json
            done()
        })
    })
})