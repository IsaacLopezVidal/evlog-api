import mongoose from 'mongoose';

const isValidId=(res,id)=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: 'The format id is not valid'
        })
    }
}

export default isValidId;