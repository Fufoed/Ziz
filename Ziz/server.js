'use strict';
var http = require('http');

var port = process.env.PORT || 1337;

var botbuilder = require('botbuilder');

var relucore = require('relu-core');

var promise = require('promise');

var rp = require('rp');

var restify = require('restify');

var async = require('async');

var easterEgg = require('./Database/EasterEgg.json');

var works = require('./Database/Projects');

var persone = require('./Database/Members');

var roadMap = require('./Database/RoadMap');

var books = require('./Database/Books');

var schema = require('./Database/schema.json');

var contacts = require('./Database/Contacts');

var general = require('./Database/General');

var ideas = require('./Database/Ideas');

var rules = require('./Database/Rules');

//--------------------------------------------------------------------------------------------------------------------------------------------

var connector = new botbuilder.ChatConnector({
    appId: 'e2232fc4-92d3-4895-84a8-a8d2632a6ff4',
    appPassword: 'G6JS97UjmzAicaMvJuviG3Z'
});

var intent = new botbuilder.IntentDialog();

var bot = new botbuilder.UniversalBot(connector);

var server = restify.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
});

server.listen(process.env.port || process.env.PORT || 3978,
    function() {
        console.log(server.name + " Listening to " + server.url);
    });

/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/

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
            team_perso = botbuilder.EntityRecognizer.findEntity(args.entities, 'Team_Perso');
            responsability = botbuilder.EntityRecognizer.findEntity(args.entities, 'responsability');
            role = botbuilder.EntityRecognizer.findEntity(args.entities, 'role');
            find = botbuilder.EntityRecognizer.findEntity(args.entities, 'find');
            easter_egg = botbuilder.EntityRecognizer.findEntity(args.entities, 'easter_egg');
            orfei = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::orfei');
            lucchi = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::lucchi');
            zancanaro = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::zancanaro');
            greggio = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::greggio');
            fantinato = botbuilder.EntityRecognizer.findEntity(args.entities, 'people::fantinato');
            ziz = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::ziz');
            fast_ink = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::fast ink');
            website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');
            RELU = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::RELU');
            utilities = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::utilities');
            parse = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::parse');
            current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            email = botbuilder.EntityRecognizer.findEntity(args.entities, 'email');
            research = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::research');

            if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !greggio && !fantinato && !ziz && !fast_ink && !website && !RELU && !utilities && !parse && !current_project && !total_project && !total_people && !email && !research) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('/Nothing');
                    },
                    function(callback) {
                        session.beginDialog('Root');
                    }
                ])
            }
            if (email) {
                session.beginDialog('/AllMail');
            }
            if (total_people) {
                session.beginDialog('/AllPeople');
            }
            if (total_project) {
                session.beginDialog('/TotalProject');
            }
            if (current_project) {
                session.beginDialog('/CurrentProject');
            }
            if (team_perso) {
                session.beginDialog('/Team');
            }
            if (responsability) {
                session.beginDialog('/AllResponsability');
            }
            if (role) {
                session.beginDialog('/AllRole');
            }
            if (find) {
                session.beginDialog('/FindAll');
            }
            if (research) {
                var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'research');
                session.send(ResearchTemp);
            }
            if (RELU) {
                var RELUTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'relu-core');
                session.send(RELUTemp);
            }
            if (website) {
                var WebTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_website');
                session.send(WebTemp);
            }
            if (fast_ink) {
                var FastTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'fast_ink');
                session.send(FastTemp);
            }
            if (parse) {
                var ParseTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_parse');
                session.send(ParseTemp);
            }
            if (utilities) {
                var UtilitiesTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'utilities');
                session.send(UtilitiesTemp);
            }
            if (ziz) {
                var ZizTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_ziz');
                session.send(ZizTemp);
            }
            if (fantinato) {
                var FantinatoTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
                session.send(FantinatoTemp);
            }
            if (greggio) {
                var GreggioTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
                session.send(GreggioTemp);
            }
            if (orfei) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                session.send(OrfeiTemp);
            }
            if (lucchi) {
                var LucchiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
                session.send(LucchiTemp);
            }
            if (zancanaro) {
                var ZancanaroTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
                session.send(ZancanaroTemp);
            }
            if (easter_egg) {
                var BullshitTemp = getBullshit(session);
                session.send(BullshitTemp);
            }
            if (fantinato && role) {
                var FantinatoRole = getPeopleRole(session, persone, 'ruolo', 'fantinato');
                session.send(FantinatoRole);
            }
            if (greggio && role) {
                var GreggioRole = getPeopleRole(session, persone, 'ruolo', 'greggio');
                session.send(GreggioRole);
            }
            if (zancanaro && role) {
                var ZancanaroRole = getPeopleRole(session, persone, 'ruolo', 'zancanaro');
                session.send(ZancanaroRole);
            }
            if (lucchi && role) {
                var LucchiRole = getPeopleRole(session, persone, 'ruolo', 'lucchi');
                session.send(LucchiRole);
            }
            if (orfei && role) {
                var OrfeiRole = getPeopleRole(session, persone, 'ruolo', 'orfei');
                session.send(OrfeiRole);
            }
            if (fantinato && responsability) {
                var FantinatoRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoRes);
            }
            if (greggio && responsability) {
                var GreggioRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioRes);
            }
            if (zancanaro && responsability) {
                var ZancanaroRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroRes);
            }
            if (lucchi && responsability) {
                var LucchiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiRes);
            }
            if (orfei && responsability) {
                var OrfeiRes = getPeopleResponsability(session, persone, 'progetti_assegnati', 'orfei');
                session.send(OrfeiRes);
            }
            if (fantinato && email) {
                var FantinatoMail = getPeopleMail(session, persone, 'mail', 'fantinato');
                session.send(FantinatoMail);
            }
            if (greggio && email) {
                var GreggioMail = getPeopleMail(session, persone, 'mail', 'greggio');
                session.send(GreggioMail);
            }
            if (zancanaro && email) {
                var ZancanaroMail = getPeopleMail(session, persone, 'mail', 'zancanaro');
                session.send(ZancanaroMail);
            }
            if (lucchi && email) {
                var LucchiMail = getPeopleMail(session, persone, 'mail', 'lucchi');
                session.send(LucchiMail);
            }
            if (orfei && email) {
                var OrfeiMail = getPeopleMail(session, persone, 'mail', 'orfei');
                session.send(OrfeiMail);
            }
            if (fantinato && total_project) {
                var FantinatoProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'fantinato');
                session.send(FantinatoProjects);
            }
            if (greggio && total_project) {
                var GreggioProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'greggio');
                session.send(GreggioProjects);
            }
            if (zancanaro && total_project) {
                var ZancanaroProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'zancanaro');
                session.send(ZancanaroProjects);
            }
            if (lucchi && total_project) {
                var LucchiProjects = getPeopleProject(session, persone, 'progetti_assegnati', 'lucchi');
                session.send(LucchiProjects);
            }
            if (orfei && total_project) {
                var OrfeiProject = getPeopleProject(session, persone, 'progetti_assegnati', 'orfei');
                session.send(OrfeiProject);
            }
            if (ziz && responsability) {
                var ZizGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_ziz');
                session.send(ZizGestioneTemp);
            }
            if (parse && responsability) {
                var ParseGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_parse');
                session.send(ParseGestioneTemp);
            }
            if (website && responsability) {
                var WebGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'project_website');
                session.send(WebGestioneTemp);
            }
            if (fast_ink && responsability) {
                var FastInkGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'fast_ink');
                session.send(FastInkGestioneTemp);
            }
            if (RELU && responsability) {
                var RELUGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'relu-core');
                session.send(RELUGestioneTemp);
            }
            if (utilities && responsability) {
                var UtilitiesGestioneTemp = getProjectGestione(session, works, 'capo_progetto', 'utilities');
                session.send(UtilitiesGestioneTemp);
            }
            if (RELU && find) {
                var RELUTemp = getProjectFind(session, works, 'link_repo', 'relu-core');
                session.send(TPBMCTemp);
            }
            if (website && find) {
                var WebTemp = getProjectFind(session, works, 'link_repo', 'project_website');
                session.send(WebTemp);
            }
            if (fast_ink && find) {
                var FastTemp = getProjectFind(session, works, 'link_repo', 'fast_ink');
                session.send(FastTemp);
            }
            if (parse && find) {
                var ParseTemp = getProjectFind(session, works, 'link_repo', 'project_parse');
                session.send(ParseTemp);
            }
            if (utilities && find) {
                var UtilitiesTemp = getProjectFind(session, works, 'link_repo', 'utilities');
                session.send(UtilitiesTemp);
            }
            if (ziz && find) {
                var ZizTemp = getProjectFind(session, works, 'link_repo', 'project_ziz');
                session.send(ZizTemp);
            }
            if (orfei && lucchi) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var LucchiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
                session.send(OrfeiTemp);
                session.send(LucchiTemp);
            }
            if (orfei && fantinato) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var FantinatoTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
                session.send(OrfeiTemp);
                session.send(FantinatoTemp);
            }
            if (orfei && zancanaro) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var ZancanaroTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
                session.send(OrfeiTemp);
                session.send(ZancanaroTemp);
            }
            if (orfei && greggio) {
                var OrfeiTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
                var GreggioTemp = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
                session.send(OrfeiTemp);
                session.send(GreggioTemp);
            }
        }
    ])
    .matches('Skills', [
        function(session, args, results) {
            session.send("Io sono un bot che fornisce informazioni riguardo al team perso. Puoi chiedermi informazioni sui membri, sui progetti correnti e suoi progetti totali. Posso dirti chi gestisce i vari progetti e chi sono i capi delle vaie divisioni. Se vuoi vedere o provare i nostri progetti posso fornirti anche il link, l'unica cosa che devi fare ? chiedere");
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

bot.dialog('/Nothing', [
    function(session) {
        var title = ['Persone', 'Progetti Totali', 'Progetti Correnti', 'Team Perso'];
        var text = ['Informazioni sulle persone', 'Informazioni sui progetti totali', 'Informazioni sui progetti correnti', 'Informazioni sul team'];
        var linkImages = ['http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'http://www.elia-group.com/images/team1.jpg'];
        var buttonDialog = ['Team', 'TotalProject', 'CurrentProject', 'AllPeople'];
        var buttonText = ['Persone', 'Progetti totali', 'Progetti correnti', 'Team'];
        var nothingCards = relucore.ReluCard(session, 4, title, text, 1, linkImages, buttonDialog, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(nothingCards);
        session.send("Scegli una delle opzioni");
        session.send(reply);
    }
])


bot.dialog('/Team', [
    function(session) {
        session.send("Cosa vuoi sapere del team?");
        var title = ['Membri', 'Ruoli', 'Progetti totali', 'Progetti correnti', 'Responsabilita', 'Info'];
        var text = ['Informazioni sui membri', 'Informazioni sui ruoli', 'Informazioni su tutti i progetti', 'Informazioni sui progetti correnti', 'Responsabilita dei membri', 'Informazioni sul team perso'];
        var linkImages = ['http://www.unienergygroup.com/public/componenti/284/f1/Icona%20contatti.png', 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png', 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg', ''];
        var buttonDialog = ['AllPeople', 'AllRole', 'TotalProject', 'CurrentProject', 'AllResponsability', 'informazioni'];
        var buttonText = ['Persone', 'Ruoli', 'Progetti totali', 'Progetti correnti', 'Responsabilita', 'TeamInformazioni'];
        var teamCards = relucore.ReluCard(session, 6, title, text, 1, linkImages, buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(teamCards);

        session.send(reply);
    }
])

bot.dialog('/TotalProject', [
    function(session) {
        session.send("Cosa vuoi sapere sui progetti?");
        var title = ['Project Parse', 'Utilities', 'RELU', 'Project Ziz', 'Fast Ink', 'Website', 'Research'];
        var text = ['Informazione sul progetto Parse', 'Informazioni su utilities', 'Informazioni su RELU', 'Informazioni sul progetto Ziz', 'Informazioni su fast ink', 'Informazioni su Website'];
        var buttonReturn = ['informazioni sul progetto parse', 'gestione del progetto parse', 'informazioni su utilities', 'gestione di utilities', 'informazioni su RELU', 'gestione di RELU', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni su fast ink', 'gestione di fast ink', 'informazioni sul progetto website', 'gestione del progetto website', 'informazioni su research', 'gestione di research'];
        var buttonText = ['Info', 'Gestione'];
        var totalProjectCards = relucore.ReluCard(session, 7, title, text, 2, '', buttonReturn, buttonText);
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

bot.dialog('/AllRole', [
    function(session) {
        session.send("Di chi vuoi sapere il ruolo?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Greggio', 'Zancanaro'];
        var text = ['Ruolo di Orfei', 'Ruolo di Lucchi', 'Ruolo di Fantinato', 'Ruolo di Greggio', 'Ruolo di Zancanaro'];
        var buttonReturn = ['ruolo di orfei', 'ruolo di lucchi', 'ruolo di fantinato', 'ruolo di greggio', 'ruolo di zancanaro'];
        var buttonText = ['Ruolo'];
        var roleCards = relucore.ReluCard(session, 5, title, text, 1, '', buttonReturn, buttonText);
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

bot.dialog('/AllPeople', [
    function(session) {
        session.send("Queste sono le persone appartenenti al team perso. Vuoi sapere altro?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Zancanaro'];
        var text = ['Informazioni su Orfei', 'Informazioni su Lucchi', 'Informazioni su Fantinato', 'Informazioni su Zancanaro'];
        var buttonReturn = ['informazioni su orfei', 'responsabilita di orfei', 'email di orfei', 'ruolo di orfei', 'progetti di orfei', 'informazioni su lucchi', 'responsabilita di lucchi', 'email di lucchi', 'ruolo di lucchi', 'progetti di lucchi', 'informazioni su fantinato', 'responsabilita di fantinato', 'email di fantinato', 'ruolo di fantinato', 'progetti di fantinato', 'informazioni su zancanaro', 'responsabilita di zancanaro', 'email di zancanaro', 'ruolo di zancanaro', 'progetti di zancanaro'];
        var buttonText = ['Info', 'Responsabilita', 'Email', 'Ruolo', 'Progetti'];
        var PeopleCards = relucore.ReluCard(session, 5, title, text, 5, '', buttonReturn, buttonText);
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
            case "responsabilita di orfei":
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
            case "responsabilita di lucchi":
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
            case "responsabilita di zancanaro":
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
            case "responsabilita di fantinato":
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
            case "responsabilita di greggio":
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

bot.dialog('/CurrentProject', [
    function(session) {
        session.send("Questi sono i progetti correnti");
        var title = ['RELU', 'Utilities', 'Project Ziz', 'Website'];
        var text = ['Informazioni su RELU', 'Informazioni su Utilities', 'Informazioni su Ziz', 'Informazioni su Website', 'Informazioni su Research'];
        var buttonReturn = ['informazioni su RELU', 'gestione di RELU', 'informazioni su utilities', 'gestione di utilities', 'informazioni sul progetto ziz', 'gestione del progetto ziz', 'informazioni sul progetto website', 'gestione del progetto website', 'informazioni su research', 'gestione di research'];
        var buttonText = ['Info', 'Gestione'];
        var CurrentProjectCards = relucore.ReluCard(session, 5, title, text, 2, '', buttonReturn, buttonText);
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

bot.dialog('/AllMail', [
    function(session) {
        session.send("Di chi vuoi sapere la mail?");
        var title = ['Orfei', 'Lucchi', 'Fantinato', 'Greggio', 'Zancanaro', 'Quinto', 'Chiarin', 'Nunzio'];
        var text = ['Email di Orfei', 'Email di Lucchi', 'Email di Fantinato', 'Email di Greggio', 'Email di Zancanaro', 'Email di Quinto', 'Email di Chiarin', 'Email di Nunzio'];
        var buttonReturn = ['email di orfei', 'email di lucchi', 'email di fantinato', 'email di greggio', 'email di zancanaro', 'email di quinto', 'email di chiarin', 'email di nunzio'];
        var buttonText = ['Email'];
        var MailCards = relucore.ReluCard(session, 8, title, text, 1, '', buttonReturn, buttonText);
        var reply = new botbuilder.Message(session)
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

bot.dialog('/FindAll', [
    function(session) {
        session.send("Scegli il progetto che vuoi trovare");
        var title = ['Project Ziz', 'Project Parse', 'Utilities', 'Website', 'Fast Ink', 'RELU', 'Research'];
        var text = ['Link project Ziz', 'Link Project Parse', 'Link Utilities', 'Link Utilities', 'Link Fast Ink', 'Link RELU', 'Link Research'];
        var buttonReturn = ['link project ziz', 'link progetto parse', 'link utilities', 'link progetto website', 'link fast ink', 'link RELU', 'link research'];
        var buttonText = ['Link'];
        var FindCArds = relucore.ReluCard(session, 7, title, text, 1, '', buttonText);
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
    var project_mantain = relucore.ReluConfig.JsonReader(session, json, mantain, name);
    var gitUser = relucore.ReluConfig.JsonReader(session, json, gitusername, name);
    var project_assigned = relucore.ReluConfig.JsonReader(session, json, assigned, name);
    var person_role = relucore.ReluConfig.JsonReader(session, json, role, name);
    var spec = relucore.ReluConfig.JsonReader(session, json, speciality, name);
    var email = relucore.ReluConfig.JsonReader(session, json, mail, name);
    var person_nickname = relucore.ReluConfig.JsonReader(session, json, nickname, name);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": name,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                            "title": "Progetti da mantenere",
                            "value": project_mantain
                        },
                        {
                            "title": "Username github",
                            "value": gitUser
                        },
                        {
                            "title": "Progetti assegnati",
                            "value": project_assigned
                        },
                        {
                            "title": "Ruolo",
                            "value": person_role
                        },
                        {
                            "title": "Specialita",
                            "value": spec
                        },
                        {
                            "title": "Email",
                            "value": email
                        },
                        {
                            "title": "Nickname",
                            "value": person_nickname
                        }
                    ]
                }
            ]
        }
    })
    return (msg);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleRole(session, json, role, name) {
    var person_role = relucore.ReluConfig.JsonReader(session, json, role, name)
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": name,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Ruolo",
                        "value": person_role
                    }]
                }
            ]
        }
    })
    return (msg);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

function getProjectInformation(session, json, type, description, chief, link_repo, begin_develop, end_develop, version, support, how_going, member, note, project) {
    var project_type = relucore.ReluConfig.JsonReader(session, json, type, project);
    var project_description = relucore.ReluConfig.JsonReader(session, json, description, project);
    var project_chief = relucore.ReluConfig.JsonReader(session, json, chief, project);
    var project_link_repo = relucore.ReluConfig.JsonReader(session, json, link_repo, project);
    var project_begin_develop = relucore.ReluConfig.JsonReader(session, json, begin_develop, project);
    var project_end_develop = relucore.ReluConfig.JsonReader(session, json, end_develop, project);
    var project_version = relucore.ReluConfig.JsonReader(session, json, version, project);
    var project_support = relucore.ReluConfig.JsonReader(session, json, support, project);
    var project_how_going = relucore.ReluConfig.JsonReader(session, json, how_going, project);
    var project_member = relucore.ReluConfig.JsonReader(session, json, member, project);
    var project_note = relucore.ReluConfig.JsonReader(session, json, note, project);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": project,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                            "title": "Tipo",
                            "value": project_type
                        },
                        {
                            "title": "Descrizione",
                            "value": project_description
                        },
                        {
                            "title": "Capo",
                            "value": chief
                        },
                        {
                            "title": "Link",
                            "value": project_link_repo
                        },
                        {
                            "title": "Inizio sviluppo",
                            "value": project_begin_develop
                        },
                        {
                            "title": "Fine sviluppo",
                            "value": project_end_develop
                        },
                        {
                            "title": "Versione",
                            "value": project_version
                        },
                        {
                            "title": "Supporto",
                            "value": project_support
                        },
                        {
                            "title": "Come procede",
                            "value": project_how_going
                        },
                        {
                            "title": "Membri",
                            "value": project_member
                        },
                        {
                            "title": "Note",
                            "value": project_note
                        }
                    ]
                }
            ]
        }
    })
    return (msg);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleProject(session, json, assigned, name) {
    var project = relucore.ReluConfig.JsonReader(session, json, assigned, name);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": name,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Progetti",
                        "value": project
                    }]
                }
            ]
        }
    })
    return (msg);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function getTeamInformation(session, json, nProject, nMembers, MemberList, ProjectList, link) {
    var Projects = relucore.ReluConfig.JsonReader(session, json, nProject);
    var ListProject = relucore.ReluConfig.JsonReader(session, json, ProjectList);
    var site_link = relucore.ReluConfig.JsonReader(session, json, link);
    var Members = relucore.ReluConfig.JsonReader(session, json, nMembers);
    var ListMember = relucore.ReluConfig.JsonReader(session, json, MemberList);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": "Team Perso",
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                            "title": "Progetti",
                            "value": Projects
                        },
                        {
                            "title": "Link",
                            "value": site_link
                        },
                        {
                            "title": "Membri",
                            "value": ListMember
                        }
                    ]
                }
            ]
        }
    })
    return (msg);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------

