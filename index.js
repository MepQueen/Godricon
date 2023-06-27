// @ts-check
const { Client, Events, GatewayIntentBits, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, DiscordAPIError, GuildMemberRoleManager } = require('discord.js');
const { token } = require('C:/Videos/config.json');

global.interval = null;
global.timeoutWarningGiven = false;
resetGameVars();
global.onesPlace = ['922034725714001930' /* Zero */, '922034703748435988', '922034705396801538', '922034707741425695', '922034710799069204', '922034713265319936', '922034715916128328', '922034718046838815', '922034720823464017', '922034723054813195'];
global.tensPlace = ['923075850415505439' /* Zero */, '922034458939519007', '922034588711268423', '922034620546031616', '922034682076491826', '922034689169055794', '922034691438153738', '922034694403522620', '922034697788325909', '922034700279771136'];
global.hundredsPlace = ['923072342924591134' /* One */, '923072346946940990', '923072350616969286', '923072353158725674', '923072356207951903', '923072359261433876', '923072362272931880', '923072365154435072', '923072367721340978'];

process.on('uncaughtException', function(err) {
	console.log('Error caught: ' + err)
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => { 
	console.log('Locked and Loaded!');
	client.user?.setActivity('. . .', { type: ActivityType.Watching });
});

client.on('interactionCreate', async interaction => {
	client.user?.setActivity('. . .', { type: ActivityType.Watching });
	if (!interaction.isCommand() && !interaction.isButton()) return;
	const commandName = interaction.isCommand()?interaction.commandName:undefined;
	if (!interaction.guild || !interaction.channel || !interaction.member) return;
	


	if (commandName === 'ping') {
		await interaction.reply({ content: 'Hello, mortal.', ephemeral: true });
	

	
	} else if (commandName === 'rules-basic') {
		await interaction.reply({ content: '**__Overview__**\nYou can start a battle by typing `/battle` and pinging the member that you want to battle.\nYou can send a battle challenge open to anyone by typing `/challenge`. It will time out after 14 minutes.\nYou can end a battle you are in at any time by typing `/endbattle`.\nYour health starts at 15 and cannot go above 20.\nWhen a player\'s health hits 0, the other player wins.\nThe winner earns 1 battle point (BP), up to 999.\nIf both players hit 0 health on the same turn or turn 100 is reached, there is a tie.\n\n**__Using Items and Actions__**\nYou and your opponent will take turns using item commands such as `/sword` or free action commands such as `/freeattack`.\nYou can only use items that you have registered.\nTo register an item, buy it in `c!shop` and use it in `c!inventory`.\nYou only have to register each item once to use it in all battles.\nYou can use the `/freeattack`, `/freedefend` or `/freeboost` actions to battle without an item.\n\n**__Item Effects__**\nThe effects of an item are listed in its description in `c!shop` and `c!inventory`.\nYou will also be shown the effects of an item or action after using its command but before deciding whether to use it.\nA range of effects not separated by commas have an equal probability of occuring.\nEffects are applied in the order listed.\nItems and actions that deal Enemy Damage or grant Personal Health have a 10% chance of a critical hit or heal for an extra point of damage or health.\nArkaetre abilities and instakills are not affected by shields, pocketwatches or other arkaetre abilities.\n\nCheck other rules commands for more information!', ephemeral: true });
	
	
	
	} else if (commandName === 'rules-advanced') {
		await interaction.reply({ content: '**__Stats__**\nYou and your opponent have three different stats that affect item and action effects by up to 1 point in either direction.\nThey are Attack (AT) for attack strength, Defense (DF) for attack resistance, and Recovery (RC) for healing.\nEach of them can be Low🔻, Normal or High🔺.\nArkaetre abilities are not affected by stats.\nActions whose original rolls deal no damage or grant no health are not affected by stats or shields.\n\n**__Shields__**\nA shield can be formed by using `/shield` or `/freedefend`.\nWhen a shield is hit by an attack, every damage point dealt increases the chance that the shield will fall by ~17%.\n\n**__Rounds__**\nEvery 25 turns, a new round will start.\nThe active player will take damage each turn equal to the round number minus 1.\nThe maximum shield formation chance will decrease by 20% from 80% each round.\n\nCheck other rules commands for more information!', ephemeral: true });
	
	
	
	} else if (commandName === 'rules-arkaetres') {
		await interaction.reply({ content: '**__Arkaetre Abilities__**\n\n**🐍 Wyrm**\nEvery time you use an item or action that you have not used yet in the current battle, you will gain 1 extra point of health.\n\n**🦁 Flying Lion**\nEvery time you roll the highest possible Enemy Damage for an item or action, you will deal 1 extra point of damage.\n\n**🕊️ Hummingbird**\nEvery time you roll the lowest possible positive Enemy Damage for an item or action, you will gain 1 point of health.\n\n**🦉 Owl**\nEvery time you have no Normal stats at the end of your turn right after your opponent moves, you will have a 66% chance of gaining an extra turn.\n\n**🦅 Griffin**\nYour Attack will always be high, and you and your opponent will both have an extra 5% chance of an instakill every time you use an item or action to deal Enemy Damage.\n\n**🐲 Dragon**\nYour Defense will always be high, and you and your opponent will both have an extra 10% chance of critical hits and heals.\n\n**🐆 Cheetah**\nYour Recovery will always be high, and you and your opponent will both take 1 extra point of damage each turn.\n\n**🦎 Komodo Dragon**\nEvery time your opponent uses an item or action to deal Enemy Damage, you will deal 1 point of damage.\n\n**🐈 Sphinx**\nEvery time your opponent uses an item or action to heal, you will gain 1 point of health.\n\n**🐺 Kludde**\nYou can use the `/arkaetre` command to add more kludde to your pack, 1 at a time. When you gather 7 kludde, you will instakill your opponent.\n\n**🐦 Phoenix**\nThe first time you end any turn with 1-3 points of health, you will go back to full health.\n\n**🔱 Hydra**\nThe maximum number of health points allowed will gradually decrease by 1 health per 2 counted turns. You can use the `/arkaetre` command again to reset the health point cap and both your and your opponent\'s arkaetres.\n\nCheck other rules commands for more information!', ephemeral: true });
	


	} else if (commandName === 'leaderboard') {
		await interaction.guild.members.fetch();
		const battlePointsRole = interaction.guild.roles.cache.get('922033934827675648');
		if (battlePointsRole) {
			var playerIDs = battlePointsRole.members.map(m => m.user.id);
			if (playerIDs.includes('354752678376636417')) {
				playerIDs.splice(playerIDs.indexOf('354752678376636417'), 1);
			}
			if (playerIDs.includes('810539425355923466')) {
				playerIDs.splice(playerIDs.indexOf('810539425355923466'), 1);
			}

			var playerScores = [];
			playerIDs.forEach(playerID => {
				if (!interaction.guild) return;
				var player = interaction.guild.members.cache.get(playerID);
				if (!player) return;
				var ones = 0;
				var tens = 0;
				var hundreds = 0;
				for (var i = 0; i < 10; i++) {
					if (player.roles.cache.has(global.onesPlace[i])) {
						ones = i;
					}
				}
				for (var i = 0; i < 10; i++) {
					if (player.roles.cache.has(global.tensPlace[i])) {
						tens = i;
					}
				}
				for (var i = 1; i < 10; i++) {
					if (player.roles.cache.has(global.hundredsPlace[i-1])) {
						hundreds = i;
					}
				}
				var score = (hundreds * 100) + (tens * 10) + ones;
				playerScores.push(score);
			});
			
			var embed = new EmbedBuilder().setTitle('Battle Leaderboard');
			var finalOrder = [];
			var stamps = ['🥉', '🥈', '🥇'];

			while (playerScores.length > 0) {
				var max = 0;
				playerScores.forEach(score => {
					if (score > max) {
						max = score;
					}
				});
				var index = playerScores.indexOf(max);
				var playerText = '<@' + playerIDs.splice(index, 1) + '>\n︳' + playerScores.splice(index, 1);
				if (stamps.length > 0) {
					playerText = stamps.pop() + playerText;
				} else {
					playerText = '🏅' + playerText;
				}
				finalOrder.push(playerText);
			}

			var finalString = finalOrder.join('\n\n');
			embed.setColor(0x1E792C).addFields({ name: '\u200B', value: finalString });
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}



	} else if (commandName === 'battlemode') {
		await interaction.reply({ content: 'Nothing yet...'});



	} else if (commandName === 'patchnotes') {
		await interaction.reply({ content: '**__Recent Patches__**\n\n**6/25/23**\n- Apparently critical hits and heals were not actually working. Now they are.\n- Challenges finally time out! No more forever unusable buttons.\n\n**6/19/23**\n- A text bug in the bow and Magistone confirmation messages was fixed.\n- Godricon is now running on sweet, sweet, completely redesigned Discord.js version 14. Prepare for bugs.\n- I have conquered my fear of source control. Godricon has made it onto Github.\n\n**2/11/23**\n- All three free actions finally exist, so those new to battling can still participate.\n\n**2/6/22**\n- More small text edits, as usual.\n- The leaderboard display is more vertical to work better on mobile.' /*\n\n**2/2/22**\n- Rules about shields and rounds are now on the second page of the rules, `/rules2`, and `/arkaetrerules` was renamed to `/rules3`.\n- The chance a shield will break is now dependent on how much damage is dealt to it. Every damage point in the final value of an attack increases the chance by 17%, and an attack that deals at least six damage is guaranteed to break a shield.\n- Overtime has been replaced by a four-round system where negative effects increase every 25 turns, with another hourglass icon added to the turn counter for each round.\n- At 100 turns, a battle will end in a tie.\n- Extra turns are now displayed with symbols to the right of players\' stat headers.\n- The rule reminder at the end of battle embeds is gone.\n- The pocketwatch removes any saved up extra turns when used, stops the turn counter while active, and shows a frozen icon after the turn counter instead of a picture above the action text.\n- The hydra will now gradually lower the maximum number of health points while active by 1 health per 2 counted turns, and instead of it blocking both arkaetre slots, you can use the `/arkaetre` command again to reset the health cap and all active arkaetres.\n- The second number in the HP stat is now the health cap instead of your starting health.\n- The challenge timeout length is now an hour.\n- The owl\'s extra turn chance is now 66%.\n\n**2/1/22**\n- `/toggle` exists so I can block off battles when I need to. Commands not related to battling like `/leaderboard` stay up.\n- There\'s no more daily point limit. Go crazy, if that\'s your thing.'*/, ephemeral: true });

		/// Should I be cutting myself out of the leaderboard?
		/// Griffin instakill too random?
		/// Hydra alert when max hp decreases

		/// BUGS
		/// EditReply "unknown message" error
		/// Check item selection message is properly sent - to avoid hidden selection message bug
		/// Edit item selection messages instead of delete so no log spam? ;-;

        /// EDGE CASE CHECKS
		/// Hydra works based on turns after hydra activated + no remove feature
		/// Case for both having hydra?
        /// Case for pocketwatch used twice in a row - timer reset?

        /// RULES EDITS
		/// Free actions into rules and messages
		/// Explain arkaetre rules and exceptions
		/// Explain damage calculation system better in rules, with examples
		/// Shorten some of the longer possible combo-messages - or good vs bad effect messages marked?
		/// 'item' wording changed to just exclude arkaetres, not free actions - 'item or action'?
		/// Difference between 'item damage'  and 'arkaetre damage' in text for help with arkaetre rules
		/// Older pages of patch notes
		/// Edit Tatsu items to match bot

        /// BIG UPDATES
		/// Pick a player class/character with certain perks? Darklight Order mages + Kireveans (symbol mage), Sand Trap Order of the Hydra mages w/staff, Ng Ey scroll mage, TKR stone mage
		/// Achievements? For currency? Also currency for winning battles? Upgrades so more use for currency?
		/// Boss battles?
		/// Timing or other skill component?
		/// More items rotating through shop? One use per battle?
		/// Typescript and refactoring

        /// FINAL CHECKS
        /// Edit rules: 
        /// Edit patch notes:
	
	
	
	} else if (commandName === 'toggle') {
		if (interaction.user.id === '354752678376636417') {
			if (global.activePlayerID !== '') {
				await interaction.reply({ content: 'Hey, remember to wait until no battles are running. :P', ephemeral: true });
			} else {
				var god = interaction.guild.members.cache.get('892970512177831966');
				if (god) {
					if (god.roles.cache.has('938345970062753794')) {
						await interaction.reply('Battles are back online! :D');
						god.roles.remove('938345970062753794');
					} else {
						await interaction.reply('Battles are down for maintenance. :)');
						god.roles.add('938345970062753794');
					}
				}
			}
		} else {
			await interaction.reply({ content: 'Only an admin can use this command.', ephemeral: true });
		}
	} else if (interaction.guild.members.cache.get('892970512177831966')?.roles.cache.has('938345970062753794') && global.activePlayerID !== '354752678376636417' && global.waitingPlayerID !== '354752678376636417' && interaction.user.id !== '354752678376636417') {
		await interaction.reply('I am down for maintenance. Please try again later! :)');
	



	} else if (interaction.isCommand() && commandName === 'battle') {
		if (!(global.activePlayerID === '')) {
			await interaction.reply({ content: 'A battle is already in progress. If you are a Councilor or currently battling, type `/endbattle` to end the current battle.', ephemeral: true });
		} else if (interaction.options.getUser('opponent')?.id === interaction.user.id) {
			await interaction.reply({ content: 'You cannot battle yourself, silly mortal. I recommend <#793609738184163358> if you want to talk about it, though.', ephemeral: true });
		} else if (interaction.options.getUser('opponent')?.id === '892970512177831966') {
			await interaction.reply({ content: 'Excuse me, mortal, you wish to battle me? Fine. Ready?\n\nHa, and I reign victorious once more! You did not see me win? Well, I suppose you should not have blinked.', ephemeral: true });
		} else if (interaction.options.getUser('opponent')?.bot === true) {
			await interaction.reply({ content: 'You cannot battle a vaya. We cannot hold swords, you know. Very unfortunate.', ephemeral: true });
		} else {
			console.log('Battle started!');
			restartTimeout(interaction);
			resetGameVars();
			global.activePlayerID = interaction.options.getUser('opponent')?.id;
			global.waitingPlayerID = interaction.user.id;
			await interaction.reply('<@' + global.waitingPlayerID + '> started a battle against <@' + global.activePlayerID + '>! Let us have a good, clean fight. Either of you can use `/endbattle` to end the battle or any `/rules` command to review the rules of battle at any time.\n\nOn your turn, please use an item command such as `/sword` to select a registered item to use. If you do not have any items registered, buy some in `c!shop` and use them in `c!inventory` first, or use a free action such as `/freeattack`.\n\n<@' + global.activePlayerID + '>, you are first!');
			global.challengeOverride = true;
			global.interactionSave = null;
			if (global.collectorSave != null) {
				global.collectorSave.stop();
			}
		}


	
	} else if (commandName === 'challenge') {
		if (!(global.activePlayerID === '')) {
			await interaction.reply({ content: 'A battle is already in progress. If you are a Councilor or currently battling, type `/endbattle` to end the current battle.', ephemeral: true });
		} else if (global.interactionSave != null) {
			await interaction.reply({ content: 'A battle challenge is already in progress. Please wait.', ephemeral: true });
		} else {
			resetGameVars();
			global.waitingPlayerID = interaction.user.id;
			global.buttonClickedSave = false;
			global.interactionSave = interaction;
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('accept').setLabel('⚔️ Accept The Challenge').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('cancel').setLabel('❌ Cancel').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '<@' + global.waitingPlayerID + '> is looking for an opponent! Who will rise to the challenge?', components: [row] }); 
			const filter = i => (i.customId === 'accept' || i.customId === 'cancel') && i.user.id !== global.waitingPlayerID;
			global.collectorSave = interaction.channel.createMessageComponentCollector({ filter, time: 840000 });
			global.collectorSave.on('end', collected => { challengeEnd() });
		}
	} else if (interaction.isButton()) {
		if (interaction.customId === 'accept' && !global.collectorSave.ended && interaction.user.id !== global.waitingPlayerID && global.activePlayerID === '') {
			console.log('Battle challenge started!');
			restartTimeout(interaction);
			global.interactionSave.deleteReply();
			global.collectorSave.stop();
			global.buttonClickedSave = true;
			global.activePlayerID = interaction.member.user.id;
			interaction.channel.send('<@' + global.activePlayerID + '> accepted <@' + global.waitingPlayerID + '>\'s battle challenge! Let us have a good, clean fight. Either of you can use `/endbattle` to end the battle or any `/rules` command to review the rules of battle at any time.\n\nOn your turn, please use an item command such as `/sword` to select a registered item to use. If you do not have any items registered, buy some in `c!shop` and use them in `c!inventory` first, or use a free action such as `/freeattack`.\n\n<@' + global.activePlayerID + '>, you are first!');
		} else if (interaction.customId === 'cancel' && (interaction.user.id === global.waitingPlayerID || (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('809284936669593600')))) {
			global.interactionSave.deleteReply();
			global.collectorSave.stop();
			global.buttonClickedSave = true;
			resetGameVars();
			interaction.channel.send('<@' + interaction.user.id + '> cancelled the battle challenge.');
		}



	} else if (commandName === 'endbattle') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID || interaction.user.id === global.waitingPlayerID || (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('809284936669593600'))) {
			if (global.itemProcessing) {
				await interaction.reply({ content: 'Please cancel the current item prompt or wait for it to time out before ending the battle.', ephemeral: true });
			} else {
				resetTimeout();
				resetGameVars();
				await interaction.reply('<@' + interaction.user.id + '> ended the battle.');
				console.log('Battle force-ended!');
			}
		} else {
			await interaction.reply({ content: 'Only Councilors and players currently battling can run that command.', ephemeral: true });
		}



	} else if (commandName === 'freeattack') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID && !global.itemProcessing) {
			global.itemProcessing = true;
			restartTimeout(interaction);
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '🤜 **Attack**:  1-2 Enemy Damage, 5% chance of instakill\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var action = '';
					var roll = random(1, 20);
					var roll2 = random(1, 6);
					if (roll === 1) {
						action = 'In a fit of rage and glory, you hammer <@' + global.waitingPlayerID + '> with hundreds of kicks and punches, defeating them instantly.';
						global.waitingPlayerHP = 0;
					} else if (roll2 < 4) {
						var amount = damage('waiting', 1);
						if (roll2 === 1) {
							action = 'You throw the bandages that you carry with you at all times at <@' + global.waitingPlayerID + '>\'s arm for ' + amount + ' damage. I am surprised they did that much.';
						} else if (roll2 === 2) {
							action = 'You run at <@' + global.waitingPlayerID + '>, screaming a fierce battle cry, and beat them in rock-paper-scissors for ' + amount + ' damage.';
						} else {
							action = 'After careful consideration of your options, you poke <@' + global.waitingPlayerID + '> in the eye for ' + amount + ' damage.';
						}
						hummingbirdCheck();
					} else {
						var amount = damage('waiting', 2);
						if (roll2 === 4) {
							action = 'You punch <@' + global.waitingPlayerID + '> right in the face for ' + amount + ' damage. That is going to hurt.';
						} else if (roll2 === 5) {
							action = 'You do a cool flip, followed by a cartwheel, and high kick <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						} else {
							action = 'After being told a particularly bad joke, you tackle <@' + global.waitingPlayerID + '> to the ground for ' + amount + ' damage.';
						}
						flyingLionCheck();
					}
					wyrmCheck('A');
					endTurn(interaction, 'attack', action);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item.');
					global.itemProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
		}



	} else if (commandName === 'freedefend') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID && !global.itemProcessing) {
			global.itemProcessing = true;
			restartTimeout(interaction);
			var formationChance = global.round === 4 ? 20 : 40;
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '✋ **Defend**:  1-2 Personal Health, ' + formationChance + '% chance of shield\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var action = '';
					var roll = random(1, 6);
					if (roll < 4) {
						var amount = health('active', 1);
						if (roll === 1) {
							action = 'Was there a gash there before? Apparently not. Strange. You recover ' + amount + ' health.';
						} else if (roll === 2) {
							action = 'Godricon here. Yes, I narrate all these messages. Anyway, have some health, on the house. You recover ' + amount + ' health.';
						} else {
							action = 'Through your body\'s natural healing processes, you recover a measly ' + amount + ' health.';
						}
					} else {
						var amount = health('active', 2);
						if (roll === 4) {
							action = 'You stumble upon an ornate chest filled with random potions. After a quick taste-test, you recover ' + amount + ' health.';
						} else if (roll === 5) {
							action = 'You whip out the bandages that you carry with you at all times and put them to good use, recovering ' + amount + ' health.';
						} else {
							action = 'A spark of magic flares to life inside you, and with a shudder, you recover ' + amount + ' health.';
						}
					}
					var roll2 = random(1, 100);
					if (roll2 <= formationChance) {
						action += ' You also remember to conjure a bright, brilliant shield that will protect you. Sometimes.';
						global.activePlayerShieldStatus = 'Up';
					}
					wyrmCheck('B');
					endTurn(interaction, 'defend', action);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item.');
					global.itemProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
		}



	} else if (commandName === 'freeboost') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID && !global.itemProcessing) {
			global.itemProcessing = true;
			restartTimeout(interaction);
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '💪 **Boost**:  ↑ Personal Attack or Defense or Recovery or ↓ Enemy Attack or Defense or Recovery, 33% chance of 2x effect\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var action = '';
					var roll = random(1, 6);
					var roll2 = random(1, 3);
					if (roll === 1) {
						if (roll2 === 1) {
							action = 'You can do it! I believe in you. My stunning motivational speech increases your Attack twice.';
							statChange('AT', 'active', true);
							statChange('AT', 'active', true);
						} else {
							action = 'You make a fist and stare down your opponent. Now you feel ready for action, and your Attack increases.';
							statChange('AT', 'active', true);
						}
					} else if (roll === 2) {
						if (roll2 === 1) {
							action = 'Is that a full set of armor!? Nice find. You put it on and your Defense increases twice.';
							statChange('DF', 'active', true);
							statChange('DF', 'active', true);
						} else {
							action = 'They say some people have thick skin, but your skin looks especially thick today. Your Defense increases.';
							statChange('DF', 'active', true);
						}
					} else if (roll === 3) {
						if (roll2 === 1) {
							action = 'Master Vaya Medeina notices your unfortunate plight and grants you unfathomable healing abilities, increasing your Recovery twice.';
							statChange('RC', 'active', true);
							statChange('RC', 'active', true);
						} else {
							action = 'You stop by the local arena drugstore and buy some bandages. Better keep those with you at all times. Your Recovery increases.';
							statChange('RC', 'active', true);
						}
					} else if (roll === 4) {
						if (roll2 === 1) {
							action = 'You sneak up on <@' + global.waitingPlayerID + '> and give them a nice, relaxing massage. Too relaxing, in fact. Their Attack decreases twice. Why would they want to attack you?';
							statChange('AT', 'waiting', false);
							statChange('AT', 'waiting', false);
						} else {
							action = 'You scream with all your might at <@' + global.waitingPlayerID + '> and their Attack decreases, but their concern increases.';
							statChange('AT', 'waiting', false);
						}
					} else if (roll === 5) {
						if (roll2 === 1) {
							action = 'Master Vaya Kovas stops by and- Oh my. That trickster. Well, things will be much easier for you now. <@' + global.waitingPlayerID + '>\'s Defense decreases twice.';
							statChange('DF', 'waiting', false);
							statChange('DF', 'waiting', false);
						} else {
							action = '<@' + global.waitingPlayerID + '> drops their shield, and it rolls away, clattering to a stop just outside the arena. Oh well. Their Defense decreases.';
							statChange('DF', 'waiting', false);
						}
					} else {
						if (roll2 === 1) {
							action = 'A multicolored bird swoops down and steals away some of <@' + global.waitingPlayerID + '>\'s trusty bandages that they keep with them at all times. Not anymore! Their Recovery decreases twice.';
							statChange('RC', 'waiting', false);
							statChange('RC', 'waiting', false);
						} else {
							action = 'You flick <@' + global.waitingPlayerID + '> in the forehead. "Ow," they say, miffed. You flick them again. Slowly but surely, their Recovery decreases.';
							statChange('RC', 'waiting', false);
						}
					}
					wyrmCheck('C');
					endTurn(interaction, 'boost', action);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item.');
					global.itemProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
		}
	


	} else if (commandName === 'sword') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892611697876033638') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemSword:793212847584313364> **Sword**:  1-3 Enemy Damage, ↑ Personal Attack\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 3);
						var amount = damage('waiting', roll);
						if (roll === 1) {
							action = 'You barely nick <@' + global.waitingPlayerID + '> for ' + amount + ' damage. They hold back a laugh.';
							hummingbirdCheck();
						} else if (roll === 2) {
							action = 'You grip the sword firmly and slash at <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						} else {
							action = 'You lunge at <@' + global.waitingPlayerID + '> for ' + amount + ' damage, and they stagger backward.';
							flyingLionCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							action += ' The sword glows brightly as its runes activate, increasing your Attack.';
						} else {
							action += ' Magic crackles down the sword and surges through you, increasing your Attack.';
						}
						statChange('AT', 'active', true);
						wyrmCheck('D');
						endTurn(interaction, 'use your Sword', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Sword** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'bow') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892528958460002346') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemBow:793230409734291506> **Bow**:  2-4 Enemy Damage, 50% chance of 1 Personal Damage\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(2, 4);
						var amount = damage('waiting', roll);
						if (roll === 2) {
							action = 'You do not pull the string far back enough and only land a weak hit on <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							hummingbirdCheck();
						} else if (roll === 3) {
							action = 'You shoot an arrow at <@' + global.waitingPlayerID + '>, and it flies through the air with a satisfying whistle, hitting them for ' + amount + ' damage.';
						} else {
							action = 'You bring your hand to your cheek and release the arrow cleanly, piercing <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							flyingLionCheck();
						}
						var roll2 = random(1, 4);
						if (roll2 < 3) {
							amount = damage('active', 1);
							if (roll2 === 1) {
								action += ' The arrow grazes your hand as you release it, and you take ' + amount + ' damage.';
							} else {
								action += ' The arrow somehow ricochets and hits you too. You take ' + amount + ' damage and hopefully better aim next time.';
							}
						}
						wyrmCheck('E');
						endTurn(interaction, 'use your Bow', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Bow** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'realmportal') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892574599596871720') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemRealmPortal:769819664096034846> **Realm Portal**:  0-2 Enemy Damage or 1 Personal Health, 50% chance of extra turn\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(0, 3);
						var roll2 = random(1, 2);
						var amount = '';
						if (roll > 0 && roll < 3) {
							amount = damage('waiting', roll);
						}
						if (roll === 0) {
							action = 'Your portal fizzles out before you have time to do anything with it. You glance at your opponent embarrassedly and deal no damage.';
						} else if (roll === 1) {
							if (roll2 === 1) {
								action = 'You place a portal above <@' + global.waitingPlayerID + '> and another below yourself. You jump in and fall onto them for ' + amount + ' damage.';
							} else {
								action = 'You step through the portal, but become disoriented and only barely hit <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							}
							hummingbirdCheck();
						} else if (roll === 2) {
							if (roll2 === 1) {
								action = 'You leap through the portal and nimbly attack <@' + global.waitingPlayerID + '> from behind for ' + amount + ' damage.';
							} else {
								action = 'You split your portal in two, placing one on the ceiling and one below <@' + global.waitingPlayerID + '>. They fall for quite a while and go splat for ' + amount + ' damage.';
							}
							flyingLionCheck();
						} else {
							amount = health('active', 1);
							action = 'You teleport far away from your opponent to take a quick break and recover ' + amount + ' health. I hope you brought snacks.';
						}
						var roll3 = random(1, 4);
						if (roll3 < 3) {
							if (roll3 === 1) {
								action += ' You act quickly and sneakily enough to confuse your opponent and gain an extra turn.';
							} else {
								action += ' The beautiful colors of your portal entrance your opponent, and you gain an extra turn.';
							}
							if (global.pocketwatchCounter === 0) {
								global.waitingPlayerNumExtraTurns > 0 ? global.waitingPlayerNumExtraTurns-- : global.activePlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
						}
						wyrmCheck('F');
						endTurn(interaction, 'use your Realm Portal', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Realm Portal** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}


	} else if (commandName === 'magistone') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892572308219244606') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemMagistone:793215911599407124> **Magistone**:  1 Enemy Damage or 0-4 Personal Health, ↑ Personal Defense or Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(0, 5);
						var amount = '';
						if (roll > 0 && roll < 5) {
							amount = health('active', roll);
						}
						if (roll === 0) {
							action = 'It appears that your stone does not want to listen to your mental commands. What did you do to it, exactly? You recover no health.';
						} else if (roll === 1) {
							action = 'The stone pulses with brilliant light and heals a papercut you did not realize you had. You recover ' + amount + ' health.';
						} else if (roll === 2) {
							action = 'You use your stone to summon a health potion and are rewarded for thinking outside the box, recovering ' + amount + ' health.';
						} else if (roll === 3) {
							action = 'Glittering magic sweeps your body, carefully sealing closed the worst of your wounds. You recover ' + amount + ' health.';
						} else if (roll === 4) {
							action = 'The power of the stone flows through you, healing your injuries in mere seconds. You recover ' + amount + ' health. Ivy would be proud.';
						} else {
							amount = damage('waiting', 1);
							action = 'You decide to be creative and throw your Magistone at <@' + global.waitingPlayerID + '>, and it smacks them in the side with a quiet thump, dealing ' + amount + ' damage.';
							flyingLionCheck();
							hummingbirdCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							action += ' You get ready to magically deflect attacks, increasing your Defense.';
							statChange('DF', 'active', true);
						} else {
							action += ' Magic courses through your veins, rejuvenating you and increasing your Recovery.';
							statChange('RC', 'active', true);
						}
						wyrmCheck('G');
						endTurn(interaction, 'use your Magistone', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Magistone** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'dagger') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530203581120562') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemDagger:838670346856431677> **Dagger**:  2 Enemy Damage, ↑ Personal Attack or Defense or Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 3);
						var amount = damage('waiting', 2);
						if (roll === 1) {
							action = 'You dodge behind <@' + global.waitingPlayerID + '> and backstab them for ' + amount + ' damage, tiptoeing away with a chuckle.';
						} else if (roll === 2) {
							action = 'You toss the dagger in your hand to get a better grip and throw it at <@' + global.waitingPlayerID + '> with laser precision for ' + amount + ' damage.';
						} else {
							action = 'You sidehug <@' + global.waitingPlayerID + '> and jab them in the side when they least expect it for ' + amount + ' damage.';
						}
						var roll2 = random(1, 3);
						if (roll2 === 1) {
							action += ' The dagger fills you with a sense of power over your opponent, increasing your Attack.';
							statChange('AT', 'active', true);
						} else if (roll2 === 2) {
							action += ' The dagger heightens your senses and improves your reflexes, increasing your Defense.';
							statChange('DF', 'active', true);
						} else {
							action += ' Practice sneaking around with the dagger helps you to take longer breaks, increasing your Recovery.';
							statChange('RC', 'active', true);
						}
						wyrmCheck('H');
						flyingLionCheck();
						hummingbirdCheck();
						endTurn(interaction, 'use your Dagger', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Dagger** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'frozenfish') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530356606091316') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemFrozenFish:838670349137870858> **Frozen Fish**:  1-4 Enemy Damage or 1-2 Enemy Health, ↓ Enemy Attack or Defense\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 6);
						var amount = '';
						if (roll < 5) {
							amount = damage('waiting', roll);
						}
						if (roll === 1) {
							action = 'You hurl the fish at <@' + global.waitingPlayerID + '> and it bites their nose, dealing ' + amount + ' damage. Perhaps it was not so frozen after all.';
							hummingbirdCheck();
						} else if (roll === 2) {
							action = 'The flying fish soars out of your hands and slaps <@' + global.waitingPlayerID + '> with its tail to deal ' + amount + ' damage.';
						} else if (roll === 3) {
							action = 'You wind up and smack <@' + global.waitingPlayerID + '> in the face with the mostly defrosted fish, dealing ' + amount + ' damage. It probably looked great in slow motion.';
						} else if (roll === 4) {
							action = 'It turns out that the fish is a swordfish, and you parry back and forth with <@' + global.waitingPlayerID + '>, eventually landing a hit for ' + amount + ' damage.';
							flyingLionCheck();
						} else if (roll === 5) {
							amount = health('waiting', 1);
							action = 'You try to attack, but <@' + global.waitingPlayerID + '> takes a big bite out of the fish instead. "Yum," they say as they recover ' + amount + ' health.';
						} else if (roll === 6) {
							amount = health('waiting', 2);
							action = '<@' + global.waitingPlayerID + '> snatches the fish out of your hands, defrosts it, and cooks it with breading and lime, chowing down for ' + amount + ' health.';
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							action += ' <@' + global.waitingPlayerID + '> is not as willing to attack a defenseless fish, as frozen as it might be, decreasing their Attack.';
							statChange('AT', 'waiting', false);
						} else {
							action += ' <@' + global.waitingPlayerID + '> is confused by your odd choice of weapon and lowers their guard, decreasing their Defense.';
							statChange('DF', 'waiting', false);
						}
						wyrmCheck('I');
						endTurn(interaction, 'use your Frozen Fish', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Frozen Fish** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'laserrifle') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530366894723103') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemLaserRifle:903038791562981397> **Laser Rifle**:  3x 0-2 Enemy Damage, ↓ Enemy Recovery, 50% chance of lost turn\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(0, 2) + random(0, 2) + random(0, 2);
						var amount = '';
						if (roll > 0) {
							amount = damage('waiting', roll);
						}
						if (roll === 0) {
							action = 'The rifle does not appear to work, or at least that is what you tell yourself as you search for the trigger. You only barely graze your opponent\'s arm and deal no damage.';
						} else if (roll === 1) {
							action = 'You shoot an item out of <@' + global.waitingPlayerID + '>\'s hand, and it spins in the air and plunks onto their head for ' + amount + ' damage.';
							hummingbirdCheck();
						} else if (roll === 2) {
							action = 'Trusting your good aim, you throw your laser rifle at <@' + global.waitingPlayerID + '> for ' + amount + ' damage. Headshot.';
						} else if (roll === 3) {
							action = 'You click the trigger and nothing happens. You remember to release the safety while <@' + global.waitingPlayerID + '> watches impatiently and shoot them a few times for ' + amount + ' damage.';
						} else if (roll === 4) {
							action = 'You propel yourself upwards with the recoil from a stream of laser shots and crash down onto <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						} else if (roll === 5) {
							action = 'You jump for cover and shoot a barrage of laser shots at <@' + global.waitingPlayerID + '> for ' + amount + ' damage, adding your own sound effects.';
						} else {
							action = 'The laser rifle surges with magical energy and fires a huge, majestic blast at <@' + global.waitingPlayerID + '> for ' + amount + ' damage and a very high score from the judges.';
							flyingLionCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							action += ' <@' + global.waitingPlayerID + '> will have a hard time healing from that, decreasing their Recovery.';
						} else {
							action += ' <@' + global.waitingPlayerID + '> is bleeding and weak, decreasing their Recovery.';
						}
						statChange('RC', 'waiting', false);
						var roll3 = random(1, 2);
						if (roll3 === 1) {
							action += ' The rifle\'s sudden recoil jolts you backwards and you lose a turn.';
							if (global.pocketwatchCounter === 0) {
								global.activePlayerNumExtraTurns > 0 ? global.activePlayerNumExtraTurns-- : global.waitingPlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
						}
						wyrmCheck('J');
						endTurn(interaction, 'use your Laser Rifle', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Laser Rifle** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}
	
	

	} else if (commandName === 'staff') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530364369764412') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemStaff:903038551682338836> **Staff**:  66% chance of 5-6 Enemy Damage, ↓ 2 of Personal Attack or Defense or Recovery on hit\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 3);
						if (roll < 3) {
							var roll2 = random(5, 6);
							var roll3 = random(1, 2);
							var amount = damage('waiting', roll2);
							if (roll2 === 5) {
								if (roll3 === 1) {
									action = 'You spin the staff with impressive flair to build up its magic and whack <@' + global.waitingPlayerID + '> with it for ' + amount + ' damage.';
								} else {
									action = 'The staff flashes with magic and rains a flurry of blows on <@' + global.waitingPlayerID + '> for ' + amount + ' damage as you hold it up triumphantly.';
								}
								hummingbirdCheck();
							} else {
								if (roll3 === 1) {
									action = 'You sweep <@' + global.waitingPlayerID + '>\'s legs out from under them and pummel them with magic for ' + amount + ' damage.';
								} else {
									action = 'Magic hums in delight as it swirls into the staff, and you shoot it at <@' + global.waitingPlayerID + '> in a powerful beam for ' + amount + ' damage.';
								}
								flyingLionCheck();
							}
							var roll4 = random(1, 3);
							if (roll4 === 1) {
								action += ' Using the staff\'s complex magic tires you out, decreasing your Attack and Defense.';
								statChange('AT', 'active', false);
								statChange('DF', 'active', false);
							} else if (roll4 === 2) {
								action += ' Some of the staff\'s magic hits you, weakening you and decreasing your Attack and Recovery.';
								statChange('AT', 'active', false);
								statChange('RC', 'active', false);
							} else {
								action += ' You are boldened by your show of strength and focus on attacking, decreasing your Defense and Recovery.';
								statChange('DF', 'active', false);
								statChange('RC', 'active', false);
							}
						} else {
							var roll5 = random(1, 2);
							if (roll5 === 1) {
								action = 'The staff\'s unwieldy power is too much for you to handle, and you sink to your knees, overwhelmed by its might. You deal no damage.';
							} else {
								action = 'The staff turns out to be much heavier than you expected. You try to use it, but you can hardly lift it and deal no damage.';
							}
						}
						wyrmCheck('K');
						endTurn(interaction, 'use your Staff', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Staff** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}
	

	
	} else if (commandName === 'shield') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('902364365263605810') && global.activePlayerShieldStatus === 'Down' && !global.itemProcessing) {
				global.itemProcessing = true;
				var formationChance = 100 - (global.round * 20);
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemShield:903038554127601694> **Shield**:  ' + formationChance + '% chance of shield\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 100);
						if (roll <= formationChance) {
							var roll2 = random(1, 3);
							if (roll2 === 1) {
								action = 'You are surrounded by a shield of pure magic that feels electric to the touch and might block damage for you.';
							} else if (roll2 === 2) {
								action = 'A luminescent shield unfolds around you, forming a protective bubble that will probably block damage. Probably.';
							} else {
								action = 'A shield that will likely block damage forms in front of your vision. It hopefully extends behind you as well.';
							}
							global.activePlayerShieldStatus = 'Up';
						} else {
							var roll3 = random(1, 2);
							if (roll3 === 1) {
								action = 'Your magic gains a mind of its own and fills the air with harmless bubbles. Your dismayed face is reflected in them.';
							} else {
								action = 'Your shield cannot just be made of regular magic, young mage. That stuff is permeable. I suppose you will find that out the hard way, though.';
							}
						}
						wyrmCheck('L');
						endTurn(interaction, 'use your Shield', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else if (global.activePlayerShieldStatus === 'Up') {
				await interaction.reply({ content: 'You already have a shield up. Please select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Shield** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}


	
	} else if (commandName === 'shifterdisc') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530361370837022') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemShifterDisc:903038892121407568> **Shifter Disc**:  3 Personal Damage or lose turn, ↑ Personal Attack and Defense and Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 4);
						if (roll < 3) {
							var amount = damage('active', 3);
							if (roll === 1) {
								action = 'You jab the shifter disc\'s needle into your arm for ' + amount + ' damage and wince as its energy spreads through your whole body, increasing all of your stats.';
							} else {
								action = 'After an uncomfortable pause, an internal mechanism in the shifter disc clicks and a needle darts into your arm. In shock, you take ' + amount + ' damage, but all of your stats increase.';
							}
						} else {
							if (global.pocketwatchCounter === 0) {
								global.activePlayerNumExtraTurns > 0 ? global.activePlayerNumExtraTurns-- : global.waitingPlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
							if (roll === 3) {
								action = 'You press the shifter disc against your symbol, and it injects new magic that increases all of your stats. You lose a turn while you wait for it to finish and detach.';
							} else {
								action = 'Magic pulses through the symbol on your arm in a sickening rhythm. The shifter blocks your magic for the time being, and you lose a turn.';
							}
						}
						statChange('AT', 'active', true);
						statChange('DF', 'active', true);
						statChange('RC', 'active', true);
						wyrmCheck('M');
						endTurn(interaction, 'use your Shifter Disc', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Shifter Disc** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}
	

	
	} else if (commandName === 'pocketwatch') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530369641971783') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemPocketwatch:903038555633385512> **Pocketwatch**:  2 Personal Health, ↓ Enemy Attack or Defense or Recovery, no extra or lost turns for either player for 3 turns, freeze the turn counter for 3 turns\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						var roll = random(1, 3);
						var amount = health('active', 2);
						if (roll === 1) {
							action = 'You step away from battle to recover ' + amount + ' health and glance at your pocketwatch, keeping careful time with your foot. The turn order is locked into place and the turn counter is frozen for 3 turns.';
						} else if (roll === 2) {
							action = 'You swing your pocketwatch back and forth, hypnotizing your opponent into a rhythm and giving yourself a break to recover ' + amount + ' health. The turn order is locked into place and the turn counter is frozen for 3 turns.';
						} else {
							action = 'You swallow your pocketwatch for ' + amount + ' health, surprised that it was so nutritious. Your new internal metronome locks the turn order into place and freezes the turn counter for 3 turns.';
						}
						global.pocketwatchCounter = 4;
						global.activePlayerNumExtraTurns = 0;
						global.waitingPlayerNumExtraTurns = 0;
						var roll2 = random(1, 3);
						if (roll2 === 1) {
							action += ' Time seems to slow down, weakening even the swiftest of <@' + global.waitingPlayerID + '>\'s blows and decreasing their Attack.';
							statChange('AT', 'waiting', false);
						} else if (roll2 === 2) {
							action += ' Time seems to speed up, allowing you to attack <@' + global.waitingPlayerID + '> faster and decreasing their Defense.';
							statChange('DF', 'waiting', false);
						} else {
							action += ' Before <@' + global.waitingPlayerID + '> knows it, they have no time left to recover from their injuries, decreasing their Recovery.';
							statChange('RC', 'waiting', false);
						}
						wyrmCheck('N');
						endTurn(interaction, 'use your Pocketwatch', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Pocketwatch** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}



	} else if (commandName === 'arkaetre') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('902364301522792448') && (global.activePlayerArkaetre === '' || global.activePlayerArkaetre === 'Kludde' || global.activePlayerArkaetre === 'Hydra') && !global.itemProcessing) {
				global.itemProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				var text = '<:itemArkaetre:903038551095128064> **Arkaetre**:  Gain a permanent random arkaetre ability\n\nUse this item?';
				if (global.activePlayerArkaetre === 'Kludde') {
					text = '🐺 **Arkaetre**:  Add a kludde to your pack\n\nUse this item?';
				} else if (global.activePlayerArkaetre === 'Hydra') {
					text = '🔱 **Arkaetre**:  Reset all active arkaetres\n\nUse this item?';
				}
				// @ts-ignore
				await interaction.reply({ content: text, components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var action = '';
						if (global.activePlayerArkaetre === 'Kludde') {
							global.activePlayerKluddeCount++;
							if (global.activePlayerKluddeCount === 2) {
								global.activePlayerArkaetreIcon = '🐺2️⃣ ';
							} else if (global.activePlayerKluddeCount === 3) {
								global.activePlayerArkaetreIcon = '🐺3️⃣ ';
							} else if (global.activePlayerKluddeCount === 4) {
								global.activePlayerArkaetreIcon = '🐺4️⃣ ';
							} else if (global.activePlayerKluddeCount === 5) {
								global.activePlayerArkaetreIcon = '🐺5️⃣ ';
							} else if (global.activePlayerKluddeCount === 6) {
								global.activePlayerArkaetreIcon = '🐺6️⃣ ';
							} else if (global.activePlayerKluddeCount === 7) {
								global.activePlayerArkaetreIcon = '🐺7️⃣ ';
							}
							action = 'Your kludde arkaetre howls and a new kludde hears the call, joining your pack.';
						} else if (global.activePlayerArkaetre === 'Hydra') {
							global.activePlayerArkaetre = '';
							global.activePlayerArkaetreIcon = '';
							if (global.waitingPlayerArkaetre === 'Griffin') {
								global.waitingPlayerAT = 'Normal';
							} else if (global.waitingPlayerArkaetre === 'Dragon') {
								global.waitingPlayerDF = 'Normal';
							} else if (global.waitingPlayerArkaetre === 'Cheetah') {
								global.waitingPlayerRC = 'Normal';
							}
							global.waitingPlayerKluddeCount = 0;
							global.waitingPlayerPhoenixUsed = false;
							global.waitingPlayerArkaetre = '';
							global.waitingPlayerArkaetreIcon = '';
							action = 'Your hydra arkaetre helps you to use powerful time magic, erasing all traces of active arkaetres in the battle.';
						} else {
							var roll = random(1, 12);
							if (roll === 1) {
								action = 'You called your wyrm arkaetre! Every time you use an item that you have not used yet in this battle, you will gain 1 extra point of health.';
								global.activePlayerArkaetre = 'Wyrm';
								global.activePlayerArkaetreIcon = '🐍 ';
							} else if (roll === 2) {
								action = 'You called your flying lion arkaetre! Every time you roll the highest possible Enemy Damage for an item, you will deal 1 extra point of damage.';
								global.activePlayerArkaetre = 'Flying Lion';
								global.activePlayerArkaetreIcon = '🦁 ';
							} else if (roll === 3) {
								action = 'You called your hummingbird arkaetre! Every time you roll the lowest possible positive Enemy Damage for an item, you will gain 1 point of health.';
								global.activePlayerArkaetre = 'Hummingbird';
								global.activePlayerArkaetreIcon = '🕊️ ';
							} else if (roll === 4) {
								action = 'You called your owl arkaetre! Every time you have no Normal stats at the end of your turn right after your opponent moves, you will have a 66% chance of gaining an extra turn.';
								global.activePlayerArkaetre = 'Owl';
								global.activePlayerArkaetreIcon = '🦉 ';
							} else if (roll === 5) {
								action = 'You called your griffin arkaetre! Your Attack will always be high, and you and your opponent will both have an extra 5% chance of an instakill every time you use an item to deal Enemy Damage.';
								global.activePlayerArkaetre = 'Griffin';
								global.activePlayerArkaetreIcon = '🦅 ';
								global.activePlayerAT = 'High🔺';
							} else if (roll === 6) {
								action = 'You called your dragon arkaetre! Your Defense will always be high, and you and your opponent will both have an extra 10% chance of critical hits and heals.';
								global.activePlayerArkaetre = 'Dragon';
								global.activePlayerArkaetreIcon = '🐲 ';
								global.activePlayerDF = 'High🔺';
							} else if (roll === 7) {
								action = 'You called your cheetah arkaetre! Your Recovery will always be high, and you and your opponent will both take 1 extra point of damage each turn.';
								global.activePlayerArkaetre = 'Cheetah';
								global.activePlayerArkaetreIcon = '🐆 ';
								global.activePlayerRC = 'High🔺';
							} else if (roll === 8) {
								action = 'You called your komodo dragon arkaetre! Every time your opponent uses an item to deal Enemy Damage, you will deal 1 point of damage.';
								global.activePlayerArkaetre = 'Komodo Dragon';
								global.activePlayerArkaetreIcon = '🦎 ';
							} else if (roll === 9) {
								action = 'You called your sphinx arkaetre! Every time your opponent uses an item to heal, you will gain 1 point of health.';
								global.activePlayerArkaetre = 'Sphinx';
								global.activePlayerArkaetreIcon = '🐈 ';
							} else if (roll === 10) {
								action = 'You called your kludde arkaetre! You can use the `/arkaetre` command to add more kludde to your pack, 1 at a time. When you gather 7 kludde, you will instakill your opponent.';
								global.activePlayerArkaetre = 'Kludde';
								global.activePlayerArkaetreIcon = '🐺1️⃣ ';
								global.activePlayerKluddeCount = 1;
							} else if (roll === 11) {
								action = 'You called your phoenix arkaetre! The first time you end any turn with 1-3 points of health, you will go back to full health.';
								global.activePlayerArkaetre = 'Phoenix';
								global.activePlayerArkaetreIcon = '🐦 ';
							} else if (roll === 12) {
								action = 'You called your hydra arkaetre! The maximum number of health points allowed will gradually decrease by 1 health per 2 counted turns. Use the `/arkaetre` command again to reset the health point cap and both your and your opponent\'s arkaetres.';
								global.activePlayerArkaetre = 'Hydra';
								global.activePlayerArkaetreIcon = '🔱 ';
							}
						}
						endTurn(interaction, 'use your Arkaetre', action);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item.');
						global.itemProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItem(interaction) } });
			} else if (global.itemProcessing) {
				await interaction.reply({ content: 'An item prompt is already displayed. Please use the selected item or cancel it and select another item.', ephemeral: true });
			} else if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('902364301522792448')) {
				await interaction.reply({ content: 'You cannot override your current arkaetre. Please select another item.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Arkaetre** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item commands right now.', ephemeral: true });
		}
	


	} else if (commandName === 'adminkill') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (global.activePlayerID === '354752678376636417' || global.waitingPlayerID === '354752678376636417') {
			global.waitingPlayerHP = 0;
			endTurn(interaction, 'use your admin superiority', 'They dead.');
		} else {
			await interaction.reply({ content: 'Only an admin can use this command.', ephemeral: true });
		}
	}



});
client.login(token);



