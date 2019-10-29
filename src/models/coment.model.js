import mongoose from 'mongoose';

const CommentsSchema=new mongoose.Schema({
    nameUser:String,
    commentary:String
},{
    timestamps:true
});

const CommentsModel=mongoose.model('Comments',CommentsSchema);
export default CommentsModel;