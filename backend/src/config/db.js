import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Yeah baby!")
    } catch(error) {
        console.log("God damn it", error)
        process.exit(1) // exit with failure, 0 means success
    }
}