function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}



function timeoutItem(interaction) {
	interaction.editReply({ content: 'The item selection timed out. Please try again.', components: [] });
	global.itemProcessing = false;
}



function resetTimeout() {
	if (global.interval != null) {
		clearInterval(global.interval);
		global.interval = null;
	}
	global.timeoutWarningGiven = false;
}



function restartTimeout(interaction) {
	resetTimeout();
	global.interval = setInterval(timeout, 900000, interaction);
}



function timeout(interaction) {
	if (!global.timeoutWarningGiven) {
		global.timeoutWarningGiven = true;
		interaction.channel.send('The battle will time out in 15 minutes. <@' + global.activePlayerID + '>, it is your turn!');
	} else {
		resetTimeout();
		resetGameVars();
		interaction.channel.send('The battle timed out.');
		console.log('Battle timed out!');
	}
}



function challengeEnd() {
	if (global.challengeOverride) {
		global.interactionSave.editReply({ content: 'The battle challenge was overridden.', components: [] });
		global.challengeOverride = false;
		global.interactionSave = null;
		if (global.collectorSave != null) {
			global.collectorSave.stop();
		}

	} else if (!global.buttonClickedSave) { 
		global.interactionSave.editReply({ content: 'The battle challenge timed out.', components: [] });
		global.interactionSave = null;
		if (global.collectorSave != null) {
			global.collectorSave.stop();
		}
	}
}



