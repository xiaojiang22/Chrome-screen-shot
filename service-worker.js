
// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "screenshot") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
            // 对页面截图
            chrome.tabs.captureVisibleTab(tab.windowId, { format: "png", quality: 100 }, (image) => {
                // 会返回 base64 图片 
                sendResponse({ image })
            })
        })
    }else if(request.type === "screenshotok"){
        //打开新标签页
        chrome.tabs.create({ url: 'show/index.html' });
    }else if (request.action === 'capture-download') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        });

    }
    // 这里要返回 true 不然接收端收不到信息
    return true;
});
// 快捷键监听
chrome.commands.onCommand.addListener((command) => { 
    if (command === 'areaScreenshot') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
			chrome.tabs.sendMessage(tabs[0].id, { type: 'area-screenshot' });
		});
    }
    else if (command === 'normalScreenshot') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
			chrome.tabs.sendMessage(tabs[0].id, { type: 'normal-screenshot' });
		});
    }
    else if (command === 'allScreenshot') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
            chrome.tabs.sendMessage(tabs[0].id, { type: 'all-screenshot' });
		});
    }
})
// 右键菜单
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: '截图',
        id:"normalscreenshot",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        title: '区域截图',
        id:"areascreenshot",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        title: '长屏截图',
        id:"allscreenshot",
        contexts: ["all"]
    });
})
  // 监听上下文菜单项被点击的事件
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "areascreenshot") {
      // 在这里执行截图操作
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
        chrome.tabs.sendMessage(tabs[0].id, { type: 'area-screenshot' });
    });
    }else if(info.menuItemId === "normalscreenshot"){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
			chrome.tabs.sendMessage(tabs[0].id, { type: 'normal-screenshot' });
		});
    }else if(info.menuItemId === "allscreenshot"){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { 
			chrome.tabs.sendMessage(tabs[0].id, { type: 'all-screenshot' });
		});
    }
 });