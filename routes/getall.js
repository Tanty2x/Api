import express, { Router } from "express";
import admin from "firebase-admin";

const db = admin.firestore();
const getall = Router();

getall.use(express.json());
getall.use(express.urlencoded({ extended: true }));

// Lấy dữ liệu document "STT" trong collection "so_thu_tu"
getall.get("/getall", async (req, res) => {
  try {
    const docRef = db.collection("so_thu_tu").doc("STT");
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).send("Không tìm thấy tài liệu");
    }

    return res.status(200).send(docSnap.data());
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send("Lỗi server hoặc Firestore");
  }
});

export default getall;