function resetGameVars() {
	global.itemProcessing = false;

	global.activePlayerID = '';
	global.activePlayerHP = 15;
	global.activePlayerAT = 'Normal';
	global.activePlayerDF = 'Normal';
	global.activePlayerRC = 'Normal';
	global.activePlayerNumExtraTurns = 0;
	global.activePlayerShieldStatus = 'Down';
	global.activePlayerArkaetre = '';
	global.activePlayerArkaetreIcon = '';
	global.activePlayerWyrmList = '';
	global.activePlayerKluddeCount = 0;
	global.activePlayerPhoenixUsed = false;

	global.waitingPlayerID = '';
	global.waitingPlayerHP = 15;
	global.waitingPlayerAT = 'Normal';
	global.waitingPlayerDF = 'Normal';
	global.waitingPlayerRC = 'Normal';
	global.waitingPlayerNumExtraTurns = 0;
	global.waitingPlayerShieldStatus = 'Down';
	global.waitingPlayerArkaetre = '';
	global.waitingPlayerArkaetreIcon = '';
	global.waitingPlayerWyrmList = '';
	global.waitingPlayerKluddeCount = 0;
	global.waitingPlayerPhoenixUsed = false;

	global.turn = true;
	global.turnNumber = 1;
	global.round = 1;
	global.actionType = '';
	global.pocketwatchCounter = 0;
	global.pocketwatchActivated = false;
	global.wyrmActivated = false;
	global.flyingLionActivated = false;
	global.hummingbirdActivated = false;
	global.turnJustSwitched = false;
}



