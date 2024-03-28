const express = require('express');
const cors = require('cors');
const { getDownloadURL, ref } = require('firebase/storage');
const app = express();

app.use(cors([{
    "origin": ["http://localhost:3000/"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }]));

app.get("/download/:imageName", async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imageURL = await getDownloadURL(ref(storage, `TestImgs/${imageName}`));
        res.redirect(imageURL);
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).send("Error downloading file");
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
