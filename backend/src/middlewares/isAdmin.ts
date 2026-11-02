// import { Request, Response, NextFunction } from "express";
// import User from "../models/User.js";

// const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.body.userid;

//     if (!userId) {
//         return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const user = await User.findById(userId);

//     if (!user || user.role !== "admin") {
//         return res.status(403).json({ success: false, message: "Forbidden" });
//     }

//     next();
// }