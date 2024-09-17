import User from "@/models/User"
import { verifyPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"

import NextAuth  from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    session: { strategy: "jwt" },
    providers: [ CredentialsProvider({

        async authorize(credentials , req) {

            const {email , password} = credentials
            console.log({email , password})


            try {
                await connectDB()
            } catch (error) {
                console.log(error)
                throw new Error("Error in connecting to DB")
            }

            if(!email || !password){ throw new Error("Invalid Data")}

            const user = await User.findOne({email:email})
            if(!user) { throw new Error("user dosent exist")}

            const isValid = await verifyPassword(password , user.password)
            if(!isValid) {throw new Error("username or password is incorrect")}

            console.log("logined")

            return {email}
        }
    })],
}

export default NextAuth (authOptions)
