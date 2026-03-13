import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import { paystackWebhook, stripeWebhook } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import adminRouter from './routes/adminRoutes.js'

// app config

const app = express()
const port = process.env.PORT || 4000

// conect DB & Cloudinary
await connectDB()
await connectCloudinary()

// midlewares
app.use(express.json())
app.use(cors())


//API endpoint
app.use('/api/admin', adminRouter)


app.get('/', (req, res) => {
  res.send('API IS WORKING PERFECT')
})

app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook)
app.post('/paystack', express.raw({ type: 'application/json' }), paystackWebhook)




app.listen(port, () => console.log("Server Started", port))