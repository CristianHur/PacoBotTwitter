//Constantes
const Twit = require('twit');
const randomQuote = require('random-quote');

//Arranque
const T = new Twit({
		consumer_key: process.env.consumerKey,
		consumer_secret: process.env.consumerSecret,
		access_token: process.env.accesstoken,
		access_token_secret: process.env.accesstokensecret,
		timeout_ms: 60 * 1000,
		strictSSL: false,
	});

var tiempoEntreEnvio = 3600000 * 2;

var urla;
console.log("FUNCIONANDO PACO TWEET");
//--------------


mainprogram();
setInterval(mainprogram, tiempoEntreEnvio);

function mainprogram() {
	randomQuote()
	.then(quote => EnviarTweet(quote[0].content))
	.catch(err => console.error(err));
}

function EnviarTweet(frase) {
	frase = frase.replace(/<[^>]*>/g, '');

	frase = frase.replace(/&#8217;/g, "'");

	frase = frase.replace(/&#8211;/g, "-");

	console.log("FRASE " + frase);

	if (frase.length > 280) {
		mainprogram();
	} else {
		T.post('statuses/update', {
			status: frase
		}, function (err, data, response) {
			console.log(data)
		})
	}
}
