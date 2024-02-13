import {AsyncHandler} from "../utils/AsyncHandler.js"

const userRegistration=AsyncHandler (async (req,res)=>{
    res.status(200).json({message:"User Registration"})
})

export {
    userRegistration
}