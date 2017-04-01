var botbuilder = require('../Node.js/node_modules/botbuilder');

var restify = require('../Node.js/node_modules/restify');

var async = require('../Node.js/node_modules/async');

var easterEgg = require('../Database - New/EasterEgg.json');

var works = require('../Database - New/Projects');

var persone = require('../Database - New/Members');

var roadMap = require('../Database - New/RoadMap');

var books = require('../Database - New/Books');

var contacts = require('../Database - New/Contacts');

var general = require('../Database - New/General');

var ideas = require('../Database - New/Ideas');

var rules = require('../Database - New/Rules');

var JsonModifier = require('../RELU-Core/Core/Config/RELU-JSONManager');

var HerocardCreator = require('../RELU-Core/Core/Card/RELU-HeroCard');

var setupEntities = require('../RELU-Core/Core/LUIS/RELU-LUISEntities');

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

var bullshit = [];

for (var i = 0; i < easterEgg.easter_egg.length; i++) {
    bullshit[i] = easterEgg.easter_egg[i];
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
            var team_perso, responsability, role, find, easter_egg, orfei, lucchi, zancanaro, chiarin, greggio, quinto, fantinato, nunzio, ziz, fast_ink, website, RELU, utilities, parse, current_project, total_project, total_people, email;
            var entities = [team_perso, responsability, role, find, easter_egg, orfei, lucchi, zancanaro, chiarin, greggio, quinto, fantinato, nunzio, ziz, fast_ink, website, RELU, utilities, parse, current_project, total_project, total_people, email];
            var built = ['Team_Perso', 'Responsibility', 'role', 'find', 'easter_egg', 'people::orfei', 'people::lucchi', 'people::zancanaro', 'people::chiarin', 'people::greggio', 'people::quinto', 'people::fantinato', 'people::nunzio', 'project::ziz', 'project::fast ink', 'project::website', 'project::Relu', 'project::utilities', 'project::parse', 'current_project', 'total_project', 'people', 'email'];
            var BuiltEntities = setupEntities.EntitySetup(23, entities, built, session, args);

            /*if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !ziz && !parse && !volley && !fast_ink && !website && !TPBMC && !current_project && !total_project && !total_people && !email && !nunzio && !utilities && !deaf) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('NothingTemp');
                    },
                    function(callback) {
                        session.beginDialog('Nothing');
                    }
                ], function(error, results) {
                    session.send("Error");
                });
            }
            if (email) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllMailTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllMail');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (total_people) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllPeople');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (total_project) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('TotalProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (current_project) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('CurrentProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (team_perso) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TeamTemp');
                    },
                    function(callback) {
                        session.beginDialog('Team')
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (responsability) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllResponsabilityTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllResponsability');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (role) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllRoleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllRole');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (find) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('FindAllTemp');
                    },
                    function(callback) {
                        session.beginDialog('FindAll');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (TPBMC) {
                var TPBMCTemp = getTPBMCInformation(session, works);
                session.send(TPBMCTemp);
            }
            if (website) {
                var WebTemp = getWebsiteInformation(session, works);
                session.send(WebTemp);
            }
            if (fast_ink) {
                var FastTemp = getFastInkInformation(session, works);
                session.send(FastTemp);
            }
            if (volley) {
                var VolleyTemp = getVolleyInformation(session, works);
                session.send(VolleyTemp);
            }
            if (parse) {
                var ParseTemp = getParseInformation(session, works);
                session.send(ParseTemp);
            }
            if (deaf) {
                var DeafTemp = getDeafInformation(session, works);
                session.send(DeafTemp);
            }
            if (utilities) {
                var UtilitiesTemp = getUtilitiesInformation(session, works);
                session.send(UtilitiesTemp);
            }
            if (ziz) {
                var ZizTemp = getZizInformation(session, works);
                session.send(ZizTemp);
            }
            if (fantinato) {
                var FantinatoTemp = getFantinatoInformation(session, persone);
                session.send(FantinatoTemp);
            }
            if (quinto) {
                var QuintoTemp = getQuintoInformation(session, persone);
                session.send(QuintoTemp);
            }
            if (greggio) {
                var GreggioTemp = getGreggioInformation(session, persone);
                session.send(GreggioTemp);
            }
            if (orfei) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                session.send(OrfeiTemp);
            }
            if (lucchi) {
                var LucchiTemp = getLucchiInformation(session, persone);
                session.send(LucchiTemp);
            }
            if (nunzio) {
                var NunzioTemp = getNunzioInformation(session, persone);
                session.send(NunzioTemp);
            }
            if (chiarin) {
                var ChiarinTemp = getChiarinInformation(session, persone);
                session.send(ChiarinTemp);
            }
            if (zancanaro) {
                var ZancanaroTemp = getZancanaroInformation(session, persone);
                session.send(ZancanaroTemp);
            }
            if (easter_egg) {
                var BullshitTemp = getBullshit(session);
                session.send(BullshitTemp);
            }
            if (nunzio && role) {
                var NunzioRole = getNunzioRole(session, persone);
                session.send(NunzioRole);
            }
            if (fantinato && role) {
                var FantinatoRole = getFantinatoRole(session, persone);
                session.send(FantinatoRole);
            }
            if (quinto && role) {
                var QuintoRole = getQuintoRole(session, persone);
                session.send(QuintoRole);
            }
            if (greggio && role) {
                var GreggioRole = getGreggioRole(session, persone);
                session.send(GreggioRole);
            }
            if (chiarin && role) {
                var ChiarinRole = getChiarinRole(session, persone);
                session.send(ChiarinRole);
            }
            if (zancanaro && role) {
                var ZancanaroRole = getZancanaroRole(session, persone);
                session.send(ZancanaroRole);
            }
            if (lucchi && role) {
                var LucchiRole = getLucchiRole(session, persone);
                session.send(LucchiRole);
            }
            if (orfei && role) {
                var OrfeiRole = getOrfeiRole(session, persone);
                session.send(OrfeiRole);
            }
            if (nunzio && responsability) {
                var NunzioRes = getNunzioResponsability(session, persone);
                session.send(NunzioRes);
            }
            if (fantinato && responsability) {
                var FantinatoRes = getFantinatoResponsability(session, persone);
                session.send(FantinatoRes);
            }
            if (quinto && responsability) {
                var QuintoRes = getQuintoResponsability(session, persone);
                session.send(QuintoRes);
            }
            if (greggio && responsability) {
                var GreggioRes = getGreggioResponsability(session, persone);
                session.send(GreggioRes);
            }
            if (chiarin && responsability) {
                var ChiarinRes = getChiarinResponsability(session, persone);
                session.send(ChiarinRes);
            }
            if (zancanaro && responsability) {
                var ZancanaroRes = getZancanaroResponsability(session, persone);
                session.send(ZancanaroRes);
            }
            if (lucchi && responsability) {
                var LucchiRes = getLucchiResponsability(session, persone);
                session.send(LucchiRes);
            }
            if (orfei && responsability) {
                var OrfeiRes = getOrfeiResponsability(session, persone);
                session.send(OrfeiRes);
            }
            if (nunzio && mail) {
                var NunzioMail = getNunzioMail(session, persone);
                session.send(NunzioMail);
            }
            if (fantinato && mail) {
                var FantinatoMail = getFantinatoMail(session, persone);
                session.send(FantinatoMail);
            }
            if (quinto && mail) {
                var QuintoMail = getQuintoMail(session, persone);
                session.send(QuintoMail);
            }
            if (greggio && mail) {
                var GreggioMail = getGreggioMail(session, persone);
                session.send(GreggioMail);
            }
            if (chiarin && mail) {
                var ChiarinMail = getChiarinMail(session, persone);
                session.send(ChiarinMail);
            }
            if (zancanaro && mail) {
                var ZancanaroMail = getZancanaroMail(session, persone);
                session.send(ZancanaroMail);
            }
            if (lucchi && mail) {
                var LucchiMail = getLucchiMail(session, persone);
                session.send(LucchiMail);
            }
            if (orfei && mail) {
                var OrfeiMail = getOrfeiMail(session, persone);
                session.send(OrfeiMail);
            }
            if (nunzio && total_project) {
                var NunzioProjects = getNunzioProjects(session, persone, works);
                session.send(NunzioProjects);
            }
            if (fantinato && total_project) {
                var FantinatoProjects = getFantinatoProjects(session, persone, works);
                session.send(FantinatoProjects);
            }
            if (quinto && total_project) {
                var QuintoProjects = getQuintoProjects(session, persone, works);
                session.send(QuintoProjects);
            }
            if (greggio && total_project) {
                var GreggioProjects = getGreggioProjects(session, persone, works);
                session.send(GreggioProjects);
            }
            if (chiarin && total_project) {
                var ChiarinProjects = getChiarinProjects(session, persone, works);
                session.send(ChiarinProjects);
            }
            if (zancanaro && total_project) {
                var ZancanaroProjects = getZancanaroProjects(session, persone, works);
                session.send(ZancanaroProjects);
            }
            if (lucchi && total_project) {
                var LucchiProjects = getLucchiProjects(session, persone, works);
                session.send(LucchiProjects);
            }
            if (orfei && total_project) {
                var OrfeiProject = getOrfeiProjects(session, persone, works);
                session.send(OrfeiProject);
            }
            if (ziz && responsability) {
                var ZizGestioneTemp = getZizGestione(session, persone, works);
                session.send(ZizGestioneTemp);
            }
            if (parse && responsability) {
                var ParseGestioneTemp = getElectronGestione(session, persone, works);
                session.send(ParseGestioneTemp);
            }
            if (website && responsability) {
                var WebGestioneTemp = getWebsiteGestione(session, persone, works);
                session.send(WebGestioneTemp);
            }
            if (volley && responsability) {
                var VolleyGestioneTemp = getVolleyGestione(session, persone, works);
                session.send(VolleyGestioneTemp);
            }
            if (fast_ink && responsability) {
                var FastInkGestioneTemp = getFastInkGestione(session, persone, works);
                session.send(FastInkGestioneTemp);
            }
            if (TPBMC && responsability) {
                var TPBMCGestioneTemp = getTPBMCGestione(session, persone, works);
                session.send(TPBMCGestioneTemp);
            }
            if (deaf && responsability) {
                var DeafGestioneTemp = getDeafGestione(session, persone, works);
                session.send(DeafGestioneTemp);
            }
            if (utilities && responsability) {
                var UtilitiesGestioneTemp = getUtilitiesGestione(session, persone, works);
                session.send(UtilitiesGestioneTemp);
            }
            if (TPBMC && find) {
                var TPBMCTemp = getTPBMCFind(session, works);
                session.send(TPBMCTemp);
            }
            if (website && find) {
                var WebTemp = getWebsiteFind(session, works);
                session.send(WebTemp);
            }
            if (fast_ink && find) {
                var FastTemp = getFastInkFind(session, works);
                session.send(FastTemp);
            }
            if (volley && find) {
                var VolleyTemp = getVolleyFind(session, works);
                session.send(VolleyTemp);
            }
            if (parse && find) {
                var ParseTemp = getParseFind(session, works);
                session.send(ParseTemp);
            }
            if (deaf && find) {
                var DeafTemp = getDeafFind(session, works);
                session.send(DeafTemp);
            }
            if (utilities && find) {
                var UtilitiesTemp = getUtilitiesFind(session, works);
                session.send(UtilitiesTemp);
            }
            if (ziz && find) {
                var ZizTemp = getZizFind(session, works);
                session.send(ZizTemp);
            }
            if (orfei && lucchi) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var LucchiTemp = getLucchiInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(LucchiTemp);
            }
            if (orfei && fantinato) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var FantinatoTemp = getFantinatoInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(FantinatoTemp);
            }
            if (orfei && zancanaro) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var ZancanaroTemp = getZancanaroInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(ZancanaroTemp);
            }
            if (orfei && chiarin) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var ChiarinTemp = getChiarinInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(ChiarinTemp);
            }
            if (orfei && greggio) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var GreggioTemp = getGreggioInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(GreggioTemp);
            }
            if (orfei && quinto) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var QuintoTemp = getQuintoInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(QuintoTemp);
            }
            if (orfei && nunzio) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                var NunzioTemp = getNunzioInformation(session, persone);
                session.send(OrfeiTemp);
                session.send(NunzioTemp);
            }*/
        }
    ])
    .matches('Skills', [
        function(session, args, results) {
            session.send("Io sono un bot che fornisce informazioni riguardo al team perso. Puoi chiedermi informazioni sui membri, sui progetti correnti e suoi progetti totali. Posso dirti chi gestisce i vari progetti e chi sono i capi delle vaie divisioni. Se vuoi vedere o provare i nostri progetti posso fornirti anche il link, l'unica cosa che devi fare è chiedere");
            session.beginDialog('Root');
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
        var title = ['Persone', 'Progetti Totali', 'Progetti Correnti', 'Team Perso'];
        var text = ['Informazioni sulle persone', 'Informazioni sui progetti totali', 'Informazioni sui progetti correnti', 'Informazioni sul team'];
        var linkImages = ['http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'http://www.elia-group.com/images/team1.jpg'];
        var buttonReturn = ['persone', 'progetti totali', 'progetti correnti', 'team'];
        var buttonText = ['Persone', 'Progetti totali', 'Progetti correnti', 'Team'];
        var nothingCards = HerocardCreator.CreateCards(session, 4, title, text, 1, linkImages, buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(nothingCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "team":
                async.parallel([
                    function(callback) {
                        session.beginDialog('TeamTemp');
                    },
                    function(callback) {
                        session.beginDialog('Team');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "persone":
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllPeople');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "progetti totali":
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('TotalProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "progetti correnti":
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('CurrentProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
        }
    }
])

bot.dialog('Nothing', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var current_project, total_project, total_people, team_perso;
            var entities = [current_project, total_project, total_people, team_perso];
            var built = ['current_project', 'total_project', 'people', 'Team_Perso'];
            var results = setupEntities.EntitySetup(4, entities, built, session, args);

            if (results[0]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('CurrentProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (results[1]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('TotalProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (results[2]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllPeople');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (results[3]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TeamTemp');
                    },
                    function(callback) {
                        session.beginDialog('Team');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
        }
    ])
    .matches('None', [
        function(session, results, args) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('TeamTemp', [
    function(session) {
        session.send("Cosa vuoi sapere del team?");
        var title = ['Membri', 'Ruoli', 'Progetti totali', 'Progetti correnti', 'Responsabilità', 'Info'];
        var text = ['Informazioni sui membri', 'Informazioni sui ruoli', 'Informazioni su tutti i progetti', 'Informazioni sui progetti correnti', 'Responsabilità dei membri', 'Informazioni sul team perso'];
        var linkImages = ['http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png', 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg', ''];
        var buttonReturn = ['persone', 'ruoli', 'progetti totali', 'progetti correnti', 'responsabilità', 'informazioni'];
        var buttonText = ['Persone', 'Ruoli', 'Progetti totali', 'Progetti correnti', 'Responsabilità', 'Informazioni'];
        var teamCards = HerocardCreator.CreateCards(session, 4, title, text, 1, linkImages, buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(teamCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "persone":
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllPeople');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "progetti totali":
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('TotalProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "progetti correnti":
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('CurrentProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "ruoli":
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllRoleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllRole');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "responsabilità":
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllResponsabilityTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllResponsability');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
                break;
            case "informazioni":
                var TeamTemp = getTeamInformation(session, data);
                session.send(TeamTemp);
                break;
        }
    }
])

bot.dialog('TotalProjectTemp', [
    function(session) {
        session.send("Cosa vuoi sapere sui progetti?");
        var title = ['Project Parse', 'Utilities', 'RELU', 'Project Ziz', 'Fast Ink', 'Website'];
        var text = ['Informazione sul progetto Parse', 'Informazioni su utilities', 'Informazioni su RELU', 'Informazioni sul progetto Ziz', 'Informazioni su fast ink', 'Informazioni su Website'];
        var buttonReturn = ['informazioni sul progetto parse', 'gestione del progetto parse', 'informazioni su utilities', 'gestione di utilities', 'informazioni su RELU', 'gestione di RELU', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni su fast ink', 'gestione di fast ink', 'informazioni sul progetto website', 'gestione del progetto website'];
        var buttonText = ['Info', 'Gestione'];
        var totalProjectCards = HerocardCreator.CreateCards(session, 6, title, text, 2, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(totalProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "informazioni sul progetto parse":
                var ParseTemp = getParseInformation(session, works);
                session.send(ParseTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto parse":
                var ParseGestioneTemp = getParseGestione(session, works);
                session.send(ParseGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto deaf":
                var DeafTemp = getDeafInformation(session, works);
                session.send(DeafTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto deaf":
                var DeafGestioneTemp = getDeafGestione(session, works);
                session.send(DeafGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su utilities":
                var UtilitiesTemp = getUtilitiesInformation(session, works);
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
                break;
            case "gestione di utilities":
                var UtilitiesGestioneTemp = getUtilitiesGestione(session, works);
                session.send(UtilitiesGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul team perso bot model core":
                var TPBMCTemp = getTPBMCInformation(session, works);
                session.send(TPBMCTemp);
                session.beginDialog('Root');
                break;
            case "gestione del team perso bot model core":
                var TPBMCGestioneTemp = getTPBMCGestione(session, works);
                session.send(TPBMCGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto ziz":
                var ZizTemp = getZizInformation(session, works);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getZizGestione(session, works);
                session.send(ZizGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto volley":
                var VolleyTemp = getVolleyInformation(session, works);
                session.send(VolleyTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto volley":
                var VolleyGestioneTemp = getVolleyGestione(session, works);
                session.send(VolleyGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su fast ink":
                var FastInkTemp = getFastInkInformation(session, works);
                session.send(FastInkTemp);
                session.beginDialog('Root');
                break;
            case "gestione di fast ink":
                var FastInkGestioneTemp = getFastInkGestione(session, works);
                session.send(FastInkGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto website":
                var WebTemp = getWebsiteInformation(session, works);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto website":
                var WebGestioneTemp = getWebsiteGestione(session, works);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('TotalProject', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'responsability');
            var ziz = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::ziz');
            var deaf = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::deaf');
            var utilities = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::utilities');
            var parse = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::parse');
            var website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');
            var volley = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::volley');
            var fast_ink = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::fast ink');
            var TPBMC = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::tpbmc');

            if (ziz) {
                var ZizTemp = getZizInformation(session, works);
                session.send(ZizTemp);
                session.beginDialog('Root');
            }
            if (deaf) {
                var DeafTemp = getDeafInformation(session, works);
                session.send(DeafTemp);
                session.beginDialog('Root');
            }
            if (utilities) {
                var UtilitiesTemp = getUtilitiesInformation(session, works);
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
            }
            if (parse) {
                var ParseTemp = getParseInformation(session, works);
                session.send(ParseTemp);
                session.beginDialog('Root');
            }
            if (website) {
                var WebTemp = getWebsiteInformation(session, works);
                session.send(WebTemp);
                session.beginDialog('Root');
            }
            if (ziz && responsability) {
                var ZizGestioneTemp = getZizGestione(session, works);
                session.send(ZizGestioneTemp);
                session.beginDialog('Root');
            }
            if (parse && responsability) {
                var ParseGestioneTemp = getElectronGestione(session, works);
                session.send(ParseGestioneTemp);
                session.beginDialog('Root');
            }
            if (website && responsability) {
                var WebGestioneTemp = getWebsiteGestione(session, works);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
            }
            if (volley) {
                var VolleyTemp = getVolleyInformation(session, works);
                session.send(VolleyTemp);
                session.beginDialog('Root');
            }
            if (fast_ink) {
                var FastInkTemp = getFastInkInformation(session, works);
                session.send(FastInkTemp);
                session.beginDialog('Root');
            }
            if (TPBMC) {
                var TPBMCTemp = getTPBMCInformation(session, works);
                session.send(TPBMCTemp);
                session.beginDialog('Root');
            }
            if (volley && responsability) {
                var VolleyGestioneTemp = getVolleyGestione(session, works);
                session.send(VolleyGestioneTemp);
                session.beginDialog('Root');
            }
            if (fast_ink && responsability) {
                var FastInkGestioneTemp = getFastInkGestione(session, works);
                session.send(FastInkGestioneTemp);
                session.beginDialog('Root');
            }
            if (TPBMC && responsability) {
                var TPBMCGestioneTemp = getTPBMCGestione(session, works);
                session.send(TPBMCGestioneTemp);
                session.beginDialog('Root');
            }
            if (deaf && responsability) {
                var DeafGestioneTemp = getDeafGestione(session, works);
                session.send(DeafGestioneTemp);
                session.beginDialog('Root');
            }
            if (utilities && responsability) {
                var UtilitiesGestioneTemp = getUtilitiesGestione(session, works);
                session.send(UtilitiesGestioneTemp);
                session.beginDialog('Root');
            }
        }
    ])
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong Action");
        }
    ]))

bot.dialog('Team', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var team = botbuilder.EntityRecognizer.findEntity(args.entities, 'Team_Perso');
            var role = botbuilder.EntityRecognizer.findEntity(args.entities, 'role');
            var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'Responsibility');
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            if (role) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllRoleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllRole');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (responsability) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllResponsabilityTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllResponsability');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (total_people) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('AllPeople');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (total_project) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('TotalProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (current_project) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('CurrentProject');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (team) {
                var TeamTemp = getTeamInformation(session, data);
                session.send(TeamTemp);
                session.beginDialog('Root');
            }
        }
    ])
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('AllRoleTemp', [
    function(session) {
        session.send("Di chi vuoi sapere il ruolo?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Greggio', 'Zancanaro', 'Quinto', 'Chiarin', 'Nunzio'];
        var text = ['Ruolo di Orfei', 'Ruolo di Lucchi', 'Ruolo di Fantinato', 'Ruolo di Greggio', 'Ruolo di Zancanaro', 'Ruolo di Quinto', 'Ruolo di Chiarin', 'Ruolo di Nunzio'];
        var buttonReturn = ['ruolo di orfei', 'ruolo di lucchi', 'ruolo di fantinato', 'ruolo di greggio', 'ruolo di zancanaro', 'ruolo di quinto', 'ruolo di chiarin', 'ruolo di nunzio'];
        var buttonText = ['Ruolo'];
        var roleCards = HerocardCreator.CreateCards(session, 8, title, text, 1, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(roleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case 'ruolo di orfei':
                var OrfeiRole = getOrfeiRole(session, persone);
                session.send(OrfeiRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di lucchi':
                var LucchiRole = getLucchiRole(session, persone);
                session.send(LucchiRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di zancanaro':
                var ZancanaroRole = getZancanaroRole(session, persone);
                session.send(ZancanaroRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di fantinato':
                var FantinatoRole = getFantinatoRole(session, persone);
                session.send(FantinatoRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di chiarin':
                var ChiarinRole = getChiarinRole(session, persone);
                session.send(ChiarinRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di quinto':
                var QuintoRole = getQuintoRole(session, persone);
                session.send(QuintoRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di greggio':
                var GreggioRole = getGreggioRole(session, persone);
                session.send(GreggioRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di nunzio':
                var NunzioRole = getNunzioRole(session, persone);
                session.send(NunzioRole);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('AllRole', new botbuilder.IntentDialog({
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
            if (nunzio) {
                var NunzioRole = getNunzioRole(session, persone);
                session.send(NunzioRole);
                session.beginDialog('Root');
            }
            if (fantinato) {
                var FantinatoRole = getFantinatoRole(session, persone);
                session.send(FantinatoRole);
                session.beginDialog('Root');
            }
            if (quinto) {
                var QuintoRole = getQuintoRole(session, persone);
                session.send(QuintoRole);
                session.beginDialog('Root');
            }
            if (greggio) {
                var GreggioRole = getGreggioRole(session, persone);
                session.send(GreggioRole);
                session.beginDialog('Root');
            }
            if (chiarin) {
                var ChiarinRole = getChiarinRole(session, persone);
                session.send(ChiarinRole);
                session.beginDialog('Root');
            }
            if (zancanaro) {
                var ZancanaroRole = getZancanaroRole(session, persone);
                session.send(ZancanaroRole);
                session.beginDialog('Root');
            }
            if (lucchi) {
                var LucchiRole = getLucchiRole(session, persone);
                session.send(LucchiRole);
                session.beginDialog('Root');
            }
            if (orfei) {
                var OrfeiRole = getOrfeiRole(session, persone);
                session.send(OrfeiRole);
                session.beginDialog('Root');
            }
        }
    ])
    .matches('None', [
        function(session, args, results) {
            session.send("Wrong action");
            session.beginDialog('Root');
        }
    ])
)

bot.dialog('AllPeopleTemp', [
    function(session) {
        session.send("Queste sono le persone appartenenti al team perso. Vuoi sapere altro?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Zancanaro'];
        var text = ['Informazioni su Orfei', 'Informazioni su Lucchi', 'Informazioni su Fantinato', 'Informazioni su Zancanaro'];
        var buttonReturn = ['informazioni su orfei', 'responsabilità di orfei', 'email di orfei', 'ruolo di orfei', 'progetti di orfei', 'informazioni su lucchi', 'responsabilità di lucchi', 'email di lucchi', 'ruolo di lucchi', 'progetti di lucchi', 'informazioni su fantinato', 'responsabilità di fantinato', 'email di fantinato', 'ruolo di fantinato', 'progetti di fantinato', 'informazioni su zancanaro', 'responsabilità di zancanaro', 'email di zancanaro', 'ruolo di zancanaro', 'progetti di zancanaro'];
        var buttonText = ['Info', 'Responsabilità', 'Email', 'Ruolo', 'Progetti'];
        var PeopleCards = HerocardCreator.CreateCards(session, 8, title, text, 5, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(PeopleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "ruolo di orfei":
                var OrfeiRuolo = getOrfeiRole(session, persone);
                session.send(OrfeiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su orfei":
                var OrfeiInformazioni = getOrfeiInformation(session, persone);
                session.send(OrfeiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di orfei":
                var OrfeiRes = getOrfeiResponsability(session, persone);
                session.send(OrfeiRes);
                session.beginDialog('Root');
                break;
            case "progetti di orfei":
                var OrfeiProject = getOrfeiProjects(session, persone, works);
                session.send(OrfeiProject);
                session.beginDialog('Root');
                break;
            case "email di orfei":
                var OrfeiMail = getOrfeiMail(session, persone);
                session.send(OrfeiMail);
                break;
            case "ruolo di lucchi":
                var LucchiRuolo = getLucchiRole(session, persone);
                session.send(LucchiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su lucchi":
                var LucchiInformazioni = getLucchiInformation(session, persone);
                session.send(LucchiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di lucchi":
                var LucchiRes = getLucchiResponsability(session, persone);
                session.send(LucchiRes);
                session.beginDialog('Root');
                break;
            case "progetti di lucchi":
                var LucchiProjects = getLucchiProjects(session, persone, works);
                session.send(LucchiProjects);
                session.beginDialog('Root');
                break;
            case "mail di lucchi":
                var LucchiMail = getLucchiMail(session, persone);
                session.send(LucchiMail);
                break;
            case "ruolo di zancanaro":
                var ZancanaroRuolo = getZancanaroRole(session, persone);
                session.send(ZancanaroRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su zancanaro":
                var ZancanaroInformazioni = getZancanaroInformation(session, persone);
                session.send(ZancanaroInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di zancanaro":
                var ZancanaroRes = getZancanaroResponsability(session, persone);
                session.send(ZancanaroRes);
                session.beginDialog('Root');
                break;
            case "progetti di zancanaro":
                var ZancanaroProjects = getZancanaroProjects(session, persone, works);
                session.send(ZancanaroProjects);
                session.beginDialog('Root');
                break;
            case "email di zancanaro":
                var ZancanaroMail = getZancanaroMail(session, persone);
                session.send(ZancanaroMail);
                break;
            case "ruolo di fantinato":
                var FantinatoRuolo = getFantinatoRole(session, persone);
                session.send(FantinatoRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su fantinato":
                var FantinatoInformazioni = getFantinatoInformation(session, persone);
                session.send(FantinatoInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di fantinato":
                var FantinatoRes = getFantinatoResponsability(session, persone);
                session.send(FantinatoRes);
                session.beginDialog('Root');
                break;
            case "progetti di fantinato":
                var FantinatoProjects = getFantinatoProjects(session, persone, works);
                session.send(FantinatoProjects);
                session.beginDialog('Root');
                break;
            case "email di fantinato":
                var FantinatoMail = getFantinatoMail(session, persone);
                session.send(FantinatoMail);
                break;
            case "ruolo di chiarin":
                var ChiarinRuolo = getChiarinRole(session, persone);
                session.send(ChiarinRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su chiarin":
                var ChiarinInformazioni = getChiarinInformation(session, persone);
                session.send(ChiarinInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di chiarin":
                var ChiarinRes = getChiarinResponsability(session, persone);
                session.send(ChiarinRes);
                session.beginDialog('Root');
                break;
            case "progetti di chiarin":
                var ChiarinProjects = getChiarinProjects(session, persone, works);
                session.send(ChiarinProjects);
                session.beginDialog('Root');
                break;
            case "email di chiarin":
                var ChiarinMail = getChiarinMail(session, persone);
                session.send(ChiarinMail);
                break;
            case "ruolo di greggio":
                var GreggioRuolo = getGreggioRole(session, persone);
                session.send(GreggioRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su greggio":
                var GreggioInformazioni = getGreggioInformation(session, persone);
                session.send(GreggioInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di greggio":
                var GreggioRes = getGreggioResponsability(session, persone);
                session.send(GreggioRes);
                session.beginDialog('Root');
                break;
            case "progetti di greggio":
                var GreggioProjects = getGreggioProjects(session, persone, works);
                session.send(GreggioProjects);
                session.beginDialog('Root');
                break;
            case "email di greggio":
                var GreggioMail = getGreggioMail(session, persone);
                session.send(GreggioMail);
                break;
            case "ruolo di quinto":
                var QuintoRuolo = getQuintoRole(session, persone);
                session.send(QuintoRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su quinto":
                var QuintoInformazioni = getQuintoInformation(session, persone);
                session.send(QuintoInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di quinto":
                var QuintoRes = getQuintoResponsability(session, persone);
                session.send(QuintoRes);
                session.beginDialog('Root');
                break;
            case "progetti di quinto":
                var QuintoProjects = getQuintoProjects(session, persone, works);
                session.send(QuintoProjects);
                session.beginDialog('Root');
                break;
            case "email di quinto":
                var QuintoMail = getQuintoMail(session, persone);
                session.send(QuintoMail);
                break;
            case "ruolo di nunzio":
                var NunzioRuolo = getNunzioRole(session, persone);
                session.send(NunzioRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su nunzio":
                var NunzioInformazioni = getNunzioInformation(session, persone);
                session.send(NunzioInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di nunzio":
                var QuintoRes = getNunzioResponsability(session, persone);
                session.send(NunzioRes);
                session.beginDialog('Root');
                break;
            case "progetti di nunzio":
                var NunzioProjects = getNunzioProjects(session, persone, works);
                session.send(NunzioProjects);
                session.beginDialog('Root');
                break;
            case "email di nunzio":
                var NunzioMail = getNunzioMail(session, persone);
                session.send(NunzioMail);
                break;
        }
    }
])

bot.dialog('AllPeople', new botbuilder.IntentDialog({
        recognizers: [recognize]
    }).matches('GetInformation', [
        function(session, args, results) {
            var mail = botbuilder.EntityRecognizer.findEntity(args.entities, 'email');
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
            if (nunzio) {
                var NunzioTemp = getNunzioInformation(session, persone);
                session.send(NunzioTemp);
            }
            if (fantinato) {
                var FantinatoTemp = getFantinatoInformation(session, persone);
                session.send(FantinatoTemp);
            }
            if (quinto) {
                var QuintoTemp = getQuintoInformation(session, persone);
                session.send(QuintoTemp);
            }
            if (greggio) {
                var GreggioTemp = getGreggioInformation(session, persone);
                session.send(GreggioTemp);
            }
            if (chiarin) {
                var ChiarinTemp = getChiarinInformation(session, persone);
                session.send(ChiarinTemp);
            }
            if (zancanaro) {
                var ZancanaroTemp = getZancanaroInformation(session, persone);
                session.send(ZancanaroTemp);
            }
            if (lucchi) {
                var LucchiTemp = getLucchiInformation(session, persone);
                session.send(LucchiTemp);
            }
            if (lucchi) {
                var LucchiTemp = getLucchiInformation(session, persone);
                session.send(LucchiTemp);
            }
            if (orfei) {
                var OrfeiTemp = getOrfeiInformation(session, persone);
                session.send(OrfeiTemp);
            }
            if (nunzio && role) {
                var NunzioRole = getNunzioRole(session, persone);
                session.send(NunzioRole);
            }
            if (fantinato && role) {
                var FantinatoRole = getFantinatoRole(session, persone);
                session.send(FantinatoRole);
            }
            if (quinto && role) {
                var QuintoRole = getQuintoRole(session, persone);
                session.send(QuintoRole);
            }
            if (greggio && role) {
                var GreggioRole = getGreggioRole(session, persone);
                session.send(GreggioRole);
            }
            if (chiarin && role) {
                var ChiarinRole = getChiarinRole(session, persone);
                session.send(ChiarinRole);
            }
            if (zancanaro && role) {
                var ZancanaroRole = getZancanaroRole(session, persone);
                session.send(ZancanaroRole);
            }
            if (lucchi && role) {
                var LucchiRole = getLucchiRole(session, persone);
                session.send(LucchiRole);
            }
            if (orfei && role) {
                var OrfeiRole = getOrfeiRole(session, persone);
                session.send(OrfeiRole);
            }
            if (nunzio && responsability) {
                var NunzioRes = getNunzioResponsability(session, persone);
                session.send(NunzioRes);
            }
            if (fantinato && responsability) {
                var FantinatoRes = getFantinatoResponsability(session, persone);
                session.send(FantinatoRes);
            }
            if (quinto && responsability) {
                var QuintoRes = getQuintoResponsability(session, persone);
                session.send(QuintoRes);
            }
            if (greggio && responsability) {
                var GreggioRes = getGreggioResponsability(session, persone);
                session.send(GreggioRes);
            }
            if (chiarin && responsability) {
                var ChiarinRes = getChiarinResponsability(session, persone);
                session.send(ChiarinRes);
            }
            if (zancanaro && responsability) {
                var ZancanaroRes = getZancanaroResponsability(session, persone);
                session.send(ZancanaroRes);
            }
            if (lucchi && responsability) {
                var LucchiRes = getLucchiResponsability(session, persone);
                session.send(LucchiRes);
            }
            if (orfei && responsability) {
                var OrfeiRes = getOrfeiResponsability(session, persone);
                session.send(OrfeiRes);
            }
            if (nunzio && mail) {
                var NunzioMail = getNunzioMail(session, persone);
                session.send(NunzioMail);
            }
            if (fantinato && mail) {
                var FantinatoMail = getFantinatoMail(session, persone);
                session.send(FantinatoMail);
            }
            if (quinto && mail) {
                var QuintoMail = getQuintoMail(session, persone);
                session.send(QuintoMail);
            }
            if (greggio && mail) {
                var GreggioMail = getGreggioMail(session, persone);
                session.send(GreggioMail);
            }
            if (chiarin && mail) {
                var ChiarinMail = getChiarinMail(session, persone);
                session.send(ChiarinMail);
            }
            if (zancanaro && mail) {
                var ZancanaroMail = getZancanaroMail(session, persone);
                session.send(ZancanaroMail);
            }
            if (lucchi && mail) {
                var LucchiMail = getLucchiMail(session, persone);
                session.send(LucchiMail);
            }
            if (orfei && mail) {
                var OrfeiMail = getOrfeiMail(session, persone);
                session.send(OrfeiMail);
            }
            if (nunzio && total_project) {
                var NunzioProjects = getNunzioProjects(session, persone, works);
                session.send(NunzioProjects);
            }
            if (fantinato && total_project) {
                var FantinatoProjects = getFantinatoProjects(session, persone, works);
                session.send(FantinatoProjects);
            }
            if (quinto && total_project) {
                var QuintoProjects = getQuintoProjects(session, persone, works);
                session.send(QuintoProjects);
            }
            if (greggio && total_project) {
                var GreggioProjects = getGreggioProjects(session, persone, works);
                session.send(GreggioProjects);
            }
            if (chiarin && total_project) {
                var ChiarinProjects = getChiarinProjects(session, persone, works);
                session.send(ChiarinProjects);
            }
            if (zancanaro && total_project) {
                var ZancanaroProjects = getZancanaroProjects(session, persone, works);
                session.send(ZancanaroProjects);
            }
            if (lucchi && total_project) {
                var LucchiProjects = getLucchiProjects(session, persone, works);
                session.send(LucchiProjects);
            }
            if (orfei && total_project) {
                var OrfeiProject = getOrfeiProjects(session, persone, works);
                session.send(OrfeiProject);
            }
        }
    ])
    .matches('None', [
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

bot.dialog('CurrentProjectTemp', [
    function(session) {
        session.send("Questi sono i progetti correnti");
        var title = ['RELU', 'Utilities', 'Project Ziz', 'Website'];
        var text = ['Informazioni su RELU', 'Informazioni su Utilities', 'Informazioni su Ziz', 'Informazioni su Website'];
        var buttonReturn = ['informazioni su RELU', 'gestione di RELU', 'informazioni su utilities', 'gestione di utilities', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni sul progetto website', 'gestione del progetto website'];
        var buttonText = ['Info', 'Gestione'];
        var CurrentProjectCards = HerocardCreator.CreateCards(session, 4, title, text, 2, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(CurrentProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "informazioni sul progetto parse":
                var ParseTemp = getParseInformation(session, works);
                session.send(ParseTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto parse":
                var ParseGestioneTemp = getParseGestione(session, works);
                session.send(ParseGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto deaf":
                var DeafTemp = getDeafInformation(session, works);
                session.send(DeafTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto deaf":
                var DeafGestioneTemp = getDeafGestione(session, works);
                session.send(DeafGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su utilities":
                var UtilitiesTemp = getUtilitiesInformation(session, works);
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
                break;
            case "gestione di utilities":
                var UtilitiesGestioneTemp = getUtilitiesGestione(session, works);
                session.send(UtilitiesGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto ziz":
                var ZizTemp = getZizInformation(session, works);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getZizGestione(session, works);
                session.send(getZizGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto website":
                var WebTemp = getWebsiteInformation(session, works);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto website":
                var WebGestioneTemp = getWebsiteGestione(session, works);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
                break;
        }
    }
])


bot.dialog('CurrentProject', new botbuilder.IntentDialog({
    recognizers: [recognize]
}).matches('GetInformation', [
    function(session, args, results) {
        var responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'responsability');
        var ziz = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::ziz');
        var deaf = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::deaf');
        var utilities = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::utilities');
        var parse = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::parse');
        var website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');

        if (ziz) {
            var ZizTemp = getZizInformation(session, works);
            session.send(ZizTemp);
            session.beginDialog('Root');
        }
        if (parse) {
            var ParseTemp = getParseInformation(session, works);
            session.send(ParseTemp);
            session.beginDialog('Root');
        }
        if (website) {
            var WebTemp = getWebsiteInformation(session, works);
            session.send(WebTemp);
            session.beginDialog('Root');
        }
        if (ziz && responsability) {
            var ZizGestioneTemp = getZizGestione(session, works);
            session.send(getZizGestione);
            session.beginDialog('Root');
        }
        if (parse && responsability) {
            var ParseGestioneTemp = getParseGestione(session, works);
            session.send(ParseGestioneTemp);
            session.beginDialog('Root');
        }
        if (website && responsability) {
            var WebGestioneTemp = getWebsiteGestione(session, works);
            session.send(WebGestioneTemp);
            session.beginDialog('Root');
        }
        if (deaf) {
            var DeafTemp = getDeafFind(session, works);
            session.send(DeafTemp);
            session.beginDialog('Root');
        }
        if (deaf && responsability) {
            var DeafGestioneTemp = getDeafGestione(session, works);
            session.send(DeafGestioneTemp);
            session.beginDialog('Root');
        }
        if (utilities) {
            var UtilitiesTemp = getUtilitiesFind(session, works);
            session.send(UtilitiesTemp);
            session.beginDialog('Root');
        }
        if (utilities && responsability) {
            var UtilitiesGestioneTemp = getUtilitiesGestione(session, works);
            session.send(UtilitiesGestioneTemp);
            session.beginDialog('Root');
        }
    }
]).matches('None', [
    function(session, args, results) {
        session.send("Wrong action");
        session.beginDialog('Root');
    }
]))

bot.dialog('AllMailTemp', [
    function(session) {
        session.send("Di chi vuoi sapere la mail?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Greggio', 'Zancanaro', 'Quinto', 'Chiarin', 'Nunzio'];
        var text = ['Email di Orfei', 'Email di Lucchi', 'Email di Fantinato', 'Email di Greggio', 'Email di Zancanaro', 'Email di Quinto', 'Email di Chiarin', 'Email di Nunzio'];
        var buttonReturn = ['email di orfei', 'email di lucchi', 'email di fantinato', 'email di greggio', 'email di zancanaro', 'email di quinto', 'email di chiarin', 'email di nunzio'];
        var buttonText = ['Email'];
        var MailCards = HerocardCreator.CreateCards(session, 8, title, text, 1, '', buttonReturn, buttonText);
        var reply = botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(MailCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "email di orfei":
                var OrfeiMail = getOrfeiMail(session, persone);
                session.send(OrfeiMail);
                session.beginDialog('Root');
                break;
            case "email di lucchi":
                var LucchiMail = getLucchiMail(session, persone);
                session.send(LucchiMail);
                session.beginDialog('Root');
                break;
            case "email di fantinato":
                var FantinatoMail = getFantinatoMail(session, persone);
                session.send(FantinatoMail);
                session.beginDialog('Root');
                break;
            case "email di zancanaro":
                var ZancanaroMail = getZancanaroMail(session, persone);
                session.send(ZancanaroMail);
                session.beginDialog('Root');
                break;
            case "email di greggio":
                var GreggioMail = getGreggioMail(session, persone);
                session.send(GreggioMail);
                session.beginDialog('Root');
                break;
            case "email di chiarin":
                var ChiarinMail = getChiarinMail(session, persone);
                session.send(ChiarinMail);
                session.beginDialog('Root');
                break;
            case "email di quinto":
                var QuintoMail = getQuintoMail(session, persone);
                session.send(QuintoMail);
                session.beginDialog('Root');
                break;
            case "email di nunzio":
                var NunzioMail = getNunzioMail(session, persone);
                session.send(NunzioMail);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('AllMail', new botbuilder.IntentDialog({
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

        if (orfei) {
            var OrfeiMail = getOrfeiMail(session, persone);
            session.send(OrfeiMail);
            session.beginDialog('Root');
        }
        if (lucchi) {
            var LucchiMail = getLucchiMail(session, persone);
            session.send(LucchiMail);
            session.beginDialog('Root');
        }
        if (zancanaro) {
            var ZancanaroMail = getZancanaroMail(session, persone);
            session.send(ZancanaroMail);
            session.beginDialog('Root');
        }
        if (chiarin) {
            var ChiarinMail = getChiarinMail(session, persone);
            session.send(ChiarinMail);
            session.beginDialog('Root');
        }
        if (greggio) {
            var GreggioMail = getGreggioMail(session, persone);
            session.send(GreggioMail);
            session.beginDialog('Root');
        }
        if (quinto) {
            var QuintoMail = getQuintoMail(session, persone);
            session.send(QuintoMail);
            session.beginDialog('Root');
        }
        if (fantinato) {
            var FantinatoMail = getFantinatoMail(session, persone);
            session.send(FantinatoMail);
            session.beginDialog('Root');
        }
        if (nunzio) {
            var NunzioMail = getNunzioMail(session, persone);
            session.send(NunzioMail);
            session.beginDialog('Root');
        }
    }
]).matches('None', [
    function(session, args, results) {
        session.send("Wrong Action");
        session.beginDialog('Root');
    }
]))

bot.dialog('FindAllTemp', [
    function(session) {
        session.send("Scegli il progetto che vuoi trovare");
        var title = ['Project Ziz', 'Project Parse', 'Utilities', 'Website', 'Fast Ink', 'RELU'];
        var text = ['Link project Ziz', 'Link Project Parse', 'Link Utilities', 'Link Utilities', 'Link Fast Ink', 'Link RELU'];
        var buttonReturn = ['link project ziz', 'link progetto parse', 'link utilities', 'link progetto website', 'link fast ink', 'link RELU'];
        var buttonText = ['Link'];
        var FindCArds = HerocardCreator.CreateCards(session, 6, title, text, 1, '', buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(FindCArds)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "link progetto ziz":
                var ZizTemp = getZizFind(session, works);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "link progetto parse":
                var ParseTemp = getParseFind(session, works);
                session.send(ParseTemp);
                session.beginDialog('Root');
                break;
            case "link utilities":
                var UtilitiesTemp = getUtilitiesFind(session, works);
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
                break;
            case "link progetto website":
                var WebTemp = getWebsiteFind(session, works);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "link fast ink":
                var FastTemp = getFastInkFind(session, works);
                session.send(FastTemp);
                session.beginDialog('Root');
                break;
            case "link RELU":
                var BotTemp = getBotFind(session, works);
                session.send(BotTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('FindAll', new botbuilder.IntentDialog({
    recognizers: [recognize]
}).matches('GetInformation', [
    function(session, args, results) {
        var ziz = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::ziz');
        var parse = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::parse');
        var deaf = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::deaf');
        var utilities = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::utilities');
        var volley = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::volley');
        var fast_ink = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::fast ink');
        var website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');
        var TPBMC = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::tpbmc');

        if (ziz) {
            var ZizTemp = getZizFind(session, works);
            session.send(ZizTemp);
            session.beginDialog('Root');
        }
        if (fast_ink) {
            var FastTemp = getFastInkFind(session, works);
            session.send(FastTemp);
            session.beginDialog('Root');
        }
        if (volley) {
            var VolleyTemp = getVolleyFind(session, works);
            session.send(VolleyTemp);
            session.beginDialog('Root');
        }
        if (parse) {
            var ParseTemp = getParseFind(session, works);
            session.send(ParseTemp);
            session.beginDialog('Root');
        }
        if (website) {
            var WebTemp = getWebsiteFind(session, works);
            session.send(WebTemp);
            session.beginDialog('Root');
        }
        if (TPBMC) {
            var TPBMCTemp = getTPBMCFind(session, works);
            session.send(TPBMCTemp);
            session.beginDialog('Root');
        }
        if (deaf) {
            var DeafTemp = getDeafFind(session, works);
            session.send(DeafTemp);
            session.beginDialog('Root');
        }
        if (utilities) {
            var UtilitiesTemp = getUtilitiesFind(session, works);
            session.send(UtilitiesTemp);
            session.beginDialog('Root');
        }
    }
]))

//--------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.orfei.specialita.length; i++) {
        spec += parsed.database.membri.orfei.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.orfei.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.orfei.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.orfei.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.orfei.progetti_assegnati[i];
    }
    return ("Questa persona è Samuele Orfei, il suo username github è " + parsed.database.membri.orfei.username_github + ", il suo soprannome è " + parsed.database.membri.orfei.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getLucchiInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.lucchi.specialita.length; i++) {
        spec += parsed.database.membri.lucchi.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.lucchi.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.lucchi.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.lucchi.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.lucchi.progetti_assegnati[i];
    }
    return ("Questa persona è Manuele Lucchi, il suo username github è " + parsed.database.membri.lucchi.username_github + ", il suo soprannome è " + parsed.database.membri.lucchi.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getZancanaroInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.zancanaro.specialita.length; i++) {
        spec += parsed.database.membri.zancanaro.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.zancanaro.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.zancanaro.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.zancanaro.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.zancanaro.progetti_assegnati[i];
    }
    return ("Questa persona è Marco Zancanaro, il suo username github è " + parsed.database.membri.zancanaro.username_github + ", il suo soprannome è " + parsed.database.membri.zancanaro.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getFantinatoInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.fantinato.specialita.length; i++) {
        spec += parsed.database.membri.fantinato.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.fantinato.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.fantinato.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.fantinato.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.fantinato.progetti_assegnati[i];
    }
    return ("Questa persona è Filippo Fantinato, il suo username github è " + parsed.database.membri.fantinato.username_github + ", il suo soprannome è " + parsed.database.membri.fantinato.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getChiarinInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.chiarin.specialita.length; i++) {
        spec += parsed.database.membri.chiarin.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.chiarin.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.chiarin.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.chiarin.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.chiarin.progetti_assegnati[i];
    }
    return ("Questa persona è Marco Chiarin, il suo username github è " + parsed.database.membri.chiarin.username_github + ", il suo soprannome è " + parsed.database.membri.chiarin.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getGreggioInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.greggio.specialita.length; i++) {
        spec += parsed.database.membri.greggio.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.greggio.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.greggio.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.greggio.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.greggio.progetti_assegnati[i];
    }
    return ("Questa persona è Nicolò Greggio, il suo username github è " + parsed.database.membri.greggio.username_github + ", il suo soprannome è " + parsed.database.membri.greggio.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getQuintoInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.quinto.specialita.length; i++) {
        spec += parsed.database.membri.quinto.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.quinto.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.quinto.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.quinto.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.quinto.progetti_assegnati[i];
    }
    return ("Questa persona è Tommaso Quinto, il suo username github è " + parsed.database.membri.quinto.username_github + ", il suo soprannome è " + parsed.database.membri.quinto.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
}

function getNunzioInformation(session, parsed) {
    var i = 0;
    var spec = '';
    var mantenere = '';
    var assegnati = '';
    for (i = 0; i < parsed.database.membri.nunzio.specialita.length; i++) {
        spec += parsed.database.membri.nunzio.specialita[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.nunzio.progetti_mantenere.length; i++) {
        mantenere += parsed.database.membri.nunzio.progetti_mantenere[i] + ', ';
    }
    for (i = 0; i < parsed.database.membri.nunzio.progetti_assegnati.length; i++) {
        assegnati += parsed.database.membri.nunzio.progetti_assegnati[i];
    }
    return ("Questa persona è Salvatore Nunzio Savà, il suo username github è " + parsed.database.membri.nunzio.username_github + ", il suo soprannome è " + parsed.database.membri.nunzio.nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + mantenere + ", i progetti a lui assegnati sono " + assegnati);
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
    return ("Lucchi per ora si occupa di project deaf");
}

function getZancanaroResponsability(session, parsed) {
    return ("Zancanaro per ora si occupa di project Volley");
}

function getFantinatoResponsability(session, parsed) {
    return ("Fantinato per ora si occupa di project parse e website");
}

function getChiarinResponsability(session, parsed) {
    return ("Chiarin per ora sta lavorando al project deaf");
}

function getGreggioResponsability(session, parsed) {
    return ("Greggio per ora sta lavorando al project parse");
}

function getQuintoResponsability(session, parsed) {
    return ("Quinto per ora sta lavorando al project parse");
}

function getNunzioResponsability(session, parsed) {
    return ("Nunzio per ora lavora al project Ziz");
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

function getZizInformation(session, parsed) {
    return ("Project Ziz è un progetto di tipo " + parsed.database.progetti.project_ziz.tipo_progetto + ". E' un " + parsed.database.progetti.project_ziz.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_ziz.capo_progetto + ". La gestione è " + parsed.database.progetti.project_ziz.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_ziz.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_ziz.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_ziz.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_ziz.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_ziz.membri);
}

function getParseInformation(session, parsed) {
    return ("Project Parse è un progetto di tipo " + parsed.database.progetti.project_parse.tipo_progetto + ". E' un " + parsed.database.progetti.project_parse.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_parse.capo_progetto + ". La gestione è " + parsed.database.progetti.project_parse.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_parse.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_parse.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_parse.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_parse.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_parse.membri);
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

function getTPBMCInformation(session, parsed) {
    return ("T.P.B.M.C. è un progetto di tipo " + parsed.database.progetti.team_perso_bot_model_core.tipo_progetto + ". E' un " + parsed.database.progetti.team_perso_bot_model_core.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.team_perso_bot_model_core.capo_progetto + ". La gestione è " + parsed.database.progetti.team_perso_bot_model_core.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.team_perso_bot_model_core.link_repo + ". E' stato cominciato a " + parsed.database.progetti.team_perso_bot_model_core.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.team_perso_bot_model_core.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.team_perso_bot_model_core.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.team_perso_bot_model_core.membri);
}

function getDeafInformation(session, parsed) {
    return ("Project Deaf è un progetto di tipo " + parsed.database.progetti.project_deaf.tipo_progetto + ". E' un " + parsed.database.progetti.project_deaf.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.project_deaf.capo_progetto + ". La gestione è " + parsed.database.progetti.project_deaf.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.project_deaf.link_repo + ". E' stato cominciato a " + parsed.database.progetti.project_deaf.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.project_deaf.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.project_deaf.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.project_deaf.membri);
}

function getUtilitiesInformation(session, parsed) {
    return ("Utilities è un progetto di tipo " + parsed.database.progetti.utilities.tipo_progetto + ". E' un " + parsed.database.progetti.utilities.descrizione_progetto + ". La gestione è di " + parsed.database.progetti.utilities.capo_progetto + ". La gestione è " + parsed.database.progetti.utilities.tipo_gestione + ". Questo progetto lo si può trovare a questo link: " + parsed.database.progetti.utilities.link_repo + ". E' stato cominciato a " + parsed.database.progetti.utilities.inizio_sviluppo + "e la data di fine è " + parsed.database.progetti.utilities.fine_sviluppo + ". E' supportato e la versione corrente è la " + parsed.database.progetti.utilities.versione + ". I membri che ci lavorano sono: " + parsed.database.progetti.utilities.membri);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getOrfeiProjects(session, parsed) {
    return ("I progetti fatti da orfei sono: project Ziz");
}

function getLucchiProjects(session, parsed) {
    return ("I progetti fatti da lucchi sono: Deaf");
}

function getFantinatoProjects(session, parsed) {
    return ("I progetti fatti da fantinato sono: Parse, Website");
}

function getZancanaroProjects(session, parsed) {
    return ("I progetti fatti da Zancanaro sono: Volley");
}

function getChiarinProjects(session, parsed) {
    return ("I progetti fatti da Chiarin sono: multiplatform UWP");
}

function getGreggioProjects(session, parsed) {
    return ("I progetti fatti da Greggio sono: Parse");
}

function getQuintoProjects(session, parsed) {
    return ("I progetti fatti da Quinto sono: Parse");
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
    return bullshit[(parseInt(Math.random() * bullshit.length) | 0)];
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

//-----------------------------------------------------------------------------------------------------------

function getZizFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.project_ziz.link_repo);
}

function getVolleyFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.project_volley.link_repo);
}

function getTPBMCFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.team_perso_bot_model_core.link_repo);
}

function getParseFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.project_parse.link_repo);
}

function getFastInkFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.fast_ink.link_repo);
}

function getWebsiteFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.project_website.link_repo);
}

function getDeafFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.project_deaf.link_repo);
}

function getUtilitiesFind(session, parsed) {
    return ("Questo progetto si trova a questo link " + parsed.database.progetti.utilities.link_repo);
}

//-------------------------------------------------------------------------------------------------------------------------------------