function getBullshit(session) {
    return bullshit[(parseInt(Math.random() * bullshit.length) | 0)];
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleMail(session, json, mail, name) {
    var email = relucore.ReluConfig.JsonReader(session, json, mail, name);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": name,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Email",
                        "value": email
                    }]
                }
            ]
        }
    })
    return (msg);
}

//-----------------------------------------------------------------------------------------------------------

function getProjectFind(session, json, link, project) {
    var link_project = relucore.ReluConfig.JsonReader(session, json, link, project);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": project,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Link",
                        "value": link_project
                    }]
                }
            ]
        }
    })
    return (msg);
}

//--------------------------------------------------------------------------------------------------------------------------------------

function getProjectGestione(session, json, chief, project) {
    var boss = relucore.ReluConfig.JsonReader(session, json, chief, project);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": chief,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Gestione",
                        "value": boss + "ha fatto " + project
                    }]
                }
            ]
        }
    })
    return (msg);
}

//------------------------------------------------------------------------------------------------------------------------------------------

function getPeopleResponsability(session, json, assegnati, name) {
    var assigned = relucore.ReluConfig.JsonReader(session, json, assegnati, name);
    var msg = new botbuilder.Message(session).addAttachment({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "body": [{
                    "type": "TextBlock",
                    "text": name,
                    "weight": "bolder"
                },
                {
                    "separation": "strong",
                    "type": "FactSet",
                    "facts": [{
                        "title": "Assegnati",
                        "value": assigned
                    }]
                }
            ]
        }
    })
    return (msg);
}

