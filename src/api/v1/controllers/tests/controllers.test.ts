import chai from 'chai'
import { load } from 'cheerio'
import axios from 'axios'
import LZString from 'lz-string'
import sizeOf from 'buffer-image-size'
import chaiHttp from 'chai-http'
import { app } from '../../../../index'

const expect = chai.expect
chai.use(chaiHttp)
const URL_OPTIONS = '&padding=30&fontSize=20&width=500&height=700'

export const createConverterTestingData = async ():Promise<string> => {
    const webNovelUrl = 'https://ncode.syosetu.com/n1501hv/3/' //web novel site with japanese text
    const htmlData = await axios.get(webNovelUrl)
    const $ = load(htmlData.data)
    let text:string | string[] = []
    for (let child of $('.novel_view').children()) {
        const result = $(child).text().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0); })
        text.push(result)
    }
    text = text.join('\n')
    text = LZString.compressToEncodedURIComponent(text)
    // text='Hello \n Helo'
    return text
}

describe('Testing Conversion', () => {
    
    
    it('get-page-info', async () => {
        chai.request(app)
        .get(`/api/page-count?fileType=png&textType=lz-string&text=${await createConverterTestingData()}${URL_OPTIONS}`)
        .end((err, res) => {
            const data = res.body
            expect(res.status, 'Status was not 200').to.be.equal(200)
            expect(data, 'No Data Returned').to.be.not.empty
            expect(data.pages, 'No pages count returned').to.be.not.null
            expect(data.textByLine, 'No text by line returned').to.be.not.empty
            expect(data.linesPerPage, 'No lines per page returned').to.be.not.null
            })
        


    })

    it('convert-page', async () => {
        chai.request(app)
        .get(`/api/converter?fileType=png&textType=lz-string&text=${await createConverterTestingData()}${URL_OPTIONS}`)
        .end((err, res) => {
            const data = res.body
            const buffer = Buffer.from(data.files[0].data)
            const dimensions = sizeOf(buffer)

            expect(res.status, 'Status was not 200').to.be.equal(200)
            expect(data.files, 'No files from request').to.be.not.empty
            expect(data.files[0].data, 'No image data returned in files').to.be.not.empty
            expect(buffer, 'Data returned was not image data').to.be.instanceof(Buffer)
            expect(dimensions.width, 'Width is not 500').to.be.equal(500)
            expect(dimensions.height, 'Height is not 700').to.be.equal(700)
            expect(dimensions.type, 'Image is not png').to.be.equal('png')
        })
        

        
    })
})

describe('Testing Conversion Errors', () => {

    it('fileType error', async () => {
        chai.request(app)
        .get(`/api/page-count?fileType=pdf&textType=lz-string&text=${await createConverterTestingData()}${URL_OPTIONS}`)
        .end((err, res) => {
            expect(res.status, 'Status is not 400').to.be.equal(400)
            expect(res.body.error.message, 'Body does not display error message').to.be.equal('Filetype must be png or jpeg')
        })
    })
})