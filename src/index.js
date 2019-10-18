import '@babel/polyfill';
import "dotenv/config";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'

import StudentRoute from './routes/Student.route'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:'*',
  }))

app.use('/student',StudentRoute);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  }, (err) => {
    if (err) throw err;
    // Mounting the app on specific port
    app.listen(PORT, () => {
      console.log(`evlog API is listening in port ${PORT}`);
    });
  });
  