import mongoose from 'mongoose'

const connectDB = async () => {
    try{
   await mongoose.connect("mongodb://localhost:27017/notesManagementSystem")
    console.log("database connected successfully....")
    }catch(error){
        console.log("database cannot connected successfully....")
        process.exit(1)
    }
}

export default connectDB