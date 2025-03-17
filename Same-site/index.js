const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from multiple origins dynamically
const allowedOrigins = ["https://cookie-si4u.vercel.app", "https://niloy-is-testing.github.io"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
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
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*"); // Allow dynamic origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
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
