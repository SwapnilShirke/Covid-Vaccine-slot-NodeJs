const TelegramBot = require('node-telegram-bot-api');
const got = require("got");
const moment = require('moment');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1898005911:AAF9fLyWeu6_RyRLlFlb99krdKBcTmNytFI';


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {


  let chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);

});
bot.on('message', (msg) => {

});

function callCoVacc(){
  
  let district_id=389;
  const today = moment();
  const nextday = moment().add(1,'d');
  myFunc(389,today)
  myFunc(389,nextday)
  myFunc(392,today)
  myFunc(392,nextday)
  //bot.sendMessage('@anivaccapp',  'app started');
}


function myFunc(district_id,day) {
 console.log('in my function')
  const today = moment();
  console.log(day.format('DD-MM-YYYY'));
 got.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+district_id+'&date='+day.format('DD-MM-YYYY'), {responseType: 'json'})
 .then(res => {
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);
  var centers = []; 
   centers = res.body.sessions;
 
   centers.forEach(function(data, index) {
     let vaccdata='name : '+data.name+"\n"
     +'address: '+data.address+"\n"
     +'capacity: '+data.available_capacity+"\n"
     +'fee: '+data.fee+"\n"
     +'vaccine: '+data.vaccine+"\n"
     +'slots: '+data.slots+"\n"
     +"date: "+ data.date+"\n"
     +'register at https://selfregistration.cowin.gov.in/'
       bot.sendMessage('@anivaccapp', vaccdata );
       })
  
  }).catch(err=>{
    console.log('Error: '+err.message)
  });
   
}
setInterval(callCoVacc, 15000);




