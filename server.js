import express, { Router } from 'express'
import connectDB from './database/mongodb.js'
import router from './routes/router.js'

const app = express()

app.use(express.json())

const port = 4000
connectDB()

app.use(router)
app.listen(port,() => {
    console.log('server has been started on ', port)
})