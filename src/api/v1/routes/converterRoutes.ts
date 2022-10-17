import { Router } from "express"
import { createImage, getPages } from '../controllers/index'
import { createConverterObject, validateConverterData } from "../middleware/index"

const router = Router()

router.get('/converter', validateConverterData, createConverterObject, createImage)
router.get('/page-count', validateConverterData, createConverterObject, getPages)


module.exports = router