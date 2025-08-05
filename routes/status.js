import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
            const docRef = doc(db, "user_app", name);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.hasOwnProperty(nameapp)) {
                    return data[nameapp];
                } else {
                    await updateDoc(docRef, { [nameapp]: "ON" });
                    return "ON";
                }
            } else {
                await setDoc(docRef, { [nameapp]: "ON" });
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
