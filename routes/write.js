import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";

const write = Router();
write.use(express.json());

write.post("/write", async (req, res) => {
    const data = req.body;
    
    try {
        // Sử dụng Admin SDK syntax
        const docRef = db.collection("so_thu_tu").doc("STT");
        await docRef.set(data); // ✅ Sửa thành .set()
        
        return res.status(200).send("Đã cập nhật lại số thứ tự");

    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).send("Lỗi server hoặc Firestore");
    }
});

export default write;