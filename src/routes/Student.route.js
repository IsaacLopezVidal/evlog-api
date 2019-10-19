import express from 'express'
import bcrypt from 'bcrypt';
import Student from '../models/student.model'
import isValidId from '../middleware/id.middleware'
const router =express.Router();

//GET
router.get('/', async (req, res) =>{
    const student = await Student.find().exec()
    return res 
    .status(200)
    .json({data: student})
})

//GET/:id
router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    isValidId(res,id);
    const student = await Student.findById(id).exec()
    if(!student){
        res.status(404).json()
    }
    return res
    .status(201)
    .json(student)
})

//POST 
router.post('/', async (req, res) => {
    const { cct,nombre,correo,contrasenia } = req.body
    const newContrasenia=await bcrypt.hash(contrasenia,10)
    //TODO: add validations
    const newStudent = new Student({cct,nombre,correo,contrasenia:newContrasenia})
    await newStudent.save()
    return res
        .status(201)
        .json()
})
//PATCH
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const body = req.body   
    //TODO: add validations
    isValidId(res,id);
    const student = await Student.findByIdAndUpdate(id, {
        $set: {...body}
    }, {new:true}).exec()

    if(!student){
        return res.status(404).json()
    }
    return res
        .status(200)
        .json(student)
})

//DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    isValidId(res,id);
    await Student.findOneAndDelete(id).exec()
    return res
    .status(200)
    .json()
})

export default router;