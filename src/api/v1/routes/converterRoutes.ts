import { Router } from "express"
import { createImage } from '../controllers/converterController'
import { createConverterObject } from "../middleware/createConverterOptions"

const router = Router()

router.get('/', createConverterObject, createImage)

module.exports = router