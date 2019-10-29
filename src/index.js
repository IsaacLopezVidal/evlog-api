import '@babel/polyfill';
import "dotenv/config";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import AuthMiddleware from './middleware/auth.middleware';
import StudentRoute from './routes/Student.route'
import AuthRoute from './routes/Auth.route'
import CommentsRoute from './routes/Comments.route'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:'*',
  }));

app.use('/auth',AuthRoute);
app.use('/student',AuthMiddleware,StudentRoute);
app.use('/comments',CommentsRoute);


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  }, (err) => {
    if (err) throw err;
    // Mounting the app on specific port
    app.listen(PORT, () => {
      console.log(`evlog API is listening in port ${PORT}`);
    });
  });
  