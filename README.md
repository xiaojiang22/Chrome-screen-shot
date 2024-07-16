Chrome-screen-shot

--------------------------------------------------------------------------------------------------
包含了截屏、区域截屏、滚动截屏的Chrome扩展项目。
--------------------------------------------------------------------------------------------------
截图实现原理：利用chrome扩展 官方API --chrome.tabs.captureVisibleTab
--------------------------------------------------------------------------------------------------
区域截图实现原理: 利用cropper库 https://fengyuanchen.github.io/cropperjs/
--------------------------------------------------------------------------------------------------
滚动截图实现原理: 最初准备利用区域截图的思想，先拿到该网页的所有截图，每截图一次就向下滚动一次，然后存储每一次的base64文件，最后进行拼接，但在拼接的途中，发现canvas.getContext('2d').drawImage()该函数不能处理太大的图片，会导致处理后的图片透明，只能拿到图片的宽高。暂时没有找到这个方法的解决办法。便利用了另一个html2canvas的图像生成，原理是计算当前屏幕滚动距离，然后获取所有经过滚动的可视页面最后拼接到一起，但是该方法会出现，若当前网页在进行滚动截屏时，元素加载慢的原因会出现捕捉到的图片中部分元素位置失真和图片未生效、
--------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
下一步目标：
解决滚动截屏的问题。