function extraTurnReset() {
	if (global.pocketwatchCounter === 0) {
		global.turnNumber++;
	}
	global.actionType = '';
	global.pocketwatchActivated = false;
	global.wyrmActivated = false;
	global.flyingLionActivated = false;
	global.hummingbirdActivated = false;
	global.turnJustSwitched = false;
}



function swapTurns() {
	var waitingPlayerIDTemp = global.waitingPlayerID;
	var waitingPlayerHPTemp = global.waitingPlayerHP;
	var waitingPlayerATTemp = global.waitingPlayerAT;
	var waitingPlayerDFTemp = global.waitingPlayerDF;
	var waitingPlayerRCTemp = global.waitingPlayerRC;
	var waitingPlayerNumExtraTurnsTemp = global.waitingPlayerNumExtraTurns;
	var waitingPlayerShieldStatusTemp = global.waitingPlayerShieldStatus;
	var waitingPlayerArkaetreTemp = global.waitingPlayerArkaetre;
	var waitingPlayerArkaetreIconTemp = global.waitingPlayerArkaetreIcon;
	var waitingPlayerWyrmListTemp = global.waitingPlayerWyrmList;
	var waitingPlayerKluddeCountTemp = global.waitingPlayerKluddeCount;
	var waitingPlayerPhoenixUsedTemp = global.waitingPlayerPhoenixUsed;

	global.waitingPlayerID = global.activePlayerID;
	global.waitingPlayerHP = global.activePlayerHP;
	global.waitingPlayerAT = global.activePlayerAT;
	global.waitingPlayerDF = global.activePlayerDF;
	global.waitingPlayerRC = global.activePlayerRC;
	global.waitingPlayerNumExtraTurns = global.activePlayerNumExtraTurns;
	global.waitingPlayerShieldStatus = global.activePlayerShieldStatus;
	global.waitingPlayerArkaetre = global.activePlayerArkaetre;
	global.waitingPlayerArkaetreIcon = global.activePlayerArkaetreIcon;
	global.waitingPlayerWyrmList = global.activePlayerWyrmList;
	global.waitingPlayerKluddeCount = global.activePlayerKluddeCount;
	global.waitingPlayerPhoenixUsed = global.activePlayerPhoenixUsed;

	global.activePlayerID = waitingPlayerIDTemp;
	global.activePlayerHP = waitingPlayerHPTemp;
	global.activePlayerAT = waitingPlayerATTemp;
	global.activePlayerDF = waitingPlayerDFTemp;
	global.activePlayerRC = waitingPlayerRCTemp;
	global.activePlayerNumExtraTurns = waitingPlayerNumExtraTurnsTemp;
	global.activePlayerShieldStatus = waitingPlayerShieldStatusTemp;
	global.activePlayerArkaetre = waitingPlayerArkaetreTemp;
	global.activePlayerArkaetreIcon = waitingPlayerArkaetreIconTemp;
	global.activePlayerWyrmList = waitingPlayerWyrmListTemp;
	global.activePlayerKluddeCount = waitingPlayerKluddeCountTemp;
	global.activePlayerPhoenixUsed = waitingPlayerPhoenixUsedTemp;

	global.turn = !global.turn;
	if (global.pocketwatchCounter === 0) {
		global.turnNumber++;
	}
	global.actionType = '';
	global.pocketwatchActivated = false;
	global.wyrmActivated = false;
	global.flyingLionActivated = false;
	global.hummingbirdActivated = false;
	global.turnJustSwitched = true;
}



