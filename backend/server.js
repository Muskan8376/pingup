// import express from 'express'

// import 'dotenv/config';
// import cors from 'cors'
// import connectDB from './config/db.js';
// import { inngest, functions } from './Inngest/index.js';
// import { serve } from 'inngest/astro';
// // import { Server } from 'http';

// const app = express();
// await connectDB()

// app.use(express.json());
// app.use(cors())
// app.get('/',(req,res)=> res.send('server is running '))
// app.use('/api/inngest',serve({ client: inngest, functions }))

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, ()=> console.log(`server is running on the port ${PORT}`  ))


import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/db.js";
import { inngest, functions } from "../Inngest/index.js";
import { serve } from "inngest/express";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => res.send("Server is running ✅"));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Connect DB before export (optional, or lazy init inside functions)
await connectDB();

// ❌ DO NOT use app.listen() on Vercel
export default app;
