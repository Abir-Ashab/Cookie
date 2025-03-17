const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: ["https://cookie-si4u.vercel.app/", "https://niloy-is-testing.github.io"], 
    credentials: true // Allow sending cookies
}));

app.post("/login", (req, res) => {
    const cookieType = req.query.type; // Get cookie type from query parameter
    let cookie = "user=hussein;";

    switch (cookieType) {
        case "strict":
            cookie = "user=hussein; samesite=strict; secure";
            break;
        case "lax":
            cookie = "user=hussein; samesite=lax; secure";
            break;
        case "none":
            cookie = "user=hussein; samesite=none; secure";
            break;
    }

    res.setHeader("set-cookie", [cookie]);
    res.send(`Cookie set: ${cookie}`);
});

app.get("/img", (req, res) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        res.sendFile(`${__dirname}/cookie.png`);
    } else {
        res.sendStatus(403);
    }
});

app.listen(8080, () => console.log("Listening on port 8080"));
