var builder = require('core');

var botbuilder = require('botbuilder');

var https = require('https');

var http = require('http');

var restify = require('restify');

var fs = require('fs');

var request = require('request');

var data = require('./database.json');

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

var bullshit = [];

for (var i = 0; i < data.database.Easter_Egg.length; i++) {
    bullshit[i] = data.database.Easter_Egg[i];
}

//------------------------------------------------------------------------------------------------------------------------------------------------

var bing_apiKey = 'b0c56d5c2b1044ddb217b3700b3c4587';

var luis_apiKey = 'a0df3941073f41ea9b5caae95c9c138b';

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/ccc72be9-e3f9-4935-8b69-8c67ac9dc956?subscription-key=a0df3941073f41ea9b5caae95c9c138b&verbose=true';

var clientId = 'test-app';

var recognize = new botbuilder.LuisRecognizer(model);

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
            var bot_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::bot');
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            var email = botbuilder.EntityRecognizer.findEntity(args.entities, 'email');
            /*switch (results.response) {
                case null:
                    session.beginDialog('NothingTemp');
                    break;
                case email:
                    session.beginDialog('AllMailTemp');
                    break;
                case total_people:
                    session.beginDialog('AllPeopleTemp');
                    break;
                case total_project:
                    session.beginDialog('TotalProjectTemp');
                    break;
                case current_project:
                    session.beginDialog('CurrentProjectTemp');
                    break;
                case bot_project:
                    var BotTemp = getBotInformation(session, data);
                    session.send(BotTemp);
                    break;
                case eden_tv_86:
                    var EdenTemp = getEdenInformation(session, data);
                    session.send(EdenTemp);
                    break;
                case chiron:
                    var ChironTemp = getChironInformation(session, data);
                    session.send(ChironTemp);
                    break;
                case website:
                    var WebTemp = getWebsiteInformation(session, data);
                    session.send(WebTemp);
                    break;
                case fast_ink:
                    var FastTemp = getFastInkInformation(session, data);
                    session.send(FastTemp);
                    break;
                case volley:
                    var VolleyTemp = getVolleyInformation(session, data);
                    session.send(VolleyTemp);
                    break;
                case electron:
                    var ElectronTemp = getElectronInformation(session, data);
                    session.send(ElectronTemp);
                    break;
                case uwp:
                    var UwpTemp = getUwpInformation(session, data);
                    session.send(UwpTemp);
                    break;
                case ziz:
                    var ZizTemp = getZizInformation(session, data);
                    session.send(ZizTemp);
                    break;
                case fantinato:
                    var FantinatoTemp = getFantinatoInformation(session, data);
                    session.send(FantinatoTemp);
                    break;
                case quinto:
                    var QuintoTemp = getQuintoInformation(session, data);
                    session.send(QuintoTemp);
                    break;
                case greggio:
                    var GreggioTemp = getGreggioInformation(session, data);
                    session.send(GreggioTemp);
                    break;
                case chiarin:
                    var ChiarinTemp = getChiarinInformation(session, data);
                    session.send(ChiarinTemp);
                    break;
                case zancanaro:
                    var ZancanaroTemp = getZancanaroInformation(session, data);
                    session.send(ZancanaroTemp);
                    break;
                case lucchi:
                    var LucchiTemp = getLucchiInformation(session, data);
                    session.send(LucchiTemp);
                    break;
                case orfei:
                    var OrfeiTemp = getOrfeiInformation(session, data);
                    session.send(OrfeiTemp);
                    break;
                case easter_egg:
                    session.beginDialog('Bullshit');
                    break;
                case find:
                    session.beginDialog('FindAllTemp');
                    break;
                case role:
                    session.beginDialog('AllRoleTemp');
                    break;
                case responsability:
                    session.beginDialog('AllResponsabilityTemp');
                    break;
                case team_perso:
                    session.beginDialog('TeamTemp');
                    break;
            }*/

            if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !ziz && !uwp && !electron && !volley && !fast_ink && !website && !bot_project && !current_project && !total_project && !total_people && !email && !nunzio) {
                session.beginDialog('NothingTemp');
            } else {
                if (email) {
                    session.beginDialog('AllMailTemp');
                } else {
                    if (total_people) {
                        session.beginDialog('AllPeopleTemp');
                    } else {
                        if (total_project) {
                            session.beginDialog('TotalProjectTemp');
                        } else {
                            if (current_project) {
                                session.beginDialog('CurrentProjectTemp');
                            } else {
                                if (bot_project) {
                                    var BotTemp = getBotInformation(session, data);
                                    session.send(BotTemp);
                                } else {
                                    if (website) {
                                        var WebTemp = getWebsiteInformation(session, data);
                                        session.send(WebTemp);
                                    } else {
                                        if (fast_ink) {
                                            var FastTemp = getFastInkInformation(session, data);
                                            session.send(FastTemp);
                                        } else {
                                            if (volley) {
                                                var VolleyTemp = getVolleyInformation(session, data);
                                                session.send(VolleyTemp);
                                            } else {
                                                if (electron) {
                                                    var ElectronTemp = getElectronInformation(session, data);
                                                    session.send(ElectronTemp);
                                                } else {
                                                    if (uwp) {
                                                        var UwpTemp = getUwpInformation(session, data);
                                                        session.send(UwpTemp);
                                                    } else {
                                                        if (ziz) {
                                                            var ZizTemp = getZizInformation(session, data);
                                                            session.send(ZizTemp);
                                                        } else {
                                                            if (fantinato) {
                                                                var FantinatoTemp = getFantinatoInformation(session, data);
                                                                session.send(FantinatoTemp);
                                                            } else {
                                                                if (quinto) {
                                                                    var QuintoTemp = getQuintoInformation(session, data);
                                                                    session.send(QuintoTemp);
                                                                } else {
                                                                    if (greggio) {
                                                                        var GreggioTemp = getGreggioInformation(session, data);
                                                                        session.send(GreggioTemp);
                                                                    } else {
                                                                        if (orfei) {
                                                                            var OrfeiTemp = getOrfeiInformation(session, data);
                                                                            session.send(OrfeiTemp);
                                                                        } else {
                                                                            if (lucchi) {
                                                                                var LucchiTemp = getLucchiInformation(session, data);
                                                                                session.send(LucchiTemp);
                                                                            } else {
                                                                                if (nunzio) {
                                                                                    var NunzioTemp = getNunzioInformation(session, data);
                                                                                    session.send(NunzioTemp);
                                                                                } else {
                                                                                    if (chiarin) {
                                                                                        var ChiarinTemp = getChiarinInformation(session, data);
                                                                                        session.send(ChiarinTemp);
                                                                                    } else {
                                                                                        if (zancanaro) {
                                                                                            var ZancanaroTemp = getZancanaroInformation(session, data);
                                                                                            session.send(ZancanaroTemp);
                                                                                        } else {
                                                                                            if (team_perso) {
                                                                                                session.beginDialog('TeamTemp');
                                                                                            } else {
                                                                                                if (responsability) {
                                                                                                    session.beginDialog('AllResponsabilityTemp');
                                                                                                } else {
                                                                                                    if (role) {
                                                                                                        session.beginDialog('AllRoleTemp');
                                                                                                    } else {
                                                                                                        if (find) {
                                                                                                            session.beginDialog('FindAllTemp');
                                                                                                        } else {
                                                                                                            if (easter_egg) {
                                                                                                                var BullshitTemp = getBullshit(session);
                                                                                                                session.send(BullshitTemp);
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
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ]));

server.post('/api/messages', connector.listen());

bot.dialog('NothingTemp', [
    function(session) {
        session.send("Scegli una delle opzioni");
        var nothingCards = CreateNothingCards();
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(nothingCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case dialogs[2]:
                session.beginDialog('TeamTemp');
                break;
            case dialogs[3]:
                session.beginDialog('AllPeopleTemp');
                break;
            case dialogs[4]:
                session.beginDialog('TotalProjectTemp');
                break;
            case dialogs[5]:
                session.beginDialog('CurrentProjectTemp');
                break;
        }
    }
])

/*bot.dialog('Nothing', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results)
        {
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
    .matches('None', [
        function(session, results, args) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)*/

bot.dialog('TeamTemp', [
    function(session) {
        session.send("Cosa vuoi sapere del team?");
        var teamCards = CreateTeamCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(teamCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case dialogs[3]:
                session.beginDialog('AllPeopleTemp');
                break;
            case dialogs[4]:
                session.beginDialog('TotalProjectTemp');
                break;
            case dialogs[5]:
                session.beginDialog('CurrentProjectTemp');
                break;
            case dialogs[6]:
                session.beginDialog('AllRoleTemp');
                break;
            case dialogs[7]:
                session.beginDialog('AllResponsabilityTemp');
                break;
            case "TeamInfo":
                var TeamTemp = getTeamInformation(session, data);
                session.send(TeamTemp);
                break;
        }
    }
])

bot.dialog('TotalProjectTemp', [
    function(session) {
        session.send("Cosa vuoi sapere sui progetti?");
        var totalProjectCards = CreateTotalProjectsCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(totalProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "UWPInfo":
                var UwpTemp = getUwpInformation(session, data);
                session.send(UwpTemp);
                session.beginDialog('Root');
                break;
            case "UWPGestione":
                var UwpGestioneTemp = getUwpGestione(session, data);
                session.send(getUwpGestione);
                session.beginDialog('Root');
                break;
            case "ElectronInfo":
                var ElectronTemp = getElectronInformation(session, data);
                session.send(ElectronTemp);
                session.beginDialog('Root');
                break;
            case "ElectronGestione":
                var ElectronGestioneTemp = getElectronGestione(session, data);
                session.send(getElectronGestione);
                session.beginDialog('Root');
                break;
            case "BotInfo":
                var BotTemp = getBotInformation(session, data);
                session.send(BotTemp);
                session.beginDialog('Root');
                break;
            case "BotGestione":
                var BotGestioneTemp = getBotGestione(session, data);
                session.send(getBotGestione);
                session.beginDialog('Root');
                break;
            case "ZizInfo":
                var ZizTemp = getZizInformation(session, data);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "ZizGestione":
                var ZizGestioneTemp = getZizGestione(session, data);
                session.send(getZizGestione);
                session.beginDialog('Root');
                break;
            case "VolleyInfo":
                var VolleyTemp = getVolleyInformation(session, data);
                session.send(VolleyTemp);
                session.beginDialog('Root');
                break;
            case "VolleyGestione":
                var VolleyGestioneTemp = getVolleyGestione(session, data);
                session.send(VolleyGestioneTemp);
                session.beginDialog('Root');
                break;
            case "FastInkInfo":
                var FastInkTemp = getFastInkInformation(session, data);
                session.send(FastInkTemp);
                session.beginDialog('Root');
                break;
            case "FastInkGestione":
                var FastInkGestioneTemp = getFastInkGestione(session, data);
                session.send(FastInkGestioneTemp);
                session.beginDialog('Root');
                break;
            case "WebInfo":
                var WebTemp = getWebsiteInformation(session, data);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "WebGestione":
                var WebGestioneTemp = getWebsiteGestione(session, data);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

/*bot.dialog('Team', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            
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
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)*/

bot.dialog('AllRoleTemp', [
    function(session) {
        session.send("Di chi vuoi sapere il ruolo?");
        var roleCards = CreateRoleCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(roleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case 'Orfei':
                var OrfeiRole = getOrfeiRole(session, data);
                session.send(OrfeiRole);
                session.beginDialog('Root');
                break;
            case 'Lucchi':
                var LucchiRole = getLucchiRole(session, data);
                session.send(LucchiRole);
                session.beginDialog('Root');
                break;
            case 'Zancanaro':
                var ZancanaroRole = getZancanaroRole(session, data);
                session.send(ZancanaroRole);
                session.beginDialog('Root');
                break;
            case 'Fantinato':
                var FantinatoRole = getFantinatoRole(session, data);
                session.send(FantinatoRole);
                session.beginDialog('Root');
                break;
            case 'Chiarin':
                var ChiarinRole = getChiarinRole(session, data);
                session.send(ChiarinRole);
                session.beginDialog('Root');
                break;
            case 'Quinto':
                var QuintoRole = getQuintoRole(session, data);
                session.send(QuintoRole);
                session.beginDialog('Root');
                break;
            case 'Greggio':
                var GreggioRole = getGreggioRole(session, data);
                session.send(GreggioRole);
                session.beginDialog('Root');
                break;
            case 'Nunzio':
                var NunzioRole = getNunzioRole(session, data);
                session.send(NunzioRole);
                session.beginDialog('Root');
                break;
        }
    }
])

/*bot.dialog('AllRole', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            
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
                    var FantinatoRole = getFantinatoRole(session, database);
                    session.send(FantinatoRole);
                } else {
                    if (!orfei && !lucchi && !zancanaro && !chiarin && !greggio && quinto && !fantinato && !nunzio) {
                        var QuintoRole = getQuintoRole(session, database);
                        session.send(QuintoRole);
                    } else {
                        if (!orfei && !lucchi && !zancanaro && !chiarin && greggio && !quinto && !fantinato && !nunzio) {
                            var GreggioRole = getGreggioRole(session, database);
                            session.send(GreggioRole);
                        } else {
                            if (!orfei && !lucchi && !zancanaro && chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                var ChiarinRole = getChiarinRole(session, database);
                                session.send(ChiarinRole);
                            } else {
                                if (!orfei && !lucchi && zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                    var ZancanaroRole = getZancanaroRole(session, database);
                                    session.send(ZancanaroRole);
                                } else {
                                    if (!orfei && lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                        var LucchiRole = getLucchiRole(session, database);
                                        session.send(LucchiRole);
                                    } else {
                                        if (orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                            var OrfeiRole = getOrfeiRole(session, database);
                                            session.send(OrfeiRole);
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
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)*/

bot.dialog('AllPeopleTemp', [
    function(session) {
        session.send("Queste sono le persone appartenenti al team perso. Vuoi sapere altro?")
        var PeopleCards = CreatePeopleCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(PeopleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "OrfeiRuolo":
                var OrfeiRuolo = getOrfeiRole(session, data);
                session.send(OrfeiRuolo);
                session.beginDialog('Root');
                break;
            case "OrfeiInfo":
                var OrfeiInformazioni = getOrfeiInformation(session, data);
                session.send(OrfeiInformazioni);
                session.beginDialog('Root');
                break;
            case "OrfeiResponsabilità":
                var OrfeiRes = getOrfeiResponsability(session, data);
                session.send(OrfeiRes);
                session.beginDialog('Root');
                break;
            case "OrfeiProgetti":
                var OrfeiProject = getOrfeiProjects(session, data);
                session.send(OrfeiProject);
                session.beginDialog('Root');
                break;
            case "OrfeiMail":
                var OrfeiMail = getOrfeiMail(session, data);
                session.send(OrfeiMail);
                break;
            case "LucchiRuolo":
                var LucchiRuolo = getLucchiRole(session, data);
                session.send(LucchiRuolo);
                session.beginDialog('Root');
                break;
            case "LucchiInfo":
                var LucchiInformazioni = getLucchiInformation(session, data);
                session.send(LucchiInformazioni);
                session.beginDialog('Root');
                break;
            case "LucchiResponsabilità":
                var LucchiRes = getLucchiResponsability(session, data);
                session.send(LucchiRes);
                session.beginDialog('Root');
                break;
            case "LucchiProgetti":
                var LucchiProjects = getLucchiProjects(session, data);
                session.send(LucchiProjects);
                session.beginDialog('Root');
                break;
            case "LucchiMail":
                var LucchiMail = getLucchiMail(session, data);
                session.send(LucchiMail);
                break;
            case "ZancanaroRuolo":
                var ZancanaroRuolo = getZancanaroRole(session, data);
                session.send(ZancanaroRuolo);
                session.beginDialog('Root');
                break;
            case "ZancanaroInfo":
                var ZancanaroInformazioni = getZancanaroInformation(session, data);
                session.send(ZancanaroInformazioni);
                session.beginDialog('Root');
                break;
            case "ZancanaroResponsabilità":
                var ZancanaroRes = getZancanaroResponsability(session, data);
                session.send(ZancanaroRes);
                session.beginDialog('Root');
                break;
            case "ZancanaroProgetti":
                var ZancanaroProjects = getZancanaroProjects(session, data);
                session.send(ZancanaroProjects);
                session.beginDialog('Root');
                break;
            case "ZancanaroMail":
                var ZancanaroMail = getZancanaroMail(session, data);
                session.send(ZancanaroMail);
                break;
            case "FantinatoRuolo":
                var FantinatoRuolo = getFantinatoRole(session, data);
                session.send(FantinatoRuolo);
                session.beginDialog('Root');
                break;
            case "FantinatoInfo":
                var FantinatoInformazioni = getFantinatoInformation(session, data);
                session.send(FantinatoInformazioni);
                session.beginDialog('Root');
                break;
            case "FantinatoResponsabilità":
                var FantinatoRes = getFantinatoResponsability(session, data);
                session.send(FantinatoRes);
                session.beginDialog('Root');
                break;
            case "FantinatoProgetti":
                var FantinatoProjects = getFantinatoProjects(session, data);
                session.send(FantinatoProjects);
                session.beginDialog('Root');
                break;
            case "FantinatoMail":
                var FantinatoMail = getFantinatoMail(session, data);
                session.send(FantinatoMail);
                break;
            case "ChiarinRuolo":
                var ChiarinRuolo = getChiarinRole(session, data);
                session.send(ChiarinRuolo);
                session.beginDialog('Root');
                break;
            case "ChiarinInfo":
                var ChiarinInformazioni = getChiarinInformation(session, data);
                session.send(ChiarinInformazioni);
                session.beginDialog('Root');
                break;
            case "ChiarinResponsabilità":
                var ChiarinRes = getChiarinResponsability(session, data);
                session.send(ChiarinRes);
                session.beginDialog('Root');
                break;
            case "ChiarinProgetti":
                var ChiarinProjects = getChiarinProjects(session, data);
                session.send(ChiarinProjects);
                session.beginDialog('Root');
                break;
            case "ChiarinMail":
                var ChiarinMail = getChiarinMail(session, data);
                session.send(ChiarinMail);
                break;
            case "GreggioRuolo":
                var GreggioRuolo = getGreggioRole(session, data);
                session.send(GreggioRuolo);
                session.beginDialog('Root');
                break;
            case "GreggioInfo":
                var GreggioInformazioni = getGreggioInformation(session, data);
                session.send(GreggioInformazioni);
                session.beginDialog('Root');
                break;
            case "GreggioResponsabilità":
                var GreggioRes = getGreggioResponsability(session, data);
                session.send(GreggioRes);
                session.beginDialog('Root');
                break;
            case "GreggioProgetti":
                var GreggioProjects = getGreggioProjects(session, data);
                session.send(GreggioProjects);
                session.beginDialog('Root');
                break;
            case "GreggioMail":
                var GreggioMail = getGreggioMail(session, data);
                session.send(GreggioMail);
                break;
            case "QuintoRuolo":
                var QuintoRuolo = getQuintoRole(session, data);
                session.send(QuintoRuolo);
                session.beginDialog('Root');
                break;
            case "QuintoInfo":
                var QuintoInformazioni = getQuintoInformation(session, data);
                session.send(QuintoInformazioni);
                session.beginDialog('Root');
                break;
            case "QuintoResponsabilità":
                var QuintoRes = getQuintoResponsability(session, data);
                session.send(QuintoRes);
                session.beginDialog('Root');
                break;
            case "QuintoProgetti":
                var QuintoProjects = getQuintoProjects(session, data);
                session.send(QuintoProjects);
                session.beginDialog('Root');
                break;
            case "QuintoMail":
                var QuintoMail = getQuintoMail(session, data);
                session.send(QuintoMail);
                break;
            case "NunzioRuolo":
                var NunzioRuolo = getNunzioRole(session, data);
                session.send(NunzioRuolo);
                session.beginDialog('Root');
                break;
            case "NunzioInfo":
                var NunzioInformazioni = getNunzioInformation(session, data);
                session.send(NunzioInformazioni);
                session.beginDialog('Root');
                break;
            case "NunzioResponsabilità":
                var QuintoRes = getNunzioResponsability(session, data);
                session.send(NunzioRes);
                session.beginDialog('Root');
                break;
            case "NunzioProgetti":
                var NunzioProjects = getNunzioProjects(session, data);
                session.send(NunzioProjects);
                session.beginDialog('Root');
                break;
            case "NunzioMail":
                var NunzioMail = getNunzioMail(session, data);
                session.send(NunzioMail);
                break;
        }
    }
])

/*bot.dialog('AllPeople', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
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
                    var NunzioTemp = getNunzioInformation(session, database);
                    session.send(NunzioTemp);
                } else {
                    if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && fantinato && !nunzio) {
                        var FantinatoTemp = getFantinatoInformation(session, database);
                        session.send(FantinatoTemp);
                    } else {
                        if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && quinto && !fantinato && !nunzio) {
                            var QuintoTemp = getQuintoInformation(session, database);
                            session.send(QuintoTemp);
                        } else {
                            if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && greggio && !quinto && !fantinato && !nunzio) {
                                var GreggioTemp = getGreggioInformation(session, database);
                                session.send(GreggioTemp);
                            } else {
                                if (!role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                    var ChiarinTemp = getChiarinInformation(session, database);
                                    session.send(ChiarinTemp);
                                } else {
                                    if (!role && !responsability && !total_project && !orfei && !lucchi && zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                        var ZancanaroTemp = getZancanaroInformation(session, database);
                                        session.send(ZancanaroTemp);
                                    } else {
                                        if (!role && !responsability && !total_project && !orfei && lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                            var LucchiTemp = getLucchiInformation(session, database);
                                            session.send(LucchiTemp);
                                        } else {
                                            if (!role && !responsability && !total_project && orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                var OrfeiTemp = getOrfeiInformation(session, database);
                                                session.send(OrfeiTemp);
                                            } else {
                                                if (!role && !responsability && total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                    var TotalProjectTemp = getTotalProjectInformation(session, database);
                                                    session.send(TotalProjectTemp);
                                                } else {
                                                    if (!role && responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                        var ResponsabilityTemp = getAllResponsabilityInformation(session, database);
                                                        session.send(ResponsabilityTemp);
                                                    } else {
                                                        if (role && !responsability && !total_project && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !nunzio) {
                                                            var RoleTemp = getAllRoleInformation(session, database);
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
        }
    ])
    .matches('None', [
        function(session, args, results) {
            session.send("wrong action");
            session.beginDialog('Root');
        }
    ]))
    */

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

bot.dialog('CurrentProjectTemp', [
    function(session) {
        session.send("Questi sono i progetti correnti");
        var CurrentProjectCards = CreateCurrentProjectCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(CurrentProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "UWPInfo":
                var UwpTemp = getUwpInformation(session, data);
                session.send(UwpTemp);
                session.beginDialog('Root');
                break;
            case "UWPGestione":
                var UwpGestioneTemp = getUwpGestione(session, data);
                session.send(getUwpGestione);
                session.beginDialog('Root');
                break;
            case "ElectronInfo":
                var ElectronTemp = getElectronInformation(session, data);
                session.send(ElectronTemp);
                session.beginDialog('Root');
                break;
            case "ElectronGestione":
                var ElectronGestioneTemp = getElectronGestione(session, data);
                session.send(getElectronGestione);
                session.beginDialog('Root');
                break;
            case "ZizInfo":
                var ZizTemp = getZizInformation(session, data);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "ZizGestione":
                var ZizGestioneTemp = getZizGestione(session, data);
                session.send(getZizGestione);
                session.beginDialog('Root');
                break;
            case "WebInfo":
                var WebTemp = getWebsiteInformation(session, data);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "WebGestione":
                var WebGestioneTemp = getWebsiteGestione(session, data);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('AllMailTemp', [
    function(session) {
        session.send("Di chi vuoi sapere la mail?");
        var MailCards = CreateMailCards(session);
        var reply = botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(MailCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "Orfei":
                var OrfeiMail = getOrfeiMail(session, data);
                session.send(OrfeiMail);
                break;
            case "Lucchi":
                var LucchiMail = getLucchiMail(session, data);
                session.send(LucchiMail);
                break;
            case "Fantinato":
                var FantinatoMail = getFantinatoMail(session, data);
                session.send(FantinatoMail);
                break;
            case "Zancanaro":
                var ZancanaroMail = getZancanaroMail(session, data);
                session.send(ZancanaroMail);
                break;
            case "Greggio":
                var GreggioMail = getGreggioMail(session, data);
                session.send(GreggioMail);
                break;
            case "Chiarin":
                var ChiarinMail = getChiarinMail(session, data);
                session.send(ChiarinMail);
                break;
            case "Quinto":
                var QuintoMail = getQuintoMail(session, data);
                session.send(QuintoMail);
                break;
            case "Nunzio":
                var NunzioMail = getNunzioMail(session, data);
                session.send(NunzioMail);
                break;
        }
    }
])

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
            botbuilder.CardAction.imBack(session, dialogs[3], 'Persone')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[4], 'Progetti totali')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[5], 'Progetti correnti')
        ]),

        new builder.HeroCard(session)
        .title('Team Perso')
        .text('Informazioni sul team')
        .images([
            builder.CardImage.create(session, 'http://www.elia-group.com/images/team1.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[2], 'Team')
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
            botbuilder.CardAction.imBack(session, dialogs[3], 'Membri')
        ]),

        new botbuilder.HeroCard(session)
        .title('Ruoli')
        .text('Informazioni sui ruoli')
        .images([
            botbuilder.CardImage.create(session, 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[6], 'Ruoli')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[4], 'Progetti Totali')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[5], 'Progetti Correnti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Responsabilità')
        .text('Responsabilità dei membri del team')
        .images([
            botbuilder.CardImage.create(session, 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, dialogs[7], 'Responsabilità')
        ]),

        new botbuilder.HeroCard(session)
        .title('Info')
        .text('Info sul Team Perso')
        .buttons([
            botbuilder.CardAction.imBack(session, "TeamInfo", 'Info')
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
            botbuilder.CardAction.imBack(session, 'OrfeiInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'OrfeiRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'OrfeiResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'OrfeiProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'OrfeiMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su Lucchi')
        .buttons([
            botbuilder.CardAction.imBack(session, 'LucchiInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'LucchiRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'LucchiResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'LucchiProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'LucchiMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su Fantinato')
        .buttons([
            botbuilder.CardAction.imBack(session, 'FantinatoInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'FantinatoRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'FantinatoResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'FantinatoProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'FantinatoMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su Zancanaro')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ZancanaroInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ZancanaroRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'ZancanaroResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'ZancanaroProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'ZancanaroMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su Greggio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'GreggioInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'GreggioRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'GreggioResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'GreggioProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'GreggioMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su Quinto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'QuintoInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'QuintoRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'QuintoResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'QuintoProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'QuintoMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su Chiarin')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ChiarinInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ChiarinRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'ChiarinResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'ChiarinProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'ChiarinMail', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su Nunzio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'NunzioInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'NunzioRuolo', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'NunzioResponsabilità', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'NunzioProgetti', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'NunzioMail', 'Mail')
        ])
    ]
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

function CreateTotalProjectsCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Multiplatform UWP')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'UWPInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'UWPGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Multiplatform Electron')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ElectronInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ElectronGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Project Ziz')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ZizInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ZizGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Bot')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'BotInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'BotGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fast Ink')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'FastInkInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'FastInkGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Volley')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'VolleyInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'VolleyGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Website')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'WebInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'WebGestione', 'Gestione')
        ])
    ]
}

//------------------------------------------------------------------------------------------------------------------------------------------------

function CreateCurrentProjectCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Multiplatform UWP')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'UWPInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'UWPGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Multiplatform Electron')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ElectronInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ElectronGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Project Ziz')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'ZizInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'ZizGestione', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Website')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'WebInfo', 'Info'),
            botbuilder.CardAction.imBack(session, 'WebGestione', 'Gestione')
        ])
    ]
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function CreateMailCards(session) {
    return [
        new botbuilder.HeroCard(session)
        .title('Orfei')
        .text('Informazioni su Orfei')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Orfei', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su Lucchi')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Lucchi', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su Fantinato')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Fantinato', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su Zancanaro')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Zancanaro', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su Greggio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Greggio', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su Quinto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Quinto', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su Chiarin')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Chiarin', 'Email')
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su Nunzio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'Nunzio', 'Email')
        ])
    ]
}


//--------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.orfei.specialita.length; i++) {
        spec += parsed.database.membri.orfei.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.orfei.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.orfei.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.orfei.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.orfei.progetti_assegnati[i];
    }
    return ("Questa persona è Samuele Orfei, il suo username github è " + parsed.database.membri.orfei.username_github + ", il suo soprannome è " + parsed.database.membri.orfei.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getLucchiInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.lucchi.specialita.length; i++) {
        spec += parsed.database.membri.lucchi.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.lucchi.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.lucchi.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.lucchi.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.lucchi.progetti_assegnati[i];
    }
    return ("Questa persona è Manuele Lucchi, il suo username github è " + parsed.database.membri.lucchi.username_github + ", il suo soprannome è " + parsed.database.membri.lucchi.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getZancanaroInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.zancanaro.specialita.length; i++) {
        spec += parsed.database.membri.zancanaro.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.zancanaro.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.zancanaro.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.zancanaro.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.zancanaro.progetti_assegnati[i];
    }
    return ("Questa persona è Marco Zancanaro, il suo username github è " + parsed.database.membri.zancanaro.username_github + ", il suo soprannome è " + parsed.database.membri.zancanaro.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getFantinatoInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.fantinato.specialita.length; i++) {
        spec += parsed.database.membri.fantinato.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.fantinato.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.fantinato.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.fantinato.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.fantinato.progetti_assegnati[i];
    }
    return ("Questa persona è Filippo Fantinato, il suo username github è " + parsed.database.membri.fantinato.username_github + ", il suo soprannome è " + parsed.database.membri.fantinato.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getChiarinInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.chiarin.specialita.length; i++) {
        spec += parsed.database.membri.chiarin.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.chiarin.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.chiarin.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.chiarin.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.chiarin.progetti_assegnati[i];
    }
    return ("Questa persona è Marco Chiarin, il suo username github è " + parsed.database.membri.chiarin.username_github + ", il suo soprannome è " + parsed.database.membri.chiarin.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getGreggioInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.greggio.specialita.length; i++) {
        spec += parsed.database.membri.greggio.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.greggio.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.greggio.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.greggio.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.greggio.progetti_assegnati[i];
    }
    return ("Questa persona è Nicolò Greggio, il suo username github è " + parsed.database.membri.greggio.username_github + ", il suo soprannome è " + parsed.database.membri.greggio.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getQuintoInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.quinto.specialita.length; i++) {
        spec += parsed.database.membri.quinto.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.quinto.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.quinto.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.quinto.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.quinto.progetti_assegnati[i];
    }
    return ("Questa persona è Tommaso Quinto, il suo username github è " + parsed.database.membri.quinto.username_github + ", il suo soprannome è " + parsed.database.membri.quinto.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
}

function getNunzioInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var imparare = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.nunzio.specialita.length; i++) {
        spec += parsed.database.membri.nunzio.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.nunzio.argomenti_da_imparare.length; i++) {
        imparare += parsed.database.membri.nunzio.argomenti_da_imparare[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.nunzio.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.nunzio.progetti_assegnati[i];
    }
    return ("Questa persona è Salvatore Nunzio Savà, il suo username github è " + parsed.database.membri.nunzio.username_github + ", il suo soprannome è " + parsed.database.membri.nunzio.nickname + ", le sue specialità sono: " + spec + ", gli argomenti che deve imparare sono: " + imparare + ", i progetti a lui assegnati sono " + assegnati);
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
    return ("Orfei per ora si occupa di project Ziz");
}

function getLucchiResponsability(session, parsed) {
    return ("Lucchi per ora si occupa di project website, project chiron e project multiplatform UWP");
}

function getZancanaroResponsability(session, parsed) {
    return ("Zancanaro per ora si occupa di project Volley");
}

function getFantinatoResponsability(session, parsed) {
    return ("Fantinato per ora si occupa di project multiplatform electron");
}

function getChiarinResponsability(session, parsed) {
    return ("Chiarin per ora sta lavorando al project multiplatform UWP");
}

function getGreggioResponsability(session, parsed) {
    return ("Greggio per ora sta lavorando al project multiplatform electron");
}

function getQuintoResponsability(session, parsed) {
    return ("Quinto per ora sta lavorando al project multiplatform electron");
}

function getNunzioResponsability(session, parsed) {
    return ("Nunzio per ora lavora al project Ziz");
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

function getZizInformation(session, parsed) {
    return ("Project Ziz è un progetto di tipo " + parsed.database.progetti.project_ziz.tipo_progetto + ". E' un " + parsed.database.progetti.project_ziz.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_ziz.capo_progetto + ". La gestione è " + parsed.database.progetti.project_ziz.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_ziz.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_ziz.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_ziz.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_ziz.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_ziz.membri);
}

function getUwpInformation(session, parsed) {
    return ("Project Multiplatform UWP è un progetto di tipo " + parsed.database.progetti.project_multi_platform_uwp.tipo_progetto + ". E' un " + parsed.database.progetti.project_multi_platform_uwp.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_multi_platform_uwp.capo_progetto + ". La gestione è " + parsed.database.progetti.project_multi_platform_uwp.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_multi_platform_uwp.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_multi_platform_uwp.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_multi_platform_uwp.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_multi_platform_uwp.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_multi_platform_uwp.membri);
}

function getElectronInformation(session, parsed) {
    return ("Project Multiplatform Electron è un progetto di tipo " + parsed.database.progetti.project_multi_platform_electron.tipo_progetto + ". E' un " + parsed.database.progetti.project_multi_platform_electron.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_multi_platform_electron.capo_progetto + ". La gestione è " + parsed.database.progetti.project_multi_platform_electron.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_multi_platform_electron.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_multi_platform_electron.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_multi_platform_electron.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_multi_platform_electron.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_multi_platform_electron.membri);
}

function getVolleyInformation(session, parsed) {
    return ("Project Volley è un progetto di tipo " + parsed.database.progetti.project_volley.tipo_progetto + ". E' un " + parsed.database.progetti.project_volley.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_volley.capo_progetto + ". La gestione è " + parsed.database.progetti.project_volley.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_volley.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_volley.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_volley.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_volley.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_volley.membri);
}

function getFastInkInformation(session, parsed) {
    return ("Fast Ink è un progetto di tipo " + parsed.database.progetti.fast_ink.tipo_progetto + ". E' un " + parsed.database.progetti.fast_ink.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.fast_ink.capo_progetto + ". La gestione è " + parsed.database.progetti.fast_ink.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.fast_ink.link_repo + ". E' stato cominciato a " + parsed.database.progetti.fast_ink.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.fast_ink.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.fast_ink.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.fast_ink.membri);
}

function getWebsiteInformation(session, parsed) {
    return ("Project Website è un progetto di tipo " + parsed.database.progetti.project_website.tipo_progetto + ". E' un " + parsed.database.progetti.project_website.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_website.capo_progetto + ". La gestione è " + parsed.database.progetti.project_website.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_website.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_website.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_website.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_website.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_website.membri);
}

function getBotInformation(session, parsed) {
    return ("Project Ziz è un progetto di tipo " + parsed.database.progetti.project_bot.tipo_progetto + ". E' un " + parsed.database.progetti.project_bot.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_bot.capo_progetto + ". La gestione è " + parsed.database.progetti.project_bot.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_bot.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_bot.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_bot.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_bot.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_bot.membri);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiProjects(session, parsed) {
    return ("I progetti fatti da orfei sono: project Ziz");
}

function getLucchiProjects(session, parsed) {
    return ("I progetti fatti da lucchi sono: multiplatform UWP, Website");
}

function getFantinatoProjects(session, parsed) {
    return ("I progetti fatti da fantinato sono: multiplatform Electron");
}

function getZancanaroProjects(session, parsed) {
    return ("I progetti fatti da Zancanaro sono: Volley");
}

function getChiarinProjects(session, parsed) {
    return ("I progetti fatti da Chiarin sono: multiplatform UWP");
}

function getGreggioProjects(session, parsed) {
    return ("I progetti fatti da Greggio sono: multiplatform Electron");
}

function getQuintoProjects(session, parsed) {
    return ("I progetti fatti da Quinto sono: multiplatform Electron");
}

function getNunzioProjects(session, parsed) {
    return ("I progetti fatti da lucchi sono: project Ziz");
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function getTeamInformation(session, parsed) {
    var membri = '';
    var progetti = '';
    for (var i = 0; i < parsed.database.team_generale.lista_membri.length; i++) {
        membri += parsed.database.team_generale.lista_membri[i] + ', ';
    }
    for (var i = 0; i < parsed.database.progetti_generale.lista_progetti.length; i++) {
        progetti += parsed.database.progetti_generale.lista_progetti[i] + ', ';
    }
    return ("Questo è il team perso. E' composto da " + parsed.database.team_generale.numero_membri + ", che sono " + membri + ". Il numero di progetti totali per ora è di " + parsed.database.progetti_generale.numero_progetti_totale + ", quelli attivi sono " + parsed.database.progetti_generale.numero_progetti_attivi + ". I progetti sono " + progetti + ". Per maggiori Informazioni visitare il sito " + parsed.database.team_generale.link_sito);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------

function getBullshit(session) {
    return (parseInt(Math.random(bullshit)));
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiMail(session, parsed) {
    return ("L'email di orfei è " + parsed.database.membri.orfei.mail);
}

function getLucchiMail(session, parsed) {
    return ("L'email di lucchi è " + parsed.database.membri.lucchi.mail);
}

function getFantinatoMail(session, parsed) {
    return ("L'email di fantinato è " + parsed.database.membri.fantinato.mail);
}

function getZancanaroMail(session, parsed) {
    return ("L'email di zancanaro è " + parsed.database.membri.zancanaro.mail);
}

function getGreggioMail(session, parsed) {
    return ("L'email di greggio è " + parsed.database.membri.greggio.mail);
}

function getChiarinMail(session, parsed) {
    return ("L'email di chiarin è " + parsed.database.membri.chiarin.mail);
}

function getQuintoMail(session, parsed) {
    return ("L'email di quinto è " + parsed.database.membri.quinto.mail);
}

function getNunzioMail(session, parsed) {
    return ("L'email di nunzio è " + parsed.database.membri.nunzio.mail);
}