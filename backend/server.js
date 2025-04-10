const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Razorpay = require("razorpay");
const Keys = require("./config.json");

const app = express();
const PORT = process.env.PORT || 5000;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", UserSchema);

const BetDetailSchema = new mongoose.Schema({
    type: { type: String },
    betOn: { type: String}
});

const BiddingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    matchName: { type: String, required: true },
    bets: { type: [BetDetailSchema], required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Bidding = mongoose.model("Bidding", BiddingSchema);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const razorpay = new Razorpay({
    key_id: Keys.RAZORPAY_KEY_ID,
    key_secret: Keys.RAZORPAY_SECRET,
});

app.use(cors());
app.use(express.json());

const CRICBUZZ_URL = "https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/matches";
const IPL_INFO_URL = "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js";
const IPL_POINTS_TABLE_URL = "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js";
let matchSummary = [];

app.get("/api/iplpointstable", async (req, res) => {
    try {
        const iplinforesponse = await axios.get(IPL_POINTS_TABLE_URL);
        const jsonString = iplinforesponse.data.match(/ongroupstandings\((.*)\)/)[1];
        const parsed = JSON.parse(jsonString);
        const pointsTableData = parsed.points;
        res.json({ success: true, pointsTable: pointsTableData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/iplscore/:matchId", async (req, res) => {
    const matchId = req.params.matchId;
    try {
        const response = await axios.get("https://reactipl2025backend.vercel.app/api/iplmatches");
        const matchData = response.data;
        matchSummary = matchData.matches;
    } catch (error) {
        return res.status(500).json({ success: false, error: "Failed to fetch match data" });
    }
    const match = matchSummary.find((m) => m.MatchID == matchId);
    const INN1_URL = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings1.js`;
    const INN2_URL = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings2.js`;
    const HEADTOHEADURL = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/match/${matchId}-headTohead.js`;

    try {
        if (match.MatchStatus == 'Live') {
            try {
                const inn1response = await axios.get(INN1_URL);
                const inn1String = inn1response.data.match(/onScoring\((.*)\)/)[1];
                const inn1Parsed = JSON.parse(inn1String);

                try {
                    const inn2response = await axios.get(INN2_URL);
                    const inn2String = inn2response.data.match(/onScoring\((.*)\)/)[1];
                    const inn2Parsed = JSON.parse(inn2String);

                    res.json({ success: true, matchDetails: match, scores1: inn1Parsed, scores2: inn2Parsed });
                } catch {
                    res.json({ success: true, matchDetails: match, scores1: inn1Parsed, scores2: null });
                }
            } catch {
                try {
                    const inn2response = await axios.get(INN2_URL);
                    const inn2String = inn2response.data.match(/onScoring\((.*)\)/)[1];
                    const inn2Parsed = JSON.parse(inn2String);

                    res.json({ success: true, matchDetails: match, scores1: null, scores2: inn2Parsed });
                } catch {
                    res.json({ success: true, scores1: null, scores2: null });
                }
            }
        } else if (match.MatchStatus == 'Post') {
            const inn1response = await axios.get(INN1_URL);
            const inn2response = await axios.get(INN2_URL);
            const inn1String = inn1response.data.match(/onScoring\((.*)\)/)[1];
            const inn2String = inn2response.data.match(/onScoring\((.*)\)/)[1];
            const inn1Parsed = JSON.parse(inn1String);
            const inn2Parsed = JSON.parse(inn2String);
            res.json({ success: true, matchDetails: match, scores1: inn1Parsed, scores2: inn2Parsed });
        } else {
            const headtoheadresponse = await axios.get(HEADTOHEADURL);
            const headtoheadString = headtoheadresponse.data.match(/onMatchHTH\((.*)\)/)[1];
            const headtoheadParsed = JSON.parse(headtoheadString);
            const headToHead = headtoheadParsed.HeadToHead;
            res.status(200).json({ success: true, matchDetails: match, headToHead: headToHead, message: "Match Innings not Started" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/iplmatches", async (req, res) => {
    try {
        const iplinforesponse = await axios.get(IPL_INFO_URL);
        const jsonString = iplinforesponse.data.match(/MatchSchedule\((.*)\)/)[1];
        const parsed = JSON.parse(jsonString);
        matchSummary = parsed.Matchsummary.sort((a, b) => new Date(a.MatchDateNew) - new Date(b.MatchDateNew));
        res.json({ success: true, matches: matchSummary });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const userExists = await User.find({ email: email, role: role });
        if (userExists.length > 0) {
            return res.status(409).json({ success: false, message: "User with this email and role already exists" });
        } else {
            const user = await User.create({ email, password, role });
            res.status(201).json({ success: true, message: "User registered successfully" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        res.json({ success: true, message: "Login successful", userData: { email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: "Payment order creation failed" });
    }
});

app.post("/api/iplbidding", async (req, res) => {
    const { email, matchName, bets, amount } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please register first." });
        }
        const existingBid = await Bidding.findOne({ email, matchName });
        if (existingBid) {
            return res.status(409).json({ success: false, message: "You have already placed a bet on this match" });
        }
        const newBid = new Bidding({ email, matchName, bets, amount });
        await newBid.save();
        res.status(201).json({ success: true, message: "Bid placed successfully", bid: newBid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/iplbidding", async (req, res) => {
    try {
        const bids = await Bidding.find();
        res.status(200).json({ success: true, bids });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const url = "mongodb+srv://ppaproject:Teamwork12@sample-sxout.mongodb.net/IPLUsersDB?retryWrites=true&w=majority";

mongoose.connect(url);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
