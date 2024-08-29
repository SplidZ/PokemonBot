const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pokedex",
    description: "Obtenez des informations sur un pokemon",
    dm_permission: false,
    type: 1,
    options: [
        {
            name: 'pokemon',
            description: 'Nom du pokémon à rechercher.',
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        await interaction.deferReply()

        const title = await interaction.options.getString("titre");
        let year = await interaction.options.getInteger("année");

        year = undefined ? "" : `&y=${year}`;

        const response = await searchMovie(title, year, client);

        if(response.Response === ("False")) {

            return interaction.editReply({ content: "**Une erreur est survenue, ou aucun résultat n'a pu être trouvé.**" });

        } else {

            const embed = new EmbedBuilder()
                .setColor("Yellow")
                .setTitle(`${response.totalResults} résultat(s) trouvé(s)`)
                .setTimestamp()
                .setFooter({
                    text: `Demandé par ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                });

            response.Search.forEach(movie => {

                embed.addFields({
                    name: `${movie.Title} (${movie.Year})`,
                    value: `> Identifiant : ${movie.imdbID}`
                });
                
            });

            return interaction.editReply({ embeds: [embed] });

        }

    },
};