const fs = require('fs');
const { join } = require('path');

module.exports = async (client) => {

    const getFiles = (directory) => 
        fs.readdirSync(directory).flatMap(file => {
            const filePath = join(directory, file);

            return fs.statSync(filePath).isDirectory() ? getFiles(filePath) : filePath;

        });

    const slashCommandsFiles = getFiles(join(process.cwd(), 'Commands'));
    const componentsFiles = getFiles(join(process.cwd(), 'Components'));
    const eventFiles = getFiles(join(process.cwd(), 'Events'));

    const slashCommands = [];

   for (const file of slashCommandsFiles) {

        const command = require(file);

        if (!command?.name) {
            continue;
        }
        
        const directory = file.split('/').slice(-2, -1)[0];
        const properties = { directory, ...command };

        client.slashCommands.set(command.name, properties);

        slashCommands.push(properties);

    }

    for (const file of componentsFiles) {

        const component = require(file);

        if (component?.customId) {
            client.components.set(component.customId, component);
        }
    }

    for (const file of eventFiles) {
        const event = require(file);
        event(client);
    }

    client.once('ready', async () => {
        try {
            await client.application.commands.set(slashCommands);
        } catch (error) {
            console.error(`[ERREUR] Impossibilité de déploiement des commandes: ${error.message}`);
        }
    });

};