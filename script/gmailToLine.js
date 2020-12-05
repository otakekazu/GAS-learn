var lineToken = "tOmMwqrubolANxQk95c8NhyjhsHXm3bYUPoQqJnPJh8";
var get_interval = 1;

function send_line(Me){
  var payload={'message': Me};
  var options={
    "method" : "post",
    "payload": payload,
    "headers": {"Authorization": "Bearer "+ lineToken}
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function fetchContactMail(){
  var now_time = Math.floor(new Date().getTime()/1000);
  var time_term = now_time - ((60*get_interval) + 3);
  
  //var strTerms = ('is:unread label:"タカザワ"');
  var strTerms = ('is:unread');
  
  var myThreads = GmailApp.search(strTerms);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads);
  var valMsgs = [];
  
  
  for(var i = 0;i < myMsgs.length; i++){
    if(myMsgs[i].slice(-1)[0].getSubject().indexOf("【ご注文】") != -1){
      valMsgs[i] = " " + myMsgs[i].slice(-1)[0].getDate().getMonth()
      + "/" + myMsgs[i].slice(-1)[0].getDate().getDate() 
      + " " + myMsgs[i].slice(-1)[0].getDate().getHours()
      + ":" + myMsgs[i].slice(-1)[0].getDate().getMinutes()
      + "\n[from]" + myMsgs[i].slice(-1)[0].getFrom()
      + "\n\n[[sbject]" + myMsgs[i].slice(-1)[0].getSubject()
      + "\n\n[Message]\n"+ myMsgs[i].slice(-1)[0].getPlainBody();
      myMsgs[i][0].markRead();
    }
  }
  
  return valMsgs;
}

function main(){
  new_Me = fetchContactMail();
  if(new_Me.length>0){
    for(var i = new_Me.length-1; i >= 0; i--){
      send_line(new_Me[i])
    }
  }
}