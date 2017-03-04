var builder = require('/BOT/NODE/node_modules/core');

var botbuilder = require('/BOT/NODE/node_modules/botbuilder');

var https = require('https');

var http = require('http');

var restify = require('/BOT/NODE/node_modules/restify');

var fs = require('fs');

var request = require('/BOT/NODE/node_modules/request');

var database = require('./database');

//--------------------------------------------------------------------------------------------------------------------------------------------

var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var intent = new botbuilder.IntentDialog();

var bot = new botbuilder.UniversalBot(connector);

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978,
    function() {
        console.log(server.name + " Listening to " + server.url);
    });

//------------------------------------------------------------------------------------------------------------------------------------------------

var bing_apiKey = 'b0c56d5c2b1044ddb217b3700b3c4587';

var luis_apiKey = 'd40bdee4551f470286b7a9c1fc5ff10e';

var model = '';

var clientId = 'test-app';

var recognize = botbuilder.LuisRecognizer(model);

//----------------------------------------------------------------------------------------------------------------------------------------------

/*bot.dialog('/', [
    function(session) {
        getAccessToken(clientId, bing_apiKey, session, function(err, accessToken) {
            if (err) {
                return session.send(err);
            }
            session.send('Got access token: ' + accessToken)

            textToSpeech(str, 'test.wav', accessToken, session, function(err) {
                if (err) {
                    return session.send(err);
                }
                session.send('Wrote out: ' + 'test.wav');


                speechToText('test.wav', accessToken, session, function(err, res) {
                    if (err) {
                        return session.send(err);
                    }
                    session.send('Confidence ' + res.results[0].confidence + ' for: "' + res.results[0].lexical + '"');
                });
            })
        })
    }
]);*/

bot.dialog('/', [
    function(session) {
        session.send("Hi, I'm Ziz. For more information please visit www.teamperso.com");
        session.beginDialog('Root');
    },
    function(session, results) {
        session.endConversation("Goodbye until next time");
    }
]);

bot.dialog('Root', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var team_perso = botbuilder.EntityRecognizer.findEntity(args.entities, 'Team_Perso');
            var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'Responsibility');
            var role = botbuilder.EntityRecognizer.findEntity(args.entities, 'role');
            var find = botbuilder.EntityRecognizer.findEntity(args.entities, 'find');
            var easter_egg = botbuilder.EntityRecognizer.findEntity(args.entities, 'easter_egg');
            var orfei = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::orfei');
            var lucchi = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::lucchi');
            var zancanaro = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::zancanaro');
            var chiarin = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::chiarin');
            var greggio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::greggio');
            var quinto = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::quinto');
            var fantinato = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::fantinato');
            var nunzio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::nunzio');
            var ziz = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::ziz');
            var uwp = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::uwp');
            var electron = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::electron');
            var volley = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::volley');
            var fast_ink = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::fast ink');
            var website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');
            var chiron = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::chiron');
            var eden_tv_86 = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::eden tv 86');
            var bot_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::bot');
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !ziz && !uwp && !electron && !volley && !fast_ink && !website && !chiron && !eden_tv_86 && !bot_project && !current_project && !total_project && !total_people) {
                session.beginDialog('Nothing');
            }
        }
    ])
    .matches('none', [
        function(session, args, results) {
            session.send("Wrong action");
            //textToSpeech("Wrong action", "error.wav", accessToken, session, callback);
            session.beginDialog('Root');
        }
    ]));

server.post('/api/messages', connector.listen());

