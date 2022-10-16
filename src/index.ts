import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api', require('./api/v1/routes/converterRoutes'))

app.listen(process.env.PORT || 3000, () => {
    console.log("app is listening...")
})

//TODO Write unit tests
// https://www.testim.io/blog/unit-test-rest-api/