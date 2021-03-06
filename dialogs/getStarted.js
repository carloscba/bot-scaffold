const builder = require('botbuilder');
const axios = require('axios');
const getFbData = require('../functions/getFbData');
require('dotenv').load();

const dialog = () => {
    return [
        (session, results, next) => {
            if(session.message.sourceEvent.postback && session.message.sourceEvent.postback.referral){
                session.userData.market = session.message.sourceEvent.postback.referral.ref;
            }
            //Recupero informacion de facebook
            getFbData(session.message.address.user.id, process.env.PAGE_ACCESS_TOKEN).then((response)=>{
                session.userData.fbData = response.data;
                session.endDialogWithResult(results)
            }).catch((error) => {
                new Error(error)
            })
        }
    ]
}

module.exports = {
    dialog
}