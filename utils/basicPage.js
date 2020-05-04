const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
	this.driver = new Builder()
		.setChromeOptions(o)
		.forBrowser('chrome')
		.build();

	// visit a webpage
	this.visit = async function(theUrl) {
		return await this.driver.get(theUrl);
	};

	// quit current session
	this.quit = async function() {
		return await this.driver.quit();
	};

	// wait and find a specific element with it's id
	this.findById = async function(id) {
		await this.driver.wait(until.elementLocated(By.id(id)), 35000, 'Looking for element');
		return await this.driver.findElement(By.id(id));
	};

	// wait and find a specific element with it's name
	this.findByName = async function(name) {
		await this.driver.wait(until.elementLocated(By.name(name)), 35000, 'Looking for element');
		return await this.driver.findElement(By.name(name));
	};

	// wait and find elements with css
	this.findByCss = async function(selector) {
		await this.driver.wait(until.elementLocated(By.css(selector)), 35000, 'Looking for element');
		return this.driver.findElements(By.css(selector));
	};

	// wait and find elements with xpath
	// this.findByCss = async function(selector) {
	// 	await this.driver.wait(until.elementLocated(By.css(selector)), 35000, 'Looking for element');
	// 	return this.driver.findElements(By.css(selector));
	// };


	// fill input web elements
	this.write = async function (el, txt) {
		return await el.sendKeys(txt);
	};
};

module.exports = Page;
