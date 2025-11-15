import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.info("Conexión a la base de datos establecida");
    })
} catch (error) {
    console.error(error)
}

export default mongoose;