import { ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";

export default {
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
        await interaction.deferReply();

        const pokemonName = interaction.options.getString("pokemon");
        const pokemonData = await client.functions.getPokemonFromPokedex(pokemonName);

        if (!pokemonData) {
            return void interaction.editReply({ 
                content: `**Ce pokemon n'existe pas, ou une erreur est survenue.**`
            });
        }

        // Ajouter le reste de la logique pour traiter les données du Pokémon
        console.log(pokemonData);
    },
};