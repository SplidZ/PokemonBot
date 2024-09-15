import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
    customId: "2",

    run: async (client, interaction, context) => {

        await interaction.deferUpdate()

        const name = context.data.pokemon.name;
        const id = "#" + context.data.pokemon.id;
        const abilities = context.data.pokemon.abilities.map(a => a.ability.name).join(`, `);
        const color = context.data.species.color.name;
        const captureRate = context.data.species.capture_rate;
        const habitat = context.data.species.habitat.name;
        const types = context.data.pokemon.types.map(t => t.type.name).join(`, `);
        const eggsGroups = context.data.species.egg_groups.map(e => e.name).join(`, `);
        const thumbnail = context.data.pokemon.sprites.front_default;

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

        return interaction.message.edit({ embeds: [embed], components: [row] });

    },
};