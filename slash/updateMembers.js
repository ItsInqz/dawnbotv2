const { SlashCommandBuilder } = require("@discordjs/builders");
const { Message, MessageEmbed } = require("discord.js");
const {
    findMap,
    findType,
    getUUID,
    isPlayer,
    getMode,
    getTime,
    getMap,
    getGuildMembers,
    getDiscord,
    addNameRole,
} = require("../helpers");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("updateallembers")
        .setDescription("Updates all the members.")
        .addStringOption((option) =>
            option
                .setName("api-key")
                .setDescription("send the api key for the bot to use.")
                .setRequired(true)
        ),
    run: async ({ client, interaction }) => {
        var roledUsers = [];
        const doSleep = async () => {
            await sleep(800);
            //do stuff
        };
        const guildMemberRole = "990040391548018688";
        const embed = new MessageEmbed()
            .setTitle("Member list.")
            .setDescription("List of all members in The Dawns Awakening.");
        var memberUUIDSList = await getGuildMembers(interaction.options.getString("api-key"));
        console.log(await memberUUIDSList)
        for (var i = 0; i < (await memberUUIDSList.length); i++) {
            const discords = await getDiscord(
                memberUUIDSList[i],
                interaction.options.getString("api-key")
            );
            if (discords == false || discords == undefined) {
                console.log(
                    "Member with the UUID, ",
                    memberUUIDSList[i],
                    ",needs to link their discord."
                );
            } else {
                console.log(discords, " - ", i);
                roledUsers.push(discords);
                await doSleep();
            }
        }
        
            for (var i = 0; i < roledUsers.length; i++) {
                try {
                    const rolename = "Guild Member";
                    const discordTag = await roledUsers[i];
                    const discordObject = client.users.cache.find(
                        (user) => user.tag === discordTag
                    ) ?? "Not Found";
                    await interaction.channel.send(discordObject);
                    // await discordObject.roles.add(guildMemberRole);
                    console.log("Role added to - ", roledUsers[i]);
                } catch (err) {
                    console.log(err);
                    console.log(
                        "Role could not be added to user - ",
                        discordObject
                    );
                }
                await sleep(700);
            }
            return await interaction.editReply("Finished.");
        }
    };

