/**
 * Created by rakesh on 2/7/14.
 */
var nodemailer =  require('nodemailer');
var async = require('async');

var createOption = function (from, to, subject, text, html ) {
    return {
        'from': from,
        'to': to,
        'subject': subject,
        'text': text,
        'html':html
    };
}
    var smtpTransport = function (service, emailID, password ) {
        nodemailer.createTransport('SMTP',{
            services: service,
            auth:{
                user: emailID,
                pass: password
            }
    });
};


var sendMail  = function (emailID,service, password, sendList) {
    var subject = 'inform me as u get this mail';
    var text = 'hello';
    var html = '<b> world</b>';

    smtpTransport(service, emailID, password);


    var tasks = [];
    for (var getemailID in sendList) {

        tasks.push((function (toEmailID) {
            return function (callback) {
                smtpTransport.sendMail(createOption(emailID, toEmailID,subject,text, html), function (err, response) {
                    callback(error,(new Date()).getMilliseconds() + " >> "+ response);
               });
            }
        })(sendList[getemailID]));
    }

//    console.log('tasks 0 ', tasks[0]);

    async.parallel(tasks, function(err, result){
        if(err)
            console.log('parallel err', err);
        else
            console.log('paralled result', result);
    });
}

var sentList = [
    "rishabh.dixit@intelligrape.com",
    "mohit.tyagi@intelligrape.com",
    "amit.raj@intelligrape.com",
    "sandeep.kumar@intelligrape.com",
    "rakesh.kumar@intelligrape.com",
    "kashish.gupta@intelligrape.com"];

sendMail('rakesh.kumar@intelligrape.com', 'gmail', 'rakesh))&', sentList);