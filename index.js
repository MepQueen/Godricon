/// PUSH MESSAGE NOTES

/// PENDING UPDATES
/// Further balance Free Only? Attack specifically?
/// Kludde balanced for Free Only?

/// FUTURE UPDATES
/// Dark/Light/Gray continuum pick > different turn numbers advantageous + stat advantage
/// Ping streak
/// Pick a player class with certain perks? Darklight Order mages + Kireveans (symbol mage), Sand Trap Order of the Hydra mages w/staff, Ng Ey scroll mage, TKR stone mage
/// Achievements? For currency? Upgrades so more use for currency?
/// Boss battles?
/// Skill component?
/// More items rotating through shop? One use per battle items? One use items?
/// Typescript and refactoring - ?
/// Run on VM restart?
/// Game design notes on phone

/// FINAL CHECKS
/// Edit rules
/// Edit patch notes
/// Edit Tatsu text
/// Edit Kov text



// @ts-check

global.sendRestartMessage = false;

const { Client, Events, GatewayIntentBits, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, DiscordAPIError, GuildMemberRoleManager, ComponentType } = require('discord.js');
const { token } = require('C:/Videos/config.json');

global.interval = null;
global.timeoutWarningGiven = false;
resetGameVars();
global.battleMode = '**Default**';
global.arkaetreMode = '**Random**';
global.onesPlace = ['922034725714001930' /* Zero */, '922034703748435988', '922034705396801538', '922034707741425695', '922034710799069204', '922034713265319936', '922034715916128328', '922034718046838815', '922034720823464017', '922034723054813195'];
global.tensPlace = ['923075850415505439' /* Zero */, '922034458939519007', '922034588711268423', '922034620546031616', '922034682076491826', '922034689169055794', '922034691438153738', '922034694403522620', '922034697788325909', '922034700279771136'];
global.hundredsPlace = ['923072342924591134' /* One */, '923072346946940990', '923072350616969286', '923072353158725674', '923072356207951903', '923072359261433876', '923072362272931880', '923072365154435072', '923072367721340978'];

