const Page = require('./utils/basicPage');

const page = new Page();

const taskKeys = [
    'LMSLOC',
    '2011 - ACT'
]

console.log('setting tasks', taskKeys);

async function fillCats() {
    await page.visit('https://bridge.mo.sap.corp/#/detail/cats/');

    const dateButtons = await page.findByCss('.app-cats-button-center button.unselectable:not(.disabled)');
    // select all dates
    await new Promise(res => setTimeout(res, 5000));
    dateButtons.forEach(db => db.click());

    const taskButtons = await page.findByCss('.cats-tasklist');
    let clicked = 0;
    for (const btn of taskButtons) {
        const b = await btn.getText();
        for (task of taskKeys) {
            if (b.includes(task)) {
                btn.click();
                clicked++;
            }
        }

    }

    if (clicked != taskKeys.length) {
        throw new Error('tasks changed, please check manually and update the list');
    }

    console.log('please confirm and click on apply button');

};

fillCats();