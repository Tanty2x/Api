import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import express from "express";
import { Router } from "express";

const getall = Router();

getall.use(express.json());
getall.use(express.urlencoded({ extended: true }));

getall.get("/getall", async (req, res) => {
    const docRef = doc(db, "so_thu_tu", "STT");
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return res.status(200).send(data);

    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).send("Lỗi server hoặc Firestore");
    }
});

export default getall;
