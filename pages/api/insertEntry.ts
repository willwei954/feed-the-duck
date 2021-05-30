import { NextApiHandler } from 'next';
import cuid from 'cuid';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const handler: NextApiHandler = async (req, res) => {
    const { values } = req.body;
    try {
        if (!values) {
            return res.status(400).json({ message: 'Missing Values from body' });
        }

        const recordId = cuid();

        const query = {
            query: `INSERT INTO duck(id, duck_quantity, food, food_quantity, feed_time, location) VALUES (?, ?, ?, ?, ?, ?)`,
            values: [recordId, values.duck_quantity, values.food, values.food_quantity, values.time, values.location],
        };
        
        const dbSqlite = await open({
            filename: './study_duck.db',
            driver: sqlite3.Database,
        });

        await dbSqlite.run(query.query, query.values);

        await dbSqlite.close();

        return res.json({ status: 'success' });
    } catch (e) {
        console.error(e);

        return res.status(500).json({ message: e });
    }
};

export default handler;
