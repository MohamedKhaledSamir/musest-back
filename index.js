const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/search", async (req, res) => {
  try {
    const { type, value, isId, secondParam } = req.body;
    let response;
    if (isId) {
      if (secondParam) {
        response = await axios.get(
          `https://api.deezer.com/${type}/${value}/${secondParam}`
        );
      } else {
        response = await axios.get(`https://api.deezer.com/${type}/${value}`);
      }
    } else {
      response = await axios.get(
        `https://api.deezer.com/search/${type}?q=${value}`
      );
    }
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Deezer" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
