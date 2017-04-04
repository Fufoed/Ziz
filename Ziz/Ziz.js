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
    .matches('Modify', [
        function(session, args, results) {

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

/*bot.dialog('Nothing', new botbuilder.IntentDialog({
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
)*/

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
                var ParseTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_parse');
                session.send(ParseTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto parse":
                var ParseGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_parse');
                session.send(ParseGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su utilities":
                var UtilitiesTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'utilities');
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
                break;
            case "gestione di utilities":
                var UtilitiesGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'utilities');
                session.send(UtilitiesGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su RELU":
                var RELUemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'relu-core');
                session.send(RELUTemp);
                session.beginDialog('Root');
                break;
            case "gestione di RELU":
                var TPBMCGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'relu-core');
                session.send(TPBMCGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto ziz":
                var ZizTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_ziz');
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_ziz');
                session.send(ZizGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su fast ink":
                var FastInkTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'fast_ink');
                session.send(FastInkTemp);
                session.beginDialog('Root');
                break;
            case "gestione di fast ink":
                var FastInkGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'fast_ink');
                session.send(FastInkGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto website":
                var WebTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_website');
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto website":
                var WebGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_website');
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
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Greggio', 'Zancanaro'];
        var text = ['Ruolo di Orfei', 'Ruolo di Lucchi', 'Ruolo di Fantinato', 'Ruolo di Greggio', 'Ruolo di Zancanaro'];
        var buttonReturn = ['ruolo di orfei', 'ruolo di lucchi', 'ruolo di fantinato', 'ruolo di greggio', 'ruolo di zancanaro'];
        var buttonText = ['Ruolo'];
        var roleCards = HerocardCreator.CreateCards(session, 5, title, text, 1, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(roleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case 'ruolo di orfei':
                var OrfeiRole = getPeopleRole(session, persone, 'ruolo', 'orfei');
                session.send(OrfeiRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di lucchi':
                var LucchiRole = getPeopleRole(session, persone, 'ruolo', 'lucchi');
                session.send(LucchiRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di zancanaro':
                var ZancanaroRole = getPeopleRole(session, persone, 'ruolo', 'zancanaro');
                session.send(ZancanaroRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di fantinato':
                var FantinatoRole = getPeopleRole(session, persone, 'ruolo', 'fantinato');
                session.send(FantinatoRole);
                session.beginDialog('Root');
                break;
            case 'ruolo di greggio':
                var GreggioRole = getPeopleRole(session, persone, 'ruolo', 'greggio');
                session.send(GreggioRole);
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
        var PeopleCards = HerocardCreator.CreateCards(session, 5, title, text, 5, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(PeopleCards)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "ruolo di orfei":
                var OrfeiRuolo = getPeopleRole(session, persone, 'ruolo', 'orfei');
                session.send(OrfeiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su orfei":
                var OrfeiInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                session.send(OrfeiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di orfei":
                var OrfeiRes = getOrfeiResponsability(session, persone);
                session.send(OrfeiRes);
                session.beginDialog('Root');
                break;
            case "progetti di orfei":
                var OrfeiProject = getPeopleProject(session, persone, 'progetti_assegnati', 'orfei');
                session.send(OrfeiProject);
                session.beginDialog('Root');
                break;
            case "email di orfei":
                var OrfeiMail = getPeopleMail(session, persone, 'mail', 'orfei');
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

function getPeopleInformation(session, json, mantain, gitusername, assigned, role, speciality, mail, nickname, name) {
    var project_mantain = JsonModifier.JsonReader(session, json, mantain, name);
    var gitUser = JsonModifier.JsonReader(session, json, gitusername, name);
    var project_assigned = JsonModifier.JsonReader(session, json, assigned, name);
    var person_role = JsonModifier.JsonReader(session, json, role, name);
    var spec = JsonModifier.JsonReader(session, json, speciality, name);
    var email = JsonModifier.JsonReader(session, json, mail, name);
    var person_nickname = JsonModifier.JsonReader(session, json, nickname, name);

    return ("Questa persona è " + name + ", il suo username github è " + gitUser + ", il suo soprannome è " + person_nickname + ", le sue specialità sono: " + spec + ", i progetti che deve mantenere sono: " + project_mantain + ", i progetti a lui assegnati sono " + project_assigned + ". La sua email è " + email + ", il suo ruolo nel team è " + person_role);;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleRole(session, json, role, name) {
    var person_role = JsonModifier.JsonReader(session, json, role, name)
    return ("Il ruolo di " + name + " è " + person_role);
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

function getProjectInformation(session, json, type, description, chief, link_repo, begin_develop, end_develop, version, support, how_going, member, note, project) {
    var project_type = JsonModifier.JsonReader(session, json, type, project);
    var project_description = JsonModifier.JsonReader(session, json, description, project);
    var project_chief = JsonModifier.JsonReader(session, json, chief, project);
    var project_link_repo = JsonModifier.JsonReader(session, json, link_repo, project);
    var project_begin_develop = JsonModifier.JsonReader(session, json, begin_develop, project);
    var project_end_develop = JsonModifier.JsonReader(session, json, end_develop, project);
    var project_version = JsonModifier.JsonReader(session, json, version, project);
    var project_support = JsonModifier.JsonReader(session, json, support, project);
    var project_how_going = JsonModifier.JsonReader(session, json, how_going, project);
    var project_member = JsonModifier.JsonReader(session, json, member, project);
    var project_note = JsonModifier.JsonReader(session, json, note, project);
    return (project + " è un progetto di tipo " + project_type + ". E' un " + project_description + ". La gestione è di " + project_chief + ". Questo progetto lo si può trovare a questo link " + project_link_repo + ". E' stato cominciato il " + project_begin_develop + "e la data di fine è " + project_end_develop + ". La versione corrente è la " + project_version + ". E' supportato e procede " + project_how_going + ". I membri che lavorano sono " + project_member + ". Note: " + project_note);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleProject(session, json, assigned, name) {
    var project = JsonModifier.JsonReader(session, json, assigned, name);
    return ("I progetti fatti da " + name + " sono " + project);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function getTeamInformation(session, json, nProject, nMembers, MemberList, ProjectList, link) {
    var Projects = JsonModifier.JsonReader(session, json, nProject);
    var ListProject = JsonModifier.JsonReader(session, json, ProjectList);
    var site_link = JsonModifier.JsonReader(session, json, link);
    var Members = JsonModifier.JsonReader(session, json, nMembers);
    var ListMember = JsonModifier.JsonReader(session, json, MemberList);
    return ("Questo è il team perso. E' composto da " + Members + ", che sono " + ListMember + ". Il numero di progetti totali per ora è di " + Projects + ". I progetti sono " + ListProject + ". Per maggiori Informazioni visitare il sito " + site_link);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------

function getBullshit(session) {
    return bullshit[(parseInt(Math.random() * bullshit.length) | 0)];
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleMail(session, json, mail, name) {
    var email = JsonModifier.JsonReader(session, json, mail, name);
    return ("L' email di " + name + " è " + email);
}

//-----------------------------------------------------------------------------------------------------------

function getProjectFind(session, json, link, project) {
    var link_project = JsonModifier.JsonReader(session, json, link, project);
    return (project + " si può trovare al link " + link_project);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function getProjectGestione(session, json, chief, project) {
    var boss = JsonModifier.JsonReader(session, json, chief, project);
    return (boss + " si occupa di questo progetto");
}