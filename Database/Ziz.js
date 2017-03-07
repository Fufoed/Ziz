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

var dialogs = ['Nothing', 'Root', 'Team', 'AllPeople', 'TotalProject', 'CurrentProject', 'AllRole', 'AllResponsability'];

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

//---------------------------------------------------------------------------------------------------------------------------------------------------------

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
            var email = botbuilder.EntityRecognizer.findEntity(args.entities, 'email');
            if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !ziz && !uwp && !electron && !volley && !fast_ink && !website && !chiron && !eden_tv_86 && !bot_project && !current_project && !total_project && !total_people && !email) {
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

            botbuilder.Prompts.text(session, reply);
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
        },
        function(session, results) {
            if (results.response == dialogs[2]) {
                session.beginDialog('Team');
            } else {
                if (results.response == dialogs[3]) {
                    session.beginDialog('AllPeople');
                } else {
                    if (results.response == dialogs[4]) {
                        session.beginDialog('TotalProject');
                    } else {
                        if (results.response == dialogs[5]) {
                            session.beginDialog('CurrentProject');
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

            botbuilder.Prompts.text(session, reply);
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
        },
        function(session, results) {
            if (results.response == dialogs[3]) {
                session.beginDialog('AllPeople');
            } else {
                if (results.reponse == dialogs[4]) {
                    session.beginDialog('TotalProject');
                } else {
                    if (results.response == dialogs[5]) {
                        session.beginDialog('CurrentProject')
                    } else {
                        if (results.response == dialogs[6]) {
                            session.beginDialog('AllRole');
                        } else {
                            if (results.response == dialogs[7]) {
                                session.beginDialog('AllResponsability');
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
            var parsed = JSON.parse(database);
            session.send("Di chi vuoi sapere il ruolo?");
            var roleCards = CreateRoleCards();
            var reply = new botbuilder.Message(session)
                .AttachmentLayout(botbuilder.AttachmentLayout.carousel)
                .attachments(roleCards)

            botbuilder.Prompts.text(session, reply);
            var orfei = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::orfei');
            var lucchi = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::lucchi');
            var zancanaro = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::zancanaro');
            var chiarin = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::chiarin');
            var greggio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::greggio');
            var quinto = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::quinto');
            var fantinato = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::fantinato');
            var nunzio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::nunzio');
            if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && nunzio) {
                var NunzioRole = getNunzioRole(session, parsed);
                session.send(NunzioRole);
            } else {
                if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && fantinato && !nunzio) {
                    var FantinatoRole = getFantinatoRole(session, parsed);
                    session.send(FantinatoRole);
                } else {
                    if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && quinto && !fantinato && !nunzio) {
                        var QuintoRole = getQuintoRole(session, parsed);
                        session.send(QuintoRole);
                    } else {
                        if (!orfei && !lucchi && !zancanaro && !chiarin && greggio && !quinto && !fantinato && !nunzio) {
                            var GreggioRole = getGreggioRole(session, parsed);
                            session.send(GreggioRole);
                        } else {
                            if (!orfei && !lucchi && !zancanaro && chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                var ChiarinRole = getChiarinRole(session, parsed);
                                session.send(ChiarinRole);
                            } else {
                                if (!orfei && !lucchi && zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                    var ZancanaroRole = getZancanaroRole(session, parsed);
                                    session.send(ZancanaroRole);
                                } else {
                                    if (!orfei && lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                        var LucchiRole = getLucchiRole(session, parsed);
                                        session.send(LucchiRole);
                                    } else {
                                        if (orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                            var OrfeiRole = getOrfeiRole(session, parsed);
                                            session.send(OrfeiRole);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        function(session, results) {
            if (results.response == 'Orfei') {
                var OrfeiRole = getOrfeiRole(session, parsed);
                session.send(OrfeiRole);
            } else {
                if (results.response == 'Lucchi') {
                    var LucchiRole = getLucchiRole(session, parsed);
                    session.send(LucchiRole);
                } else {
                    if (results.response == 'Fantinato') {
                        var FantinatoRole = getFantinatoRole(session, parsed);
                        session.send(FantinatoRole);
                    } else {
                        if (results.response == 'Zancanaro') {
                            var ZancanaroRole = getZancanaroRole(session, parsed);
                            session.send(ZancanaroRole);
                        } else {
                            if (results.response == 'Greggio') {
                                var GreggioRole = getGreggioRole(session, parsed);
                                session.send(GreggioRole);
                            } else {
                                if (results.response == 'Quinto') {
                                    var QuintoRole = getQuintoRole(session, parsed);
                                    session.send(QuintoRole);
                                } else {
                                    if (results.response == 'Chiarin') {
                                        var ChiarinRole = getChiarinRole(session, parsed);
                                        session.send(ChiarinRole);
                                    } else {
                                        if (results.response == 'Nunzio') {
                                            var NunzioRole = getNunzioRole(session, parsed);
                                            session.send(NunzioRole);
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
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('AllPeople', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var parsed = JSON.parse(database);
            session.send("Queste sono le persone appartenenti al team perso. Vuoi sapere altro?")
            var PeopleCards = CreatePeopleCards();
            var reply = botbuilder.Message(session)
                .AttachmentLayout(botbuilder.AttachmentLayout.carousel)
                .attachments(PeopleCards)

            botbuilder.Prompts.text(session, reply);

            var role = botbuilder.EntityRecognizer.findEntity(args.entities, 'role');
            var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'Responsibility');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var orfei = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::orfei');
            var lucchi = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::lucchi');
            var zancanaro = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::zancanaro');
            var chiarin = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::chiarin');
            var greggio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::greggio');
            var quinto = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::quinto');
            var fantinato = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::fantinato');
            var nunzio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::nunzio');
            if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                session.send("Inserire una delle opzioni sopra riportate");
                session.beginDialog('AllPeople');
            } else {
                if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && nunzio) {
                    var NunzioTemp = getNunzioInformation(session, parsed);
                    session.send(NunzioTemp);
                } else {
                    if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && fantinato && !nunzio) {
                        var FantinatoTemp = getFantinatoInformation(session, parsed);
                        session.send(FantinatoTemp);
                    } else {
                        if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && quinto && !fantinato && !nunzio) {
                            var QuintoTemp = getQuintoInformation(session, parsed);
                            session.send(QuintoTemp);
                        } else {
                            if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && greggio && !quinto && !fantinato && !nunzio) {
                                var GreggioTemp = getGreggioInformation(session, parsed);
                                session.send(GreggioTemp);
                            } else {
                                if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                    var ChiarinTemp = getChiarinInformation(session, parsed);
                                    session.send(ChiarinTemp);
                                } else {
                                    if (!role && !responsability && !total_project && !orfei && !lucchi && zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                        var ZancanaroTemp = getZancanaroInformation(session, parsed);
                                        session.send(ZancanaroTemp);
                                    } else {
                                        if (!role && !responsability && !total_project && !orfei && lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                            var LucchiTemp = getLucchiInformation(session, parsed);
                                            session.send(LucchiTemp);
                                        } else {
                                            if (!role && !responsability && !total_project && orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                var OrfeiTemp = getOrfeiInformation(session, parsed);
                                                session.send(OrfeiTemp);
                                            } else {
                                                if (!role && !responsability && total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                    var TotalProjectTemp = getTotalProjectInformation(session, parsed);
                                                    session.send(TotalProjectTemp);
                                                } else {
                                                    if (!role && responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                        var ResponsabilityTemp = getAllResponsabilityInformation(session, parsed);
                                                        session.send(ResponsabilityTemp);
                                                    } else {
                                                        if (role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                            var RoleTemp = getAllRoleInformation(session, parsed);
                                                            session.send(RoleTemp);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        function(session, results) {
            if (results.response == "OrfeiRuolo") {
                var OrfeiRuolo = getOrfeiRole(session, parsed);
                session.send(OrfeiRuolo);
            } else {
                if (results.response == "OrfeiInfo") {
                    var OrfeiInformazioni = getOrfeiInformation(session, parsed);
                    session.send(OrfeiInformazioni);
                } else {
                    if (results.response == "OrfeiResponsabilità") {
                        var OrfeiRes = getOrfeiResponsability(session, parsed);
                        session.send(OrfeiRes);
                    } else {
                        if (results.response == "OrfeiProgetti") {
                            var OrfeiProject = getOrfeiProjects(session, parsed);
                            session.send(OrfeiProject);
                        } else {
                            if (results.response == "LucchiRuolo") {
                                var LucchiRuolo = getLucchiRole(session, parsed);
                                session.send(LucchiRuolo);
                            } else {
                                if (results.response == "LucchiInfo") {
                                    var LucchiInformazioni = getLucchiInformation(session, parsed);
                                    session.send(LucchiInformazioni);
                                } else {
                                    if (results.response == "LucchiResponsabilità") {
                                        var LucchiRes = getLucchiResponsabiity(session, parsed);
                                        session.send(LucchiRes);
                                    } else {
                                        if (results.response == "LucchiProgetti") {
                                            var LucchiProjects = getLucchiProjects(session, parsed);
                                            session.send(LucchiProjects);
                                        } else {
                                            if (results.response == "ZancanaroRuolo") {
                                                var ZancanaroRuolo = getZancanaroRole(session, parsed);
                                                session.send(ZancanaroRuolo);
                                            } else {
                                                if (results.response == "ZancanaroInfo") {
                                                    var ZancanaroInformazioni = getZancanaroInformation(session, parsed);
                                                    session.send(ZancanaroInformazioni);
                                                } else {
                                                    if (results.response == "ZancanaroResponsabilità") {
                                                        var ZancanaroRes = getZancanaroResponsabiity(session, parsed);
                                                        session.send(ZancanaroRes);
                                                    } else {
                                                        if (results.response == "ZancanaroProgetti") {
                                                            var ZancanaroProjects = getZancanaroProjects(session, parsed);
                                                            session.send(ZancanaroProjects);
                                                        } else {
                                                            if (results.response == "FantinatoRuolo") {
                                                                var FantinatoRuolo = getFantinatoRole(session, parsed);
                                                                session.send(FantinatoRuolo);
                                                            } else {
                                                                if (results.response == "FantinatoInfo") {
                                                                    var FantinatoInformazioni = getFantinatoInformation(session, parsed);
                                                                    session.send(FantinatoInformazioni);
                                                                } else {
                                                                    if (results.response == "FantinatoResponsabilità") {
                                                                        var FantinatoRes = getFantinatoResponsabiity(session, parsed);
                                                                        session.send(FantinatoRes);
                                                                    } else {
                                                                        if (results.response == "FantinatoProgetti") {
                                                                            var FantinatoProjects = getFantinatoProjects(session, parsed);
                                                                            session.send(FantinatoProjects);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
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
            session.send("wrong action");
            session.beginDialog('Root');
        }
    ]))

//-----------------------------------------------------------------------------------------------------------------------------------------------------

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
            botbuilder.CardAction.imBack(session, dialogs[3], 'persone')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[4], 'progetti totali')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[5], 'progetti correnti')
        ]),

        new builder.HeroCard(session)
        .title('Team Perso')
        .text('Informazioni sul team')
        .images([
            builder.CardImage.create(session, 'http://www.elia-group.com/images/team1.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[2], 'team')
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
            botbuilder.CardAction.imBack(session, dialogs[3], 'membri')
        ]),

        new botbuilder.HeroCard(session)
        .title('Ruoli')
        .text('Informazioni sui ruoli')
        .images([
            botbuilder.CardImage.create(session, 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[6], 'ruoli')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[4], 'progetti totali')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[5], 'progetti correnti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Responsabilità')
        .text('Responsabilità dei membri del team')
        .images([
            botbuilder.CardImage.create(session, 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[7], 'responsabilità')
        ])
    ];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------

function CreateRoleCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Orfei')
        .text('Informazioni su Orfei')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Orfei', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su Lucchi')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Lucchi', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su Fantinato')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Fantinato', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su Zancanaro')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Zancanaro', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su Greggio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Greggio', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su Quinto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Quinto', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su Chiarin')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Chiarin', 'ruolo')
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su Nunzio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Nunzio', 'ruolo')
        ]),
    ]
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

function CreatePeopleCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Orfei')
        .text('Informazioni su Orfei')
        .buttons([
            botbuilder.CardAction.imBack(session, 'OrfeiInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'OrfeiRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'OrfeiResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'OrfeiProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su Lucchi')
        .buttons([
            botbuilder.CardAction.imBack(session, 'LucchiInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'LucchiRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'LucchiResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'LucchiProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su Fantinato')
        .buttons([
            botbuilder.CardAction.imBack(session, 'FantinatoInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'FantinatoRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'FantinatoResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'FantinatoProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su Zancanaro')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ZancanaroInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'ZancanaroRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'ZancanaroResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'ZancanaroProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su Greggio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'GreggioInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'GreggioRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'GreggioResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'GreggioProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su Quinto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'QuintoInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'QuintoRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'QuintoResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'QuintoProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su Chiarin')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ChiarinInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'ChiarinRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'ChiarinResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'ChiarinProgetti', 'progetti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su Nunzio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'NunzioInfo', 'info'),
            botbuilder.CardAction.imBack(session, 'NunzioRuolo', 'ruolo'),
            botbuilder.CardAction.imBack(session, 'NunzioResponsabilità', 'responsabilità'),
            botbuilder.CardAction.imBack(session, 'NunzioProgetti', 'progetti')
        ])
    ]
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiInformation(session, parsed) {
    return ("Questa persona è Samuele Orfei, il suo username github è " + parsed.database.membri.orfei.username_gitlab + ", il suo soprannome è " + parsed.database.membri.orfei.nickname + ", le sue specialità sono: " + parsed.database.membri.orfei.specialità[0] + ', ' + parsed.database.membri.orfei.specialità[1] + ', ' + parsed.database.membri.orfei.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.orfei.argomenti_da_imparare[0] + ', ' + parsed.database.membri.orfei.argomenti_da_imparare[1] + ', ' + parsed.database.membri.orfei.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.orfei.progetti_assegnati[0]);
}

function getLucchiInformation(session, parsed) {
    return ("Questa persona è Manuele Lucchi, il suo username github è " + parsed.database.membri.lucchi.username_gitlab + ", il suo soprannome è " + parsed.database.membri.lucchi.nickname + ", le sue specialità sono: " + parsed.database.membri.lucchi.specialità[0] + ', ' + parsed.database.membri.lucchi.specialità[1] + ', ' + parsed.database.membri.lucchi.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.lucchi.argomenti_da_imparare[0] + ', ' + parsed.database.membri.lucchi.argomenti_da_imparare[1] + ', ' + parsed.database.membri.lucchi.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.lucchi.progetti_assegnati[0]);
}

function getZancanaroInformation(session, parsed) {
    return ("Questa persona è Marco Zancanaro, il suo username github è " + parsed.database.membri.zancanaro.username_gitlab + ", il suo soprannome è " + parsed.database.membri.zancanaro.nickname + ", le sue specialità sono: " + parsed.database.membri.zancanaro.specialità[0] + ', ' + parsed.database.membri.zancanaro.specialità[1] + ', ' + parsed.database.membri.zancanaro.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.zancanaro.argomenti_da_imparare[0] + ', ' + parsed.database.membri.zancanaro.argomenti_da_imparare[1] + ', ' + parsed.database.membri.zancanaro.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.zancanaro.progetti_assegnati[0]);
}

function getFantinatoInformation(session, parsed) {
    return ("Questa persona è Filippo Fantinato, il suo username github è " + parsed.database.membri.fantinato.username_gitlab + ", il suo soprannome è " + parsed.database.membri.fantinato.nickname + ", le sue specialità sono: " + parsed.database.membri.fantinato.specialità[0] + ', ' + parsed.database.membri.fantinato.specialità[1] + ', ' + parsed.database.membri.fantinato.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.fantinato.argomenti_da_imparare[0] + ', ' + parsed.database.membri.fantinato.argomenti_da_imparare[1] + ', ' + parsed.database.membri.fantinato.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.fantinato.progetti_assegnati[0]);
}

function getChiarinInformation(session, parsed) {
    return ("Questa persona è Marco Chiarin, il suo username github è " + parsed.database.membri.chiarin.username_gitlab + ", il suo soprannome è " + parsed.database.membri.chiarin.nickname + ", le sue specialità sono: " + parsed.database.membri.chiarin.specialità[0] + ', ' + parsed.database.membri.chiarin.specialità[1] + ', ' + parsed.database.membri.chiarin.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.chiarin.argomenti_da_imparare[0] + ', ' + parsed.database.membri.chiarin.argomenti_da_imparare[1] + ', ' + parsed.database.membri.chiarin.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.chiarin.progetti_assegnati[0]);
}

function getGreggioInformation(session, parsed) {
    return ("Questa persona è Nicolò Greggio, il suo username github è " + parsed.database.membri.greggio.username_gitlab + ", il suo soprannome è " + parsed.database.membri.greggio.nickname + ", le sue specialità sono: " + parsed.database.membri.greggio.specialità[0] + ', ' + parsed.database.membri.greggio.specialità[1] + ', ' + parsed.database.membri.greggio.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.greggio.argomenti_da_imparare[0] + ', ' + parsed.database.membri.greggio.argomenti_da_imparare[1] + ', ' + parsed.database.membri.greggio.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.greggio.progetti_assegnati[0]);
}

function getQuintoInformation(session, parsed) {
    return ("Questa persona è Tommaso Quinto, il suo username github è " + parsed.database.membri.quinto.username_gitlab + ", il suo soprannome è " + parsed.database.membri.quinto.nickname + ", le sue specialità sono: " + parsed.database.membri.quinto.specialità[0] + ', ' + parsed.database.membri.quinto.specialità[1] + ', ' + parsed.database.membri.quinto.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.quinto.argomenti_da_imparare[0] + ', ' + parsed.database.membri.quinto.argomenti_da_imparare[1] + ', ' + parsed.database.membri.quinto.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.quinto.progetti_assegnati[0]);
}

function getNunzioInformation(session, parsed) {
    return ("Questa persona è Salvatore Nunzio Savà, il suo username github è " + parsed.database.membri.nunzio.username_gitlab + ", il suo soprannome è " + parsed.database.membri.nunzio.nickname + ", le sue specialità sono: " + parsed.database.membri.nunzio.specialità[0] + ', ' + parsed.database.membri.nunzio.specialità[1] + ', ' + parsed.database.membri.nunzio.specialità[2] + ", gli argomenti che deve imparare sono: " + parsed.database.membri.nunzio.argomenti_da_imparare[0] + ', ' + parsed.database.membri.nunzio.argomenti_da_imparare[1] + ', ' + parsed.database.membri.nunzio.argomenti_da_imparare[2] + ", i progetti a lui assegnati sono " + parsed.database.membri.nunzio.progetti_assegnati[0]);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiRole(session, parsed) {
    return ("Il ruolo di orfei è " + parsed.database.membri.orfei.ruolo);
}

function getLucchiRole(session, parsed) {
    return ("Il ruolo di lucchi è " + parsed.database.membri.lucchi.ruolo);
}

function getFantinatoRole(session, parsed) {
    return ("Il ruolo di fantinato è " + parsed.database.membri.fantinato.ruolo);
}

function getZancanaroRole(session, parsed) {
    return ("Il ruolo di zancanaro è " + parsed.database.membri.zancanaro.ruolo);
}

function getChiarinRole(session, parsed) {
    return ("Il ruolo di chiarin è " + parsed.database.membri.chiarin.ruolo);
}

function getQuintoRole(session, parsed) {
    return ("Il ruolo di quinto è " + parsed.database.membri.quinto.ruolo);
}

function getGreggioRole(session, parsed) {
    return ("Il ruolo di greggio è " + parsed.database.membri.greggio.ruolo);
}

function getNunzioRole(session, parsed) {
    return ("Il ruolo di nunzio è " + parsed.database.membri.nunzio.ruolo);
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiResponsability(session, parsed) {
    return ("Orfei gestisce l'AI e il cloud. Per ora si occupa di project Ziz");
}

function getLucchiResponsability(session, parsed) {
    return ("Lucchi gestisce i siti e la mixed reality. Per ora si occupa di project website, project chiron e project multiplatform UWP");
}

function getZancanaroResponsability(session, parsed) {
    return ("Zancanaro gestisce le applicazioni UWP. Per ora si occupa di project Volley");
}

function getFantinatoResponsability(session, parsed) {
    return ("Fantinato gestisce i programmi multipiattaforma. Per ora si occupa di project multiplatform electron");
}

function getChiarinResponsability(session, parsed) {
    return ("Chiarin lavora allo sviluppo di applicazioni UWP. Per ora sta lavorando al project multiplatform UWP");
}

function getGreggioResponsability(session, parsed) {
    return ("Greggio lavora allo sviluppo di programmi multipiattaforma. Per ora sta lavorando al project multiplatform electron");
}

function getQuintoResponsability(session, parsed) {
    return ("Quinto lavora allo sviluppo di programmi multipiattaforma. Per ora sta lavorando al project multiplatform electron");
}

function getNunzioResponsability(session, parsed) {
    return ("Nunzio lavora con l'AI e il cloud. Per ora lavora al project Ziz");
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiProjects(session, parsed) {

}