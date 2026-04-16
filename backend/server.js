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
const allowedOrigins = [
  'http://localhost:5173', 
  'https://kirct.com', 
  'https://www.kirct.com',
  'https://kirct-v1.vercel.app' // Adding Vercel just in case they use it
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json())


//API endpoint
app.use('/api/admin', adminRouter)


app.get('/', (req, res) => {
  res.send('API IS WORKING PERFECT')
})

app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook)
app.post('/paystack', express.raw({ type: 'application/json' }), paystackWebhook)




// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Ensure CORS headers are present even on errors
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173', 
    'https://kirct.com', 
    'https://www.kirct.com',
    'https://kirct-v1.vercel.app'
  ];

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(port, () => console.log("Server Started", port))