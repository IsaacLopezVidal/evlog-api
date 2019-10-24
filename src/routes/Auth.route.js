import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model';

const router = express.Router();

// POST: /login
router.post('/login', async (req, res) => {
  const { correo, contrasenia } = req.body;

  const user = await Student.findOne({ correo }).exec();
  if (!user) {
    return res.status(401).json({
      message: "UNAUTHORIZED",
    });
  }

  const verifycontrasenia = await bcrypt.compare(contrasenia, user.contrasenia);
  if (!verifycontrasenia) {
    return res.status(401).json({
      message: "UNAUTHORIZED",
    });
  }

  const token = await jwt.sign({ correo }, process.env.JWT_SECRET, {
    expiresIn: 120 * 60 * 1000,
  });

  return res.json({
    token,
  });
});

router.get('/varify',async(req,res)=>{
    const {authorization}= req.headers;
    var decoded = jwt.decode(authorization, {complete: true});
    const {correo}=decoded.payload;
    const user = await Student.findOne({ correo }).exec();
    if (!user) {
      return res.status(401).json({
        message: "UNAUTHORIZED",
      });
    }
    res.status(201).json({nombre:user.nombre })
})




export default router;
