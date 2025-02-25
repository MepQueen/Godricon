const { SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('C:/Videos/config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Ping me!'),
	new SlashCommandBuilder().setName('rules-basic').setDescription('Read the basic rules!'),
	new SlashCommandBuilder().setName('rules-usingactionsanditems').setDescription('Read the rules for actions and items!'),
	new SlashCommandBuilder().setName('rules-advanced').setDescription('Read some more advanced rules!'),
	new SlashCommandBuilder().setName('rules-arkaetreslist').setDescription('Read the abilities of different arkaetres!'),
	new SlashCommandBuilder().setName('rules-actionsanditemslist').setDescription('Read the effects of different actions and items!'),
	new SlashCommandBuilder().setName('leaderboard').setDescription('Check the battle point leaderboard!'),
	new SlashCommandBuilder().setName('battlemode').setDescription('Set the active battle mode!'),
	new SlashCommandBuilder().setName('arkaetremode').setDescription('Set the active Arkaetre mode!'),
	new SlashCommandBuilder().setName('setbackpack').setDescription('Preset your backpack items!'),
	new SlashCommandBuilder().setName('setarkaetre').setDescription('Preset your Arkaetre for Picked Arkaetre mode!'),
	new SlashCommandBuilder().setName('checkpresets').setDescription('Check your preset items and Arkaetre!'),
	new SlashCommandBuilder().setName('checkmodes').setDescription('Check the current battle and Arkaetre modes!'),
	new SlashCommandBuilder().setName('patchnotes').setDescription('Check the recent patch notes!'),
	new SlashCommandBuilder().setName('toggle').setDescription('Admins only.'),
	new SlashCommandBuilder().setName('battle').setDescription('Start a battle against someone!').addUserOption(option => option.setName('opponent').setDescription('Your opponent!').setRequired(true)),
	new SlashCommandBuilder().setName('challenge').setDescription('Issue a battle challenge open to anyone!'),
	new SlashCommandBuilder().setName('endbattle').setDescription('End a battle!'),
	new SlashCommandBuilder().setName('freeattack').setDescription('Attack in a battle for free!'),
	new SlashCommandBuilder().setName('freeheal').setDescription('Heal in a battle for free!'),
	new SlashCommandBuilder().setName('freeboost').setDescription('Boost in a battle for free!'),
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
	new SlashCommandBuilder().setName('scroll').setDescription('Use your Scroll (if you have one)!'),
	new SlashCommandBuilder().setName('arkaetre').setDescription('Gain an Arkaetre in a battle for free!'),
	new SlashCommandBuilder().setName('adminkill').setDescription('Admins only.'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);