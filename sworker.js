importScripts('node_modules/sw-toolbox/sw-toolbox.js'); 

(function(global) {
'use strict';

toolbox.precache(['/index.html', '/site.css']);

toolbox.router.default = toolbox.cacheFirst;

self.addEventListener("install", function(event) {
	console.log('SW: Installing service worker');
});

})(self)