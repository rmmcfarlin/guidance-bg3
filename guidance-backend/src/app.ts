import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.get('/health', (req,res) => {
    res.json({ status: 'ok'})
})

export default app