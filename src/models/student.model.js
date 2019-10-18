import mongoose from 'mongoose';

const StudentSchema=new mongoose.Schema({
    cct:String,
    nombre:String,
    correo:String,
    contrasenia:String,
    nivel:{type:mongoose.Schema.Types.ObjectId, ref:'Nivel'},
    grado:{type:mongoose.Schema.Types.ObjectId, ref:'Grade'},
    escuela:{type:mongoose.Schema.Types.ObjectId, ref:'School'}
},{
    timestamps:true
});

const StudentModel=mongoose.model('Student',StudentSchema);
export default StudentModel;