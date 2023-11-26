import express from "express";
const http = require('http');
import cors from "cors";
import path from 'path';
require('dotenv').config();

import { sample_marble, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";
import marbleRouter from './routers/marble.router';
import userRouter from './routers/user.router';
import { dbConnect } from "./configs/database.config";

console.log('MONGO_URI:', process.env.MONGO_URI);

dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: ["*"],
}));




// Log middleware for tracking incoming requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/marble", marbleRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, '../../frontend/dist/frontend')));

app.get('/*', (req, res) => {
  console.log('Serving frontend index.html');
  res.sendFile(path.join(__dirname, '../../frontend/dist/frontend/index.html'));
});

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
