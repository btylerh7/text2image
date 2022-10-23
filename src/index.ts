import express from 'express'
import cors from 'cors'

export const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use('/api', require('./api/v1/routes/converterRoutes'))


app.listen(process.env.PORT || 3000, () => {
    console.log("app is listening...")
})

