const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function db() {
    try {
        const sqliteDb = await sqlite.open({
            filename: './db/study_duck.db',
            driver: sqlite3.cached.Database,
        });
        console.log('--- Connected to the study duck SQlite database.');

        console.log('--- Create sqlite tables start ...');

        await sqliteDb.run(`CREATE TABLE IF NOT EXISTS duck (id TEXT(255), duck_quantity INT, food TEXT(255), food_quantity INT, feed_time TEXT(255), location TEXT(255));`);

        console.log('--- Create sqlite tables finished ...');

        await sqliteDb.close();
        console.log('Close to the study duck database connection.');
    } catch (e) {
        console.error(`--- Create sqlite tables failed ... reason: ${e}`);
    }
}

db();