bot.dialog('Nothing', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            session.send("Scegli una delle opzioni");
            var nothingCards = CreateNothingCards();
            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(nothingCards);

            session.send(reply);
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            var team_perso = botbuilder.EntityRecognizer.findEntity(args.entities, 'Team_Perso');
            if (!current_project && !total_project && !total_people && !team_perso) {
                session.beginDialog('Nothing');
            } else {
                if (!current_project && !total_project && !total_people && team_perso) {
                    session.beginDialog('Team');
                } else {
                    if (!current_project && !total_project && total_people && !team_perso) {
                        session.beginDialog('AllPeople');
                    } else {
                        if (!current_project && total_project && !total_people && !team_perso) {
                            session.beginDialog('TotalProject');
                        } else {
                            if (current_project && !total_project && !total_people && !team_perso) {
                                session.beginDialog('CurrentProject');
                            }
                        }
                    }
                }
            }
        }
    ])
    .matches('none', [
        function(session, results, args) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('Team', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            session.send("Cosa vuoi sapere del team?");
            var teamCards = CreateTeamCards();
            var reply = new botbuilder.Message(session)
                .AttachmentLayout(botbuilder.attachmentLayout.carousel)
                .attachments(teamCards);

            session.send(reply);
            var role = botbuilder.EntityRecognizer.findEntity(args.entities, 'role');
            var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'Responsibility');
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            if (!current_project && !total_project && !total_people && !responsability && role) {
                session.beginDialog('AllRole');
            } else {
                if (!current_project && !total_project && !total_people && responsability && !role) {
                    session.beginDialog('AllResponsability');
                } else {
                    if (!current_project && !total_project && total_people && !responsability && !role) {
                        session.beginDialog('AllPeople');
                    } else {
                        if (!current_project && total_project && !total_people && !responsability && !role) {
                            session.beginDialog('TotalProject');
                        } else {
                            if (current_project && !total_project && !total_people && !responsability && !role) {
                                session.beginDialog('CurrentProject');
                            }
                        }
                    }
                }
            }
        }
    ])
    .matches('none', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('AllRole', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            session.send("Di chi vuoi sapere il ruolo?");
            var roleCards = CreateRoleCards();
            var reply = new botbuilder.Message(session)
                .AttachmentLayout(botbuilder.AttachmentLayout.carousel)
                .attachments(roleCards)

            session.send(reply);
            var orfei = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::orfei');
            var lucchi = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::lucchi');
            var zancanaro = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::zancanaro');
            var chiarin = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::chiarin');
            var greggio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::greggio');
            var quinto = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::quinto');
            var fantinato = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::fantinato');
            var nunzio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::nunzio');
            if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && nunzio) {
                session.send("Il ruolo di nunzio nel team è " + parsed.database.membri.nunzio.ruolo);
            } else {
                if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && fantinato && !nunzio) {
                    session.send("Il ruolo di fantinato nel team è " + parsed.database.membri.fantinato.ruolo);
                } else {
                    if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && quinto && !fantinato && !nunzio) {
                        session.send("Il ruolo di quinto nel team è " + parsed.database.membri.quinto.ruolo);
                    } else {
                        if (!orfei && !lucchi && !zancanaro && !chiarin && greggio && !quinto && !fantinato && !nunzio) {
                            session.send("Il ruolo di greggio nel team è " + parsed.database.membri.greggio.ruolo);
                            s
                        } else {
                            if (!orfei && !lucchi && !zancanaro && chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                session.send("Il ruolo di chiarin nel team è " + parsed.database.membri.chiarin.ruolo);
                            } else {
                                if (!orfei && !lucchi && zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                    session.send("Il ruolo di zancanaro nel team è " + parsed.database.membri.zancanaro.ruolo);
                                } else {
                                    if (!orfei && lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                        session.send("Il ruolo di lucchi nel team è " + parsed.database.membri.lucchi.ruolo);
                                    } else {
                                        if (orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                            session.send("Il ruolo di orfei nel team è " + parsed.database.membri.orfei.ruolo);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ])
    .matches('none', [
        function(session, args, results) {
            session.send("Wrong action");
        }
    ])
)


/*function getAccessToken(clientId, bing_apiKey, session, callback) {
    request.post({
        url: 'https://oxford-speech.cloudapp.net/token/issueToken',
        form: {
            'grant_type': 'client_credentials',
            'client_id': encodeURIComponent(clientId),
            'client_secret': encodeURIComponent(bing_apiKey),
            'scope': 'https://speech.platform.bing.com'
        }
    }, function(err, resp, body) {
        if (err) return callback(err);
        try {
            var accessToken = JSON.parse(body).access_token;
            if (accessToken) {
                callback(null, accessToken);
            } else {
                callback(body);
            }
        } catch (e) {
            callback(e);
        }
    });
}

function speechToText(filename, accessToken, session, callback) {
    fs.readFile(filename, function(err, waveData) {
        if (err) {
            return callback(err);
        }
        request.post({
            url: 'https://speech.platform.bing.com/recognize/query',
            qs: {
                'scenarios': 'ulm',
                'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5',
                'locale': 'en-US',
                'device.os': '',
                'version': '3.0',
                'format': 'json',
                'requestid': '1d4b6030-9099-11e0-91e4-0800200c9a66',
                'instanceid': '1d4b6030-9099-11e0-91e4-0800200c9a66'
            },
            body: waveData,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'audio/wav; samplerate=16000',
                'Content-Length': waveData.length
            }
        }, function(err, resp, body) {
            if (err) {
                return callback(err);
            }
            try {
                callback(null, JSON.parse(body));
            } catch (e) {
                callback(e);
            }
        });
    });
}

function textToSpeech(text, filename, accessToken, session, callback) {
    var ssmlTemplate = "<speak version='1.0' xml:lang='en-us'><voice xml:lang='%s' xml:gender='%s' name='%s'>%s</voice></speak>";
    request.post({
        url: 'http://speech.platform.bing.com/synthesize',
        body: util.format(ssmlTemplate, 'en-US', 'Female', 'Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)', text),
        encoding: null,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'riff-16khz-16bit-mono-pcm',
            'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
            'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
        }
    }, function(err, resp, body) {
        if (err) {
            return callback(err);
        }
        fs.writeFile(filename, body, 'binary', function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
    speechToText(filename, accessToken, session, callback);
}*/

//------------------------------------------------------------------------------------------------------------------------------------------------------

function CreateNothingCards(session) {
    return [
        new builder.HeroCard(session)
        .title('Persone')
        .text('Informazioni sulle persone')
        .images([
            builder.CardImage.create(session, 'http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png')
        ])
        .buttons([
            session.beginDialog('AllPeople')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            session.beginDialog('TotalProject')
        ]),

        new builder.HeroCard(session)
        .title('Team Perso')
        .text('Informazioni sul team')
        .images([
            builder.CardImage.create(session, 'http://www.elia-group.com/images/team1.jpg')
        ])
        .buttons([
            session.beginDialog('Team')
        ])
    ];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

function CreateTeamCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Membri')
        .text('Informazioni sui membri')
        .images([
            botbuilder.CardImage.create(session, 'http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png')
        ])
        .buttons([
            session.beginDialog('AllPeople')
        ]),

        new botbuilder.HeroCard(session)
        .title('Ruoli')
        .text('Informazioni sui ruoli')
        .images([
            botbuilder.CardImage.create(session, 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg')
        ])
        .buttons([
            session.beginDialog('AllRole')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            session.beginDialog('TotalProject')
        ]),

        new botbuilder.HeroCard(session)
        .title('Responsabilità')
        .text('Responsabilità dei membri del team')
        .images([
            botbuilder.CardImage.create(session, 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg')
        ])
        .buttons([
            session.beginDialog('TotalResponsability')
        ])
    ];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------

function CreateRoleCards(session) {
    var parsed = JSON.parse(database);
    return [
        new botbuilder.HeroCard(session)
        .title('Orfei')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di orfei nel team è " + parsed.database.membri.orfei.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di lucchi nel team è " + parsed.database.membri.lucchi.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di fantinato nel team è " + parsed.database.membri.fantinato.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di zancanaro nel team è " + parsed.database.membri.zancanaro.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di greggio nel team è " + parsed.database.membri.greggio.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di quinto nel team è " + parsed.database.membri.quinto.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di chiarin nel team è " + parsed.database.membri.chiarin.ruolo)
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su orfei')
        .buttons([
            session.send("Il ruolo di nunzio nel team è " + parsed.database.membri.nunzio.ruolo)
        ]),
    ]
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------