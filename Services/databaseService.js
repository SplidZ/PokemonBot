const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: `Databases/Bot.sqlite`, table: "bot" });

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
     * add data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to add.
     */
    async addData(path, value) {
    
        return await db.add(path.toString(), value);
        
    }

    /**
     * sub data in the dataBase.
     * @param {string} path - Data path.
     * @param {any} value - Value to sub.
     */
    async subData(path, value) {

        return await db.sub(path.toString(), value);
        
    }

}

module.exports = DatabaseService;