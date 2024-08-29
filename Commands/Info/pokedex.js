const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "pokedex",
    description: "Obtenez des informations sur un pokemon",
    dm_permission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'pokemon',
            description: 'Nom du pokémon à rechercher.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        await interaction.deferReply()

        const pokemonName = await interaction.options.getString("pokemon");
        const pokemonData = await client.functions.getPokemonFromPokedex(String(pokemonName));

        console.log(pokemonData);

        if(!pokemonData) {
            void interaction.editReply({ 
                content: `**Ce pokemon n'existe pas, ou une erreur est survenue.**`
            });
        }

        // todo

    },
};