function statChange(stat, target, increase) {
	if (target === 'active') {
		if (stat === 'AT') {
			if (global.activePlayerAT === 'Low🔻') {
				if (increase) {
					global.activePlayerAT = 'Normal';
				}
			} else if (global.activePlayerAT === 'Normal') {
				if (increase) {
					global.activePlayerAT = 'High🔺';
				} else {
					global.activePlayerAT = 'Low🔻';
				}
			} else if (global.activePlayerAT === 'High🔺') {
				if (!increase && global.activePlayerArkaetre !== 'Griffin') {
					global.activePlayerAT = 'Normal';
				}
			}
		} else if (stat === 'DF') {
			if (global.activePlayerDF === 'Low🔻') {
				if (increase) {
					global.activePlayerDF = 'Normal';
				}
			} else if (global.activePlayerDF === 'Normal') {
				if (increase) {
					global.activePlayerDF = 'High🔺';
				} else {
					global.activePlayerDF = 'Low🔻';
				}
			} else if (global.activePlayerDF === 'High🔺') {
				if (!increase && global.activePlayerArkaetre !== 'Dragon') {
					global.activePlayerDF = 'Normal';
				}
			}
		} else {
			if (global.activePlayerRC === 'Low🔻') {
				if (increase) {
					global.activePlayerRC = 'Normal';
				}
			} else if (global.activePlayerRC === 'Normal') {
				if (increase) {
					global.activePlayerRC = 'High🔺';
				} else {
					global.activePlayerRC = 'Low🔻';
				}
			} else if (global.activePlayerRC === 'High🔺') {
				if (!increase && global.activePlayerArkaetre !== 'Cheetah') {
					global.activePlayerRC = 'Normal';
				}
			}
		}
	} else {
		if (stat === 'AT') {
			if (global.waitingPlayerAT === 'Low🔻') {
				if (increase) {
					global.waitingPlayerAT = 'Normal';
				}
			} else if (global.waitingPlayerAT === 'Normal') {
				if (increase) {
					global.waitingPlayerAT = 'High🔺';
				} else {
					global.waitingPlayerAT = 'Low🔻';
				}
			} else if (global.waitingPlayerAT === 'High🔺') {
				if (!increase && global.waitingPlayerArkaetre !== 'Griffin') {
					global.waitingPlayerAT = 'Normal';
				}
			}
		} else if (stat === 'DF') {
			if (global.waitingPlayerDF === 'Low🔻') {
				if (increase) {
					global.waitingPlayerDF = 'Normal';
				}
			} else if (global.waitingPlayerDF === 'Normal') {
				if (increase) {
					global.waitingPlayerDF = 'High🔺';
				} else {
					global.waitingPlayerDF = 'Low🔻';
				}
			} else if (global.waitingPlayerDF === 'High🔺') {
				if (!increase && global.waitingPlayerArkaetre !== 'Dragon') {
					global.waitingPlayerDF = 'Normal';
				}
			}
		} else {
			if (global.waitingPlayerRC === 'Low🔻') {
				if (increase) {
					global.waitingPlayerRC = 'Normal';
				}
			} else if (global.waitingPlayerRC === 'Normal') {
				if (increase) {
					global.waitingPlayerRC = 'High🔺';
				} else {
					global.waitingPlayerRC = 'Low🔻';
				}
			} else if (global.waitingPlayerRC === 'High🔺') {
				if (!increase && global.waitingPlayerArkaetre !== 'Cheetah') {
					global.waitingPlayerRC = 'Normal';
				}
			}
		}
	}
}



