import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { load } from 'cheerio'
import axios from 'axios'
import LZString from 'lz-string'

describe('Testing Conversion', () => {
    const expect = chai.expect
    const webNovelUrl = 'https://ncode.syosetu.com/n1501hv/3/' //web novel site with japanese text

    it('convert-page', async () => {
        const htmlData = await axios.get(webNovelUrl)
        const $ = load(htmlData.data)
        let text:string | string[] = []
        for (let child of $('.novel_view').children()) {
            const result = $(child).text().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0); })
            text.push(result)
        }
        text = text.join('\n')
        expect(text, 'Missing Test').to.be.not.empty
        text = LZString.compressToEncodedURIComponent(text)
        

        const response = await axios.get('http://localhost:3000/api/converter', {
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
        expect(response.data.files, 'No files from request').to.be.not.empty
        console.log(response.data.files)
    })
})