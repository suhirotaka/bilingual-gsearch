chrome.extension.sendRequest('init', function(response){
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
  if (request == 'getLang') {
    var url = document.getElementById('gb_2').href;
    sendResponse(url.match(/hl=([^&]+)/)[1]);
  }
});

window.onunload = function(){
  chrome.extension.sendRequest('onunload', function(response){
  });
};

var lang = '';
function setLang(l) {
  lang = l;
}

function swap() {
  var currLocation = location.href;
  var currPath = currLocation.match(/(.+?)(\?.*)/)[1];
  var currParam = currLocation.match(/(.+?)(\?.*)/)[2];

  var tempParams = currParam.substr(1).split('&');
  var params = {};
  for (var i=0; i<tempParams.length; i++){
    var key = tempParams[i].split('=')[0];
    var val = tempParams[i].split('=')[1];
    params[key] = val;
  }

  var langKey = 'hl';
  if (typeof(params[langKey]) != 'undefined' && params[langKey] == lang) {
    params[langKey] = '';
  }else {
    params[langKey] = lang;
  }

  var queryKey = 'q';
  var queryVal = document.getElementsByName(queryKey)[0].value;
  if (queryVal) params[queryKey] = queryVal;

  delete params['fp'];

  var newLocation = '';
  for (var k in params) {
    newLocation += (k + '=' + params[k] + '&');
  }
  newLocation = currPath + '?' + newLocation;
  newLocation = newLocation.replace(/&$/, '');

  window.location = newLocation;
}
