import { ConverterObject } from "../interfaces/index"
import { createCanvas, registerFont } from 'canvas'
import { calculatePages } from "./pageCalculatorService"

export const textToImage = ( object: ConverterObject) => {
    //TODO add all supported fonts via this method and unregister others
    registerFont('src/api/v1/config/fonts/HinaMincho-Regular.ttf', { family: 'Hina Mincho' })
    
    let textInfo = calculatePages(object)
    const canvases = []
    for (let page = 0; page < textInfo.totalPages; page ++) {
        const canvas = createCanvas(Number(object.options.width), Number(object.options.height))
        const context = canvas.getContext('2d')
        const startIndex = page * object.options.linesPerPage
        const endIndex = startIndex + object.options.linesPerPage
        const currentPageText: string[] = textInfo.textbyLine.slice(startIndex, endIndex)
    
        context.fillStyle = object.options.backgroundColor
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = object.options.textColor
        const font = `${object.options.fontSize}px ${object.options.fontFamily}`
        context.font = font
        context.textBaseline = 'top'
        let currentY = 0 + Number(object.options.padding)
        for (let line of currentPageText) {
            context.fillText(line, Number(object.options.padding), currentY)
            currentY += textInfo.textHeight
        }
        canvases.push(canvas)
    }
    
    return canvases
}