window.onload = function(){

  chrome.tabs.getSelected(null, function(tab){
    var tabsInGS = chrome.extension.getBackgroundPage().document.getElementById('tabsInGS').innerHTML.split(',');
    var isInGS = false;
    for (var i=0; i<tabsInGS.length; i++) {
      if (tab.id == tabsInGS[i]) {
        isInGS = true;
        break;
      }
    }
    if (!isInGS) {
      document.getElementById('message').innerHTML = chrome.i18n.getMessage('notInGS');
      setTimeout(function(){window.close();}, 2000);
      return false;
    }

    chrome.tabs.executeScript(null, {code: 'setLang("' +  localStorage.lang + '");'});
    chrome.tabs.executeScript(null, {code: 'swap();'});
    document.getElementById('message').innerHTML = chrome.i18n.getMessage('LangChanged');
    setTimeout(function(){window.close();}, 1000);
  });

};
