require('dotenv/config');

module.exports = {
    name: 'search',
    description: 'Searches the web for an answer to your question.',
    options: [
        {
            name: 'query',
            type: 3, // STRING type
            description: 'The question or keywords to search for',
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        const query = interaction.options.getString('query');

        await interaction.deferReply();

        try {
            // Dynamically import node-fetch
            const fetch = (await import('node-fetch')).default;

            // Use environment variables for the API key and Search Engine ID
            const apiKey = process.env.API_KEY;
            const searchEngineId = process.env.SEARCH_ENGINE_ID;
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
            );
            const data = await response.json();

            // Get at least three relevant results from Google Custom Search
            if (data.items && data.items.length > 0) {
                let replyMessage = `🔍 **Results for "${query}":**\n`;
                const results = data.items.slice(0, 3); // Get up to 3 results

                for (const result of results) {
                    replyMessage += `\n**${result.title}**\n${result.snippet}\nMore info: ${result.link}\n`;
                }

                await interaction.editReply(replyMessage);
            } else {
                await interaction.editReply(`❌ No relevant results found for "${query}".`);
            }
        } catch (error) {
            console.error(`Error fetching search results: ${error}`);
            await interaction.editReply('❌ There was an error while searching. Please try again later.');
        }
    },
};
