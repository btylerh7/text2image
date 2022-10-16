import { Router } from "express"
import { createImage, getPages } from '../controllers/converterController'
import { createConverterObject } from "../middleware/createConverterOptions"

const router = Router()

router.get('/converter', createConverterObject, createImage)
router.get('/page-count', createConverterObject, getPages)


module.exports = router