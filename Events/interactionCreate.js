export default (client) => {

    client.on("interactionCreate", async (interaction) => {

        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(() => {
                    return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                });
                return;
            }

            interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;
            command.run(client, interaction);

        } else if (interaction.isContextMenuCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(() => {
                    return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                });
                return;
            }

            interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;
            command.run(client, interaction);

        } else if (interaction.isMessageComponent()) {
            const context = await client.database.getData(`temp.${interaction.message.id}`);

            if (context.owner && interaction.user.id === context.owner) {
                const component = client.components.get(interaction.customId);

                if (!component) {
                    return interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(() => {
                        return interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                    });
                    return;
                }

                interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;
                component.run(client, interaction, context);

            } else {
                return interaction.reply({ content: "**Vous ne pouvez pas utiliser ce component.**", ephemeral: true }).catch(() => {
                    return interaction.followUp({ content: "**Vous ne pouvez pas utiliser ce component.**", ephemeral: true });
                });
            }
        }
    });
};