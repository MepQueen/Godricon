const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Ping me!'),
	new SlashCommandBuilder().setName('rules').setDescription('Read the basic rules!'),
	new SlashCommandBuilder().setName('rules2').setDescription('Read some more advanced rules!'),
	new SlashCommandBuilder().setName('rules3').setDescription('Read the arkaetre rules!'),
	new SlashCommandBuilder().setName('leaderboard').setDescription('Check the battle point leaderboard!'),
	new SlashCommandBuilder().setName('patchnotes').setDescription('Check the recent patch notes!'),
	new SlashCommandBuilder().setName('toggle').setDescription('Admins only.'),
	new SlashCommandBuilder().setName('battle').setDescription('Start a battle against someone!').addUserOption(option => option.setName('opponent').setDescription('Your opponent!').setRequired(true)),
	new SlashCommandBuilder().setName('challenge').setDescription('Issue a battle challenge open to anyone!'),
	new SlashCommandBuilder().setName('endbattle').setDescription('End a battle!'),
	new SlashCommandBuilder().setName('freeattack').setDescription('Attack in a battle without an item!'),
	new SlashCommandBuilder().setName('freedefend').setDescription('Defend in a battle without an item!'),
	new SlashCommandBuilder().setName('freeboost').setDescription('Boost in a battle without an item!'),
	new SlashCommandBuilder().setName('sword').setDescription('Use your Sword (if you have one)!'),
	new SlashCommandBuilder().setName('bow').setDescription('Use your Bow (if you have one)!'),
	new SlashCommandBuilder().setName('realmportal').setDescription('Use your Realm Portal (if you have one)!'),
	new SlashCommandBuilder().setName('magistone').setDescription('Use your Magistone (if you have one)!'),
	new SlashCommandBuilder().setName('dagger').setDescription('Use your Dagger (if you have one)!'),
	new SlashCommandBuilder().setName('frozenfish').setDescription('Use your Frozen Fish (if you have one)!'),
	new SlashCommandBuilder().setName('staff').setDescription('Use your Staff (if you have one)!'),
	new SlashCommandBuilder().setName('laserrifle').setDescription('Use your Laser Rifle (if you have one)!'),
	new SlashCommandBuilder().setName('shield').setDescription('Use your Shield (if you have one)!'),
	new SlashCommandBuilder().setName('shifterdisc').setDescription('Use your Shifter Disc (if you have one)!'),
	new SlashCommandBuilder().setName('pocketwatch').setDescription('Use your Pocketwatch (if you have one)!'),
	new SlashCommandBuilder().setName('arkaetre').setDescription('Use your Arkaetre (if you have one)!'),
	new SlashCommandBuilder().setName('adminkill').setDescription('Admins only.'),
	new SlashCommandBuilder().setName('battlemode').setDescription('Choose the battle mode.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);