//------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------

bot.beginDialogAction('Team', '/ProtoTeam');

bot.beginDialogAction('TeamInfo', '/ProtoTeamInfo');

bot.beginDialogAction('TotalProject', '/ProtoTotalProject');

bot.beginDialogAction('CurrentProject', '/ProtoCurrentProject');

bot.beginDialogAction('AllPeople', '/ProtoAllPeople');

bot.beginDialogAction('AllRole', '/ProtoAllRole');

bot.beginDialogAction('AllResponsability', '/ProtoAllResponsability');

bot.beginDialogAction('FindAll', '/ProtoFindAll');

bot.beginDialogAction('AllMail', '/ProtoAllMail');

bot.beginDialogAction('TeamInformation', '/ProtoTeamInfo');

bot.beginDialogAction('ParseInfo', '/ProtoParseInfo');

bot.beginDialogAction('FastInfo', '/ProtoFastInfo');

bot.beginDialogAction('ZizInfo', '/ProtoZizInfo');

bot.beginDialogAction('UtilitiesInfo', '/ProtoUtilitiesInfo');

bot.beginDialogAction('ResearchInfo', '/ProtoResearchInfo');

bot.beginDialogAction('OrfeiInfo', '/ProtoOrfeiInfo');

bot.beginDialogAction('LucchiInfo', '/ProtoLucchiInfo');

