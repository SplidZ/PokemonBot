import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const toFileURL = (path) => new URL(`file://${resolve(path)}`);

const getFiles = (directory) => 
    readdirSync(directory).flatMap(file => {
        const filePath = join(directory, file);
        return statSync(filePath).isDirectory() ? getFiles(filePath) : filePath;
    });

export default async (client) => {
    const commandsDir = toFileURL(join(process.cwd(), 'Commands')).href;
    const componentsDir = toFileURL(join(process.cwd(), 'Components')).href;
    const eventsDir = toFileURL(join(process.cwd(), 'Events')).href;

    const slashCommandsFiles = getFiles(fileURLToPath(commandsDir));
    const componentsFiles = getFiles(fileURLToPath(componentsDir));
    const eventFiles = getFiles(fileURLToPath(eventsDir));

    const slashCommands = [];

    for (const file of slashCommandsFiles) {
        const command = await import(toFileURL(file).href);

        if (!command?.default?.name) {
            continue;
        }

        const directory = file.split('/').slice(-2, -1)[0];
        const properties = { directory, ...command.default };

        client.slashCommands.set(command.default.name, properties);
        slashCommands.push(properties);
    }

    for (const file of componentsFiles) {
        const component = await import(toFileURL(file).href);

        if (component?.default?.customId) {
            client.components.set(component.default.customId, component.default);
        }
    }

    for (const file of eventFiles) {
        const event = await import(toFileURL(file).href);
        event.default(client);
    }

    client.once('ready', async () => {
        try {
            await client.application.commands.set(slashCommands);
        } catch (error) {
            console.error(`[ERREUR] Impossibilité de déploiement des commandes: ${error.message}`);
        }
    });
};