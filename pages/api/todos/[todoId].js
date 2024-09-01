import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req , res){
    
    try {
        await connectDB();
    } catch (error) {
        // console.log(error)
        res.status(500).json({status:"failed" , message:"Error in connecting to DB"})
    }

    const session = await getSession({req})
    if(!session){
        return res.status(404).json({status:"failed" , message:"You are not Logged in!"})
    }

    const user = await User.findOne({email: session.user.email})
    // console.log(user)
    if(!user){
        return res.status(401).json({status:"failed" , message:"User dosen't exist!"})
    }

    if(req.method === "GET"){
        res.status(200).json({status:"success" , data:{name:user.name , todos:user.todos}})
    } else if(req.method === "PATCH"){
        const {title , description , status , id} = req.body

        if(!title || !description || !status || !id){
            return res.status(422).json({status:"failed" , message:"Invalid Data!"})
        }

        const result = await User.updateOne({"todos._id" : id} , {$set: {"todos.$.title" : title , "todos.$.description": description , "todos.$.status" : status} })
        res.status(200).json({status:"success"})
    }
}