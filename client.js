window.addEventListener('load',function(){
  document.querySelector(".container").addEventListener("submit",function(event){
  event.preventDefault();
  var formList = ["method1","method2","method3"];
  var methodVsFields = {
    method1:["name1","ph1","lensW","bridgeW","templeL"],
    method2:["name2","ph2","frameW"],
    method3:["name3","ph3","itd"],
  };
  var fieldVsProperName = {
    "name1":"Name",
    "name2":"Name",
    "name3":"Name",
    "ph1":"Mobile Number",
    "ph2":"Mobile Number",
    "ph3":"Mobile Number",
    "lensW":"Lens Width",
    "bridgeW":"Bridge Width",
    "templeL": "Temple Length",
    "frameW": "Frame Width",
    "itd":"Inter Temple Distance"
  };
  var formIdIndex = formList.indexOf(event.target.id);
  if(formIdIndex != -1){
    var submitedMtd = formList[formIdIndex];
    changeButtonState(submitedMtd,true);
    var fieldsToBeFetched = methodVsFields[submitedMtd];
    var messageTemplate = "Your order details are as follow {{2}}";
    //messageTemplate = messageTemplate.replace("{{1}}","order of "+submitedMtd);
    var userDetails = "";
    for(var fieldId of fieldsToBeFetched){
      userDetails += fieldVsProperName[fieldId] + " - " + document.querySelector("#"+fieldId).value + " | ";
    }
    messageTemplate = messageTemplate.replace("{{2}}",userDetails);
    sendWhatsAppMessage(messageTemplate,submitedMtd);
    clearFormValues(fieldsToBeFetched,true);
  }
})});

function changeButtonState(formId,isLoading) {
  var innerBtnCont = isLoading ? '<i class="fa fa-spinner fa-spin fa-1.8x fa-fw" aria-hidden="true"></i>' : 'Send <i class="fa fa-whatsapp"></i>';
  document.querySelector('button[form="'+formId+'"]').innerHTML = innerBtnCont;
}

function sendWhatsAppMessage(messageTemplate,formId){
  //var accountId = "AC7fb0d23943252cae7c5b33606110b793";
  //var accountSec = "63059b199d4537cea5275d13c9e62022";
  //var authHeader = "Basic " + window.btoa(accountId + ":" +accountSec);
  //https://api.callmebot.com/whatsapp.php?phone=+919344046438&text=This+is+a+test&apikey=898514
  var resourceUrl = "https://api.callmebot.com/whatsapp.php?phone=+919344046438&text="+encodeURIComponent(messageTemplate)+"&apikey=898514"; 
  //var twilioNumber = "whatsapp:+14155238886";
  //var myNumber = "whatsapp:+919677861230";
  //var reqBody = "To=" + encodeURIComponent(myNumber) + "&" + "From=" + encodeURIComponent(twilioNumber) + "&" + "Body=" + encodeURIComponent(messageTemplate);
  
  fetch(resourceUrl,{
    method: 'GET', 
    mode: 'no-cors',
    cache: 'no-cache',
  }).then(function(){
    showalert("success","You have sent us your measurements. Thank you :)");
    changeButtonState(formId,false);
  })
  .catch(function(err){
    showalert("danger","Something went wrong, Please try again later.");
    changeButtonState(formId,false);
    console.error(err)
  });
}

function showalert(type,message){
  var alertElement = document.querySelector(".alert");
  alertElement.classList.remove("hide");
  alertElement.classList.add(type);
  alertElement.innerHTML = message;
  setTimeout(()=>{
    alertElement.classList.add("hide")
    alertElement.classList.remove(type);
    alertElement.innerHTML = "";
  },5000)
}

function clearFormValues(fieldsToBeFetched){
  for(var fieldId of fieldsToBeFetched){
    document.querySelector("#"+fieldId).value ="";
  }
}