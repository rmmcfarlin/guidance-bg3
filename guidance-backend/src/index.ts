import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import app from './app'
import cors from 'cors'

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
