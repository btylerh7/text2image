import { ConverterObject } from "../interfaces/index"
import { createCanvas, registerFont } from 'canvas'

const registerFonts = async () => {
    //TODO add all supported fonts via this method and unregister others
    registerFont('src/api/v1/config/fonts/HinaMincho-Regular.ttf', { family: 'Hina Mincho' })
}

export const createCanvasInfo = async (object: ConverterObject) => {
    await registerFonts()
    const canvas = createCanvas(Number(object.options.width), Number(object.options.height))
    const context = canvas.getContext('2d')
    const font = `${object.options.fontSize}px ${object.options.fontFamily}`
    
    context.font = font
    context.textBaseline = 'top'
    
    const textMetrics = context.measureText('け')
    const textHeight = textMetrics.actualBoundingBoxDescent * 1.2
    const pageHeight = (canvas.height - (2 * Number(object.options.padding)))
    const linesPerPage = Math.floor(pageHeight/textHeight)
    const ch = textMetrics.width
    const textWidth = Math.floor( (canvas.width - (2 * Number(object.options.padding))) / ch) // (width - padding)/chWidth = number of characters per line

    return {
        canvas,
        context,
        font,
        textMetrics,
        textHeight,
        pageHeight,
        linesPerPage,
        ch,
        textWidth
    }
}

export const calculatePages = async ( object: ConverterObject) => {
    const canvasInfo = await createCanvasInfo(object)
    const finalText: string[] = []
    let currentLine = ''
    for (let char = 0; char < object.request.text.length; char ++) {
        // if (finalText.length > linesPerPage - 1) break

        const currentChar = object.request.text.split('')[char]
        if(currentLine.length == canvasInfo.textWidth){
            finalText.push(currentLine.trim())
            currentLine = ''
        }
        if(currentChar == '\n') {
            finalText.push(currentLine.trim())
            finalText.push('')
            currentLine = ''
        }
        currentLine += currentChar

    }
    if(currentLine != '') finalText.push(currentLine.trim())
    const totalPages = object.options.pages ? Number(object.options.pages) : Math.ceil(finalText.length/canvasInfo.linesPerPage)    
    const textInfo = {
        totalPages: totalPages,
        textbyLine: finalText,
        textHeight: canvasInfo.textHeight,
        textWidth: canvasInfo.textWidth,
        linesPerPage: canvasInfo.linesPerPage
    }
    return textInfo
}