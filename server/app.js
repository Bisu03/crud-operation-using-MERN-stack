const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const data = require('./routes/userRoutes')
const cors = require("cors")
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/', data)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))