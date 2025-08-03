import { doc, getDoc, setDoc, updateDoc } from "../lib/firestore.js";
import { db } from "../lib/firestore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

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
}
