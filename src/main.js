import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`\x1b[35mApp listening on port ${port}`)
})
