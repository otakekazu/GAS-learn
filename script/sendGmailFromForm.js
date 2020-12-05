function sendform(e){
    var items = e.response.getItemResponses();
    var address = "takazawa.issei@blueship.co.jp";
    var subject = "【ご注文】";
     var msg = "test message";
     for (var i = 0; i < items.length; i++) {
       var item = items[i];
       var q = item.getItem().getTitle();
       var a = item.getResponse();
       msg += q + ': ' + a + '\n\n';
     }
     GmailApp.sendEmail(address, subject, msg);
   }
  
  