import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";
import { enqueue } from "../utils/queueManager.js";

const status = Router();

// Middleware để parse JSON body
status.use(express.json());
status.use(express.urlencoded({ extended: true }));

status.post("/check", async (req, res) => {
    const { name, nameapp } = req.body;

    if (!name || !nameapp) {
        return res.status(400).send("ERROR: Missing required fields");
    }

    try {
        const result = await enqueue(name, async () => {
            // Sử dụng Admin SDK syntax
            const docRef = db.collection("user_app").doc(name);
            const docSnap = await docRef.get();

            if (docSnap.exists) { // ✅ Sửa thành .exists (không có dấu ngoặc)
                const data = docSnap.data();
                if (data.hasOwnProperty(nameapp)) {
                    return data[nameapp];
                } else {
                    await docRef.update({ [nameapp]: "ON" }); // ✅ Sửa thành .update()
                    return "ON";
                }
            } else {
                await docRef.set({ [nameapp]: "ON" }); // ✅ Sửa thành .set()
                return "ON";
            }
        });

        res.status(200).send(result);
    } catch (error) {
        console.error("Queue or Firestore error:", error);
        res.status(500).send("ERROR: Server error");
    }
});

export default status;