//start server
const app = require('./src/app')
const connectDB = require('./src/db/db')
require('dotenv').config();

const port = process.env.PORT
// const link = `http://localhost:${port}`

connectDB();

app.listen(`${port}`, () => {
    console.log(`server is running on http://localhost:3000`)
});