function health(target, value) {
	if (target === 'active') {
		global.actionType = 'Heal';
		if (global.activePlayerRC === 'High🔺') {
			value += 1;
		} else if (global.activePlayerRC === 'Low🔻') {
			value -= 1;
		}
	} else {
		if (global.waitingPlayerRC === 'High🔺') {
			value += 1;
		} else if (global.waitingPlayerRC === 'Low🔻') {
			value -= 1;
		}
	}
	if (value < 0) {
		value = 0;
	}
	if (target === 'active') {
		global.activePlayerHP += value;
	} else {
		global.waitingPlayerHP += value;
	}
	if (value === 1) {
		return value + ' point of';
	} else {
		return value + ' points of';
	}
}



function damage(target, value) {
	if (global.activePlayerAT === 'High🔺') {
		value += 1;
	} else if (global.activePlayerAT === 'Low🔻') {
		value -= 1;
	}
	if (target === 'active') {
		if (global.activePlayerDF === 'High🔺') {
			value -= 1;
		} else if (global.activePlayerDF === 'Low🔻') {
			value += 1;
		}
	} else {
		global.actionType = 'Attack';
		if (global.waitingPlayerDF === 'High🔺') {
			value -= 1;
		} else if (global.waitingPlayerDF === 'Low🔻') {
			value += 1;
		}
	}

	if (value < 0) {
		value = 0;
	}
	if (target === 'active') {
		if (global.activePlayerShieldStatus === 'Up') {
			var roll = random(1, 6);
			if (roll > value) {
				global.activePlayerShieldStatus = 'Blocked';
			} else {
				global.activePlayerShieldStatus = 'Fell';
				global.activePlayerHP -= value;
			}
		} else {
			global.activePlayerHP -= value;
		}
	} else {
		if (global.waitingPlayerShieldStatus === 'Up') {
			var roll = random(1, 6);
			if (roll > value) {
				global.waitingPlayerShieldStatus = 'Blocked';
			} else {
				global.waitingPlayerShieldStatus = 'Fell';
				global.waitingPlayerHP -= value;
			}
		} else {
			global.waitingPlayerHP -= value;
		}
	}
	if (value === 1) {
		return value + ' point of';
	} else {
		return value + ' points of';
	}
}



