import { NextApiHandler } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const handler: NextApiHandler = async (req, res) => {
    const { limit, offset } = req.body;
    try {
        const query = {
            query: `select * from duck${!!limit ? ' ' + limit : ''}${!!offset ? ' ' + offset : ''};`,
        };

        const dbSqlite = await open({
            filename: './study_duck.db',
            driver: sqlite3.Database,
        });

        const result = await dbSqlite.all(query.query);

        await dbSqlite.close();

        console.log(query, result);

        return res.json(result);
    } catch (e) {
        console.error(e);

        return res.status(500).json({ message: e });
    }
};

export default handler;
