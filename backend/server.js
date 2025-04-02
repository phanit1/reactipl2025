const express = require('express');
// const puppeteer = require('puppeteer');
const cors = require('cors');
const puppeteer = require('puppeteer-core');
const chrome = require('@sparticuz/chrome-aws-lambda');


const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the server! Here you can find IPL 2025 data.');
});

app.get('/api/iplmatches', async (req, res) => {

        // const browser = await puppeteer.launch({
        //     args: chromium.args,
        //     executablePath: await chromium.executablePath,
        //     headless: chromium.headless,
        // });

        // Your Puppeteer code here...

        // await browser.close();
        // res.status(200).send('Puppeteer execution successful.');



    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

    const page = await browser.newPage();
    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/matches');
    
    const content = await page.content();
    await browser.close();
    
    res.send(content);
});

app.get('/api/iplpoints', async (req, res) => {
    // const browser = await puppeteer.launch();
    console.log(chromium.executablePath,"exe")
    // const browser = await puppeteer.launch({
    //     args: chromium.args,
    //     executablePath: await chromium.executablePath,
    //     headless: chromium.headless,
    // });
    const browser = await puppeteer.launch({
        args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });
    const page = await browser.newPage();
    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025/points-table');
    
    const content = await page.content();
    await browser.close();
    
    res.send(content);
});


app.listen(5000, () => console.log('Server running on port 5000'));