function wyrmCheck(letter) {
	if (!global.activePlayerWyrmList.includes(letter)) {
		global.activePlayerWyrmList += letter;
		if (global.activePlayerArkaetre === 'Wyrm') {
			global.wyrmActivated = true;
		}
	}
}



function flyingLionCheck() {
	if (global.activePlayerArkaetre === 'Flying Lion') {
		global.flyingLionActivated = true;
	}
}



function hummingbirdCheck() {
	if (global.activePlayerArkaetre === 'Hummingbird') {
		global.hummingbirdActivated = true;
	}
}



function endTurn(interaction, item, action) {
	console.log('<@' + global.activePlayerID + '> used the \'' + item + '\' action!');

	var criticalMessage = '';
	var roll = random(1, 30);
	var tag  = '💥 Critical'
	if (global.activePlayerArkaetre === 'Dragon' || global.waitingPlayerArkaetre === 'Dragon') {
		roll = random(1, 15);
		tag = '💥🐲 Dragonscale';
		if (global.activePlayerArkaetre === 'Dragon' && global.waitingPlayerArkaetre === 'Dragon') {
			roll = random(1, 10);
		}
	}
	if (roll < 4) {
		if (global.actionType === 'Attack') {
			criticalMessage = '\n\n' + tag + ' Hit! You deal 1 more point of damage.';
			if (global.waitingPlayerShieldStatus === 'Down' || global.waitingPlayerShieldStatus === 'Fell') {
				global.waitingPlayerHP--;
			}
		} else if (global.actionType === 'Heal') {
			criticalMessage = '\n\n' + tag + ' Heal! You gain 1 more point of health.';
			global.activePlayerHP++;
		}
	}

	var roundDamageMessage = '';
	if (global.round === 2) {
		roundDamageMessage = '\n\n⌛ It is Round 2! You take 1 point of damage.';
	} else if (global.round === 3) {
		roundDamageMessage = '\n\n⌛ It is Round 3! You take 2 points of damage.';
	} else if (global.round === 4) {
		roundDamageMessage = '\n\n⌛ It is Round 4! You take 3 points of damage.';
	}
	global.activePlayerHP -= global.round - 1;

	var pocketwatchMessage = '';
	if (global.pocketwatchActivated) {
		pocketwatchMessage = '\n\n<:itemPocketwatch:903038555633385512> The pocketwatch ticks adamantly and prevents any turns from being gained or lost.';
	}

	var shieldMessage = '';
	if (global.waitingPlayerShieldStatus === 'Blocked') {
		shieldMessage += '\n\n<:itemShield:903038554127601694> <@' + global.waitingPlayerID + '>\'s shield blocks your damage to them and stays up.';
		global.waitingPlayerShieldStatus = 'Up';
	} else if (global.waitingPlayerShieldStatus === 'Fell') {
		shieldMessage += '\n\n<:itemShield:903038554127601694> <@' + global.waitingPlayerID + '>\'s shield is not strong enough to block your damage to them, and it falls.';
		global.waitingPlayerShieldStatus = 'Down';
	}
	if (global.activePlayerShieldStatus === 'Blocked') {
		shieldMessage += '\n\n<:itemShield:903038554127601694> Your shield blocks your damage to yourself and stays up.';
		global.activePlayerShieldStatus = 'Up';
	} else if (global.activePlayerShieldStatus === 'Fell') {
		shieldMessage += '\n\n<:itemShield:903038554127601694> Your shield is not strong enough to block your damage to yourself, and it falls.';
		global.activePlayerShieldStatus = 'Down';
	}

	var arkaetreMessage = '';
	if (global.wyrmActivated) {
		arkaetreMessage += '\n\n🐍 Your wyrm arkaetre grins at your flexibility and flies you out of danger\'s way, letting you recover 1 point of health.';
		global.activePlayerHP++;
	}
	if (global.flyingLionActivated) {
		arkaetreMessage += '\n\n🦁 Your flying lion arkaetre is boldened by your strong attack and pounces on <@' + global.waitingPlayerID + '> from above, dealing 1 point of damage.';
		global.waitingPlayerHP--;
	}
	if (global.hummingbirdActivated) {
		arkaetreMessage += '\n\n🕊️ Your hummingbird arkaetre delights in your tiny attack and gives you some of its hard-earned nectar, granting you 1 point of health.';
		global.activePlayerHP++;
	}
	if (global.activePlayerArkaetre === 'Owl' && global.turnJustSwitched && global.activePlayerAT !== 'Normal' && global.activePlayerDF !== 'Normal' && global.activePlayerRC !== 'Normal') {
		if (random(1, 3) < 3) {
			arkaetreMessage += '\n\n🦉 Your owl arkaetre\'s eyes widen at your irregular stats and it fills the air with feathers, granting you an extra turn.';
			global.waitingPlayerNumExtraTurns > 0 ? global.waitingPlayerNumExtraTurns-- : global.activePlayerNumExtraTurns++;
		} else {
			arkaetreMessage += '\n\n🦉 Your owl arkaetre is unimpressed.';
		}
	}
	if ((global.activePlayerArkaetre === 'Griffin' || global.waitingPlayerArkaetre === 'Griffin') && global.actionType === 'Attack') {
		var roll = random(1, 20);
		if (global.activePlayerArkaetre === 'Griffin' && global.waitingPlayerArkaetre === 'Griffin' && roll < 3) {
			if (roll === 1) {
				arkaetreMessage += '\n\n🦅 Your griffin arkaetre silently lunges for <@' + global.waitingPlayerID + '> when they least expect it, defeating them instantly.';
			} else {
				arkaetreMessage += '\n\n🦅 <@' + global.waitingPlayerID + '>\'s griffin arkaetre silently lunges for them when they least expect it, defeating them instantly. Trust is a dangerous thing.';
			}
			global.waitingPlayerHP = 0;
		} else if (global.activePlayerArkaetre === 'Griffin' && roll === 1) {
			arkaetreMessage += '\n\n🦅 Your griffin arkaetre silently lunges for <@' + global.waitingPlayerID + '> when they least expect it, defeating them instantly.';
			global.waitingPlayerHP = 0;
		} else if (global.waitingPlayerArkaetre === 'Griffin' && roll === 1) {
			arkaetreMessage += '\n\n🦅 <@' + global.waitingPlayerID + '>\'s griffin arkaetre silently lunges for them when they least expect it, defeating them instantly. Trust is a dangerous thing.';
			global.waitingPlayerHP = 0;
		}
	}
	if (global.activePlayerArkaetre === 'Cheetah') {
		arkaetreMessage += '\n\n🐆 Your cheetah arkaetre is impatient and scratches you and your opponent for 1 point of damage each.';
		global.activePlayerHP--;
		global.waitingPlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Cheetah') {
		arkaetreMessage += '\n\n🐆 <@' + global.waitingPlayerID + '>\'s cheetah arkaetre is impatient and scratches both of you for 1 point of damage each.';
		global.activePlayerHP--;
		global.waitingPlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Komodo Dragon' && global.actionType === 'Attack') {
		arkaetreMessage += '\n\n🦎 <@' + global.waitingPlayerID + '>\'s komodo dragon arkaetre hisses threateningly and bites you for 1 point of damage when you attack.';
		global.activePlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Sphinx' && global.actionType === 'Heal') {
		arkaetreMessage += '\n\n🐈 <@' + global.waitingPlayerID + '>\'s sphinx arkaetre shoots you an alluring smile and distracts you with a riddle, allowing your opponent to gain 1 point of health.';
		global.waitingPlayerHP++;
	}
	if (global.activePlayerKluddeCount === 7) {
		arkaetreMessage += '\n\n🐺 Your kludde howl as one and overwhelm your opponent with fiery fury, defeating them instantly.';
		global.waitingPlayerHP = 0;
	}
	if (global.activePlayerArkaetre === 'Phoenix' && global.activePlayerHP < 4 && global.activePlayerHP > 0 && !global.activePlayerPhoenixUsed) {
		arkaetreMessage += '\n\n🐦 Your phoenix arkaetre douses you in magic fire and flies away. You are reborn from the ashes with full health.';
		global.activePlayerHP = 15;
		global.activePlayerArkaetreIcon = '🪶 ';
		global.activePlayerPhoenixUsed = true;
	}
	if (global.waitingPlayerArkaetre === 'Phoenix' && global.waitingPlayerHP < 4 && global.waitingPlayerHP > 0 && !global.waitingPlayerPhoenixUsed) {
		arkaetreMessage += '\n\n🐦 <@' + global.waitingPlayerID + '>\'s phoenix arkaetre douses them in magic fire and flies away. They are reborn from the ashes with full health.';
		global.waitingPlayerHP = 15;
		global.waitingPlayerArkaetreIcon = '🪶 ';
		global.waitingPlayerPhoenixUsed = true;
	}

	var roundTag = '';
	for (var i = 0; i < global.round; i++) {
		roundTag += '⌛';
	}
	roundTag += ' ';
	var roundStartingMessage = '';
	if (global.turnNumber === 25 && global.round === 1) {
		global.round = 2;
		roundStartingMessage = '\n\n⌛ Round 2 is starting! Each turn, the active player will take 1 point of damage, and the maximum shield formation chance has decreased to 60%.';
	} else if (global.turnNumber === 50 && global.round === 2) {
		global.round = 3;
		roundStartingMessage = '\n\n⌛ Round 3 is starting! Each turn, the active player will take 2 points of damage, and the maximum shield formation chance has decreased to 40%.';
	} else if (global.turnNumber === 75 && global.round === 3) {
		global.round = 4;
		roundStartingMessage = '\n\n⌛ Round 4 is starting! Each turn, the active player will take 3 points of damage, and the maximum shield formation chance has decreased to 20%.';
	}

	var pocketwatchTurnFreezeIcon = '';
	if (global.pocketwatchCounter > 0) {
		pocketwatchTurnFreezeIcon = ' ❄️';
		global.pocketwatchCounter--;
		if (global.pocketwatchCounter === 0) {
			pocketwatchTurnFreezeIcon = ' 💧';
		}
	}

	var healthCap = global.activePlayerArkaetre === 'Hydra' || global.waitingPlayerArkaetre === 'Hydra' ? 20 - Math.floor(global.turnNumber / 2) : 20;
	if (global.activePlayerHP > healthCap) {
		global.activePlayerHP = healthCap;
	}
	if (global.activePlayerHP < 0) {
		global.activePlayerHP = 0;
	}
	if (global.waitingPlayerHP > healthCap) {
		global.waitingPlayerHP = healthCap;
	}
	if (global.waitingPlayerHP < 0) {
		global.waitingPlayerHP = 0;
	}

	var activePlayerHealthIcon = '';
	if (global.activePlayerHP === healthCap) {
		activePlayerHealthIcon = '💙';
	} else if (global.activePlayerHP >= 15) {
		activePlayerHealthIcon = '💚';
	} else if (global.activePlayerHP >= 10) {
		activePlayerHealthIcon = '💛';
	} else if (global.activePlayerHP >= 5) {
		activePlayerHealthIcon = '🧡';
	} else {
		activePlayerHealthIcon = '❤️';
	}
	var waitingPlayerHealthIcon = '';
	if (global.waitingPlayerHP === healthCap) {
		waitingPlayerHealthIcon = '💙';
	} else if (global.waitingPlayerHP >= 15) {
		waitingPlayerHealthIcon = '💚';
	} else if (global.waitingPlayerHP >= 10) {
		waitingPlayerHealthIcon = '💛';
	} else if (global.waitingPlayerHP >= 5) {
		waitingPlayerHealthIcon = '🧡';
	} else {
		waitingPlayerHealthIcon = '❤️';
	}

	var activePlayerShieldIcon = '';
	if (global.activePlayerShieldStatus === 'Up') {
		activePlayerShieldIcon = ' <:itemShield:903038554127601694>';
	}
	var waitingPlayerShieldIcon = '';
	if (global.waitingPlayerShieldStatus === 'Up') {
		waitingPlayerShieldIcon = ' <:itemShield:903038554127601694>';
	}

	var activePlayerExtraTurnsTag = '';
	if (global.activePlayerNumExtraTurns > 0) {
		activePlayerExtraTurnsTag = ' ♻️';
		for (var i = 1; i < global.activePlayerNumExtraTurns; i++) {
			activePlayerExtraTurnsTag += '♻️';
		}
	}
	var waitingPlayerExtraTurnsTag = '';
	if (global.waitingPlayerNumExtraTurns > 0) {
		waitingPlayerExtraTurnsTag = ' ♻️';
		for (var i = 1; i < global.waitingPlayerNumExtraTurns; i++) {
			waitingPlayerExtraTurnsTag += '♻️';
		}
	}

	var activePlayerATLockIcon = global.activePlayerArkaetre === 'Griffin' ? ' 🔒' : '';
	var activePlayerDFLockIcon = global.activePlayerArkaetre === 'Dragon' ? ' 🔒' : '';
	var activePlayerRCLockIcon = global.activePlayerArkaetre === 'Cheetah' ? ' 🔒' : '';
	var waitingPlayerATLockIcon = global.waitingPlayerArkaetre === 'Griffin' ? ' 🔒' : '';
	var waitingPlayerDFLockIcon = global.waitingPlayerArkaetre === 'Dragon' ? ' 🔒' : '';
	var waitingPlayerRCLockIcon = global.waitingPlayerArkaetre === 'Cheetah' ? ' 🔒' : '';

	var embed = new EmbedBuilder().setTitle('You ' + item + '!').setDescription(action + criticalMessage + roundDamageMessage + pocketwatchMessage + shieldMessage + arkaetreMessage + roundStartingMessage).setFooter({ text: roundTag + 'Turn ' + global.turnNumber + pocketwatchTurnFreezeIcon });
	if (global.turn) {
		embed.setColor(0x55ACEE).addFields(
			{ name: '\u200B', value: '🔸' + global.waitingPlayerArkaetreIcon + '<@' + global.waitingPlayerID + '>' + waitingPlayerShieldIcon + '🔸' + waitingPlayerExtraTurnsTag + '\n' + waitingPlayerHealthIcon + ' HP: ' + global.waitingPlayerHP + '/' + healthCap + '\n⚔️ AT: ' + global.waitingPlayerAT + waitingPlayerATLockIcon + '\n🛡️ DF: ' + global.waitingPlayerDF + waitingPlayerDFLockIcon + '\n💗 RC: ' + global.waitingPlayerRC + waitingPlayerRCLockIcon, inline: true },
			{ name: '\u200B', value: '🔹' + global.activePlayerArkaetreIcon + '<@' + global.activePlayerID + '>' + activePlayerShieldIcon + '🔹' + activePlayerExtraTurnsTag + '\n' + activePlayerHealthIcon + ' HP: ' + global.activePlayerHP + '/' + healthCap + '\n⚔️ AT: ' + global.activePlayerAT + activePlayerATLockIcon + '\n🛡️ DF: ' + global.activePlayerDF + activePlayerDFLockIcon + '\n💗 RC: ' + global.activePlayerRC + activePlayerRCLockIcon, inline: true }
		);
	} else {
		embed.setColor(0xF4900C).addFields(
			{ name: '\u200B', value: '🔸' + global.activePlayerArkaetreIcon + '<@' + global.activePlayerID + '>' + activePlayerShieldIcon + '🔸' + activePlayerExtraTurnsTag + '\n' + activePlayerHealthIcon + ' HP: ' + global.activePlayerHP + '/' + healthCap + '\n⚔️ AT: ' + global.activePlayerAT + activePlayerATLockIcon + '\n🛡️ DF: ' + global.activePlayerDF + activePlayerDFLockIcon + '\n💗 RC: ' + global.activePlayerRC + activePlayerRCLockIcon, inline: true },
			{ name: '\u200B', value: '🔹' + global.waitingPlayerArkaetreIcon + '<@' + global.waitingPlayerID + '>' + waitingPlayerShieldIcon + '🔹' + waitingPlayerExtraTurnsTag + '\n' + waitingPlayerHealthIcon + ' HP: ' + global.waitingPlayerHP + '/' + healthCap + '\n⚔️ AT: ' + global.waitingPlayerAT + waitingPlayerATLockIcon + '\n🛡️ DF: ' + global.waitingPlayerDF + waitingPlayerDFLockIcon + '\n💗 RC: ' + global.waitingPlayerRC + waitingPlayerRCLockIcon, inline: true }
		);
	}

	if (global.turnNumber === 100 || (global.waitingPlayerHP === 0 || global.activePlayerHP === 0)) {
		if (global.waitingPlayerHP === 0 && global.activePlayerHP === 0) {
			embed.addFields({ name: '\u200B', value: 'It is a tie! No battle points will be awarded. Good game.' });
		} else if (global.waitingPlayerHP === 0) {
			embed.addFields({ name: '\u200B', value: win(interaction, global.activePlayerID) });
		} else if (global.activePlayerHP === 0) {
			embed.addFields({ name: '\u200B', value: win(interaction, global.waitingPlayerID) });
		} else {
			embed.addFields({ name: '\u200B', value: 'The battle has been going on for too long, so it is a tie! No battle points will be awarded. Good game.' });
		}
		resetTimeout();
		resetGameVars();
		console.log('Battle ended!');
	} else if (global.activePlayerNumExtraTurns > 0) {
		extraTurnReset();
		embed.addFields({ name: '\u200B', value: '<@' + global.activePlayerID + '>, it is your turn again!' });
		global.activePlayerNumExtraTurns--;
	} else {
		swapTurns();
		embed.addFields({ name: '\u200B', value: '<@' + global.activePlayerID + '>, it is now your turn!' });
	}

	interaction.channel.send({ embeds: [embed] });
	global.itemProcessing = false;
}


