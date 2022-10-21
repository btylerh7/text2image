import chai from 'chai'
import { load } from 'cheerio'
import axios from 'axios'
import LZString from 'lz-string'
import sizeOf from 'buffer-image-size'


const createConverterTestingData = async ():Promise<string> => {
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
    return text
}

const makeServerRequest = async (type: string, text: string) => {
    const response = await axios.get(`http://localhost:3000/api/${type}`, {
            params: {
                fileType: 'png',
                textType: 'lz-string',
                text: text,
                padding: '30',
                fontSize: '20',
                width: '500',
                height: '700',
            },
            headers: {
              'Content-Type': 'application/json'  
            }
        })
    return response
}

describe('Testing Conversion', () => {
    const expect = chai.expect
    
    it('get-page-info', async () => {
        const text = await createConverterTestingData()
        const response = await makeServerRequest('page-count', text)
        const data = response.data

        expect(data, 'No Data Returned').to.not.be.empty

    })

    it('convert-page', async () => {
        const text = await createConverterTestingData()
        const response = await makeServerRequest('converter', text)
        const buffer = Buffer.from(response.data.files[0].data)
        const dimensions = sizeOf(buffer)
        expect(response.data.files, 'No files from request').to.be.not.empty
        expect(response.data.files[0].data, 'No image data returned in files').to.be.not.empty
        expect(buffer, 'Data returned was not image data').to.be.instanceof(Buffer)
        expect(dimensions.width, 'Width is not 500').to.be.equal(500)
        expect(dimensions.height, 'Height is not 700').to.be.equal(700)
        expect(dimensions.type, 'Image is not png').to.be.equal('png')
    })
})