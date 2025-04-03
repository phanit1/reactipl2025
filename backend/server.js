const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Cricbuzz URL for IPL 2025 Schedule (Update if needed)
const CRICBUZZ_URL = "https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/matches"; 

// API Route to Scrape IPL 2025 Schedule
app.get("/api/iplmatches", async (req, res) => {
    try {
        // Fetch Cricbuzz page content
        const response = await axios.get(CRICBUZZ_URL);
        const $ = cheerio.load(response.data);
        // console.log("Page Title:", $("title").text());
        let scheduleData = [];

        // Cricbuzz match elements
        $(".cb-series-matches").each((index, element) => {
            const dateElement = $(element).find("[ng-bind*='date:']");
            const dateTimestamp = dateElement.length ? dateElement.attr("ng-bind").match(/\d+/)[0] : null;

            const timeElement = $(element).find("[timestamp]");
            const timeTimestamp = timeElement.length ? timeElement.attr("timestamp") : null;

            if (!dateTimestamp || !timeTimestamp) return;

            const date = new Date(parseInt(dateTimestamp));
            const time = new Date(parseInt(timeTimestamp));

            // Format Date & Time
            const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                weekday: "short",
            });

            const formattedTime = time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            // Extract Match Details
            const matchDetailsElement = $(element).find(".cb-srs-mtchs-tm a span");
            const matchDetails = matchDetailsElement.length ? matchDetailsElement.text().trim() : null;

            const venueElement = $(element).find(".cb-srs-mtchs-tm .text-gray");
            const venue = venueElement.length ? venueElement.text().split("0")[0].split("1")[0].trim() : null;

            const resultElement = $(element).find(".cb-text-complete");
            const result = resultElement.length ? resultElement.text().trim() : "Upcoming";

            if (matchDetails) {
                scheduleData.push({
                    date: formattedDate,
                    matchDetails,
                    venue,
                    result,
                    time: formattedTime,
                });
            }
        });

        // Process Matches into a Clean JSON Structure
        const ipl2025Matches = scheduleData.map((match) => {
            const teams = match.matchDetails.split(" vs ");
            const matchNumber = teams[1].split(",")[1]?.trim() || "TBD";

            return {
                date: match.date,
                team1: teams[0],
                team2: teams[1].split(",")[0].trim(),
                matchNumber: matchNumber,
                venue: match.venue,
                time: match.time,
                status: match.result || "Upcoming",
            };
        });

        res.json({ success: true, matches: ipl2025Matches });
    } catch (error) {
        console.error("Error fetching IPL matches:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API Route to Scrape IPL 2025 Points Table (if needed)
// API Route to Scrape IPL 2025 Points Table
app.get("/api/iplpointstable", async (req, res) => {
    try {
        // Fetch Cricbuzz page content
        const POINTS_TABLE_URL = "https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/points-table";
        const response = await axios.get(POINTS_TABLE_URL);
        // console.log("Response:", response.data);
        const $ = cheerio.load(response.data);
        // console.log($,"Response data")
        let pointsTableData = [];

        // Cricbuzz points table elements
        $("table.cb-srs-pnts tbody tr").each((index, element) => {
            const columns = $(element).find("td, th");
      
            // Extract the text content
            const teamName = $(columns[0]).text().trim();
            const matchesPlayed = $(columns[1]).text().trim();
            const matchesWon = $(columns[2]).text().trim();
            const matchesLost = $(columns[3]).text().trim();
            const matchesTied = $(columns[4]).text().trim();
            const matchesNR = $(columns[5]).text().trim();
            const points = $(columns[6]).text().trim();
            const netRunRate = $(columns[7]).text().trim();
      
            if (teamName) {
                pointsTableData.push({
                team: teamName,
                matchesPlayed,
                matchesWon,
                matchesLost,
                matchesTied,
                matchesNR,
                points,
                netRunRate,
              });
            }
          });
      
          console.log(pointsTableData); // Output the extracted
        // Filter out duplicate rows if necessary
        pointsTableData = pointsTableData.filter((item, index) => item.points.length == 1 || item.points.length == 2);

        res.json({ success: true, pointsTable: pointsTableData });
    } catch (error) {
        console.error("Error fetching IPL points table:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
