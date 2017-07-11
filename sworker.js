importScripts('node_modules/sw-toolbox/sw-toolbox.js'); 

(function(global) {
'use strict';

toolbox.precache([
	'/index.html', 
	'/css/site.css', 
	'/app.js',
	'/clipboard.min.js',
	'/assets/green_fox_logo.png',
	'/assets/apocolypse.svg',
	'/assets/close-icon.svg',
	'/assets/list-icon.svg',
]);

toolbox.router.default = toolbox.cacheFirst;

self.addEventListener("install", function(event) {
	console.log('SW: Installing service worker');
});

})(self)