import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let DBConnection: mongoose.Connection | null = null;

const connectDB = async () => {
    try {
        if (DBConnection) {
            return DBConnection;
        }
        const conn = mongoose.createConnection(process.env.DB_URL!);

        await new Promise<void>((resolve, reject) => {
            conn.once("open", () => {
                console.log("Connected to DB : " + conn.db?.databaseName);
                resolve();
            });

            conn.on("error", (err) => {
                reject(err);
            });
        });

        DBConnection = conn;

        return conn;
    } catch (error) {
        console.error('Error connecting to physicsDB:', error);
        process.exit(1);
    }
}

export default connectDB;