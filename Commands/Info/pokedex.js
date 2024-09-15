import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

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
        const message = await interaction.deferReply({ fetchReply: true });

        const pokemonName = interaction.options.getString("pokemon");
        const pokemonData = await client.functions.getPokemonFromPokedex(pokemonName);

        if (!pokemonData) {
            return interaction.editReply({ 
                content: `**Ce pokemon n'existe pas, ou une erreur est survenue.**`
            });
        }
 
        await client.database.setData(`temp.${message.id}`, {
            owner: interaction.user.id,
            data: pokemonData
        });

        const name = pokemonData.pokemon.name;
        const id = "#" + pokemonData.pokemon.id;
        const abilities = pokemonData.pokemon.abilities.map(a => a.ability.name).join(`, `);
        const color = pokemonData.species.color.name;
        const captureRate = pokemonData.species.capture_rate;
        const habitat = pokemonData.species.habitat.name;
        const types = pokemonData.pokemon.types.map(t => t.type.name).join(`, `);
        const eggsGroups = pokemonData.species.egg_groups.map(e => e.name).join(`, `);
        const thumbnail = pokemonData.pokemon.sprites.front_default;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(`${name} - ${id}`)
            .addFields(
                { name: `Infos`, value: `> **Abilities:** ${abilities}\n> **Color:** ${color}\n> **CaptureRate:** ${captureRate}\n> **Habitat:** ${habitat}\n> **Types:** ${types}` },
                { name: `Breeding`, value: `> **EggGroups:** ${eggsGroups}` }
            )
            .setThumbnail(thumbnail)
            .setFooter({
                text: `Demandé par @${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("1")
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Stats')
            );

        return interaction.editReply({ embeds: [embed], components: [row] });

    },
};