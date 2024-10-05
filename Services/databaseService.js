import Keyv from 'keyv';
import KeyvMysql from '@keyv/mysql';
import dotenv from "dotenv";

dotenv.config();

const db = new Keyv({ store: new KeyvMysql(process.env.DATABASE_CREDENTIALS) });

class DatabaseService {

    /**
     * Set data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to set.
     */
    async setData(path, value) {
        return await db.set(path.toString(), value);
    }

    /**
     * Get data from the dataBase.
     * @param {string} path - Data path.
     */
    async getData(path) {
        return await db.get(path.toString());
    }

    /**
     * Delete data from the dataBase.
     * @param {string} path - Data path.
     */
    async deleteData(path) {
        await db.delete(path.toString());
    }

    /**
     * Push data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to push.
     */
    async pushData(path, value) {
        return await db.push(path.toString(), value);
    }
    
    /**
     * Pull data from the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to pull.
     */
    async pullData(path, value) {
        return await db.pull(path.toString(), value);
    }

    /**
     * Add data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to add.
     */
    async addData(path, value) {
        return await db.add(path.toString(), value);
    }

    /**
     * Subtract data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to subtract.
     */
    async subData(path, value) {
        return await db.sub(path.toString(), value);
    }
}

export default DatabaseService;
