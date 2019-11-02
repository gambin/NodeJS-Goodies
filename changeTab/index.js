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
            if (handles.length != totalTab){
                totalTab = handles.length;
            }

            // Defines last tab to be switched
            lastTabIndex = lastTabIndex < (totalTab - 1)? lastTabIndex + 1 : 0; 

            driver.switchTo().window(handles[lastTabIndex]);
        });
        changeTab();
    }, switchIntervalSeconds * 1000);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Press any key to start tab switching :D ', (answer) => {
  console.log('Starting... \n');
  changeTab();
  rl.close();
});
