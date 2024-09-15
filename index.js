import { Client, Collection } from "discord.js";
import DatabaseService from "./Services/databaseService.js";
import FunctionService from "./Services/functionService.js";
import config from "./config.json" assert { type: "json" };
import dotenv from "dotenv";
import handler from "./Services/handler.js";

dotenv.config();

const client = new Client({
    intents: 3276799
});

client.components = new Collection();
client.slashCommands = new Collection();
client.database = new DatabaseService();
client.functions = new FunctionService();
client.config = config;

handler(client);

export default client;

client.login(process.env.BOT_TOKEN);