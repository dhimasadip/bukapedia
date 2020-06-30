require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)
app.use(errorHandler)


if (process.env.NODE_ENV != 'test') {
    app.listen(port, () => console.log(`App running at: http://localhost:${port}`))
} else if(process.env.NODE_ENV == 'test') {
    module.exports = app
}
