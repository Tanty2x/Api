import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";

const status = Router();

// Middleware để parse JSON body
status.use(express.json());
status.use(express.urlencoded({ extended: true }));

// POST /phone
status.post("/check", async (req, res) => {
    const { name, nameapp } = req.body;

    if (!name || !nameapp) {
        return res.status(400).send("ERROR: Missing required fields");
    }

    const docRef = doc(db, "user_app", name);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.hasOwnProperty(nameapp)) {
                res.status(200).send(data[nameapp]);
            } else {
                await updateDoc(docRef, { [nameapp]: "ON" });
                res.status(200).send("ON");
            }
        } else {
            await setDoc(docRef, { [nameapp]: "ON" });
            res.status(200).send("ON");
        }
    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).send("ERROR: Server error");
    }
});

// Route fallback 404
// status.use((req, res) => {
//     res.status(404).send("Not Found");
// });

export default status;
