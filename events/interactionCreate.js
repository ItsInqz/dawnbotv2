module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		const client = interaction.client;
		async function addNameRole(name) {
			await interaction.member.roles.add(
				client.guilds.cache
					.get(interaction.guildId)
					.roles.cache.find((role) => role.name === name)
			);
		}


		async function handleInteraction() {
			if (!interaction.inGuild()) return;
			if (interaction.isCommand()) {
				await interaction.deferReply();
				const slashcmd = client.slashcommands.get(interaction.commandName);
				if (!slashcmd) interaction.editReply("Not a valid slash command");
				await slashcmd.run({ client, interaction });
			} else if (interaction.isSelectMenu()) {
				if (interaction.customId == "colorselect") {
					
				}
			} else if (interaction.isModalSubmit()) {
				
			}
		}
		handleInteraction();
	},
};
