import express from "express";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firestore.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Thêm dòng này để xử lý JSON
app.use(express.urlencoded({ extended: true }));

// const port = 3000;

app.post('/check-status', async (req, res) => {
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
            await setDoc(docRef, {
                [nameapp]: "ON"
            });
            res.status(200).send("ON");
        }
    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).send("ERROR: Server error");
    }
});

// Xử lý các route không tồn tại
app.use((req, res) => {
    res.status(404).send("Not Found");
});
