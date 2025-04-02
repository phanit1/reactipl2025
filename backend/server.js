const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the server! Here you can find IPL 2025 data.');
});

app.get('/api/iplmatches', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/matches');
    
    const content = await page.content();
    await browser.close();
    
    res.send(content);
});

app.get('/api/iplpoints', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/points-table');
    
    const content = await page.content();
    await browser.close();
    
    res.send(content);
});


app.listen(5000, () => console.log('Server running on port 5000'));