function win(interaction, id) {
	var winner = interaction.guild.members.cache.get(id);
	if (!winner.roles.cache.has('922033934827675648')) {
		winner.roles.add(interaction.guild.roles.cache.get('922033934827675648'));
	}

	var ones = 0;
	var tens = 0;
	var hundreds = 0;
	for (var i = 0; i < 10; i++) {
		if (winner.roles.cache.has(global.onesPlace[i])) {
			winner.roles.remove(interaction.guild.roles.cache.get(global.onesPlace[i]));
			ones = i;
		}
	}
	for (var i = 0; i < 10; i++) {
		if (winner.roles.cache.has(global.tensPlace[i])) {
			winner.roles.remove(interaction.guild.roles.cache.get(global.tensPlace[i]));
			tens = i;
		}
	}
	for (var i = 1; i < 10; i++) {
		if (winner.roles.cache.has(global.hundredsPlace[i-1])) {
			winner.roles.remove(interaction.guild.roles.cache.get(global.hundredsPlace[i-1]));
			hundreds = i;
		}
	}

	var score = (hundreds * 100) + (tens * 10) + ones;
	var newScore = score + 1;
	newScore = newScore > 999 ? 999 : newScore;
	var newOnes = newScore % 10;
	var newTens = Math.floor(newScore / 10) % 10;
	var newHundreds = Math.floor(newScore / 100) % 10;

	winner.roles.add(interaction.guild.roles.cache.get(global.onesPlace[newOnes]));
	if (newTens !== 0 || newHundreds !== 0) {
		winner.roles.add(interaction.guild.roles.cache.get(global.tensPlace[newTens]));
	}
	if (newHundreds !== 0) {
		winner.roles.add(interaction.guild.roles.cache.get(global.hundredsPlace[newHundreds-1]));
	}

	if (score === 999) {
		return '<@' + id + '> won and has the maximum number of battle points! Good game.';
	} else {
		return '<@' + id + '> won and now has ' + newScore + ' battle points! Good game.';
	}
}