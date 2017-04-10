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
            var team_perso, responsability, role, find, easter_egg, orfei, lucchi, zancanaro, greggio, fantinato, ziz, fast_ink, website, RELU, utilities, parse, current_project, total_project, total_people, email, research;
            var entities = [team_perso, responsability, role, find, easter_egg, orfei, lucchi, zancanaro, greggio, fantinato, ziz, fast_ink, website, RELU, utilities, parse, current_project, total_project, total_people, email, research];
            var built = ['Team_Perso', 'Responsibility', 'role', 'find', 'easter_egg', 'people::orfei', 'people::lucchi', 'people::zancanaro', 'people::greggio', 'people::fantinato', 'project::ziz', 'project::fast ink', 'project::website', 'project::Relu', 'project::utilities', 'project::parse', 'current_project', 'total_project', 'people', 'email', 'project::research'];
            var BuiltEntities = setupEntities.EntitySetup(21, entities, built, session, args);

            if (!BuiltEntities[0] && !BuiltEntities[1] && !BuiltEntities[2] && !BuiltEntities[3] && !BuiltEntities[4] && !BuiltEntities[5] && !BuiltEntities[6] && !BuiltEntities[7] && !BuiltEntities[8] && !BuiltEntities[9] && !BuiltEntities[10] && !BuiltEntities[11] && !BuiltEntities[12] && !BuiltEntities[13] && !BuiltEntities[15] && !BuiltEntities[16] && !BuiltEntities[17] && !BuiltEntities[18] && !BuiltEntities[19] && !BuiltEntities[20] && !BuiltEntities[21]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('NothingTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                });
            }
            if (BuiltEntities[20]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllMailTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[18]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllPeopleTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[17]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TotalProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[17]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('CurrentProjectTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[0]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('TeamTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root')
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[1]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllResponsabilityTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[2]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('AllRoleTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[3]) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('FindAllTemp');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            }
            if (BuiltEntities[21]) {
                var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'research');
                session.send(ResearchTemp);
            }
            if (BuiltEntities[13]) {
                var RELUTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'relu-core');
                session.send(RELUTemp);
            }
            if (BuiltEntities[12]) {
                var WebTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_website');
                session.send(WebTemp);
            }
            if (BuiltEntities[11]) {
                var FastTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'fast_ink');
                session.send(FastTemp);
            }
            if (BuiltEntities[15]) {
                var ParseTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_parse');
                session.send(ParseTemp);
            }
            if (BuiltEntities[14]) {
                var UtilitiesTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'utilities');
                session.send(UtilitiesTemp);
            }
            if (BuiltEntities[10]) {
                var ZizTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_ziz');
                session.send(ZizTemp);
            }
            if (BuiltEntities[9]) {
                var FantinatoTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
                session.send(FantinatoTemp);
            }
            if (BuiltEntities[8]) {
                var GreggioTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
                session.send(GreggioTemp);
            }
            if (BuiltEntities[5]) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                session.send(OrfeiTemp);
            }
            if (BuiltEntities[6]) {
                var LucchiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
                session.send(LucchiTemp);
            }
            if (BuiltEntities[7]) {
                var ZancanaroTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
                session.send(ZancanaroTemp);
            }
            if (BuiltEntities[4]) {
                var BullshitTemp = getBullshit(session);
                session.send(BullshitTemp);
            }
            if (BuiltEntities[9] && BuiltEntities[2]) {
                var FantinatoRole = getPeopleRole(session, persone, 'ruolo', 'fantinato');
                session.send(FantinatoRole);
            }
            if (BuiltEntities[8] && BuiltEntities[2]) {
                var GreggioRole = getPeopleRole(session, persone, 'ruolo', 'greggio');
                session.send(GreggioRole);
            }
            if (BuiltEntities[7] && BuiltEntities[2]) {
                var ZancanaroRole = getPeopleRole(session, persone, 'ruolo', 'zancanaro');
                session.send(ZancanaroRole);
            }
            if (BuiltEntities[6] && BuiltEntities[2]) {
                var LucchiRole = getPeopleRole(session, persone, 'ruolo', 'lucchi');
                session.send(LucchiRole);
            }
            if (BuiltEntities[5] && BuiltEntities[2]) {
                var OrfeiRole = getPeopleRole(session, persone, 'ruolo', 'orfei');
                session.send(OrfeiRole);
            }
            if (BuiltEntities[9] && BuiltEntities[1]) {
                var FantinatoRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoRes);
            }
            if (BuiltEntities[8] && BuiltEntities[1]) {
                var GreggioRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioRes);
            }
            if (BuiltEntities[7] && BuiltEntities[1]) {
                var ZancanaroRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroRes);
            }
            if (BuiltEntities[6] && BuiltEntities[1]) {
                var LucchiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiRes);
            }
            if (BuiltEntities[5] && BuiltEntities[1]) {
                var OrfeiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'orfei');
                session.send(OrfeiRes);
            }
            if (BuiltEntities[9] && BuiltEntities[20]) {
                var FantinatoMail = getPeopleMail(session, persone, 'mail', 'fantinato');
                session.send(FantinatoMail);
            }
            if (BuiltEntities[8] && BuiltEntities[20]) {
                var GreggioMail = getPeopleMail(session, persone, 'mail', 'greggio');
                session.send(GreggioMail);
            }
            if (BuiltEntities[7] && BuiltEntities[20]) {
                var ZancanaroMail = getPeopleMail(session, persone, 'mail', 'zancanaro');
                session.send(ZancanaroMail);
            }
            if (BuiltEntities[6] && BuiltEntities[20]) {
                var LucchiMail = getPeopleMail(session, persone, 'mail', 'lucchi');
                session.send(LucchiMail);
            }
            if (BuiltEntities[5] && BuiltEntities[20]) {
                var OrfeiMail = getPeopleMail(session, persone, 'mail', 'orfei');
                session.send(OrfeiMail);
            }
            if (BuiltEntities[9] && BuiltEntities[17]) {
                var FantinatoProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoProjects);
            }
            if (BuiltEntities[8] && BuiltEntities[17]) {
                var GreggioProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioProjects);
            }
            if (BuiltEntities[7] && BuiltEntities[17]) {
                var ZancanaroProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroProjects);
            }
            if (BuiltEntities[6] && BuiltEntities[17]) {
                var LucchiProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiProjects);
            }
            if (BuiltEntities[5] && BuiltEntities[17]) {
                var OrfeiProject = getPeopleProject(session, persone, 'progetti_assegnati', 'orfei');
                session.send(OrfeiProject);
            }
            if (BuiltEntities[10] && BuiltEntities[1]) {
                var ZizGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_ziz');
                session.send(ZizGestioneTemp);
            }
            if (BuiltEntities[15] && BuiltEntities[1]) {
                var ParseGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_parse');
                session.send(ParseGestioneTemp);
            }
            if (BuiltEntities[12] && BuiltEntities[1]) {
                var WebGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_website');
                session.send(WebGestioneTemp);
            }
            if (BuiltEntities[11] && BuiltEntities[1]) {
                var FastInkGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'fast_ink');
                session.send(FastInkGestioneTemp);
            }
            if (BuiltEntities[13] && BuiltEntities[1]) {
                var RELUGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'relu-core');
                session.send(RELUGestioneTemp);
            }
            if (BuiltEntities[14] && BuiltEntities[1]) {
                var UtilitiesGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'utilities');
                session.send(UtilitiesGestioneTemp);
            }
            if (BuiltEntities[13] && BuiltEntities[3]) {
                var RELUTemp = getProjectFind(session, works, 'link_repo', 'relu-core');
                session.send(TPBMCTemp);
            }
            if (BuiltEntities[12] && BuiltEntities[3]) {
                var WebTemp = getProjectFind(session, works, 'link_repo', 'project_website');
                session.send(WebTemp);
            }
            if (BuiltEntities[11] && BuiltEntities[3]) {
                var FastTemp = getProjectFind(session, works, 'link_repo', 'fast_ink');
                session.send(FastTemp);
            }
            if (BuiltEntities[15] && BuiltEntities[3]) {
                var ParseTemp = getProjectFind(session, works, 'link_repo', 'project_parse');
                session.send(ParseTemp);
            }
            if (BuiltEntities[14] && BuiltEntities[3]) {
                var UtilitiesTemp = getProjectFind(session, works, 'link_repo', 'utilities');
                session.send(UtilitiesTemp);
            }
            if (BuiltEntities[10] && BuiltEntities[3]) {
                var ZizTemp = getProjectFind(session, works, 'link_repo', 'project_ziz');
                session.send(ZizTemp);
            }
            if (BuiltEntities[5] && BuiltEntities[6]) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var LucchiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
                session.send(OrfeiTemp);
                session.send(LucchiTemp);
            }
            if (BuiltEntities[5] && BuiltEntities[9]) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var FantinatoTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
                session.send(OrfeiTemp);
                session.send(FantinatoTemp);
            }
            if (BuiltEntities[5] && BuiltEntities[7]) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var ZancanaroTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
                session.send(OrfeiTemp);
                session.send(ZancanaroTemp);
            }
            if (BuiltEntities[5] && BuiltEntities[8]) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var GreggioTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
                session.send(OrfeiTemp);
                session.send(GreggioTemp);
            }
        }
    ])
    .matches('Skills', [
        function(session, args, results) {
            session.send("Io sono un bot che fornisce informazioni riguardo al team perso. Puoi chiedermi informazioni sui membri, sui progetti correnti e suoi progetti totali. Posso dirti chi gestisce i vari progetti e chi sono i capi delle vaie divisioni. Se vuoi vedere o provare i nostri progetti posso fornirti anche il link, l'unica cosa che devi fare è chiedere");
            session.beginDialog('Root');
        }
    ])
    /*.matches('Modify', [
        function(session, args, results) {

        }
    ])*/
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
        var title = ['Project Parse', 'Utilities', 'RELU', 'Project Ziz', 'Fast Ink', 'Website', 'Research'];
        var text = ['Informazione sul progetto Parse', 'Informazioni su utilities', 'Informazioni su RELU', 'Informazioni sul progetto Ziz', 'Informazioni su fast ink', 'Informazioni su Website'];
        var buttonReturn = ['informazioni sul progetto parse', 'gestione del progetto parse', 'informazioni su utilities', 'gestione di utilities', 'informazioni su RELU', 'gestione di RELU', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni su fast ink', 'gestione di fast ink', 'informazioni sul progetto website', 'gestione del progetto website', 'informazioni su research', 'gestione di research'];
        var buttonText = ['Info', 'Gestione'];
        var totalProjectCards = HerocardCreator.CreateCards(session, 7, title, text, 2, '', buttonReturn, buttonText);
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
            case "informazioni su research":
                var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'research');
                session.send(ResearchTemp);
                session.beginDialog('Root');
                break;
            case "gestione di research":
                var ResearchTempGestione = getProjectGestione(session, works, 'capo_progetto', 'research');
                session.send(ResearchTempGestione);
                session.beginDialog('Root');
                break;
        }
    }
])

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
                var OrfeiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'orfei');
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
                var LucchiRuolo = getPeopleRole(session, persone, 'ruolo', 'lucchi');
                session.send(LucchiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su lucchi":
                var LucchiInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
                session.send(LucchiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di lucchi":
                var LucchiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiRes);
                session.beginDialog('Root');
                break;
            case "progetti di lucchi":
                var LucchiProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiProjects);
                session.beginDialog('Root');
                break;
            case "mail di lucchi":
                var LucchiMail = getPeopleMail(session, persone, 'mail', 'lucchi');
                session.send(LucchiMail);
                break;
            case "ruolo di zancanaro":
                var ZancanaroRuolo = getPeopleRole(session, persone, 'ruolo', 'zancanaro');
                session.send(ZancanaroRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su zancanaro":
                var ZancanaroInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
                session.send(ZancanaroInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di zancanaro":
                var ZancanaroRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroRes);
                session.beginDialog('Root');
                break;
            case "progetti di zancanaro":
                var ZancanaroProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroProjects);
                session.beginDialog('Root');
                break;
            case "email di zancanaro":
                var ZancanaroMail = getPeopleMail(session, persone, 'mail', 'zancanaro');
                session.send(ZancanaroMail);
                break;
            case "ruolo di fantinato":
                var FantinatoRuolo = getPeopleRole(session, persone, 'ruolo', 'fantinato');
                session.send(FantinatoRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su fantinato":
                var FantinatoInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
                session.send(FantinatoInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di fantinato":
                var FantinatoRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoRes);
                session.beginDialog('Root');
                break;
            case "progetti di fantinato":
                var FantinatoProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoProjects);
                session.beginDialog('Root');
                break;
            case "email di fantinato":
                var FantinatoMail = getPeopleMail(session, persone, 'mail', 'fantinato');
                session.send(FantinatoMail);
                break;
            case "ruolo di greggio":
                var GreggioRuolo = getPeopleRole(session, persone, 'ruolo', 'greggio');
                session.send(GreggioRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su greggio":
                var GreggioInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
                session.send(GreggioInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di greggio":
                var GreggioRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioRes);
                session.beginDialog('Root');
                break;
            case "progetti di greggio":
                var GreggioProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioProjects);
                session.beginDialog('Root');
                break;
            case "email di greggio":
                var GreggioMail = getPeopleMail(session, persone, 'mail', 'greggio');
                session.send(GreggioMail);
                break;
        }
    }
])

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
        var text = ['Informazioni su RELU', 'Informazioni su Utilities', 'Informazioni su Ziz', 'Informazioni su Website', 'Informazioni su Research'];
        var buttonReturn = ['informazioni su RELU', 'gestione di RELU', 'informazioni su utilities', 'gestione di utilities', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni sul progetto website', 'gestione del progetto website', 'informazioni su research', 'gestione di research'];
        var buttonText = ['Info', 'Gestione'];
        var CurrentProjectCards = HerocardCreator.CreateCards(session, 5, title, text, 2, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(CurrentProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
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
            case "informazioni sul progetto ziz":
                var ZizTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_ziz');
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_ziz');
                session.send(getZizGestione);
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
            case "informazioni su research":
                var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'research');
                session.send(ResearchTemp);
                session.beginDialog('Root');
                break;
            case "gestione di research":
                var ResearchTemp = getProjectGestione(session, works, 'capo_progetto', 'research');
                session.send(ResearchTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su RELU":
                var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'relu-core');
                session.send(ResearchTemp);
                session.beginDialog('Root');
                break;
            case "gestione di RELU":
                var RELUTemp = getProjectGestione(session, works, 'capo_progetto', 'relu-core');
                session.send(RELUTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

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
                var OrfeiMail = getPeopleMail(session, persone, 'mail', 'orfei');
                session.send(OrfeiMail);
                session.beginDialog('Root');
                break;
            case "email di lucchi":
                var LucchiMail = getPeopleMail(session, persone, 'mail', 'lucchi');
                session.send(LucchiMail);
                session.beginDialog('Root');
                break;
            case "email di fantinato":
                var FantinatoMail = getPeopleMail(session, persone, 'mail', 'fantinato');
                session.send(FantinatoMail);
                session.beginDialog('Root');
                break;
            case "email di zancanaro":
                var ZancanaroMail = getPeopleMail(session, persone, 'mail', 'zancanaro');
                session.send(ZancanaroMail);
                session.beginDialog('Root');
                break;
            case "email di greggio":
                var GreggioMail = getPeopleMail(session, persone, 'mail', 'greggio');
                session.send(GreggioMail);
                session.beginDialog('Root');
                break;
        }
    }
])

