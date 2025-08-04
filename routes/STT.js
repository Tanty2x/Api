import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";

const stt = Router();

stt.use(express.json());
stt.use(express.urlencoded({ extended: true }));

stt.post("/stt", async (req, res) => {
    const { getstt } = req.body;

    if (!getstt) {
        return res.status(400).send("Thiếu tham số truyền");
    }

    const docRef = doc(db, "so_thu_tu", "STT");

    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return res.status(404).send("Document không tồn tại");
        }

        const data = docSnap.data();
        let current = data[getstt];

        if (current === undefined) {
            return res.status(404).send("Không có xưởng cần lấy số");
        }

        current = current <999 ? current + 1 : 1;

        await updateDoc(docRef, { [getstt]: current });

        return res.status(200).send(current.toString());

    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).send("Lỗi server hoặc Firestore");
    }
});

export default stt;
