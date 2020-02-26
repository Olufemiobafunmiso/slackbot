require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios')



const the_bot = new SlackBot({
    token: `${process.env.SLACK_TOKEN}`,
    name: 'DevBotProject'
})

// Start Handler
the_bot.on('start', () => {
    const params = {
        icon_emoji: ':male-technologist:'
    }

    the_bot.postMessageToChannel(
        'random',
        `Get inspired while working with @DevBotProject now. `,
        params
    );
    // define existing username instead of 'user_name'
    // bot.postMessageToUser('korneliosyaovi', 'Hello ALaye How far', params);

})

// Error Handler
the_bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
the_bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})


function handleMessage(message) {
    if (message.includes(' inspire me')) {
        inspireMe()
    } else if (message.includes(' random joke')) {
        randomJoke()
    } else if (message.includes(' help')) {
        runHelp()
    }
}

function inspireMe() {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
        .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }

            the_bot.postMessageToChannel(
                'random',
                `:zap: ${quote} - *${author}*`,
                params
            );

        })
}

// Random Joke
function randomJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            the_bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}

function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    the_bot.postMessageToChannel(
        'random',
        `Type *@inspirenuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}