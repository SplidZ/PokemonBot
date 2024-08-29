module.exports = (client) => {

    client.on("interactionCreate", async (interaction) => {

        if (interaction.isChatInputCommand()) {

            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {

                void interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                    void interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                });

            }

            interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

            command.run(client, interaction);

        } else if (interaction.isContextMenuCommand()) {

            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {

                void interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                    void interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                });

            }

            interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

            command.run(client, interaction);

        } else if (interaction.isMessageComponent) {

            const interactionUser = await client.database.getData(`temp.${interaction.message.id}.user`);

            if(interactionUser && interaction.user.id === interactionUser) {

                const component = client.components.get(interaction.customId);

                if (!component) {

                    void interaction.reply({ content: "**Une erreur est survenue.**", ephemeral: true }).catch(err => {
                        void interaction.followUp({ content: "**Une erreur est survenue.**", ephemeral: true });
                    });

                }

                interaction.member = interaction.guild.members.cache.get(interaction.user.id) ?? interaction.user;

                component.run(client, interaction);
                
            } else {

                void interaction.reply({ content: "**Vous ne pouvez pas utiliser ce component.**", ephemeral: true }).catch(err => {
                    void interaction.followUp({ content: "**Vous ne pouvez pas utiliser ce component.**", ephemeral: true });
                });

            }

        }
        
    });
    
};

