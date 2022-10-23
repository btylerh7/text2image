import chai from 'chai'
import { createConverterTestingData } from '../../controllers/tests/controllers.test'
import chaiHttp from 'chai-http'
import { ConverterObject } from '../../interfaces'
import { compressToEncodedURIComponent } from 'lz-string'
import { createCanvasInfo } from '../pageCalculatorService'

const expect = chai.expect
chai.use(chaiHttp)
const URL_OPTIONS = '&padding=30&fontSize=20&width=500&height=700'
const testRequestObject = createConverterTestingData()
.then(text => {
    const encodedText = compressToEncodedURIComponent(text)
    const requestObject: ConverterObject = {
        request: {
            fileType: 'png',
            textType: 'lz-string',
            text: encodedText
        },
        options: {
            padding: '30',
            fontSize: '20',
            width: '500',
            height: '700',
            fontFamily: 'Times New Roman, Hina Mincho',
            backgroundColor: '#ffffff',
            textColor: '#000000',
            linesPerPage: 24,
            pages: undefined
        }
    }
    return requestObject
})

describe('Testing Page Count', () => {
    it('canvas-info', async () => {
        const canvasInfo = await createCanvasInfo(await testRequestObject)
        
        expect(canvasInfo.font, 'Font is not set correctly').to.be.equal('20px Times New Roman, Hina Mincho')
        expect(canvasInfo.pageHeight, 'Page height calculated incorrectly').to.be.equal(640)
        expect(canvasInfo.textWidth, 'Page text width calculated incorrectly').to.be.equal(22)

    })
})

