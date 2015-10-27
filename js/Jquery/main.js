/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;

  chrome.app.window.create('index.html', {
    id: "fluidTester",
    outerBounds: {
      width: screenWidth,
      height: screenWidth,
      left: 0,
      top: 0
    }
  });
});