bot.beginDialogAction('FantinatoInfo', '/ProtoFantinatoInfo');

bot.beginDialogAction('GreggioInfo', '/ProtoGreggioInfo');

bot.beginDialogAction('ZancanaroInfo', '/ProtoZancanaroInfo');

bot.beginDialogAction('LucchiMail', '/ProtoLucchiMail');

bot.beginDialogAction('GreggioMail', '/ProtoGreggioMail');

bot.beginDialogAction('FantinatoMail', '/ProtoFantinatoMail');

bot.beginDialogAction('ZancanaroMail', '/ProtoZancanaroMail');

bot.beginDialogAction('OrfeiMail', '/ProtoOrfeiMail');

bot.dialog('/ProtoTeamInfo', [
    function(session) {
        var TeamTemp = getTeamInformation(session, general, 'numero_progetti', 'numero_membri', 'lista_membri', 'lista_progetti', 'link_sito');
        session.send(TeamTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoParseInfo', [
    function(session) {
        var ParseTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_parse');
        session.send(ParseTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoZizInfo', [
    function(session) {
        var ZizTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_ziz');
        session.send(ZizTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoUtilitiesInfo', [
    function(session) {
        var UtilitiesTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'utilities');
        session.send(UtilitiesTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoResearchInfo', [
    function(session) {
        var ResearchTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'research');
        session.send(ResearchTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoWebInfo', [
    function(session) {
        var WebTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'project_website');
        session.send(WebTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoReluInfo', [
    function(session) {
        var RELUemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'relu-core');
        session.send(RELUTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoFastInfo', [
    function(session) {
        var FastInkTemp = getProjectInformation(session, works, 'tipo_progetto', 'descrizione_progetto', 'capo_progetto', 'link_repo', 'inizio_sviluppo', 'fine_sviluppo', 'versione', 'supporto', 'come_procede', 'membri', 'note', 'fast_ink');
        session.send(FastInkTemp);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoOrfeiInfo', [
    function(session) {
        var OrfeiInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'orfei');
        session.send(OrfeiInformazioni);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoLucchiInfo', [
    function(session) {
        var LucchiInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'lucchi');
        session.send(LucchiInformazioni);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoZancanaroInfo', [
    function(session) {
        var ZancanaroInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'zancanaro');
        session.send(ZancanaroInformazioni);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoFantinatoInfo', [
    function(session) {
        var FantinatoInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'fantinato');
        session.send(FantinatoInformazioni);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoGreggioInfo', [
    function(session) {
        var GreggioInformazioni = getPeopleInformation(session, persone, 'progetti_mantenere', 'username_github', 'progetti_assegnati', 'ruolo', 'specialita', 'mail', 'nickname', 'greggio');
        session.send(GreggioInformazioni);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoFantinatoMail', [
    function(session) {
        var FantinatoMail = getPeopleMail(session, persone, 'mail', 'fantinato');
        session.send(FantinatoMail);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoZancanaroMail', [
    function(session) {
        var ZancanaroMail = getPeopleMail(session, persone, 'mail', 'zancanaro');
        session.send(ZancanaroMail);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoOrfeiMail', [
    function(session) {
        var OrfeiMail = getPeopleMail(session, persone, 'mail', 'orfei');
        session.send(OrfeiMail);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoLucchiMail', [
    function(session) {
        var LucchiMail = getPeopleMail(session, persone, 'mail', 'lucchi');
        session.send(LucchiMail);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoGreggioMail', [
    function(session) {
        var GreggioMail = getPeopleMail(session, persone, 'mail', 'greggio');
        session.send(GreggioMail);
        session.beginDialog('Root');
    }
])

bot.dialog('/ProtoTeam', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/Team')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])

bot.dialog('/ProtoTotalProject', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/TotalProject')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])

bot.dialog('/ProtoCurrentProject', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/CurrentTotalProject')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])

bot.dialog('/ProtoAllPeople', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/ProtoAllPeople')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])

bot.dialog('/ProtoAllMail', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/ProtoAllMail')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])

bot.dialog('/ProtoAllRole', [
    function(session) {
        async.parallel([
            function(callback) {
                session.beginDialog('/ProtoAllRole')
            },
            function(callback) {
                session.beginDialog('Root');
            }
        ])
    }
])