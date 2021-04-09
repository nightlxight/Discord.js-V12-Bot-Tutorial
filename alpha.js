
// PACKAGES

const Discord = require('discord.js');
const config = require('./configs/config.json');
const fs = require('fs');
const db = require('quick.db');

const path = require("path");


const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handlers/${events}`)(client));

client.categories = fs.readdirSync('./commands');



// EVENTS

client.on('ready', async() => {
    console.log('Alpha Started!');
});

//CHATBOT FEATURE 

client.on("message", async message => {
        let sChannel = db.fetch(`chatbot_${message.guild.id}`);
        if (sChannel === null) {
            return;
          }
            if (message.author.bot && message.author.discriminator !== '0000') return;
            if(message.channel.id === sChannel){
                let content = message.content;
                if(!content) return;
                    chatbot.getReply(content).then(r => client.channels.cache.get(sChannel).send(r));
            }
         });


client.login(config.token)
