import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";
import { enqueue } from "../utils/queueManager.js"; // 👈 Thêm dòng này

const stt = Router();

stt.use(express.json());
stt.use(express.urlencoded({ extended: true }));

stt.post("/stt", async (req, res) => {
    const { getstt } = req.body;

    if (!getstt) {
        return res.status(400).send("Thiếu tham số truyền");
    }

    try {
        const result = await enqueue(getstt, async () => {
            const docRef = doc(db, "so_thu_tu", "STT");
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error("Document không tồn tại");
            }
            const data = docSnap.data();
            let current = data[getstt];
            if (current === undefined) {
                throw new Error("Không có xưởng cần lấy số");
            }

            current = current < 999 ? current + 1 : 1;

            await updateDoc(docRef, { [getstt]: current });

            return current;
        });

        res.status(200).send(result.toString());

    } catch (error) {
        console.error("Firestore or Queue error:", error.message);
        if (error.message === "Document không tồn tại" || error.message === "Không có xưởng cần lấy số") {
            return res.status(404).send(error.message);
        }
        res.status(500).send("Lỗi server hoặc Firestore");
    }
});

export default stt;
