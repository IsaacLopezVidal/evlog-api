import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model';
import Comment from '../models/coment.model';
const router =express.Router();

router.get('/',async(req,res)=>{
    const Comments = await Comment.find().sort({ createdAt: -1 }).exec()
    return res 
    .status(200)
    .json({data: Comments})
})

//POST 
router.post('/', async (req, res) => {
    const { comment } = req.body

    const {authorization}= req.headers;
    var decoded = jwt.decode(authorization, {complete: true});
    const {correo}=decoded.payload;
    const user = await Student.findOne({ correo }).exec();

    if (!user) {
      return res.status(401).json({
        message: "UNAUTHORIZED",
      });
    }
    
    const newStudent = new Comment({nameUser:user.nombre,commentary:comment})
    await newStudent.save()
    return res
        .status(201)
        .json()
})

export default router;
