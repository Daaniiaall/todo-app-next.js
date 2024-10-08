import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
import { getSession } from "next-auth/react";

export default async function handler(req , res) {

    try {
        await connectDB();
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed" , message:"Error in connecting to DB"})
    }

    // To check if the user's token is valid
    const session = await getSession({req})
    // console.log(session)
    if(!session){
        return res.status(404).json({status:"failed" , message:"You are not Logged in!"})
    }
    // To check if the user's token is valid


    const user = await User.findOne({email:session.user.email})
    console.log(user)
    if(!user){
        return res.status(401).json({status:"failed" , message:"User dosen't exist!"})
    }

    if(req.method === "POST"){
        const {title , status , description} = req.body

        if(!title || !status || !description){
            return res.status(422).json({status:"failed" , message:"Invalid Data!"})
        }
        
        user.todos.push({title:title , description:description , status:status})
        user.save()

        res.status(201).json({status:"success" , message:"Todo Created"})
    } else if(req.method === "GET") {
        const sortedData = sortTodos(user.todos)
        res.status(200).json({status:"success" , data: { todos:sortedData }})
    } else if(req.method === "PATCH") {
        const {id , status} = req.body

        if(!id || !status){
            return res.status(422).json({status:"failed" , message:"Invalid Data!"})
        }

        const result = await User.updateOne({"todos._id" : id} , {$set: {"todos.$.status" : status}})
        // console.log(result)
        res.status(200).json({status:"success"})
    }
}