process.on('uncaughtException', function(err) {
	console.log('Error caught: ' + err)
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => { 
	console.log('Locked and Loaded!');
	/// @ts-ignore
	if (global.sendRestartMessage) client.channels.cache.get('922378133573885982')?.send({ content: 'I just got restarted. All mode settings are now default.' });
	client.user?.setActivity('. . .', { type: ActivityType.Watching });
});

client.on('interactionCreate', async interaction => {
	client.user?.setActivity('. . .', { type: ActivityType.Watching });
	if (!interaction.isCommand() && !interaction.isButton()) return;
	const commandName = interaction.isCommand()?interaction.commandName:undefined;
	if (!interaction.guild || !interaction.channel || !interaction.member) return;
	


	if (commandName === 'ping') {
		console.log('<@' + interaction.user.id + '> used ping.');
		await interaction.reply({ content: 'Hello, mortal.', ephemeral: true });
	


	} else if (commandName === 'patchnotes') {
		console.log('<@' + interaction.user.id + '> used patchnotes.');
		var currentPage = 0;
		var patchNotesText = ['**7/14/24**\n- The two bugs that got me to shut down the bot last time turned out to be bad luck and probably incorrect manual role assignment, so no action needed there.\n- Councilors will be delighted to hear that Volturnus is no longer allowed in the arena channel, so we can avoid message deletion log spam.\n- Arkaetres are now free (!!) and considered a free action, not an item, and a new item has taken the twelfth place, the scroll. Using a scroll gives both players a free extra turn every time it becomes their turn (or toggles this effect off again) and increases the turn counter by 5. Remember, overtime starts on turn 20. Everyone who previously bought an Arkaetre now has a scroll for free.\n- Check out `/battlemode` for some new ways to play! Try being limited to just free actions (Free Only), the first cheap six items (Front Six), the more expensive ones (Back Six). There\'s also backpack mode (Backpack), where you use four preset items of your choice! Just use `/setbackpack` first.\n- Similarly, `/arkaetremode` sets the Arkaetre mode, either Random, Picked or None. Pick your Arkaetre by using `/setarkaetre`.\n- You can check all of your presets with `/checkbackpackandarkaetre`.\n- Some small text edits for clarity, as usual.\n- The free attack action and a few arkaetres have been rebalanced for Free Only mode.\n- And yeah, I know the patch notes say Interaction Failed when you flip the page. It works, and I have no idea what\'s causing it, so whatever.',
		
		'**7/4/23**\n- The Enemy Recovery decrease effect has been moved from the laser rifle to the bow.\n- The laser rifle now decreases a random enemy stat instead.\n- The frozen fish has been boosted! It now has a 75% chance of dealing 3-5 damage and a 25% chance of healing your enemy for 2 points (it used to be a 66% chance of 1-4 damage and a 33% chance of 1-2 health).\n- `/freedefend` is now `/freeheal`, which includes a defensive stance that has a 33% chance of blocking the entire next set of negative effects that target you, including damage, stat effects, lost turns and instakills.', 
			
		'**7/3/23**\n- Overtime is back! After 20 turns, healing rolls will be disabled and the shield formation chance will drop to 50%. Healing items can still be used for their other functions.\n- `/freedefend` now has a 50% chance of a shield. But it\'ll be updated again soon...\n- The new overtime announcement won\'t be printed if a player just lost.\n- Some text edits.\n- The hydra has been updated. It no longer allows you to reset all active arkaetres. There is now a 66% chance of the health cap decreasing each turn the hydra is active, and having the hydra makes you immune to overtime effects. If two hydras are active, the chance of the health cap decreasing is 100%.',
		
		'**6/29/23**\n- Some text edits, especially ones more inclusive to free actions.\n- The names for the rules commands have changed *again*. They\'re now a pleasant combination of easy to search for and easy to tell apart.\n- The griffin and `/freeattack` instakills can no longer occur simultaneously.\n- The patch notes have pages now! Feel free to go back in time.\n- Challenges time out after only 14 minutes, because any longer and the bot won\'t know how to edit the message when it times out.\n- I\'m on the battle point leaderboard after a long time of not being. Why? I dunno, I felt like it. All my points are genuine, I promise.',
		
		'**6/25/23**\n- Apparently critical hits and heals weren\'t actually working. Now they are.\n- Challenges finally time out! No more forever unusable buttons.\n\n**6/19/23**\n- A text bug in the bow and Magistone confirmation messages was fixed.\n- Godricon is now running on sweet, sweet, completely redesigned Discord.js version 14. Prepare for bugs.\n- I have conquered my fear of source control. Godricon has made it onto GitHub.',
		
		'**2/11/23**\n- All three free actions finally exist, so those new to battling can still participate.\n\n**2/6/22**\n- More small text edits, as usual.\n- The leaderboard display is more vertical to work better on mobile.',
		
		'**2/2/22**\n- Rules about shields and rounds are now on the second page of the rules, `/rules2`, and `/arkaetrerules` was renamed to `/rules3`.\n- The chance a shield will break is now dependent on how much damage is dealt to it. Every damage point in the final value of an attack increases the chance by 17%, and an attack that deals at least six damage is guaranteed to break a shield.\n- Overtime has been replaced by a four-round system where negative effects increase every 25 turns, with another hourglass icon added to the turn counter for each round.\n- At 100 turns, a battle will end in a tie.\n- Extra turns are now displayed with symbols to the right of players\' stat headers.\n- The rule reminder at the end of battle embeds is gone.\n- The pocketwatch removes any saved up extra turns when used, stops the turn counter while active, and shows a frozen icon after the turn counter instead of a picture above the action text.\n- The hydra will now gradually lower the maximum number of health points while active by 1 health per 2 counted turns, and instead of it blocking both Arkaetre slots, you can use the `/arkaetre` command again to reset the health cap and all active arkaetres.\n- The second number in the HP stat is now the health cap instead of your starting health.\n- The challenge timeout length is now an hour.\n- The owl\'s extra turn chance is now 66%.',
		
		'**2/1/22**\n- `/toggle` exists so I can block off battles when I need to. Commands not related to battling like `/leaderboard` stay up.\n- There\'s no more daily point limit. Go crazy, if that\'s your thing.'];

		var lastPage = patchNotesText.length-1;
		const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('previous').setLabel('🢀 Previous').setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId('next').setLabel('Next 🢂').setStyle(ButtonStyle.Secondary).setDisabled(true));
		/// @ts-ignore
		await interaction.reply({ content: patchNotesText[currentPage], components: [row], ephemeral: true });
		const filter = i => (i.customId === 'previous' || i.customId === 'next');
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 840000 });

		collector.on('collect', async i => {
			if (row.components[0] instanceof ButtonBuilder && row.components[1] instanceof ButtonBuilder) {
				if (i.customId === 'previous') {
					if (currentPage < lastPage) {
						currentPage++;
						if (currentPage === lastPage) {
							row.components[1].setDisabled(false);
							row.components[0].setDisabled(true);
						} else {
							row.components[1].setDisabled(false);
							row.components[0].setDisabled(false);
						}
						/// @ts-ignore
						interaction.editReply({ content: patchNotesText[currentPage], components: [row], ephemeral: true });
					}
				} else if (i.customId === 'next') {
					if (currentPage > 0) {
						currentPage--;
						if (currentPage === 0) {
							row.components[1].setDisabled(true);
							row.components[0].setDisabled(false);
						} else {
							row.components[1].setDisabled(false);
							row.components[0].setDisabled(false);
						}
						/// @ts-ignore
						interaction.editReply({ content: patchNotesText[currentPage], components: [row], ephemeral: true });
					}
				}
			}
		});
		collector.on('end', collected => { interaction.editReply('The request timed out.') });
	

	
	} else if (commandName === 'rules-basic') {
		console.log('<@' + interaction.user.id + '> used rules-basic.');
		await interaction.reply({ content: '**__Overview__**\nYou can start a battle by typing `/battle` and pinging the member that you want to battle.\nYou can send a battle challenge open to anyone by typing `/challenge`. It will time out after 14 minutes.\nYou can end a battle you are in at any time by typing `/endbattle`.\nTwo battles cannot occur simultaneously.\nYour health starts at 15 and cannot go above 20.\nWhen a player\'s health hits 0, the other player wins.\nThe winner earns 1 battle point (BP), up to 999.\nIf both players hit 0 health on the same turn or turn 100 is reached, there is a tie.\n\nCheck other rules commands for more information!', ephemeral: true });



	} else if (commandName === 'rules-usingactionsanditems') {
		console.log('<@' + interaction.user.id + '> used rules-usingactionsanditems.');
		await interaction.reply({ content: '**__Using Items and Actions__**\nYou and your opponent will take turns using item commands such as `/sword` or free action commands such as `/freeattack`.\nYou can only use items that you have registered.\nTo register an item, buy it in `c!shop` and use it in `c!inventory`.\nYou only have to register each item once to use it in all battles.\nYou can use the `/freeattack`, `/freeheal`, `/freeboost` or `/arkaetre` actions to battle without a registered item.\n\n**__Modes__**\nSet the battle mode with `/battlemode`, which restricts which items can be used.\nIn Backpack mode, preset your items before a battle using `/setbackpack`.\nSet the arkaetre mode with `/arkaetremode`, determining if arkaetres can be used.\nIn Picked mode, preset your arkaetre before a battle using `/setarkaetre`.\nCheck your presets by using `/checkbackpackandarkaetre`.\n\n**__Item and Action Effects__**\nThe effects of an item are listed in its description in `c!shop` and `c!inventory`.\nYou will also be shown the effects of an item or action after using its command but before deciding whether to use it.\nA range of effects not separated by commas have an equal probability of occuring.\nEffects are applied in the order listed.\nItems and actions that, upon rolling, deal Enemy Damage or grant Personal Health, have a 10% chance of a critical hit or heal for an extra point of damage or health.\nArkaetre abilities and instakills are not affected by shields, pocketwatches or other Arkaetre abilities.\n\nCheck other rules commands for more information!', ephemeral: true });
	
	
	
	} else if (commandName === 'rules-advanced') {
		console.log('<@' + interaction.user.id + '> used rules-advanced.');
		await interaction.reply({ content: '**__Stats__**\nYou and your opponent have three different stats that affect item and action effects by up to 1 point in either direction.\nThey are Attack (AT) for attack strength, Defense (DF) for attack resistance, and Recovery (RC) for healing.\nEach of them can be Low🔻, Normal or High🔺.\nArkaetre abilities are not affected by stats.\nActions whose original rolls deal no damage or grant no health are not affected by stats or shields.\n\n**__Shields and Defensive Stances__**\nA shield can be formed by using `/shield`.\nA shield will block all damage from attacks for as long as it stays up.\nWhen a shield is hit by an attack, every damage point dealt increases the chance that the shield will fall by ~17%.\nA defensive stance can be taken by using `/freeheal`.\nA defensive stance has a 33% chance of blocking all damage and stat debuffs from a single attack.\n\n**__Overtime__**\nAfter 20 turns, overtime will start, and all healing rolls will be disabled.\nItems and actions that both heal and serve other functions can still be used for only those other functions.\nThe shield formation chance will also decrease to 50%.\n\nCheck other rules commands for more information!', ephemeral: true });
	
	

	} else if (commandName === 'rules-arkaetreslist') {
		console.log('<@' + interaction.user.id + '> used rules-arkaetreslist.');
		await interaction.reply({ content: '**__Arkaetre Abilities__**\n\n**🐍 Wyrm**\nEvery time you use an item or action that you have not used yet in the current battle, you will gain 1 additional point of health.\n\n**🦁 Flying Lion**\nEvery time you roll the highest possible Enemy Damage for an item or action, you will deal 1 additional point of damage.\n\n**🕊️ Hummingbird**\nEvery time you roll the lowest possible positive Enemy Damage for an item or action, you will gain 1 point of health.\n\n**🦉 Owl**\nEvery time you have no Normal stats at the end of your first turn in your turn sequence, you will have a 66% chance of gaining an extra turn.\n\n**🦅 Griffin**\nYour Attack will always be high, and you and your opponent will both have an additional 5% chance of an instakill every time either of you roll positive Enemy Damage for an item or action.\n\n**🐲 Dragon**\nYour Defense will always be high, and you and your opponent will both have an additional 10% chance of critical hits and heals.\n\n**🐆 Cheetah**\nYour Recovery will always be high, and you and your opponent will both take 1 extra point of damage each turn.\n\n**🦎 Komodo Dragon**\nEvery time your opponent uses an item or action to deal Enemy Damage, you will deal 1 point of Enemy Damage (50% chance in Free Only mode).\n\n**🐈 Sphinx**\nEvery time your opponent uses an item or action to gain Personal Health, you will gain 1 point of Personal Health (50% chance in Free Only mode).\n\n**🐺 Kludde**\nYou can use the `/arkaetre` command to add more kludde to your pack, 1 at a time. When you gather 7 kludde, you will instakill your opponent.\n\n**🐦 Phoenix**\nThe first time you end any turn with 1-3 points of health (1 in Free Only mode), you will go back to full health.\n\n**🔱 Hydra**\nEvery counted turn will have an additional 66% chance of decreasing the health cap by 1. You will also be immune to overtime effects.\n\nCheck other rules commands for more information!', ephemeral: true });
	

	
	} else if (commandName === 'rules-actionsanditemslist') {
		console.log('<@' + interaction.user.id + '> used rules-actionsanditemslist.');
		await interaction.reply({ content: '**__Free Action Effects__**\n\n🤜 **Attack**\n1-3 Enemy Damage, 5% chance of instakill\n\n:heart_hands: **Heal**\n1-2 Personal Health, gain defensive stance\n\n💪 **Boost**\n↑ Personal Attack or Defense or Recovery or ↓ Enemy Attack or Defense or Recovery, 33% chance of 2x effect\n\n<:itemArkaetre:1260808324027383861> **Arkaetre**\nGain an Arkaetre ability (check `/rules-arkaetreslist`)\n\n**__Item Effects__**\n\n<:itemSword:793212847584313364> **Sword**\n1-3 Enemy Damage, ↑ Personal Attack\n\n<:itemBow:793230409734291506> **Bow**\n2-4 Enemy Damage, ↓ Enemy Recovery, 50% chance of 1 Personal Damage\n\n<:itemRealmPortal:769819664096034846> **Realm Portal**\n0-2 Enemy Damage or 1 Personal Health, 50% chance of extra turn\n\n<:itemMagistone:793215911599407124> **Magistone**\n1 Enemy Damage or 0-4 Personal Health, ↑ Personal Defense or Recovery\n\n<:itemDagger:838670346856431677> **Dagger**\n2 Enemy Damage, ↑ Personal Attack or Defense or Recovery\n\n<:itemFrozenFish:838670349137870858> **Frozen Fish**\n3-5 Enemy Damage or 2 Enemy Health, ↓ Enemy Attack or Defense\n\n<:itemLaserRifle:903038791562981397> **Laser Rifle**\n3x 0-2 Enemy Damage, ↓ Enemy Attack or Defense or Recovery, 50% chance of lost turn\n\n<:itemStaff:903038551682338836> **Staff**\n0 or 5-6 Enemy Damage, ↓ 2 of Personal Attack or Defense or Recovery on hit\n\n<:itemShield:903038554127601694> **Shield**\n80% chance of shield\n\n<:itemShifterDisc:903038892121407568> **Shifter Disc**\n3 Personal Damage or lose turn, ↑ Personal Attack and Defense and Recovery\n\n<:itemPocketwatch:903038555633385512> **Pocketwatch**\n2 Personal Health, ↓ Enemy Attack or Defense or Recovery, no extra or lost turns for either player for 3 turns, freeze the turn counter for 3 turns\n\n<:itemScroll:1260789127713128520> **Scroll**\nToggle free extra turn for both players, increase the turn counter by 5', ephemeral: true });
	
	


	} else if (commandName === 'leaderboard') {
		console.log('<@' + interaction.user.id + '> used leaderboard.');
		await interaction.guild.members.fetch();
		const battlePointsRole = interaction.guild.roles.cache.get('922033934827675648');
		if (battlePointsRole) {
			var playerIDs = battlePointsRole.members.map(m => m.user.id);
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
		if (global.activePlayerID === '') {
			var extraText = '';
			if (global.battleMode === '**Default**') {
				global.battleMode = '**Free Only**';
				extraText = 'Only free actions, including Arkaetres, are allowed.';
			} else if (global.battleMode === '**Free Only**') {
				global.battleMode = '**Front Six**';
				extraText = 'Only the first six items (the less expensive ones) are allowed.';
			} else if (global.battleMode === '**Front Six**') {
				global.battleMode = '**Back Six**';
				extraText = 'Only the last six items (the more expensive ones, including the scroll) are allowed.';
			} else if (global.battleMode === '**Back Six**') {
				global.battleMode = '**Backpack**';
				extraText = 'Only four preset items are allowed. Set your items by using `/backpack`.';
			} else if (global.battleMode === '**Backpack**') {
				global.battleMode = '**Default**';
				extraText = 'All items and actions are allowed.';
			}
			await interaction.reply({ content: 'The battle mode is now ' + global.battleMode + '. ' + extraText + '\n\nRemember, free actions are always allowed.\n\nUse this command again to loop through other modes.'});
		} else {
			await interaction.reply({ content: 'A battle is currently in progress! Please wait until it finishes.'});
		}
	

	
	} else if (commandName === 'setbackpack') {
		console.log('<@' + interaction.user.id + '> used setbackpack.');
		const weaponValuesCapitalized = ['Sword', 'Bow', 'Realm Portal', 'Magistone', 'Dagger', 'Frozen Fish', 'Laser Rifle', 'Staff', 'Shield', 'Shifter Disc', 'Pocketwatch', 'Scroll'];
		const weaponEmojiIDs = ['793212847584313364', '793230409734291506', '769819664096034846', '793215911599407124', '838670346856431677', '838670349137870858', '903038791562981397', '903038551682338836', '903038554127601694', '903038892121407568', '903038555633385512', '1260789127713128520'];
		const registeredItemRoleIDs = ['892611697876033638', '892528958460002346', '892574599596871720', '892572308219244606', '892530203581120562', '892530356606091316', '892530366894723103', '892530364369764412', '902364365263605810', '892530361370837022', '892530369641971783', '902364301522792448'];
		const availableItems = [];
		if (interaction.member.roles instanceof GuildMemberRoleManager) {
			for (var n = 0; n < 12; n++) {
				if (interaction.member.roles.cache.has(registeredItemRoleIDs[n])) {
					availableItems.push(new StringSelectMenuOptionBuilder().setLabel(weaponValuesCapitalized[n]).setValue(weaponValuesCapitalized[n]).setEmoji(weaponEmojiIDs[n]));
				}
			}
		}
		if (availableItems.length === 0) {
			interaction.reply({ content: 'You have no items to set. First, buy some in `c!shop` and use them in `c!inventory`.', ephemeral: true });
			return;
		}

		var user = interaction.guild.members.cache.get(interaction.user.id);
		const backpackRoleIDs = ['1261472894370713642', '1261472899966042172', '1261472905234223124', '1261472910053474396', '1261472914633527498', '1261472919691726932', '1261472924251066490', '1261472929095487489', '1261472933981978714', '1261472938893512754', '1261472943809232936', '1261477378035810385'];
		backpackRoleIDs.forEach( async (backpackRoleID) => {
			var role = interaction.guild?.roles.cache.get(backpackRoleID);
			if (role) {
				await user?.roles.remove(role);
			}
		});
		var role = interaction.guild?.roles.cache.get('1261472889857900637');
		if (role) {
			user?.roles.add(role);
		}

		const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('backpack').setPlaceholder('Choose up to four items to be in your backpack!').addOptions(availableItems).setMinValues(1).setMaxValues(4));
		/// @ts-ignore
		await interaction.reply({ components: [row], ephemeral: true });

		const chosenItems = [];
		var inputReceived = false;
		const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });
		collector.on('collect', async i => {
			/// @ts-ignore
			for (var k = 0; k < i.values.length; k++) {
				for (var j = 0; j < 12; j++) {
					/// @ts-ignore
					if (i.values[k] === weaponValuesCapitalized[j]) {
						var role = interaction.guild?.roles.cache.get(backpackRoleIDs[j]);
						if (role) {
							user?.roles.add(role);
						}
						chosenItems.push(weaponValuesCapitalized[j]);
					}
				}
			}
			inputReceived = true;

			var chosenItemsString = '';
			chosenItems.forEach((chosenItem) => {
				chosenItemsString += chosenItem + ', ';
			});
			chosenItemsString = chosenItemsString.substring(0, chosenItemsString.length - 2);
			interaction.editReply({ content: 'Your preset backpack items are now: **' + chosenItemsString + '**.', components: [] });
		});
		collector.on('end', collected => { 
			if (!inputReceived) {
				interaction.editReply({ content: 'The request timed out.', components: [] });
			} 
		});



	} else if (commandName === 'arkaetremode') {
		if (global.activePlayerID === '') {
			var extraText = '';
			if (global.arkaetreMode === '**Random**') {
				global.arkaetreMode = '**Picked**';
				extraText = 'When `/arkaetre` is used, your Arkaetre will be the one you preset with `/setarkaetre`.';
			} else if (global.arkaetreMode === '**Picked**') {
				global.arkaetreMode = '**None**';
				extraText = 'The `/arkaetre` command is disabled.';
			} else if (global.arkaetreMode === '**None**') {
				global.arkaetreMode = '**Random**';
				extraText = 'When `/arkaetre` is used, your Arkaetre will be selected randomly.';
			}
			await interaction.reply({ content: 'The Arkaetre mode is now ' + global.arkaetreMode + '. ' + extraText + '\n\nUse this command again to loop through other modes.'});
		} else {
			await interaction.reply({ content: 'A battle is currently in progress! Please wait until it finishes.'});
		}
	


	} else if (commandName === 'setarkaetre') {
		console.log('<@' + interaction.user.id + '> used setarkaetre.');
		const arkaetreValuesCapitalized = ['Wyrm', 'Flying Lion', 'Hummingbird', 'Owl', 'Griffin', 'Dragon', 'Cheetah', 'Komodo Dragon', 'Sphinx', 'Kludde', 'Phoenix', 'Hydra'];
		const arkaetreEmojis = ['🐍', '🦁', '🕊️', '🦉', '🦅', '🐲', '🐆', '🦎', '🐈', '🐺', '🐦', '🔱'];
		var arkaetreStringSelects = [];
		for (var n = 0; n < 12; n++) {
			arkaetreStringSelects.push(new StringSelectMenuOptionBuilder().setLabel(arkaetreValuesCapitalized[n]).setValue(arkaetreValuesCapitalized[n]).setEmoji(arkaetreEmojis[n]));
		}

		var user = interaction.guild.members.cache.get(interaction.user.id);
		const arkaetreRoleIDs = ['1262183272511832137', '1262183277591134239', '1262183283039408242', '1262183287900733558', '1262183292833108051', '1262183298436960287', '1262183301997662320', '1262183305432928287', '1262183310105514054', '1262183321505632307', '1262183325309603912', '1262183336139558962'];
		arkaetreRoleIDs.forEach( async (arkaetreRoleID) => {
			var role = interaction.guild?.roles.cache.get(arkaetreRoleID);
			if (role) {
				await user?.roles.remove(role);
			}
		});
		var role = interaction.guild?.roles.cache.get('1261472889857900637');
		if (role) {
			user?.roles.add(role);
		}

		const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('arkaetreSelect').setPlaceholder('Choose your arkaetre! This can be changed later.').addOptions(arkaetreStringSelects).setMinValues(1).setMaxValues(1));
		/// @ts-ignore
		await interaction.reply({ components: [row], ephemeral: true });

		var chosenArkaetre = '';
		var inputReceived = false;
		const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });
		collector.on('collect', async i => {
			/// @ts-ignore
			for (var j = 0; j < 12; j++) {
				/// @ts-ignore
				if (i.values[0] === arkaetreValuesCapitalized[j]) {
					var role = interaction.guild?.roles.cache.get(arkaetreRoleIDs[j]);
					if (role) {
						user?.roles.add(role);
					}
					chosenArkaetre = arkaetreValuesCapitalized[j];
				}
			}
			inputReceived = true;
			interaction.editReply({ content: 'Your preset Arkaetre is now: **' + chosenArkaetre + '**.', components: [] });
		});
		collector.on('end', collected => { 
			if (!inputReceived) {
				interaction.editReply({ content: 'The request timed out.', components: [] });
			} 
		});



	} else if (commandName === 'checkpresets') {
		console.log('<@' + interaction.user.id + '> used checkpresets.');
		var backpackText = '';
		var arkaetreText = '';

		const backpackRoleIDs = ['1261472894370713642', '1261472899966042172', '1261472905234223124', '1261472910053474396', '1261472914633527498', '1261472919691726932', '1261472924251066490', '1261472929095487489', '1261472933981978714', '1261472938893512754', '1261472943809232936', '1261477378035810385'];
		const backpackItemNames = ['Sword', 'Bow', 'Realm Portal', 'Magistone', 'Dagger', 'Frozen Fish', 'Laser Rifle', 'Staff', 'Shield', 'Shifter Disc', 'Pocketwatch', 'Scroll'];
		for (var j = 0; j < 12; j++) {
			if (interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(backpackRoleIDs[j])) {
				backpackText += backpackItemNames[j] + ', ';
			}
		}
		backpackText = backpackText.substring(0, backpackText.length - 2);

		const arkaetreRoleIDs = ['1262183272511832137', '1262183277591134239', '1262183283039408242', '1262183287900733558', '1262183292833108051', '1262183298436960287', '1262183301997662320', '1262183305432928287', '1262183310105514054', '1262183321505632307', '1262183325309603912', '1262183336139558962'];
		const arkaetreNames = ['Wyrm', 'Flying Lion', 'Hummingbird', 'Owl', 'Griffin', 'Dragon', 'Cheetah', 'Komodo Dragon', 'Sphinx', 'Kludde', 'Phoenix', 'Hydra'];
		for (var k = 0; k < 12; k++) {
			if (interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(arkaetreRoleIDs[k])) {
				arkaetreText += arkaetreNames[k];
			}
		}

		await interaction.reply({ content: 'Your backpack presets are currently: **' + backpackText + '**.\n\nYour Arkaetre preset is currently: **' + arkaetreText + '**.', ephemeral: true });
	


	} else if (commandName === 'checkmodes') {
		await interaction.reply({ content: 'The battle mode is currently: ' + global.battleMode + '.\n\nThe Arkaetre mode is currently: ' + global.arkaetreMode + '.' });
	
	
	
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
			global.activePlayerID = interaction.options.getUser('opponent')?.id;
			global.waitingPlayerID = interaction.user.id;
			await interaction.reply('<@' + global.waitingPlayerID + '> started a battle against <@' + global.activePlayerID + '>! Let us have a good, clean fight. Either of you can use `/endbattle` to end the battle or any `/rules` command to review the rules of battle at any time.\n\nBy the way, the battle mode is currently ' + global.battleMode + ', and the Arkaetre mode is ' + global.arkaetreMode + '.\n\nOn your turn, please use an item command such as `/sword` to select a registered item to use. If you do not have any items registered, buy some in `c!shop` and use them in `c!inventory` first, or use a free action such as `/freeattack`.\n\n<@' + global.activePlayerID + '>, you are first!');
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
			interaction.channel.send('<@' + global.activePlayerID + '> accepted <@' + global.waitingPlayerID + '>\'s battle challenge! Let us have a good, clean fight. Either of you can use `/endbattle` to end the battle or any `/rules` command to review the rules of battle at any time.\n\nBy the way, the battle mode is currently ' + global.battleMode + ', and the Arkaetre mode is ' + global.arkaetreMode + '.\n\nOn your turn, please use an item command such as `/sword` to select a registered item to use. If you do not have any items registered, buy some in `c!shop` and use them in `c!inventory` first, or use a free action such as `/freeattack`.\n\n<@' + global.activePlayerID + '>, you are first!');
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
			if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'Please cancel the current item or action prompt or wait for it to time out before ending the battle.', ephemeral: true });
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
		} else if (interaction.user.id === global.activePlayerID && !global.itemOrActionProcessing) {
			global.itemOrActionProcessing = true;
			restartTimeout(interaction);
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '🤜 **Attack**:  1-3 Enemy Damage, 5% chance of instakill\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var itemOrActionText = '';
					var roll = random(1, 20);
					var roll2 = random(1, 6);
					if (roll === 1) {
						itemOrActionText = 'In a fit of rage and glory, you hammer <@' + global.waitingPlayerID + '> with hundreds of kicks and punches, defeating them instantly.';
						global.waitingPlayerHP = 0;
						global.freeAttackInstakillHappened = true;
					} else if (roll2 < 3) {
						var amount = damage('waiting', 1);
						if (roll2 === 1) {
							itemOrActionText = 'You throw the bandages that you carry with you at all times at <@' + global.waitingPlayerID + '>\'s arm for ' + amount + ' damage. I am surprised they did that much.';
						} else {
							itemOrActionText = 'You run at <@' + global.waitingPlayerID + '>, screaming a fierce battle cry, and beat them in rock-paper-scissors for ' + amount + ' damage.';
						}
						hummingbirdCheck();
					} else if (roll2 < 5) {
						var amount = damage('waiting', 2);
						if (roll2 === 3) {
							itemOrActionText = 'After careful consideration of your options, you poke <@' + global.waitingPlayerID + '> in the eye for ' + amount + ' damage.';
						} else {
							itemOrActionText = 'After being told a particularly bad joke, you tackle <@' + global.waitingPlayerID + '> to the ground for ' + amount + ' damage.';
						}
					} else {
						var amount = damage('waiting', 3);
						if (roll2 === 5) {
							itemOrActionText = 'You punch <@' + global.waitingPlayerID + '> right in the face for ' + amount + ' damage. That is going to hurt.';
						} else {
							itemOrActionText = 'You do a cool flip, followed by a cartwheel, and high kick <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						}
						flyingLionCheck();
					}
					wyrmCheck('A');
					endTurn(interaction, 'attacks', itemOrActionText);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item or action.');
					global.itemOrActionProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
		}



	} else if (commandName === 'freeheal') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID && !global.itemOrActionProcessing) {
			global.itemOrActionProcessing = true;
			restartTimeout(interaction);
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: ':heart_hands: **Heal**:  1-2 Personal Health, gain defensive stance\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var itemOrActionText = '';
					var roll = random(1, 8);
					if (global.overtime && global.activePlayerArkaetre != 'Hydra') {
						itemOrActionText = 'You are far too worn-out to heal yourself.';
					} else if (roll < 5) {
						var amount = health('active', 1);
						if (roll === 1) {
							itemOrActionText = 'Was there a gash there before? Apparently not. Strange. You recover ' + amount + ' health.';
						} else if (roll === 2) {
							itemOrActionText = 'Godricon here. Yes, I narrate all these messages. Anyway, have some health, on the house. You recover ' + amount + ' health.';
						} else if (roll === 3) {
							itemOrActionText = 'Through your body\'s natural healing processes, you recover a measly ' + amount + ' health.';
						} else {
							itemOrActionText = 'You report a foul and recover ' + amount + ' health while your opponent waits in the penalty box.'
						}
					} else {
						var amount = health('active', 2);
						if (roll === 5) {
							itemOrActionText = 'You stumble upon an ornate chest filled with random potions. After a quick taste-test, you recover ' + amount + ' health.';
						} else if (roll === 6) {
							itemOrActionText = 'You whip out the bandages that you carry with you at all times and put them to good use, recovering ' + amount + ' health.';
						} else if (roll === 7) {
							itemOrActionText = 'A spark of magic flares to life inside you, and with a shudder, you recover ' + amount + ' health.';
						} else {
							itemOrActionText = 'You tuck yourself in and decide to sleep it off. You recover ' + amount + ' health.'
						}
					}
					itemOrActionText += ' You widen your stance, ready to defend yourself.';
					global.activePlayerDefensiveStance = 'Active';
					wyrmCheck('B');
					endTurn(interaction, 'heals', itemOrActionText);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item or action.');
					global.itemOrActionProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
		}



	} else if (commandName === 'freeboost') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID && !global.itemOrActionProcessing) {
			global.itemOrActionProcessing = true;
			restartTimeout(interaction);
			const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
			// @ts-ignore
			await interaction.reply({ content: '💪 **Boost**:  ↑ Personal Attack or Defense or Recovery or ↓ Enemy Attack or Defense or Recovery, 33% chance of 2x effect\n\nUse this free action?', components: [row] });
			const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
			var buttonClicked = false;
			
			collector.on('collect', async i => {
				if (i.customId === 'yes') {
					var itemOrActionText = '';
					var roll = random(1, 6);
					var roll2 = random(1, 3);
					if (roll === 1) {
						if (roll2 === 1) {
							itemOrActionText = 'You can do it! I believe in you. My stunning motivational speech increases your Attack twice.';
							statChange('AT', 'active', true);
							statChange('AT', 'active', true);
						} else {
							itemOrActionText = 'You make a fist and stare down your opponent. Now you feel ready for action, and your Attack increases.';
							statChange('AT', 'active', true);
						}
					} else if (roll === 2) {
						if (roll2 === 1) {
							itemOrActionText = 'Is that a full set of armor!? Nice find. You put it on and your Defense increases twice.';
							statChange('DF', 'active', true);
							statChange('DF', 'active', true);
						} else {
							itemOrActionText = 'They say some people have thick skin, but your skin looks especially thick today. Your Defense increases.';
							statChange('DF', 'active', true);
						}
					} else if (roll === 3) {
						if (roll2 === 1) {
							itemOrActionText = 'Master Vaya Medeina notices your unfortunate plight and grants you unfathomable healing abilities, increasing your Recovery twice.';
							statChange('RC', 'active', true);
							statChange('RC', 'active', true);
						} else {
							itemOrActionText = 'You stop by the local arena drugstore and buy some bandages. Better keep those with you at all times. Your Recovery increases.';
							statChange('RC', 'active', true);
						}
					} else if (roll === 4) {
						if (roll2 === 1) {
							itemOrActionText = 'You sneak up on <@' + global.waitingPlayerID + '> and give them a nice, relaxing massage. Too relaxing, in fact. Their Attack decreases twice. Why would they want to attack you?';
							statChange('AT', 'waiting', false);
							statChange('AT', 'waiting', false);
						} else {
							itemOrActionText = 'You scream with all your might at <@' + global.waitingPlayerID + '> and their Attack decreases, but their concern increases.';
							statChange('AT', 'waiting', false);
						}
					} else if (roll === 5) {
						if (roll2 === 1) {
							itemOrActionText = 'Master Vaya Kovas stops by and- Oh my. That trickster. Well, things will be much easier for you now. <@' + global.waitingPlayerID + '>\'s Defense decreases twice.';
							statChange('DF', 'waiting', false);
							statChange('DF', 'waiting', false);
						} else {
							itemOrActionText = '<@' + global.waitingPlayerID + '> drops their shield, and it rolls away, clattering to a stop just outside the arena. Oh well. Their Defense decreases.';
							statChange('DF', 'waiting', false);
						}
					} else {
						if (roll2 === 1) {
							itemOrActionText = 'A multicolored bird swoops down and steals away some of <@' + global.waitingPlayerID + '>\'s trusty bandages that they keep with them at all times. Not anymore! Their Recovery decreases twice.';
							statChange('RC', 'waiting', false);
							statChange('RC', 'waiting', false);
						} else {
							itemOrActionText = 'You flick <@' + global.waitingPlayerID + '> in the forehead. "Ow," they say, miffed. You flick them again. Slowly but surely, their Recovery decreases.';
							statChange('RC', 'waiting', false);
						}
					}
					wyrmCheck('C');
					endTurn(interaction, 'boosts', itemOrActionText);
				} else if (i.customId === 'no') {
					interaction.channel?.send('Please select another item or action.');
					global.itemOrActionProcessing = false;
				}
				interaction.deleteReply();
				collector.stop();
				buttonClicked = true;
			});
			collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } }); 
		} else if (interaction.user.id !== global.activePlayerID) {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
		}
	


	} else if (commandName === 'sword') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892611697876033638') && !global.itemOrActionProcessing && await modeAllows('sword', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemSword:793212847584313364> **Sword**:  1-3 Enemy Damage, ↑ Personal Attack\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 3);
						var amount = damage('waiting', roll);
						if (roll === 1) {
							itemOrActionText = 'You barely nick <@' + global.waitingPlayerID + '> for ' + amount + ' damage. They hold back a laugh.';
							hummingbirdCheck();
						} else if (roll === 2) {
							itemOrActionText = 'You grip the sword firmly and slash at <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						} else {
							itemOrActionText = 'You lunge at <@' + global.waitingPlayerID + '> for ' + amount + ' damage, and they stagger backward.';
							flyingLionCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							itemOrActionText += ' The sword glows brightly as its runes activate, increasing your Attack.';
						} else {
							itemOrActionText += ' Magic crackles down the sword and surges through you, increasing your Attack.';
						}
						statChange('AT', 'active', true);
						wyrmCheck('D');
						endTurn(interaction, 'uses their Sword', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('sword', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Sword** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Sword** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'bow') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892528958460002346') && !global.itemOrActionProcessing && await modeAllows('bow', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemBow:793230409734291506> **Bow**:  2-4 Enemy Damage, ↓ Enemy Recovery, 50% chance of 1 Personal Damage\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(2, 4);
						var amount = damage('waiting', roll);
						if (roll === 2) {
							itemOrActionText = 'You do not pull the string far back enough and only land a weak hit on <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							hummingbirdCheck();
						} else if (roll === 3) {
							itemOrActionText = 'You shoot an arrow at <@' + global.waitingPlayerID + '>, and it flies through the air with a satisfying whistle, hitting them for ' + amount + ' damage.';
						} else {
							itemOrActionText = 'You bring your hand to your cheek and release the arrow cleanly, piercing <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							flyingLionCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							itemOrActionText += ' <@' + global.waitingPlayerID + '> will have a hard time healing from that, decreasing their Recovery.';
						} else {
							itemOrActionText += ' <@' + global.waitingPlayerID + '> is bleeding and weak, decreasing their Recovery.';
						}
						statChange('RC', 'waiting', false);
						var roll3 = random(1, 4);
						if (roll3 < 3) {
							amount = damage('active', 1);
							if (roll3 === 1) {
								itemOrActionText += ' The arrow grazes your hand as you release it, and you take ' + amount + ' damage.';
							} else {
								itemOrActionText += ' The arrow somehow ricochets and hits you too. You take ' + amount + ' damage and hopefully better aim next time.';
							}
						}
						wyrmCheck('E');
						endTurn(interaction, 'uses their Bow', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('bow', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Bow** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Bow** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'realmportal') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892574599596871720') && !global.itemOrActionProcessing && await modeAllows('realmportal', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemRealmPortal:769819664096034846> **Realm Portal**:  0-2 Enemy Damage or 1 Personal Health, 50% chance of extra turn\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(0, 3);
						var roll2 = random(1, 2);
						var amount = '';
						if (roll > 0 && roll < 3) {
							amount = damage('waiting', roll);
						}
						if (roll === 0) {
							itemOrActionText = 'Your portal fizzles out before you have time to do anything with it. You glance at your opponent embarrassedly and deal no damage.';
						} else if (roll === 1) {
							if (roll2 === 1) {
								itemOrActionText = 'You place a portal above <@' + global.waitingPlayerID + '> and another below yourself. You jump in and fall onto them for ' + amount + ' damage.';
							} else {
								itemOrActionText = 'You step through the portal, but become disoriented and only barely hit <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
							}
							hummingbirdCheck();
						} else if (roll === 2) {
							if (roll2 === 1) {
								itemOrActionText = 'You leap through the portal and nimbly attack <@' + global.waitingPlayerID + '> from behind for ' + amount + ' damage.';
							} else {
								itemOrActionText = 'You split your portal in two, placing one on the ceiling and one below <@' + global.waitingPlayerID + '>. They fall for quite a while and go splat for ' + amount + ' damage.';
							}
							flyingLionCheck();
						} else {
							amount = health('active', 1);
							itemOrActionText = 'You teleport far away from your opponent to take a quick break and recover ' + amount + ' health. I hope you brought snacks.';
						}
						var roll3 = random(1, 4);
						if (roll3 < 3) {
							if (roll3 === 1) {
								itemOrActionText += ' You act quickly and sneakily enough to confuse your opponent and gain an extra turn.';
							} else {
								itemOrActionText += ' The beautiful colors of your portal entrance your opponent, and you gain an extra turn.';
							}
							if (global.pocketwatchCounter === 0) {
								global.waitingPlayerNumExtraTurns > 0 ? global.waitingPlayerNumExtraTurns-- : global.activePlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
						}
						wyrmCheck('F');
						endTurn(interaction, 'uses their Realm Portal', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('realmportal', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Realm Portal** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Realm Portal** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}


	} else if (commandName === 'magistone') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892572308219244606') && !global.itemOrActionProcessing && await modeAllows('magistone', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemMagistone:793215911599407124> **Magistone**:  1 Enemy Damage or 0-4 Personal Health, ↑ Personal Defense or Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(0, 5);
						var amount = '';
						if (roll > 0 && roll < 5 && (!global.overtime || global.activePlayerArkaetre === 'Hydra')) {
							amount = health('active', roll);
						}
						if (global.overtime && global.activePlayerArkaetre != 'Hydra') {
							amount = damage('waiting', 1);
							itemOrActionText = 'You are far too worn-out to heal yourself. You instead decide to be creative and throw your Magistone at <@' + global.waitingPlayerID + '>, and it smacks them in the side with a quiet thump, dealing ' + amount + ' damage.';
							flyingLionCheck();
							hummingbirdCheck();
						} else if (roll === 0) {
							itemOrActionText = 'It appears that your stone does not want to listen to your mental commands. What did you do to it, exactly? You recover no health.';
						} else if (roll === 1) {
							itemOrActionText = 'The stone pulses with brilliant light and heals a papercut you did not realize you had. You recover ' + amount + ' health.';
						} else if (roll === 2) {
							itemOrActionText = 'You use your stone to summon a health potion and are rewarded for thinking outside the box, recovering ' + amount + ' health.';
						} else if (roll === 3) {
							itemOrActionText = 'Glittering magic sweeps your body, carefully sealing closed the worst of your wounds. You recover ' + amount + ' health.';
						} else if (roll === 4) {
							itemOrActionText = 'The power of the stone flows through you, healing your injuries in mere seconds. You recover ' + amount + ' health. Ivy would be proud.';
						} else {
							amount = damage('waiting', 1);
							itemOrActionText = 'You decide to be creative and throw your Magistone at <@' + global.waitingPlayerID + '>, and it smacks them in the side with a quiet thump, dealing ' + amount + ' damage.';
							flyingLionCheck();
							hummingbirdCheck();
						}
						var roll2 = random(1, 2);
						if (roll2 === 1) {
							itemOrActionText += ' You get ready to magically deflect attacks, increasing your Defense.';
							statChange('DF', 'active', true);
						} else {
							itemOrActionText += ' Magic courses through your veins, rejuvenating you and increasing your Recovery.';
							statChange('RC', 'active', true);
						}
						wyrmCheck('G');
						endTurn(interaction, 'uses their Magistone', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('magistone', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Magistone** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Magistone** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'dagger') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530203581120562') && !global.itemOrActionProcessing && await modeAllows('dagger', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemDagger:838670346856431677> **Dagger**:  2 Enemy Damage, ↑ Personal Attack or Defense or Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 3);
						var amount = damage('waiting', 2);
						if (roll === 1) {
							itemOrActionText = 'You dodge behind <@' + global.waitingPlayerID + '> and backstab them for ' + amount + ' damage, tiptoeing away with a chuckle.';
						} else if (roll === 2) {
							itemOrActionText = 'You toss the dagger in your hand to get a better grip and throw it at <@' + global.waitingPlayerID + '> with laser precision for ' + amount + ' damage.';
						} else {
							itemOrActionText = 'You sidehug <@' + global.waitingPlayerID + '> and jab them in the side when they least expect it for ' + amount + ' damage.';
						}
						var roll2 = random(1, 3);
						if (roll2 === 1) {
							itemOrActionText += ' The dagger fills you with a sense of power over your opponent, increasing your Attack.';
							statChange('AT', 'active', true);
						} else if (roll2 === 2) {
							itemOrActionText += ' The dagger heightens your senses and improves your reflexes, increasing your Defense.';
							statChange('DF', 'active', true);
						} else {
							itemOrActionText += ' Practice sneaking around with the dagger helps you to take longer breaks, increasing your Recovery.';
							statChange('RC', 'active', true);
						}
						wyrmCheck('H');
						flyingLionCheck();
						hummingbirdCheck();
						endTurn(interaction, 'uses their Dagger', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('dagger', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Dagger** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Dagger** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'frozenfish') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530356606091316') && !global.itemOrActionProcessing && await modeAllows('frozenfish', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemFrozenFish:838670349137870858> **Frozen Fish**:  3-5 Enemy Damage or 2 Enemy Health, ↓ Enemy Attack or Defense\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(3, 6);
						var amount = '';
						if (roll < 6) {
							amount = damage('waiting', roll);
						}
						if (roll === 3) {
							itemOrActionText = 'You hurl the fish at <@' + global.waitingPlayerID + '> and it bites their nose, dealing ' + amount + ' damage. Perhaps it was not so frozen after all.';
							hummingbirdCheck();
						} else if (roll === 4) {
							var roll2 = random(1, 2);
							if (roll2 === 1) {
								itemOrActionText = 'You wind up and smack <@' + global.waitingPlayerID + '> in the face with the mostly defrosted fish, dealing ' + amount + ' damage. It probably looked great in slow motion.';
							} else {
								itemOrActionText = 'The flying fish soars out of your hands and slaps <@' + global.waitingPlayerID + '> with its tail to deal ' + amount + ' damage.';
							}
						} else if (roll === 5) {
							itemOrActionText = 'It turns out that the fish is a swordfish, and you parry back and forth with <@' + global.waitingPlayerID + '>, eventually landing a hit for ' + amount + ' damage.';
							flyingLionCheck();
						} else if (roll === 6) {
							amount = health('waiting', 2);
							var roll3 = random(1, 2);
							if (roll3 === 1) {
								itemOrActionText = 'You try to attack, but <@' + global.waitingPlayerID + '> takes a big bite out of the fish instead. "Yum," they say as they recover ' + amount + ' health.';
							} else {
								itemOrActionText = '<@' + global.waitingPlayerID + '> snatches the fish out of your hands, defrosts it, and cooks it with breading and lime, chowing down for ' + amount + ' health.';
							}
						}
						var roll4 = random(1, 2);
						if (roll4 === 1) {
							itemOrActionText += ' <@' + global.waitingPlayerID + '> is not as willing to attack a defenseless fish, as frozen as it might be, decreasing their Attack.';
							statChange('AT', 'waiting', false);
						} else {
							itemOrActionText += ' <@' + global.waitingPlayerID + '> is confused by your odd choice of weapon and lowers their guard, decreasing their Defense.';
							statChange('DF', 'waiting', false);
						}
						wyrmCheck('I');
						endTurn(interaction, 'uses their Frozen Fish', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('frozenfish', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Frozen Fish** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Frozen Fish** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'laserrifle') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530366894723103') && !global.itemOrActionProcessing && await modeAllows('laserrifle', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemLaserRifle:903038791562981397> **Laser Rifle**:  3x 0-2 Enemy Damage, ↓ Enemy Attack or Defense or Recovery, 50% chance of lost turn\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(0, 2) + random(0, 2) + random(0, 2);
						var amount = '';
						if (roll > 0) {
							amount = damage('waiting', roll);
						}
						if (roll === 0) {
							itemOrActionText = 'The rifle does not appear to work, or at least that is what you tell yourself as you search for the trigger. You only barely graze <@' + global.waitingPlayerID + '>\'s arm and deal no damage.';
						} else if (roll === 1) {
							itemOrActionText = 'You shoot an item out of <@' + global.waitingPlayerID + '>\'s hand, and it spins in the air and plunks onto their head for ' + amount + ' damage.';
							hummingbirdCheck();
						} else if (roll === 2) {
							itemOrActionText = 'Trusting your good aim, you throw your laser rifle at <@' + global.waitingPlayerID + '> for ' + amount + ' damage. Headshot.';
						} else if (roll === 3) {
							itemOrActionText = 'You click the trigger and nothing happens. You remember to release the safety while <@' + global.waitingPlayerID + '> watches impatiently and shoot them a few times for ' + amount + ' damage.';
						} else if (roll === 4) {
							itemOrActionText = 'You propel yourself upwards with the recoil from a stream of laser shots and crash down onto <@' + global.waitingPlayerID + '> for ' + amount + ' damage.';
						} else if (roll === 5) {
							itemOrActionText = 'You jump for cover and shoot a barrage of laser fire at <@' + global.waitingPlayerID + '> for ' + amount + ' damage, adding your own sound effects.';
						} else {
							itemOrActionText = 'The laser rifle surges with magical energy and fires a huge, majestic blast at <@' + global.waitingPlayerID + '> for ' + amount + ' damage and a very high score from the judges.';
							flyingLionCheck();
						}
						var roll2 = random (1, 3);
						if (roll2 === 1) {
							itemOrActionText += ' <@' + global.waitingPlayerID + '> can barely find a moment to safely attack you between laser blasts, and their Attack decreases.';
							statChange('AT', 'waiting', false);
						} else if (roll2 === 2) {
							itemOrActionText += ' You shoot a sizzling hole straight through <@' + global.waitingPlayerID + '>\'s varying layers of protective equipment, and their Defense decreases.';
							statChange('DF', 'waiting', false);
						} else {
							itemOrActionText += ' Also- Oh. That is beyond healing, I think. <@' + global.waitingPlayerID + '>\'s Recovery decreases.';
							statChange('RC', 'waiting', false);
						}
						var roll3 = random(1, 2);
						if (roll3 === 1) {
							itemOrActionText += ' The rifle\'s sudden recoil jolts you backwards and you lose a turn.';
							if (global.pocketwatchCounter === 0) {
								global.activePlayerNumExtraTurns > 0 ? global.activePlayerNumExtraTurns-- : global.waitingPlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
						}
						wyrmCheck('J');
						endTurn(interaction, 'uses their Laser Rifle', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('laserrifle', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Laser Rifle** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Laser Rifle** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}
	
	

	} else if (commandName === 'staff') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530364369764412') && !global.itemOrActionProcessing && await modeAllows('staff', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemStaff:903038551682338836>  **Staff**: 0 or 5-6 Enemy Damage, ↓ 2 of Personal Attack or Defense or Recovery on hit\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 3);
						if (roll < 3) {
							var roll2 = random(5, 6);
							var roll3 = random(1, 2);
							var amount = damage('waiting', roll2);
							if (roll2 === 5) {
								if (roll3 === 1) {
									itemOrActionText = 'You spin the staff with impressive flair to build up its magic and whack <@' + global.waitingPlayerID + '> with it for ' + amount + ' damage.';
								} else {
									itemOrActionText = 'The staff flashes with magic and rains a flurry of blows on <@' + global.waitingPlayerID + '> for ' + amount + ' damage as you hold it up triumphantly.';
								}
								hummingbirdCheck();
							} else {
								if (roll3 === 1) {
									itemOrActionText = 'You sweep <@' + global.waitingPlayerID + '>\'s legs out from under them and pummel them with magic for ' + amount + ' damage.';
								} else {
									itemOrActionText = 'Magic hums in delight as it swirls into the staff, and you shoot it at <@' + global.waitingPlayerID + '> in a powerful beam for ' + amount + ' damage.';
								}
								flyingLionCheck();
							}
							var roll4 = random(1, 3);
							if (roll4 === 1) {
								itemOrActionText += ' Using the staff\'s complex magic tires you out, decreasing your Attack and Defense.';
								statChange('AT', 'active', false);
								statChange('DF', 'active', false);
							} else if (roll4 === 2) {
								itemOrActionText += ' Some of the staff\'s magic hits you, weakening you and decreasing your Attack and Recovery.';
								statChange('AT', 'active', false);
								statChange('RC', 'active', false);
							} else {
								itemOrActionText += ' You are boldened by your show of strength and focus on attacking, decreasing your Defense and Recovery.';
								statChange('DF', 'active', false);
								statChange('RC', 'active', false);
							}
						} else {
							var roll5 = random(1, 2);
							if (roll5 === 1) {
								itemOrActionText = 'The staff\'s unwieldy power is too much for you to handle, and you sink to your knees, overwhelmed by its might. You deal no damage.';
							} else {
								itemOrActionText = 'The staff turns out to be much heavier than you expected. You try to use it, but you can hardly lift it and deal no damage.';
							}
						}
						wyrmCheck('K');
						endTurn(interaction, 'uses their Staff', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('staff', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Staff** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Staff** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}
	

	
	} else if (commandName === 'shield') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('902364365263605810') && global.activePlayerShieldStatus === 'Down' && !global.itemOrActionProcessing && await modeAllows('shield', interaction)) {
				global.itemOrActionProcessing = true;
				var formationChance = global.overtime && (global.activePlayerArkaetre != 'Hydra') ? 80 : 50;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemShield:903038554127601694> **Shield**:  ' + formationChance + '% chance of shield\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 100);
						if (roll <= formationChance) {
							var roll2 = random(1, 3);
							if (roll2 === 1) {
								itemOrActionText = 'You are surrounded by a shield of pure magic that feels electric to the touch and might block damage for you.';
							} else if (roll2 === 2) {
								itemOrActionText = 'A luminescent shield unfolds around you, forming a protective bubble that will probably block damage. Probably.';
							} else {
								itemOrActionText = 'A shield that will likely block damage forms in front of your vision. It hopefully extends behind you as well.';
							}
							global.activePlayerShieldStatus = 'Up';
						} else {
							var roll3 = random(1, 2);
							if (roll3 === 1) {
								itemOrActionText = 'Your magic gains a mind of its own and fills the air with harmless bubbles. Your dismayed face is reflected in them.';
							} else {
								itemOrActionText = 'Your shield cannot just be made of regular magic, young mage. That stuff is permeable. I suppose you will find that out the hard way, though.';
							}
						}
						wyrmCheck('L');
						endTurn(interaction, 'uses their Shield', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (global.activePlayerShieldStatus === 'Up') {
				await interaction.reply({ content: 'You already have a shield up. Please select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('shield', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Shield** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Shield** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}


	
	} else if (commandName === 'shifterdisc') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530361370837022') && !global.itemOrActionProcessing && await modeAllows('shifterdisc', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemShifterDisc:903038892121407568> **Shifter Disc**:  3 Personal Damage or lose turn, ↑ Personal Attack and Defense and Recovery\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 4);
						if (roll < 3) {
							var amount = damage('active', 3);
							if (roll === 1) {
								itemOrActionText = 'You jab the shifter disc\'s needle into your arm for ' + amount + ' damage and wince as its energy spreads through your whole body, increasing all of your stats.';
							} else {
								itemOrActionText = 'After an uncomfortable pause, an internal mechanism in the shifter disc clicks and a needle darts into your arm. In shock, you take ' + amount + ' damage, but all of your stats increase.';
							}
						} else {
							if (global.pocketwatchCounter === 0) {
								global.activePlayerNumExtraTurns > 0 ? global.activePlayerNumExtraTurns-- : global.waitingPlayerNumExtraTurns++;
							} else {
								global.pocketwatchActivated = true;
							}
							if (roll === 3) {
								itemOrActionText = 'You press the shifter disc against your symbol, and it injects new magic that increases all of your stats. You lose a turn while you wait for it to finish and detach.';
							} else {
								itemOrActionText = 'Magic pulses through the symbol on your arm in a sickening rhythm. The shifter blocks your magic for the time being, and you lose a turn.';
							}
						}
						statChange('AT', 'active', true);
						statChange('DF', 'active', true);
						statChange('RC', 'active', true);
						wyrmCheck('M');
						endTurn(interaction, 'uses their Shifter Disc', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('shifterdisc', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Shifter Disc** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Shifter Disc** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}
	

	
	} else if (commandName === 'pocketwatch') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && interaction.member.roles.cache.has('892530369641971783') && !global.itemOrActionProcessing && await modeAllows('pocketwatch', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemPocketwatch:903038555633385512> **Pocketwatch**:  2 Personal Health, ↓ Enemy Attack or Defense or Recovery, no extra or lost turns for either player for 3 turns, freeze the turn counter for 3 turns\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						var roll = random(1, 3);
						var amount = '';
						if (!global.overtime || global.activePlayerArkaetre === 'Hydra') {
							amount = health('active', 2);
						}
						if (global.overtime && global.activePlayerArkaetre != 'Hydra') {
							itemOrActionText = 'You are far too worn-out to heal yourself, but you weakly hold up the pocketwatch anyway. The turn order is locked into place and the turn counter is frozen for 3 turns.';
						} else if (roll === 1) {
							itemOrActionText = 'You step away from battle to recover ' + amount + ' health and glance at your pocketwatch, keeping careful time with your foot. The turn order is locked into place and the turn counter is frozen for 3 turns.';
						} else if (roll === 2) {
							itemOrActionText = 'You swing your pocketwatch back and forth, hypnotizing your opponent into a rhythm and giving yourself a break to recover ' + amount + ' health. The turn order is locked into place and the turn counter is frozen for 3 turns.';
						} else {
							itemOrActionText = 'You swallow your pocketwatch for ' + amount + ' health, surprised that it was so nutritious. Your new internal metronome locks the turn order into place and freezes the turn counter for 3 turns.';
						}
						global.pocketwatchCounter = 4;
						global.activePlayerNumExtraTurns = 0;
						global.waitingPlayerNumExtraTurns = 0;
						var roll2 = random(1, 3);
						if (roll2 === 1) {
							itemOrActionText += ' Time seems to slow down, weakening even the swiftest of <@' + global.waitingPlayerID + '>\'s blows and decreasing their Attack.';
							statChange('AT', 'waiting', false);
						} else if (roll2 === 2) {
							itemOrActionText += ' Time seems to speed up, allowing you to attack <@' + global.waitingPlayerID + '> faster and decreasing their Defense.';
							statChange('DF', 'waiting', false);
						} else {
							itemOrActionText += ' Before <@' + global.waitingPlayerID + '> knows it, they have no time left to recover from their injuries, decreasing their Recovery.';
							statChange('RC', 'waiting', false);
						}
						wyrmCheck('N');
						endTurn(interaction, 'uses their Pocketwatch', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('pocketwatch', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Pocketwatch** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Pocketwatch** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'scroll') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager&& interaction.member.roles.cache.has('902364301522792448') && !global.itemOrActionProcessing && await modeAllows('scroll', interaction)) {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				// @ts-ignore
				await interaction.reply({ content: '<:itemScroll:1260789127713128520> **Scroll**:  Toggle free extra turn for both players, increase the turn counter by 5\n\nUse this item?', components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
						if (global.scrollActive === true) {
							global.scrollActive = false;
							var roll = random(1, 3);
							if (roll === 1) {
								itemOrActionText = 'You tap your Magistone to the scroll\'s golden cap, and you and <@' + global.waitingPlayerID + '> are surrounded by white light. You will both lose your free extra turn at the end of your first turn in your turn sequence.';
							} else if (roll === 2) {
								itemOrActionText = 'The scroll\'s golden ink flashes, and <@' + global.waitingPlayerID + '> accidentally also touches the magic that emerges. You will both lose your free extra turn at the end of your first turn in your turn sequence.';
							} else {
								itemOrActionText = '<@' + global.waitingPlayerID + '> is reluctant to share but must anyway. You will both lose your free extra turn at the end of your first turn in your turn sequence.';
							}
						} else {
							global.scrollActive = true;
							var roll = random(1, 3);
							if (roll === 1) {
								itemOrActionText = 'You tap your Magistone to the scroll\'s golden cap, and you and <@' + global.waitingPlayerID + '> are surrounded by white light. You will both get a free extra turn at the end of your first turn in your turn sequence.';
							} else if (roll === 2) {
								itemOrActionText = 'The scroll\'s golden ink flashes, and <@' + global.waitingPlayerID + '> hurries to also touch the magic that emerges. You will both get a free extra turn at the end of your first turn in your turn sequence.';
							} else {
								itemOrActionText = '<@' + global.waitingPlayerID + '> is happy to share. You will both get a free extra turn at the end of your first turn in your turn sequence.';
							}
						}
						var roll2 = random(1, 3);
						if (roll2 === 1) {
							itemOrActionText += ' The magic takes a while, so 5 more turns are added to the turn counter.';
						} else if (roll2 === 2) {
							itemOrActionText += ' You both huff and sit and wait for the magic to kick in, and 5 more turns are added to the turn counter.';
						} else {
							itemOrActionText += ' You get distracted by the scroll\'s beautiful cursive, and in the meantime, 5 more turns are added to the turn counter.';
						}
						global.turnNumber += 5;
						wyrmCheck('O');
						endTurn(interaction, 'uses their Scroll', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (!(await modeAllows('scroll', interaction))) {
				await interaction.reply({ content: 'You cannot use the **Scroll** item in the current battle mode (' + global.battleMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You do not have the **Scroll** item registered. Please buy it in `c!shop` and use it in `c!inventory` to register it first, use another registered item, or use a free action such as `/freeattack`.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}



	} else if (commandName === 'arkaetre') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (interaction.user.id === global.activePlayerID) {
			restartTimeout(interaction);
			if (interaction.member.roles instanceof GuildMemberRoleManager && (global.activePlayerArkaetre === '' || global.activePlayerArkaetre === 'Kludde') && !global.itemOrActionProcessing && global.arkaetreMode != '**None**') {
				global.itemOrActionProcessing = true;
				const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('yes').setLabel('✔️ Yes').setStyle(ButtonStyle.Success),new ButtonBuilder().setCustomId('no').setLabel('❌ No').setStyle(ButtonStyle.Danger));
				var text = '<:itemArkaetre:1260808324027383861> **Arkaetre**:  Gain an Arkaetre ability\n\nUse this free action?';
				if (global.activePlayerArkaetre === 'Kludde') {
					text = '🐺 **Arkaetre**:  Add a kludde to your pack\n\nUse this free action?';
				}
				// @ts-ignore
				await interaction.reply({ content: text, components: [row] });
				const filter = i => (i.customId === 'yes' || i.customId === 'no') && i.user.id === global.activePlayerID;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				var buttonClicked = false;
				
				collector.on('collect', async i => {
					if (i.customId === 'yes') {
						var itemOrActionText = '';
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
							itemOrActionText = 'Your kludde Arkaetre howls and a new kludde hears the call, joining your pack.';
						} else {
							var roll = random(1, 12);

							var user = interaction.guild?.members.cache.get(interaction.user.id);
							var arkaetreRoleIDs = ['1262183272511832137', '1262183277591134239', '1262183283039408242', '1262183287900733558', '1262183292833108051', '1262183298436960287', '1262183301997662320', '1262183305432928287', '1262183310105514054', '1262183321505632307', '1262183325309603912', '1262183336139558962'];
							if (global.arkaetreMode === '**Picked**') {
								for (var j = 1; j < 13; j++) {
									if (await user?.roles.cache.has(arkaetreRoleIDs[j-1])) {
										roll = j;
									}
								}
							}

							if (roll === 1) {
								itemOrActionText = 'You called your wyrm Arkaetre! Every time you use an item or action that you have not used yet in this battle, you will gain 1 additional point of health.';
								global.activePlayerArkaetre = 'Wyrm';
								global.activePlayerArkaetreIcon = '🐍 ';
							} else if (roll === 2) {
								itemOrActionText = 'You called your flying lion Arkaetre! Every time you roll the highest possible Enemy Damage for an item or action, you will deal 1 additional point of damage.';
								global.activePlayerArkaetre = 'Flying Lion';
								global.activePlayerArkaetreIcon = '🦁 ';
							} else if (roll === 3) {
								itemOrActionText = 'You called your hummingbird Arkaetre! Every time you roll the lowest possible positive Enemy Damage for an item or action, you will gain 1 point of health.';
								global.activePlayerArkaetre = 'Hummingbird';
								global.activePlayerArkaetreIcon = '🕊️ ';
							} else if (roll === 4) {
								itemOrActionText = 'You called your owl Arkaetre! Every time you have no Normal stats at the end of your first turn in your turn sequence, you will have a 66% chance of gaining an extra turn.';
								global.activePlayerArkaetre = 'Owl';
								global.activePlayerArkaetreIcon = '🦉 ';
							} else if (roll === 5) {
								itemOrActionText = 'You called your griffin Arkaetre! Your Attack will always be high, and you and your opponent will both have an additional 5% chance of an instakill every time either of you roll positive Enemy Damage for an item or action.';
								global.activePlayerArkaetre = 'Griffin';
								global.activePlayerArkaetreIcon = '🦅 ';
								global.activePlayerAT = 'High🔺';
							} else if (roll === 6) {
								itemOrActionText = 'You called your dragon Arkaetre! Your Defense will always be high, and you and your opponent will both have an additional 10% chance of critical hits and heals.';
								global.activePlayerArkaetre = 'Dragon';
								global.activePlayerArkaetreIcon = '🐲 ';
								global.activePlayerDF = 'High🔺';
							} else if (roll === 7) {
								itemOrActionText = 'You called your cheetah Arkaetre! Your Recovery will always be high, and you and your opponent will both take 1 extra point of damage each turn.';
								global.activePlayerArkaetre = 'Cheetah';
								global.activePlayerArkaetreIcon = '🐆 ';
								global.activePlayerRC = 'High🔺';
							} else if (roll === 8) {
								itemOrActionText = 'You called your komodo dragon Arkaetre! Every time your opponent uses an item or action to deal Enemy Damage, you will deal 1 point of Enemy Damage (50% chance in Free Only mode).';
								global.activePlayerArkaetre = 'Komodo Dragon';
								global.activePlayerArkaetreIcon = '🦎 ';
							} else if (roll === 9) {
								itemOrActionText = 'You called your sphinx Arkaetre! Every time your opponent uses an item or action to gain Personal Health, you will gain 1 point of Personal Health (50% chance in Free Only mode).';
								global.activePlayerArkaetre = 'Sphinx';
								global.activePlayerArkaetreIcon = '🐈 ';
							} else if (roll === 10) {
								itemOrActionText = 'You called your kludde Arkaetre! You can use the `/arkaetre` command to add more kludde to your pack, 1 at a time. When you gather 7 kludde, you will instakill your opponent.';
								global.activePlayerArkaetre = 'Kludde';
								global.activePlayerArkaetreIcon = '🐺1️⃣ ';
								global.activePlayerKluddeCount = 1;
							} else if (roll === 11) {
								itemOrActionText = 'You called your phoenix Arkaetre! The first time you end any turn with 1-3 points of health (1 in Free Only mode), you will go back to full health.';
								global.activePlayerArkaetre = 'Phoenix';
								global.activePlayerArkaetreIcon = '🐦 ';
							} else if (roll === 12) {
								itemOrActionText = 'You called your hydra Arkaetre! Every counted turn will have an additional 66% chance of decreasing the health cap by 1 point. You will also be immune to overtime effects.';
								global.activePlayerArkaetre = 'Hydra';
								global.activePlayerArkaetreIcon = '🔱 ';
							}
						}
						endTurn(interaction, 'uses their Arkaetre', itemOrActionText);
					} else if (i.customId === 'no') {
						interaction.channel?.send('Please select another item or action.');
						global.itemOrActionProcessing = false;
					}
					interaction.deleteReply();
					collector.stop();
					buttonClicked = true;
				});
				collector.on('end', collected => { if (!buttonClicked) { timeoutItemOrAction(interaction) } });
			} else if (global.itemOrActionProcessing) {
				await interaction.reply({ content: 'An item or action prompt is already displayed. Please use the selected item or action, or cancel it and select another item or action.', ephemeral: true });
			} else if (global.arkaetreMode === '**None**') {
				await interaction.reply({ content: 'You cannot use an Arkaetre in the current Arkaetre mode (' + global.arkaetreMode + '). Please select another item or action.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'You cannot override your current Arkaetre. Please select another item or action.', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'Only the active player, <@' + global.activePlayerID + '>, can run item and action commands right now.', ephemeral: true });
		}
	


	} else if (commandName === 'adminkill') {
		if (global.activePlayerID === '') {
			await interaction.reply({ content: 'There is no battle in progress.', ephemeral: true });
		} else if (global.activePlayerID === '354752678376636417' || global.waitingPlayerID === '354752678376636417') {
			global.waitingPlayerHP = 0;
			endTurn(interaction, 'uses their admin superiority', 'They dead.');
		} else {
			await interaction.reply({ content: 'Only an admin can use this command.', ephemeral: true });
		}
	}



});
client.login(token);



function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}



function timeoutItemOrAction(interaction) {
	interaction.editReply({ content: 'The item or action selection timed out. Please try again.', components: [] });
	global.itemOrActionProcessing = false;
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
	global.itemOrActionProcessing = false;

	global.activePlayerID = '';
	global.activePlayerHP = 15;
	global.activePlayerAT = 'Normal';
	global.activePlayerDF = 'Normal';
	global.activePlayerRC = 'Normal';
	global.activePlayerNumExtraTurns = 0;
	global.activePlayerDefensiveStance = 'Inactive';
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
	global.waitingPlayerDefensiveStance = 'Inactive';
	global.waitingPlayerShieldStatus = 'Down';
	global.waitingPlayerArkaetre = '';
	global.waitingPlayerArkaetreIcon = '';
	global.waitingPlayerWyrmList = '';
	global.waitingPlayerKluddeCount = 0;
	global.waitingPlayerPhoenixUsed = false;

	global.turn = true;
	global.turnNumber = 1;
	global.overtime = false;
	global.actionType = '';
	global.pocketwatchCounter = 0;
	global.pocketwatchActivated = false;
	global.wyrmActivated = false;
	global.flyingLionActivated = false;
	global.hummingbirdActivated = false;
	global.freeAttackInstakillHappened = false;
	global.scrollActive = false;
	global.scrollActivated = false;
	global.turnJustSwitched = true;
	global.maxHealth = 20;
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
	global.freeAttackInstakillHappened = false;
	global.scrollActivated = false;
	global.turnJustSwitched = false;
}



function swapTurns() {
	var waitingPlayerIDTemp = global.waitingPlayerID;
	var waitingPlayerHPTemp = global.waitingPlayerHP;
	var waitingPlayerATTemp = global.waitingPlayerAT;
	var waitingPlayerDFTemp = global.waitingPlayerDF;
	var waitingPlayerRCTemp = global.waitingPlayerRC;
	var waitingPlayerNumExtraTurnsTemp = global.waitingPlayerNumExtraTurns;
	var waitingPlayerDefensiveStanceTemp = global.waitingPlayerDefensiveStance;
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
	global.waitingPlayerDefensiveStance = global.activePlayerDefensiveStance;
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
	global.activePlayerDefensiveStance = waitingPlayerDefensiveStanceTemp;
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
	global.freeAttackInstakillHappened = false;
	global.turnJustSwitched = true;
}



async function modeAllows(item, interaction) {
	if (global.battleMode === '**Default**') {
		return true;
	} else if (global.battleMode === '**Free Only**') {
		return false;
	} else if (global.battleMode === '**Front Six**') {
		if (item === 'sword' || item === 'bow' || item === 'realmportal' || item === 'magistone' || item === 'dagger' || item === 'frozenfish') {
			return true;
		} else {
			return false;
		}
	} else if (global.battleMode === '**Back Six**') {
		if (item === 'sword' || item === 'bow' || item === 'realmportal' || item === 'magistone' || item === 'dagger' || item === 'frozenfish') {
			return false;
		} else {
			return true;
		}
	} else if (global.battleMode === '**Backpack**') {
		var user = await interaction.guild.members.cache.get(interaction.user.id);
		const backpackRoleIDs = ['1261472894370713642', '1261472899966042172', '1261472905234223124', '1261472910053474396', '1261472914633527498', '1261472919691726932', '1261472924251066490', '1261472929095487489', '1261472933981978714', '1261472938893512754', '1261472943809232936', '1261477378035810385'];
		const weaponNames = ['sword', 'bow', 'realmportal', 'magistone', 'dagger', 'frozenfish', 'laserrifle', 'staff', 'shield', 'shifterdisc', 'pocketwatch', 'scroll'];
		var backpackHasItem = false;
		for (var j = 0; j< 12; j++) {
			if (item === weaponNames[j] && await user.roles.cache.has(backpackRoleIDs[j])) {
				backpackHasItem = true;
			}
		}
		return backpackHasItem;
	}
}



function statChange(stat, target, increase) {
	if (!increase && (target === 'active' && (global.activePlayerDefensiveStance === 'Active' || global.activePlayerDefensiveStance === 'Activated-Success')) || (target === 'waiting' && (global.waitingPlayerDefensiveStance === 'Active' || global.waitingPlayerDefensiveStance === 'Activated-Success'))) {
		var roll = random(1, 3)
		if ((target === 'active' && global.activePlayerDefensiveStance === 'Activated-Success') || target === 'waiting' && global.waitingPlayerDefensiveStance === 'Activated-Success') {
			roll = 1;
		}
		if (roll === 1) {
			if (target === 'active') {
				global.activePlayerDefensiveStance = 'Activated-Success';
			} else {
				global.waitingPlayerDefensiveStance = 'Activated-Success';
			}
			return;
		} else {
			if (target === 'active') {
				global.activePlayerDefensiveStance = 'Activated-Fail';
			} else {
				global.waitingPlayerDefensiveStance = 'Activated-Fail';
			}
		}
	}
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
	if ((target === 'active' && (global.activePlayerDefensiveStance === 'Active' || global.activePlayerDefensiveStance === 'Activated-Success')) || (target === 'waiting' && (global.waitingPlayerDefensiveStance === 'Active' || global.waitingPlayerDefensiveStance === 'Activated-Success'))) {
		var roll = random(1, 3)
		if ((target === 'active' && global.activePlayerDefensiveStance === 'Activated-Success') || target === 'waiting' && global.waitingPlayerDefensiveStance === 'Activated-Success') {
			roll = 1;
		}
		if (roll === 1) {
			if (target === 'active') {
				global.activePlayerDefensiveStance = 'Activated-Success';
			} else {
				global.waitingPlayerDefensiveStance = 'Activated-Success';
			}
			///return '0 points of';
		} else {
			if (target === 'active') {
				global.activePlayerDefensiveStance = 'Activated-Fail';
			} else {
				global.waitingPlayerDefensiveStance = 'Activated-Fail';
			}
		}
	}
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
		} else if (global.activePlayerDefensiveStance === 'Activated-Success') {
			///Do nothing
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
		} else if (global.waitingPlayerDefensiveStance === 'Activated-Success') {
			///Do nothing
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



function endTurn(interaction, item, itemOrActionText) {
	console.log('<@' + global.activePlayerID + '> used the \'' + item + '\' item or action!');

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

	var pocketwatchMessage = '';
	var scrollMessage = '';
	var scrollIcon = '';
	if (global.scrollActive) {
		scrollIcon = ' 📜';
		if (global.turnJustSwitched) {
			global.scrollActivated = true;
		}
	}
	if (global.pocketwatchActivated) {
		pocketwatchMessage = '\n\n<:itemPocketwatch:903038555633385512> The pocketwatch ticks adamantly and prevents any turns from being gained or lost.';
	} else if (global.scrollActivated) {
		scrollMessage = '\n\n<:itemScroll:1260789127713128520> The scroll shimmers gold and grants a free extra turn.';
		global.waitingPlayerNumExtraTurns > 0 ? global.waitingPlayerNumExtraTurns-- : global.activePlayerNumExtraTurns++;
	}
	var pocketwatchTurnFreezeIcon = '';
	if (global.pocketwatchCounter > 0) {
		pocketwatchTurnFreezeIcon = ' ❄️';
		global.pocketwatchCounter--;
		if (global.pocketwatchCounter === 0) {
			pocketwatchTurnFreezeIcon = ' 💧';
		}
	}

	var defensiveStanceMessage = '';
	var activePlayerDefensiveStanceIcon = '';
	var waitingPlayerDefensiveStanceIcon = '';
	if (global.activePlayerDefensiveStance === 'Active') {
		activePlayerDefensiveStanceIcon = ' ✋';
	}
	if (global.waitingPlayerDefensiveStance === 'Active') {
		waitingPlayerDefensiveStanceIcon = ' ✋';
	}
	if (global.activePlayerDefensiveStance === 'Activated-Success') {
		defensiveStanceMessage = '\n\n✋ You defend yourself! Nothing can touch you.';
		global.activePlayerDefensiveStance = 'Inactive';
	}
	if (global.waitingPlayerDefensiveStance === 'Activated-Success') {
		defensiveStanceMessage += '\n\n✋ <@' + global.waitingPlayerID + '> defends themselves! Nothing can touch them.';
		global.waitingPlayerDefensiveStance = 'Inactive';
	}
	if (global.activePlayerDefensiveStance === 'Activated-Fail') {
		defensiveStanceMessage += '\n\n✋ You try to defend yourself, but, suffice to say, it does not work.';
		global.activePlayerDefensiveStance = 'Inactive';
	}
	if (global.waitingPlayerDefensiveStance === 'Activated-Fail') {
		defensiveStanceMessage += '\n\n✋ <@' + global.waitingPlayerID + '> tries to defend themselves, but, suffice to say, it does not work.';
		global.waitingPlayerDefensiveStance = 'Inactive';
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
		arkaetreMessage += '\n\n🐍 Your wyrm Arkaetre grins at your flexibility and flies you out of danger\'s way, letting you recover 1 point of health.';
		global.activePlayerHP++;
	}
	if (global.flyingLionActivated) {
		arkaetreMessage += '\n\n🦁 Your flying lion Arkaetre is boldened by your strong attack and pounces on <@' + global.waitingPlayerID + '> from above, dealing 1 point of damage.';
		global.waitingPlayerHP--;
	}
	if (global.hummingbirdActivated) {
		arkaetreMessage += '\n\n🕊️ Your hummingbird Arkaetre delights in your tiny attack and gives you some of its hard-earned nectar, granting you 1 point of health.';
		global.activePlayerHP++;
	}
	if (global.activePlayerArkaetre === 'Owl' && global.turnJustSwitched && global.activePlayerAT !== 'Normal' && global.activePlayerDF !== 'Normal' && global.activePlayerRC !== 'Normal') {
		if (random(1, 3) < 3) {
			arkaetreMessage += '\n\n🦉 Your owl Arkaetre\'s eyes widen at your irregular stats and it fills the air with feathers, granting you an extra turn.';
			global.waitingPlayerNumExtraTurns > 0 ? global.waitingPlayerNumExtraTurns-- : global.activePlayerNumExtraTurns++;
		} else {
			arkaetreMessage += '\n\n🦉 Your owl Arkaetre is unimpressed.';
		}
	}
	if(!global.freeAttackInstakillHappened) {
		if ((global.activePlayerArkaetre === 'Griffin' || global.waitingPlayerArkaetre === 'Griffin') && global.actionType === 'Attack') {
			var roll = random(1, 20);
			if (global.activePlayerArkaetre === 'Griffin' && global.waitingPlayerArkaetre === 'Griffin' && roll < 3) {
				if (roll === 1) {
					arkaetreMessage += '\n\n🦅 Your griffin Arkaetre silently lunges for <@' + global.waitingPlayerID + '> when they least expect it, defeating them instantly.';
				} else {
					arkaetreMessage += '\n\n🦅 <@' + global.waitingPlayerID + '>\'s griffin Arkaetre silently lunges for them when they least expect it, defeating them instantly. Trust is a dangerous thing.';
				}
				global.waitingPlayerHP = 0;
			} else if (global.activePlayerArkaetre === 'Griffin' && roll === 1) {
				arkaetreMessage += '\n\n🦅 Your griffin Arkaetre silently lunges for <@' + global.waitingPlayerID + '> when they least expect it, defeating them instantly.';
				global.waitingPlayerHP = 0;
			} else if (global.waitingPlayerArkaetre === 'Griffin' && roll === 1) {
				arkaetreMessage += '\n\n🦅 <@' + global.waitingPlayerID + '>\'s griffin Arkaetre silently lunges for them when they least expect it, defeating them instantly. Trust is a dangerous thing.';
				global.waitingPlayerHP = 0;
			}
		}
	}
	if (global.activePlayerArkaetre === 'Cheetah') {
		arkaetreMessage += '\n\n🐆 Your cheetah Arkaetre is impatient and scratches you and your opponent for 1 point of damage each.';
		global.activePlayerHP--;
		global.waitingPlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Cheetah') {
		arkaetreMessage += '\n\n🐆 <@' + global.waitingPlayerID + '>\'s cheetah Arkaetre is impatient and scratches both of you for 1 point of damage each.';
		global.activePlayerHP--;
		global.waitingPlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Komodo Dragon' && global.actionType === 'Attack' && (global.battleMode != '**Free Only**' || random(1, 2) === 1)) {
		arkaetreMessage += '\n\n🦎 <@' + global.waitingPlayerID + '>\'s komodo dragon Arkaetre hisses threateningly and bites you for 1 point of damage when you attack.';
		global.activePlayerHP--;
	}
	if (global.waitingPlayerArkaetre === 'Sphinx' && global.actionType === 'Heal' && (global.battleMode != '**Free Only**' || random(1, 2) === 1)) {
		arkaetreMessage += '\n\n🐈 <@' + global.waitingPlayerID + '>\'s sphinx Arkaetre shoots you an alluring smile and distracts you with a riddle, allowing your opponent to gain 1 point of health.';
		global.waitingPlayerHP++;
	}
	if (global.activePlayerKluddeCount === 7) {
		arkaetreMessage += '\n\n🐺 Your kludde howl as one and overwhelm your opponent with fiery fury, defeating them instantly.';
		global.waitingPlayerHP = 0;
	}
	if (global.activePlayerArkaetre === 'Phoenix' && !global.activePlayerPhoenixUsed && ((global.battleMode === '**Free Only**' && global.activePlayerHP === 1) || (global.battleMode != '**Free Only' && global.activePlayerHP < 4 && global.activePlayerHP > 0))) {
		arkaetreMessage += '\n\n🐦 Your phoenix Arkaetre douses you in magic fire and flies away. You are reborn from the ashes with full health.';
		global.activePlayerHP = 15;
		global.activePlayerArkaetreIcon = '🪶 ';
		global.activePlayerPhoenixUsed = true;
	}
	if (global.waitingPlayerArkaetre === 'Phoenix' && !global.waitingPlayerPhoenixUsed && ((global.battleMode === '**Free Only**' && global.waitingPlayerHP === 1) || (global.battleMode != '**Free Only' && global.waitingPlayerHP < 4 && global.waitingPlayerHP > 0))) {
		arkaetreMessage += '\n\n🐦 <@' + global.waitingPlayerID + '>\'s phoenix Arkaetre douses them in magic fire and flies away. They are reborn from the ashes with full health.';
		global.waitingPlayerHP = 15;
		global.waitingPlayerArkaetreIcon = '🪶 ';
		global.waitingPlayerPhoenixUsed = true;
	}
	if (global.activePlayerArkaetre === 'Hydra' || global.waitingPlayerArkaetre === 'Hydra') {
		var roll = random(1, 3);
		if (global.activePlayerArkaetre === 'Hydra' && global.waitingPlayerArkaetre === 'Hydra') {
			roll = 1;
		}
		if (roll < 3) {
			global.maxHealth--;
			if (global.activePlayerArkaetre === 'Hydra') {
				arkaetreMessage += '\n\n🔱 Your hydra Arkaetre hisses and surrounds the arena with its formidable heads, decreasing the health cap by 1 point.';
			} else {
				arkaetreMessage += '\n\n🔱 <@' + global.waitingPlayerID + '>\'s hydra Arkaetre hisses and surrounds the arena with its formidable heads, decreasing the health cap by 1 point.';
			}
		}
	}

	if (global.activePlayerHP > global.maxHealth) {
		global.activePlayerHP = global.maxHealth;
	}
	if (global.activePlayerHP < 0) {
		global.activePlayerHP = 0;
	}
	if (global.waitingPlayerHP > global.maxHealth) {
		global.waitingPlayerHP = global.maxHealth;
	}
	if (global.waitingPlayerHP < 0) {
		global.waitingPlayerHP = 0;
	}

	var activePlayerHealthIcon = '';
	if (global.activePlayerHP === global.maxHealth) {
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
	if (global.waitingPlayerHP === global.maxHealth) {
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

	var overtimeTag = global.overtime ? '⌛ ' : '';
	var overtimeMessage = '';
	if (global.activePlayerHealth != 0 && global.waitingPlayerHealth != 0) {
		if (global.turnNumber > 14 && global.turnNumber < 20) {
			overtimeMessage = '\n\n⌛ Overtime will start on turn 20! You are both growing too tired to defend yourselves properly...';
		} else if (global.turnNumber === 20 && !global.overtime) {
			global.overtime = true;
			overtimeMessage = '\n\n⌛ Overtime is starting! You are both too tired to defend yourselves properly. Healing rolls are now disabled, and the shield formation chance has decreased to 50%.';
		}
	}

	var activePlayerShieldIcon = global.activePlayerShieldStatus === 'Up' ? ' <:itemShield:903038554127601694>' : '';
	var waitingPlayerShieldIcon = global.waitingPlayerShieldStatus === 'Up' ? ' <:itemShield:903038554127601694>' : '';

	var activePlayerExtraTurnsIcon = '';
	if (global.activePlayerNumExtraTurns > 0) {
		activePlayerExtraTurnsIcon = ' ♻️';
		for (var i = 1; i < global.activePlayerNumExtraTurns; i++) {
			activePlayerExtraTurnsIcon += '♻️';
		}
	}
	var waitingPlayerExtraTurnsIcon = '';
	if (global.waitingPlayerNumExtraTurns > 0) {
		waitingPlayerExtraTurnsIcon = ' ♻️';
		for (var i = 1; i < global.waitingPlayerNumExtraTurns; i++) {
			waitingPlayerExtraTurnsIcon += '♻️';
		}
	}

	var activePlayerATLockIcon = global.activePlayerArkaetre === 'Griffin' ? ' 🔒' : '';
	var activePlayerDFLockIcon = global.activePlayerArkaetre === 'Dragon' ? ' 🔒' : '';
	var activePlayerRCLockIcon = global.activePlayerArkaetre === 'Cheetah' ? ' 🔒' : '';
	var waitingPlayerATLockIcon = global.waitingPlayerArkaetre === 'Griffin' ? ' 🔒' : '';
	var waitingPlayerDFLockIcon = global.waitingPlayerArkaetre === 'Dragon' ? ' 🔒' : '';
	var waitingPlayerRCLockIcon = global.waitingPlayerArkaetre === 'Cheetah' ? ' 🔒' : '';

	var embed = new EmbedBuilder().setTitle(interaction.member.displayName + ' ' + item + '!').setDescription(itemOrActionText + criticalMessage + pocketwatchMessage + scrollMessage + shieldMessage + arkaetreMessage + defensiveStanceMessage + overtimeMessage).setFooter({ text: overtimeTag + 'Turn ' + global.turnNumber + scrollIcon + pocketwatchTurnFreezeIcon });
	if (global.turn) {
		embed.setColor(0x55ACEE).addFields(
			{ name: '\u200B', value: '🔸' + global.waitingPlayerArkaetreIcon + '<@' + global.waitingPlayerID + '>' + waitingPlayerShieldIcon + '🔸' + waitingPlayerExtraTurnsIcon + waitingPlayerDefensiveStanceIcon + '\n' + waitingPlayerHealthIcon + ' HP: ' + global.waitingPlayerHP + '/' + global.maxHealth + '\n⚔️ AT: ' + global.waitingPlayerAT + waitingPlayerATLockIcon + '\n🛡️ DF: ' + global.waitingPlayerDF + waitingPlayerDFLockIcon + '\n💗 RC: ' + global.waitingPlayerRC + waitingPlayerRCLockIcon, inline: true },
			{ name: '\u200B', value: '🔹' + global.activePlayerArkaetreIcon + '<@' + global.activePlayerID + '>' + activePlayerShieldIcon + '🔹' + activePlayerExtraTurnsIcon + activePlayerDefensiveStanceIcon + '\n' + activePlayerHealthIcon + ' HP: ' + global.activePlayerHP + '/' + global.maxHealth + '\n⚔️ AT: ' + global.activePlayerAT + activePlayerATLockIcon + '\n🛡️ DF: ' + global.activePlayerDF + activePlayerDFLockIcon + '\n💗 RC: ' + global.activePlayerRC + activePlayerRCLockIcon, inline: true }
		);
	} else {
		embed.setColor(0xF4900C).addFields(
			{ name: '\u200B', value: '🔸' + global.activePlayerArkaetreIcon + '<@' + global.activePlayerID + '>' + activePlayerShieldIcon + '🔸' + activePlayerExtraTurnsIcon + activePlayerDefensiveStanceIcon + '\n' + activePlayerHealthIcon + ' HP: ' + global.activePlayerHP + '/' + global.maxHealth + '\n⚔️ AT: ' + global.activePlayerAT + activePlayerATLockIcon + '\n🛡️ DF: ' + global.activePlayerDF + activePlayerDFLockIcon + '\n💗 RC: ' + global.activePlayerRC + activePlayerRCLockIcon, inline: true },
			{ name: '\u200B', value: '🔹' + global.waitingPlayerArkaetreIcon + '<@' + global.waitingPlayerID + '>' + waitingPlayerShieldIcon + '🔹' + waitingPlayerExtraTurnsIcon + waitingPlayerDefensiveStanceIcon + '\n' + waitingPlayerHealthIcon + ' HP: ' + global.waitingPlayerHP + '/' + global.maxHealth + '\n⚔️ AT: ' + global.waitingPlayerAT + waitingPlayerATLockIcon + '\n🛡️ DF: ' + global.waitingPlayerDF + waitingPlayerDFLockIcon + '\n💗 RC: ' + global.waitingPlayerRC + waitingPlayerRCLockIcon, inline: true }
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
	global.itemOrActionProcessing = false;
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