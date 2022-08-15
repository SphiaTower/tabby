function byAlphabeticalURLOrder(tab1, tab2) {
  if (tab1.url < tab2.url) {
    return -1;
  } else if (tab1.url > tab2.url) {
    return 1;
  }
  return 0;
}

chrome.windows.getCurrent({}, (cw => {
  
chrome.tabs.query({}, (tabs) => {

  tabs.sort(byAlphabeticalURLOrder);
  let j = 0;
  for (let i = 0; i < tabs.length; i++) {
    let t = tabs[i]
    if (t.url.includes("youtube.com/?&ab_channel=")||t.url.includes("chrome://newtab")){
        chrome.tabs.remove(t.id)
        j++
    } else if(i>=1){
      if(t.url==tabs[i-1].url){
        chrome.tabs.remove(t.id)
        j++;  
      }else {
        chrome.tabs.move(t.id, {index: i-j, windowId: cw.id});
      }
    } else {
      chrome.tabs.move(t.id, {index: i, windowId: cw.id});
    }
  }
  
});


}));




