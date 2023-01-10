var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

//Initialize bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

//Global variables
var player1 = '';
var player2 = '';
var player1hp = 10;
var player2hp = 10;

//Look for prefix
bot.on('message', function (user, userID, channelID, message, evt) {

	if (message.substring(0, 2) == 'g!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];

		args = args.splice(1);
		switch(cmd) {
			case 'ping':
				bot.sendMessage({
					to: channelID,
					message: 'Pong! :D'
				});
			break;

			case 'endbattle':
				player1 = '';
				player2 = '';
				player1hp = 10;
				player2hp = 10;
			break;

			case 'startbattle':
				if(player1 == '') {
					if(true/*member has "not in battle" role*/) {
						player1 = args[1];
						player2 = userID;
						bot.sendMessage({
							to: channelID,
							message: '<@' + player2 + '> started a battle against ' + player1
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'The battle cannot be started. You may be trying to battle a Wanderer or a vaya, or an unforseen error has occurred.'
						});
					}	
				} else {
					bot.sendMessage({
						to: channelID,
						message: 'A battle is already in progress. Type g!endbattle to end the battle.'
					});
				}
			break;

			//other command cases here
		}
	}
});