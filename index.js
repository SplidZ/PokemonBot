const { Client, Collection } = require("discord.js");
const DatabaseService = require("./Services/databaseService");
const FunctionService = require("./Services/functionService");

const client = new Client({
    intents: 3276799
});

client.components = new Collection();
client.slashCommands = new Collection();
client.database = new DatabaseService();
client.functions = new FunctionService();
client.config = require("./config.json");

require("dotenv").config();
require("./Services/handler")(client);

module.exports = client
client.login(process.env.BOT_TOKEN);