import { Router } from "express"
import { createImage, getPages } from '../controllers/index'
import { createConverterObject, handleApiError, validateConverterData } from "../middleware/index"

const router = Router()

// router.use(validateConverterData)
// router.use(createConverterObject)
// router.use(handleApiError)

router.get('/converter', validateConverterData, createConverterObject, handleApiError, createImage)
router.get('/page-count', validateConverterData, createConverterObject, handleApiError, getPages)


module.exports = router