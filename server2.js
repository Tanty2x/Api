import express from "express";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firestore.js";

const app = express();
const port = 3000;



// Object.assign(newData, oldData)

// await setDoc(doc(db, "user_app", "NEW"), {newData});

// const name = "T"

// Middleware để parse dữ liệu từ form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/api/check-status', async (req, res) => {

    const { name, nameapp } = req.body;
    const docRef = doc(db, "user_app", name);

    try {
        // Lấy dữ liệu từ form-urlencoded (AutoLISP gửi lên)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.hasOwnProperty(nameapp)) {
                res.status(200).send(data[nameapp])
            } else {
                let newData = Object.assign(data, {[nameapp]: "ON"})
                await setDoc(doc(db, "user_app", name), {newData});
                res.status(200).send("ON")
            }
        } else {
            res.status(200).send("OFF")
        }
        // res.status(200).send(status);
    } catch (error) {
        res.status(500).send("ERROR: Server error");
    }
});

app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
});

