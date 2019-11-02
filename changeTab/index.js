const selenium = {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const readline = require('readline');

const switchIntervalSeconds = 30;
let lastTabIndex = 0;
let totalTab = 0;
let o = new chrome.Options();

o.addArguments('disable-infobars');
o.setUserPreferences({ credential_enable_service: false });

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
    var driver = new selenium.Builder()
  .forBrowser('chrome')
  .build();

function changeTab() {
    console.log(`Loading Chrome tab ${lastTabIndex}`);
    setTimeout(function () {
        driver.getAllWindowHandles().then(function (handles) {

            // Updates current number of tabs
            totalTab = handles.length != totalTab ? handles.length : totalTab;

            // Defines last tab to be switched
            lastTabIndex = lastTabIndex < (totalTab - 1)? lastTabIndex + 1 : 0; 

            // make it happens!
            driver.switchTo().window(handles[lastTabIndex]);
        });

        // reload
        changeTab();
    }, switchIntervalSeconds * 1000);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Open how many tabs you want \nand press any key to start tab switching \nduring ${switchIntervalSeconds} seconds interval!`, (answer) => {
  console.log('Starting... \n');
  changeTab();
  rl.close();
});
