const User = require('../models/usersModel.js')
const Task = require('../models/tasksModel.js')
const Message = require('../models/messagesModel.js')

User.create({username:'Tuffaste Admin', password:'makrill', role:'admin'})
/* User.create({username:'Grabben', password:'makrill', role:'worker'})
User.create({username:'Grabbens kompis', password:'makdsdrill', role:'worker'})
User.create({username:'Tönt-klient', password:'*HASH*AWDWADWAD'})
User.create({username:'En till tönt', password:'*HASH*AWDWasdasdsdADWAD'})

Task.create({description:'Du skall göra ditt och datt', imageFile:'badad124-123ad-b2q.jpeg', OwnerID: 2, CustomerID: 5, done: false})
Task.create({description:'Riv hela väggN', imageFile: 'skh-lhh-lsk678jsai.jpeg', OwnerID: 3, CustomerID: 4, done: true})
Task.create({description:'Måla om fasaden', imageFile: 'sk-loopappa6-sds8jsai.jpeg', OwnerID: 2, CustomerID: 5, done: true})
Task.create({description:'Spackla', imageFile: 'papp-vklk24-s8jpli.jpeg', OwnerID: 2, CustomerID: 4, done: false})
Task.create({description:'Kirra taket', imageFile: 'paasdpp-asdhk8gasds-akk1g-i.jpeg', OwnerID: 3, CustomerID: 4, done: false})

Message.create({text:'Fan vad fult det blev....lol', TaskId: 1, UserId: 4})
Message.create({text:'Jävla taskmört', TaskId: 1, UserId: 2})
Message.create({text:'Ba sanningen', TaskId: 1, UserId: 4})
Message.create({text:'Färdig', TaskId: 2, UserId: 3})
Message.create({text:'Tack va fint d ä', TaskId: 2, UserId: 5}) */