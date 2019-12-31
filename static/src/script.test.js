//const { checkValueName } = require("./index.js");
const puppeteer = require("puppeteer");

test("It should return 3 rows after inserted values into the table ", async ()=>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo: 80,
        args: ["--window-size=1920,1080"]
    });


    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");
    await page.click("input#StudentId");
    await page.type("input#StudentId", "3");
    await page.click("input#Name");
    await page.type("input#Name", "111");
    await page.click("input#Lastname");
    await page.type("input#Lastname", "111");
    await page.click("input#Age");
    await page.type("input#Age", "111");

    await page.click("input#City");
    await page.type("input#City", "111");

    await page.click("button#Create");

    const finaltext = await page.evaluate(() => {
       var res = [];
        let title = document.querySelectorAll('.row').length;

        return title
    });
    expect(finaltext).toBe(3);
}, 20000);

test("It should return 2 rows after deleted picked row in the table ", async ()=>{

    const browser = await puppeteer.launch({
           headless:false,
           slowMo: 80,
           args: ["--window-size=1920,1080"]
         });
    //
    //
    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");
    await page.click("input#StudentId");
    await page.type("input#StudentId", "3");
    await page.click("button#Delete");
    await page.reload();
    const finaltext = await page.evaluate(() => {

        let title = document.querySelectorAll('.row').length;

        return title
    });
    expect(finaltext).toBe(2);
}, 20000);
/*
test("It should return updated row after inserted values into the table ", async ()=>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo: 80,
        args: ["--window-size=1920,1080"]
    });


    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");
    await page.click("input#StudentId");
    await page.type("input#StudentId", "3");
    await page.click("input#Name");
    await page.type("input#Name", "112");
    await page.click("input#Lastname");
    await page.type("input#Lastname", "112");
    await page.click("input#Age");
    await page.type("input#Age", "1112");

    await page.click("input#City");
    await page.type("input#City", "1112");

    await page.click("button#Update");

    const finaltext = await page.evaluate(() => {

        let title = document.querySelectorAll('.row');

        return title.innerText
    });
    expect(finaltext).toBe(3);
}, 20000);

test("It should return undefined when you press delete without id ", async ()=>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo: 80,
        args: ["--window-size=1920,1080"]
    });


    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");

    await page.click("button#Delete");

    expect().toBe(undefined);
}, 20000);

test("It should return undefined when you press create without id ", async ()=>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo: 80,
        args: ["--window-size=1920,1080"]
    });


    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");

    await page.click("button#Create");

    expect().toBe(undefined);
}, 20000);

test("It should return undefined when you press update without id ", async ()=>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo: 80,
        args: ["--window-size=1920,1080"]
    });


    const page = await browser.newPage();

    await page.goto("http://localhost:8080/public/index.html");

    await page.click("button#Update");

    expect().toBe(undefined);
}, 20000);
*/