import { NextApiHandler } from 'next';
import cuid from 'cuid';
import formatISO9075 from 'date-fns/formatISO9075';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const handler: NextApiHandler = async (req, res) => {
    const { values } = req.body;
    try {
        if (!values) {
            return res
                .status(400)
                .json({ message: 'Missing Values from body' });
        }

        const recordId = cuid();
        const now = formatISO9075(new Date());

        const query = {
            query: `INSERT INTO ducks(id, duck_quantity, food, food_quantity, feed_time, location) VALUES (?, ?, ?, ?, ?, ?)`,
            values: [
                recordId,
                now,
            ],
        };
        const dbSqlite = await open({
            filename: './pwpusher.db',
            driver: sqlite3.cached.Database,
        });

        await dbSqlite.run(query.query, query.values);

        await dbSqlite.close();

        return res.json({ url_token: recordId });
    } catch (e) {
        console.error(e);

        return res
            .status(500)
            .json({ message: 'Error during password inserting' });
    }
};

export default handler;
