const { Client, ActivityType } = require('discord.js');

/**
 * Log the bot in and set a random activity
 * 
 * @param {Client} client - The client instance
 */
module.exports = (client) => {
    const activities = [
        { name: "Exploring the depths of the internet...", type: ActivityType.Custom },
        { name: "Decoding the matrix...", type: ActivityType.Custom },
        { name: "Hunting for answers...", type: ActivityType.Custom },
        { name: "Indexing infinite knowledge...", type: ActivityType.Custom },
        { name: "Browsing the multiverse...", type: ActivityType.Custom },
        { name: "Unraveling mysteries...", type: ActivityType.Custom },
        { name: "Chasing 404s...", type: ActivityType.Custom },
        { name: "Rendering the web...", type: ActivityType.Custom },
        { name: "Surfing data waves...", type: ActivityType.Custom },
        { name: "Connecting the dots...", type: ActivityType.Custom },
        { name: "Crunching queries...", type: ActivityType.Custom },
        { name: "Seeking the unknown...", type: ActivityType.Custom },
        { name: "Filing away knowledge...", type: ActivityType.Custom },
        { name: "Reading between the lines...", type: ActivityType.Custom },
        { name: "Powering up search engines...", type: ActivityType.Custom },
    ];

    function updateStatus() {
        const activity = activities[Math.floor(Math.random()*activities.length)];
        client.user.setActivity(activity.name, { type: activity.type });
    }

    console.log('🎭 Activities Set!');
    updateStatus();
    setInterval(updateStatus,  30000);
};