bot.dialog('FindAllTemp', [
    function(session) {
        session.send("Scegli il progetto che vuoi trovare");
        var title = ['Project Ziz', 'Project Parse', 'Utilities', 'Website', 'Fast Ink', 'RELU', 'Research'];
        var text = ['Link project Ziz', 'Link Project Parse', 'Link Utilities', 'Link Utilities', 'Link Fast Ink', 'Link RELU', 'Link Research'];
        var buttonReturn = ['link project ziz', 'link progetto parse', 'link utilities', 'link progetto website', 'link fast ink', 'link RELU', 'link research'];
        var buttonText = ['Link'];
        var FindCArds = HerocardCreator.CreateCards(session, 7, title, text, 1, '', buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(FindCArds)

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "link progetto ziz":
                var ZizTemp = getProjectFind(session, works, 'link_repo', 'project_ziz');
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "link progetto parse":
                var ParseTemp = getProjectFind(session, works, 'link_repo', 'project_parse');
                session.send(ParseTemp);
                session.beginDialog('Root');
                break;
            case "link utilities":
                var UtilitiesTemp = getProjectFind(session, works, 'link_repo', 'utilities');
                session.send(UtilitiesTemp);
                session.beginDialog('Root');
                break;
            case "link progetto website":
                var WebTemp = getProjectFind(session, works, 'link_repo', 'project_website');
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "link fast ink":
                var FastTemp = getProjectFind(session, works, 'link_repo', 'fast_ink');
                session.send(FastTemp);
                session.beginDialog('Root');
                break;
            case "link RELU":
                var BotTemp = getProjectFind(session, works, 'link_repo', 'relu-core');
                session.send(BotTemp);
                session.beginDialog('Root');
                break;
            case "link research":
                var ResearchTemp = getProjectFind(session, works, 'link_repo', 'research');
                session.send(ResearchTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

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

//------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleResponsability(session, json, assegnati, name) {
    var assigned = JsonModifier.JsonReader(session, json, assegnati, name);
    return (name + " per ora si occupa di " + assigned);
}