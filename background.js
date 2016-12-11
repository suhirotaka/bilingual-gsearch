if (typeof(localStorage.lang) == 'undefined' || !localStorage.lang) {
  if (chrome.i18n.getMessage('@@ui_locale') == 'en_US' || chrome.i18n.getMessage('@@ui_locale') == 'en_GB') {
    localStorage.lang = 'es';
  }else {
    localStorage.lang = 'en';
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
  if (request == 'init') {
    addToTabsInGS(sender.tab.id);
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendRequest(tab.id, 'getLang', function(response){
        chrome.browserAction.setBadgeText({text: response, tabId: tab.id});
        chrome.browserAction.setTitle({title: 'Bilingual GSearch - ' + response, tabId: tab.id});
      });
    });
  }else if (request == 'onunload') {
    removeFromTabsInGS(sender.tab.id);
  }
});

chrome.tabs.onRemoved.addListener(function(tabId){
  removeFromTabsInGS(tabId);
});
function removeFromTabsInGS(tabId) {
  var tabsInGS = document.getElementById('tabsInGS').innerHTML;
  tabsInGS = tabsInGS.split(',');
  var newTabsInGS = '';
  for (var i=0; i<tabsInGS.length; i++) {
    if (tabId == tabsInGS[i]) continue;
    newTabsInGS += (tabsInGS[i] + ',')
  }
  newTabsInGS = newTabsInGS.replace(/,$/, '');
  document.getElementById('tabsInGS').innerHTML = newTabsInGS;
}
function addToTabsInGS(tabId) {
  var tabsInGS = document.getElementById('tabsInGS').innerHTML;
  tabsInGS += (',' + tabId);
  tabsInGS = tabsInGS.replace(/^,/, '');
  document.getElementById('tabsInGS').innerHTML = tabsInGS;
}
