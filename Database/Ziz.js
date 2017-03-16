var builder = require('core');

var botbuilder = require('botbuilder');

var https = require('https');

var http = require('http');

var restify = require('restify');

var fs = require('fs');

var request = require('request');

var async = require('async');

var promise = require('promise');

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

            if (!team_perso && !responsability && !role && !find && !easter_egg && !orfei && !lucchi && !zancanaro && !chiarin && !greggio && !quinto && !fantinato && !ziz && !uwp && !electron && !volley && !fast_ink && !website && !bot_project && !current_project && !total_project && !total_people && !email && !nunzio) {
                async.parallel([
                    function(callback) {
                        session.beginDialog('NothingTemp');
                    },
                    function(callback) {
                        session.beginDialog('Nothing');
                    }
                ], function(error, results) {
                    session.send("Error");
                })
            } else {
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
                } else {
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
                    } else {
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
                        } else {
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
                                                                                            } else {
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
                                                                                                } else {
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
                                                                                                    } else {
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
            var current_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'current_project');
            var total_project = botbuilder.EntityRecognizer.findEntity(args.entities, 'total_project');
            var total_people = botbuilder.EntityRecognizer.findEntity(args.entities, 'people');
            var team_perso = botbuilder.EntityRecognizer.findEntity(args.entities, 'Team_Perso');
            if (!current_project && !total_project && !total_people && team_perso) {
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
            } else {
                if (!current_project && !total_project && total_people && !team_perso) {
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
                } else {
                    if (!current_project && total_project && !total_people && !team_perso) {
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
                    } else {
                        if (current_project && !total_project && !total_people && !team_perso) {
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
)

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
        var totalProjectCards = CreateTotalProjectsCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(totalProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "informazioni sul progetto uwp":
                var UwpTemp = getUwpInformation(session, data);
                session.send(UwpTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto uwp":
                var UwpGestioneTemp = getUwpGestione(session, data);
                session.send(getUwpGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto electron":
                var ElectronTemp = getElectronInformation(session, data);
                session.send(ElectronTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto electron":
                var ElectronGestioneTemp = getElectronGestione(session, data);
                session.send(getElectronGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto bot":
                var BotTemp = getBotInformation(session, data);
                session.send(BotTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto bot":
                var BotGestioneTemp = getBotGestione(session, data);
                session.send(getBotGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto ziz":
                var ZizTemp = getZizInformation(session, data);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getZizGestione(session, data);
                session.send(getZizGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto volley":
                var VolleyTemp = getVolleyInformation(session, data);
                session.send(VolleyTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto volley":
                var VolleyGestioneTemp = getVolleyGestione(session, data);
                session.send(VolleyGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni su fast ink":
                var FastInkTemp = getFastInkInformation(session, data);
                session.send(FastInkTemp);
                session.beginDialog('Root');
                break;
            case "gestione di fast ink":
                var FastInkGestioneTemp = getFastInkGestione(session, data);
                session.send(FastInkGestioneTemp);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto website":
                var WebTemp = getWebsiteInformation(session, data);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto website":
                var WebGestioneTemp = getWebsiteGestione(session, data);
                session.send(WebGestioneTemp);
                session.beginDialog('Root');
                break;
        }
    }
])

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
            } else {
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
                } else {
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
                    } else {
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
                        } else {
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
                            } else {
                                if (team) {
                                    var TeamTemp = getTeamInformation(session, data);
                                    session.send(TeamTemp);
                                    session.beginDialog('Root');
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
)

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
                var NunzioRole = getNunzioRole(session, parsed);
                session.send(NunzioRole);
                session.beginDialog('Root');
            } else {
                if (fantinato) {
                    var FantinatoRole = getFantinatoRole(session, database);
                    session.send(FantinatoRole);
                    session.beginDialog('Root');
                } else {
                    if (quinto) {
                        var QuintoRole = getQuintoRole(session, database);
                        session.send(QuintoRole);
                        session.beginDialog('Root');
                    } else {
                        if (greggio) {
                            var GreggioRole = getGreggioRole(session, database);
                            session.send(GreggioRole);
                            session.beginDialog('Root');
                        } else {
                            if (chiarin) {
                                var ChiarinRole = getChiarinRole(session, database);
                                session.send(ChiarinRole);
                                session.beginDialog('Root');
                            } else {
                                if (zancanaro) {
                                    var ZancanaroRole = getZancanaroRole(session, database);
                                    session.send(ZancanaroRole);
                                    session.beginDialog('Root');
                                } else {
                                    if (lucchi) {
                                        var LucchiRole = getLucchiRole(session, database);
                                        session.send(LucchiRole);
                                        session.beginDialog('Root');
                                    } else {
                                        if (orfei) {
                                            var OrfeiRole = getOrfeiRole(session, database);
                                            session.send(OrfeiRole);
                                            session.beginDialog('Root');
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
)

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
            case "ruolo di orfei":
                var OrfeiRuolo = getOrfeiRole(session, data);
                session.send(OrfeiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su orfei":
                var OrfeiInformazioni = getOrfeiInformation(session, data);
                session.send(OrfeiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di orfei":
                var OrfeiRes = getOrfeiResponsability(session, data);
                session.send(OrfeiRes);
                session.beginDialog('Root');
                break;
            case "progetti di orfei":
                var OrfeiProject = getOrfeiProjects(session, data);
                session.send(OrfeiProject);
                session.beginDialog('Root');
                break;
            case "mail di orfei":
                var OrfeiMail = getOrfeiMail(session, data);
                session.send(OrfeiMail);
                break;
            case "ruolo di lucchi":
                var LucchiRuolo = getLucchiRole(session, data);
                session.send(LucchiRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su lucchi":
                var LucchiInformazioni = getLucchiInformation(session, data);
                session.send(LucchiInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di lucchi":
                var LucchiRes = getLucchiResponsability(session, data);
                session.send(LucchiRes);
                session.beginDialog('Root');
                break;
            case "progetti di lucchi":
                var LucchiProjects = getLucchiProjects(session, data);
                session.send(LucchiProjects);
                session.beginDialog('Root');
                break;
            case "mail di lucchi":
                var LucchiMail = getLucchiMail(session, data);
                session.send(LucchiMail);
                break;
            case "ruolo di zancanaro":
                var ZancanaroRuolo = getZancanaroRole(session, data);
                session.send(ZancanaroRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su zancanaro":
                var ZancanaroInformazioni = getZancanaroInformation(session, data);
                session.send(ZancanaroInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di zancanaro":
                var ZancanaroRes = getZancanaroResponsability(session, data);
                session.send(ZancanaroRes);
                session.beginDialog('Root');
                break;
            case "progetti di zancanaro":
                var ZancanaroProjects = getZancanaroProjects(session, data);
                session.send(ZancanaroProjects);
                session.beginDialog('Root');
                break;
            case "mail di zancanaro":
                var ZancanaroMail = getZancanaroMail(session, data);
                session.send(ZancanaroMail);
                break;
            case "ruolo di fantinato":
                var FantinatoRuolo = getFantinatoRole(session, data);
                session.send(FantinatoRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su fantinato":
                var FantinatoInformazioni = getFantinatoInformation(session, data);
                session.send(FantinatoInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di fantinato":
                var FantinatoRes = getFantinatoResponsability(session, data);
                session.send(FantinatoRes);
                session.beginDialog('Root');
                break;
            case "progetti di fantinato":
                var FantinatoProjects = getFantinatoProjects(session, data);
                session.send(FantinatoProjects);
                session.beginDialog('Root');
                break;
            case "mail di fantinato":
                var FantinatoMail = getFantinatoMail(session, data);
                session.send(FantinatoMail);
                break;
            case "ruolo di chiarin":
                var ChiarinRuolo = getChiarinRole(session, data);
                session.send(ChiarinRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su chiarin":
                var ChiarinInformazioni = getChiarinInformation(session, data);
                session.send(ChiarinInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di chiarin":
                var ChiarinRes = getChiarinResponsability(session, data);
                session.send(ChiarinRes);
                session.beginDialog('Root');
                break;
            case "progetti di chiarin":
                var ChiarinProjects = getChiarinProjects(session, data);
                session.send(ChiarinProjects);
                session.beginDialog('Root');
                break;
            case "mail di chiarin":
                var ChiarinMail = getChiarinMail(session, data);
                session.send(ChiarinMail);
                break;
            case "ruolo di greggio":
                var GreggioRuolo = getGreggioRole(session, data);
                session.send(GreggioRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su greggio":
                var GreggioInformazioni = getGreggioInformation(session, data);
                session.send(GreggioInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di greggio":
                var GreggioRes = getGreggioResponsability(session, data);
                session.send(GreggioRes);
                session.beginDialog('Root');
                break;
            case "progetti di greggio":
                var GreggioProjects = getGreggioProjects(session, data);
                session.send(GreggioProjects);
                session.beginDialog('Root');
                break;
            case "mail di greggio":
                var GreggioMail = getGreggioMail(session, data);
                session.send(GreggioMail);
                break;
            case "ruolo di quinto":
                var QuintoRuolo = getQuintoRole(session, data);
                session.send(QuintoRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su quinto":
                var QuintoInformazioni = getQuintoInformation(session, data);
                session.send(QuintoInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di quinto":
                var QuintoRes = getQuintoResponsability(session, data);
                session.send(QuintoRes);
                session.beginDialog('Root');
                break;
            case "progetti di quinto":
                var QuintoProjects = getQuintoProjects(session, data);
                session.send(QuintoProjects);
                session.beginDialog('Root');
                break;
            case "mail di quinto":
                var QuintoMail = getQuintoMail(session, data);
                session.send(QuintoMail);
                break;
            case "ruolo di nunzio":
                var NunzioRuolo = getNunzioRole(session, data);
                session.send(NunzioRuolo);
                session.beginDialog('Root');
                break;
            case "informazioni su nunzio":
                var NunzioInformazioni = getNunzioInformation(session, data);
                session.send(NunzioInformazioni);
                session.beginDialog('Root');
                break;
            case "responsabilità di nunzio":
                var QuintoRes = getNunzioResponsability(session, data);
                session.send(NunzioRes);
                session.beginDialog('Root');
                break;
            case "progetti di nunzio":
                var NunzioProjects = getNunzioProjects(session, data);
                session.send(NunzioProjects);
                session.beginDialog('Root');
                break;
            case "mail di nunzio":
                var NunzioMail = getNunzioMail(session, data);
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
                    var NunzioTemp = getNunzioInformation(session, database);
                    session.send(NunzioTemp);
                } else {
                    if (fantinato) {
                        var FantinatoTemp = getFantinatoInformation(session, database);
                        session.send(FantinatoTemp);
                    } else {
                        if (quinto) {
                            var QuintoTemp = getQuintoInformation(session, database);
                            session.send(QuintoTemp);
                        } else {
                            if (greggio) {
                                var GreggioTemp = getGreggioInformation(session, database);
                                session.send(GreggioTemp);
                            } else {
                                if (chiarin) {
                                    var ChiarinTemp = getChiarinInformation(session, database);
                                    session.send(ChiarinTemp);
                                } else {
                                    if (zancanaro) {
                                        var ZancanaroTemp = getZancanaroInformation(session, database);
                                        session.send(ZancanaroTemp);
                                    } else {
                                        if (lucchi) {
                                            var LucchiTemp = getLucchiInformation(session, database);
                                            session.send(LucchiTemp);
                                        } else {
                                            if (orfei) {
                                                var OrfeiTemp = getOrfeiInformation(session, database);
                                                session.send(OrfeiTemp);
                                            } else {
                                                if (nunzio && role) {
                                                        var NunzioRole = getNunzioRole(session, database);
                                                        session.send(NunzioRole);
                                                    } else {
                                                        if (fantinato && role) {
                                                            var FantinatoRole = getFantinatoRole(session, database);
                                                            session.send(FantinatoRole);
                                                        } else {
                                                            if (quinto && role) {
                                                                var QuintoRole = getQuintoRole(session, database);
                                                                session.send(QuintoRole);
                                                            } else {
                                                                if (greggio && role) {
                                                                    var GreggioRole = getGreggioRole(session, database);
                                                                    session.send(GreggioRole);
                                                                } else {
                                                                    if (chiarin && role) {
                                                                        var ChiarinRole = getChiarinRole(session, database);
                                                                        session.send(ChiarinRole);
                                                                    } else {
                                                                        if (zancanaro && role) {
                                                                            var ZancanaroRole = getZancanaroRole(session, database);
                                                                            session.send(ZancanaroRole);
                                                                        } else {
                                                                            if (lucchi && role) {
                                                                                var LucchiRole = getLucchiRole(session, database);
                                                                                session.send(LucchiRole);
                                                                            } else {
                                                                                if (orfei && role) {
                                                                                    var OrfeiRole = getOrfeiRole(session, database);
                                                                                    session.send(OrfeiRole);
                                                                                } else{
                                                                                    if (nunzio && responsability) {
                                                                                            var NunzioRes = getNunzioResponsability(session, database);
                                                                                            session.send(NunzioRes);
                                                                                        } else {
                                                                                            if (fantinato && responsability) {
                                                                                                var FantinatoRes = getFantinatoResponsability(session, database);
                                                                                                session.send(FantinatoRes);
                                                                                            } else {
                                                                                                if (quinto && responsability) {
                                                                                                    var QuintoRes = getQuintoResponsability(session, database);
                                                                                                    session.send(QuintoRes);
                                                                                                } else {
                                                                                                    if (greggio && responsability) {
                                                                                                        var GreggioRes = getGreggioResponsability(session, database);
                                                                                                        session.send(GreggioRes);
                                                                                                    } else {
                                                                                                        if (chiarin && responsability) {
                                                                                                            var ChiarinRes = getChiarinResponsability(session, database);
                                                                                                            session.send(ChiarinRes);
                                                                                                        } else {
                                                                                                            if (zancanaro && responsability) {
                                                                                                                var ZancanaroRes = getZancanaroResponsability(session, database);
                                                                                                                session.send(ZancanaroRes);
                                                                                                            } else {
                                                                                                                if (lucchi && responsability) {
                                                                                                                    var LucchiRes = getLucchiResponsability(session, database);
                                                                                                                    session.send(LucchiRes);
                                                                                                                } else {
                                                                                                                    if (orfei && responsability) {
                                                                                                                        var OrfeiRes = getOrfeiResponsability(session, database);
                                                                                                                        session.send(OrfeiRes);
                                                                                                                    }else{
                                                                                                                        if (nunzio && mail) {
                                                                                                                                var NunzioMail = getNunzioMail(session, database);
                                                                                                                                session.send(NunzioMail);
                                                                                                                            } else {
                                                                                                                                if (fantinato && mail) {
                                                                                                                                    var FantinatoMail = getFantinatoMail(session, database);
                                                                                                                                    session.send(FantinatoMail);
                                                                                                                                } else {
                                                                                                                                    if (quinto && mail) {
                                                                                                                                        var QuintoMail = getQuintoMail(session, database);
                                                                                                                                        session.send(QuintoMail);
                                                                                                                                    } else {
                                                                                                                                        if (greggio && mail) {
                                                                                                                                            var GreggioMail = getGreggioMail(session, database);
                                                                                                                                            session.send(GreggioMail);
                                                                                                                                        } else {
                                                                                                                                            if (chiarin && mail) {
                                                                                                                                                var ChiarinMail = getChiarinMail(session, database);
                                                                                                                                                session.send(ChiarinMail);
                                                                                                                                            } else {
                                                                                                                                                if (zancanaro && mail) {
                                                                                                                                                    var ZancanaroMail = getZancanaroMail(session, database);
                                                                                                                                                    session.send(ZancanaroMail);
                                                                                                                                                } else {
                                                                                                                                                    if (lucchi && mail) {
                                                                                                                                                        var LucchiMail = getLucchiMail(session, database);
                                                                                                                                                        session.send(LucchiMail);
                                                                                                                                                    } else {
                                                                                                                                                        if (orfei && mail) {
                                                                                                                                                            var OrfeiMail = getOrfeiMail(session, database);
                                                                                                                                                            session.send(OrfeiMail);
                                                                                                                                                        } else{
                                                                                                                                                            if (nunzio && total_project) {
                                                                                                                                                                    var NunzioProjects = getNunzioProjects(session, database);
                                                                                                                                                                    session.send(NunzioProjects);
                                                                                                                                                                } else {
                                                                                                                                                                    if (fantinato && total_project) {
                                                                                                                                                                        var FantinatoProjects = getFantinatoProjects(session, database);
                                                                                                                                                                        session.send(FantinatoProjects);
                                                                                                                                                                    } else {
                                                                                                                                                                        if (quinto && total_project) {
                                                                                                                                                                            var QuintoProjects = getQuintoProjects(session, database);
                                                                                                                                                                            session.send(QuintoProjects);
                                                                                                                                                                        } else {
                                                                                                                                                                            if (greggio && total_project) {
                                                                                                                                                                                var GreggioProjects = getGreggioProjects(session, database);
                                                                                                                                                                                session.send(GreggioProjects);
                                                                                                                                                                            } else {
                                                                                                                                                                                if (chiarin && total_project) {
                                                                                                                                                                                    var ChiarinProjects = getChiarinProjects(session, database);
                                                                                                                                                                                    session.send(ChiarinProjects);
                                                                                                                                                                                } else {
                                                                                                                                                                                    if (zancanaro && total_project) {
                                                                                                                                                                                        var ZancanaroProjects = getZancanaroProjects(session, database);
                                                                                                                                                                                        session.send(ZancanaroProjects);
                                                                                                                                                                                    } else {
                                                                                                                                                                                        if (lucchi && total_project) {
                                                                                                                                                                                            var LucchiProjects = getLucchiProjects(session, database);
                                                                                                                                                                                            session.send(LucchiProjects);
                                                                                                                                                                                        } else {
                                                                                                                                                                                            if (orfei && total_project) {
                                                                                                                                                                                                var OrfeiProject = getOrfeiProjects(session, database);
                                                                                                                                                                                                session.send(OrfeiProject);
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
        var CurrentProjectCards = CreateCurrentProjectCards(session);
        var reply = new botbuilder.Message(session)
            .attachmentLayout(botbuilder.AttachmentLayout.carousel)
            .attachments(CurrentProjectCards);

        botbuilder.Prompts.text(session, reply);
    },
    function(session, results) {
        switch (results.response) {
            case "informazioni sul progetto uwp":
                var UwpTemp = getUwpInformation(session, data);
                session.send(UwpTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto uwp":
                var UwpGestioneTemp = getUwpGestione(session, data);
                session.send(getUwpGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto electron":
                var ElectronTemp = getElectronInformation(session, data);
                session.send(ElectronTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto electron":
                var ElectronGestioneTemp = getElectronGestione(session, data);
                session.send(getElectronGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto ziz":
                var ZizTemp = getZizInformation(session, data);
                session.send(ZizTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto ziz":
                var ZizGestioneTemp = getZizGestione(session, data);
                session.send(getZizGestione);
                session.beginDialog('Root');
                break;
            case "informazioni sul progetto website":
                var WebTemp = getWebsiteInformation(session, data);
                session.send(WebTemp);
                session.beginDialog('Root');
                break;
            case "gestione del progetto website":
                var WebGestioneTemp = getWebsiteGestione(session, data);
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
        var uwp = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::uwp');
        var electron = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::electron');
        var website = botbuilder.EntityRecognizer.findEntity(args.entities, 'project::website');

        if (ziz) {
            var ZizTemp = getZizInformation(session, data);
            session.send(ZizTemp);
            session.beginDialog('Root');
        } else {
            if (uwp) {
                var UwpTemp = getUwpInformation(session, data);
                session.send(UwpTemp);
                session.beginDialog('Root');
            } else {
                if (electron) {
                    var ElectronTemp = getElectronInformation(session, data);
                    session.send(ElectronTemp);
                    session.beginDialog('Root');
                } else {
                    if (website) {
                        var WebTemp = getWebsiteInformation(session, data);
                        session.send(WebTemp);
                        session.beginDialog('Root');
                    } else {
                        if (ziz && responsability) {
                            var ZizGestioneTemp = getZizGestione(session, data);
                            session.send(getZizGestione);
                            session.beginDialog('Root');
                        } else {
                            if (uwp && responsability) {
                                var UwpGestioneTemp = getUwpGestione(session, data);
                                session.send(getUwpGestione);
                                session.beginDialog('Root');
                            } else {
                                if (electron && responsability) {
                                    var ElectronGestioneTemp = getElectronGestione(session, data);
                                    session.send(getElectronGestione);
                                    session.beginDialog('Root');
                                } else {
                                    if (website && responsability) {
                                        var WebGestioneTemp = getWebsiteGestione(session, data);
                                        session.send(WebGestioneTemp);
                                        session.beginDialog('Root');
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
                session.beginDialog('Root');
                break;
            case "Lucchi":
                var LucchiMail = getLucchiMail(session, data);
                session.send(LucchiMail);
                session.beginDialog('Root');
                break;
            case "Fantinato":
                var FantinatoMail = getFantinatoMail(session, data);
                session.send(FantinatoMail);
                session.beginDialog('Root');
                break;
            case "Zancanaro":
                var ZancanaroMail = getZancanaroMail(session, data);
                session.send(ZancanaroMail);
                session.beginDialog('Root');
                break;
            case "Greggio":
                var GreggioMail = getGreggioMail(session, data);
                session.send(GreggioMail);
                session.beginDialog('Root');
                break;
            case "Chiarin":
                var ChiarinMail = getChiarinMail(session, data);
                session.send(ChiarinMail);
                session.beginDialog('Root');
                break;
            case "Quinto":
                var QuintoMail = getQuintoMail(session, data);
                session.send(QuintoMail);
                session.beginDialog('Root');
                break;
            case "Nunzio":
                var NunzioMail = getNunzioMail(session, data);
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
            var OrfeiMail = getOrfeiMail(session, data);
            session.send(OrfeiMail);
            session.beginDialog('Root');
        } else {
            if (lucchi) {
                var LucchiMail = getLucchiMail(session, data);
                session.send(LucchiMail);
                session.beginDialog('Root');
            } else {
                if (zancanaro) {
                    var ZancanaroMail = getZancanaroMail(session, data);
                    session.send(ZancanaroMail);
                    session.beginDialog('Root');
                } else {
                    if (chiarin) {
                        var ChiarinMail = getChiarinMail(session, data);
                        session.send(ChiarinMail);
                        session.beginDialog('Root');
                    } else {
                        if (greggio) {
                            var GreggioMail = getGreggioMail(session, data);
                            session.send(GreggioMail);
                            session.beginDialog('Root');
                        } else {
                            if (quinto) {
                                var QuintoMail = getQuintoMail(session, data);
                                session.send(QuintoMail);
                                session.beginDialog('Root');
                            } else {
                                if (fantinato) {
                                    var FantinatoMail = getFantinatoMail(session, data);
                                    session.send(FantinatoMail);
                                    session.beginDialog('Root');
                                } else {
                                    if (nunzio) {
                                        var NunzioMail = getNunzioMail(session, data);
                                        session.send(NunzioMail);
                                        session.beginDialog('Root');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
]).matches('None', [
    function(session, args, results) {
        session.send("Wrong Action");
        session.beginDialog('Root');
    }
]))

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
            botbuilder.CardAction.imBack(session, 'persone', 'Persone')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'progetti totali', 'Progetti totali')
        ]),

        new builder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            builder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'progetti correnti', 'Progetti correnti')
        ]),

        new builder.HeroCard(session)
        .title('Team Perso')
        .text('Informazioni sul team')
        .images([
            builder.CardImage.create(session, 'http://www.elia-group.com/images/team1.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'team', 'Team')
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
            botbuilder.CardAction.imBack(session, 'persone', 'Membri')
        ]),

        new botbuilder.HeroCard(session)
        .title('Ruoli')
        .text('Informazioni sui ruoli')
        .images([
            botbuilder.CardImage.create(session, 'https://thumbs.dreamstime.com/z/insieme-dell-icona-ruoli-sociali-38476263.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'ruoli', 'Ruoli')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni su tutti i progetti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'progetti totali', 'Progetti Totali')
        ]),

        new botbuilder.HeroCard(session)
        .title('Progetti')
        .text('Informazioni sui progetti correnti')
        .images([
            botbuilder.CardImage.create(session, 'https://handinasteppy.it/wp-content/uploads/2016/05/Icona-Progetti-Home.png')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'progetti correnti', 'Progetti Correnti')
        ]),

        new botbuilder.HeroCard(session)
        .title('Responsabilità')
        .text('Responsabilità dei membri del team')
        .images([
            botbuilder.CardImage.create(session, 'http://previews.123rf.com/images/sentavio/sentavio1511/sentavio151100481/48577270-stile-piatto-web-moderno-uomo-d-affari-icona-infografica-collage-Illustrazione-vettoriale-di-uomo-d--Archivio-Fotografico.jpg')
        ])
        .buttons([
            botbuilder.CardAction.imBack(session, 'responsabilità', 'Responsabilità')
        ]),

        new botbuilder.HeroCard(session)
        .title('Info')
        .text('Info sul Team Perso')
        .buttons([
            botbuilder.CardAction.imBack(session, "informazioni", 'Info')
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
            botbuilder.CardAction.imBack(session, 'informazioni su orfei', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di orfei', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di orfei', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di orfei', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di orfei', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Lucchi')
        .text('Informazioni su Lucchi')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su lucchi', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di lucchi', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di lucchi', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di lucchi', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di lucchi', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fantinato')
        .text('Informazioni su Fantinato')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su fantinato', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di fantinato', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di fantinato', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di fantinato', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di fantinato', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Zancanaro')
        .text('Informazioni su Zancanaro')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su zancanaro', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di zancanaro', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di zancanaro', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di zancanaro', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di zancanaro', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Greggio')
        .text('Informazioni su Greggio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su greggio', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di greggio', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di greggio', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di greggio', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di greggio', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Quinto')
        .text('Informazioni su Quinto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su quinto', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di quinto', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di quinto', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di quinto', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di quinto', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Chiarin')
        .text('Informazioni su Chiarin')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su chiarin', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di chiarin', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di chiarin', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di chiarin', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di chiarin', 'Mail')
        ]),

        new botbuilder.HeroCard(session)
        .title('Nunzio')
        .text('Informazioni su Nunzio')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su nunzio', 'Info'),
            botbuilder.CardAction.imBack(session, 'ruolo di nunzio', 'Ruolo'),
            botbuilder.CardAction.imBack(session, 'responsabilità di nunzio', 'Responsabilità'),
            botbuilder.CardAction.imBack(session, 'progetti di nunzio', 'Progetti'),
            botbuilder.CardAction.imBack(session, 'mail di nunzio', 'Mail')
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
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto uwp', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto uwp', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Multiplatform Electron')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto electron', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto electron', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Project Ziz')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto ziz', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto ziz', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Bot')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto bot', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto bot', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Fast Ink')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni su fast ink', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione di fast ink', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Volley')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto volley', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto volley', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Website')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto website', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto website', 'Gestione')
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
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto uwp', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto uwp', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Multiplatform Electron')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto electron', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto electron', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Project Ziz')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto ziz', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto ziz', 'Gestione')
        ]),

        new botbuilder.HeroCard(session)
        .title('Website')
        .text('Informazioni sul progetto')
        .buttons([
            botbuilder.CardAction.imBack(session, 'informazioni sul progetto website', 'Info'),
            botbuilder.CardAction.imBack(session, 'gestione del progetto website', 'Gestione')
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