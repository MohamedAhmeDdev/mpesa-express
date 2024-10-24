const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express()


app.use(express.json())
app.use(cors())

const  lipaNaMpesaRoutes = require("./routes/routes.lipanampesa.js")
app.use('/api',lipaNaMpesaRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
