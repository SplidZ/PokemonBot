import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
    customId: "1",

    run: async (client, interaction, context) => {

        await interaction.deferUpdate()

        function getStatValue(stats, statName) {

            const statObj = stats.find(stat => stat.stat.name === statName);

            if(statObj) {

                const progressBar = client.functions.createProgressBar("♦", "♢", 20, statObj.base_stat, 100);
                console.log(progressBar)

                return {
                    progressBar: progressBar,
                    points: statObj.base_stat
                }

            } else {

                return undefined;

            }

        }

        const name = context.data.pokemon.name;
        const id = "#" + context.data.pokemon.id;
        const hpPoints = getStatValue(context.data.pokemon.stats, 'hp');
        const attackPoints = getStatValue(context.data.pokemon.stats, 'attack');
        const defensePoints = getStatValue(context.data.pokemon.stats, 'defense');
        const specialAttackPoints = getStatValue(context.data.pokemon.stats, 'special-attack');
        const specialDefensePoints = getStatValue(context.data.pokemon.stats, 'special-defense');
        const speedPoints = getStatValue(context.data.pokemon.stats, 'speed');
        const thumbnail = context.data.pokemon.sprites.front_default;

        console.log(hpPoints)

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(`${name} - ${id}`)
            .setDescription(`**Stats list :**`)
            .addFields(
                { name: `Hp`, value: `> ${hpPoints.progressBar} (${hpPoints.points})` },
                { name: `Attack`, value: `> ${attackPoints.progressBar} (${attackPoints.points})` },
                { name: `Defense`, value: `> ${defensePoints.progressBar} (${defensePoints.points})` },
                { name: `SpecialAttack`, value: `> ${specialAttackPoints.progressBar} (${specialAttackPoints.points})` },
                { name: `SpecialDefense`, value: `> ${specialDefensePoints.progressBar} (${specialDefensePoints.points})` },
                { name: `Speed`, value: `> ${speedPoints.progressBar} (${speedPoints.points})` },
            )
            .setThumbnail(thumbnail)
            .setFooter({
                text: `Demandé par @${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("2")
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Back')
            );

        return interaction.message.edit({ embeds: [embed], components: [row] });

    },
};