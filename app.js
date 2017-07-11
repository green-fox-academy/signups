"use strict";

let signups = [];
let successLayer = document.querySelector('.success');
let dataLayer = document.querySelector('.data');

if(	!localStorage.getItem('signups') ) {
	localStorage.setItem('signups', '[]');
} else {
	signups = localStorage.getItem('signups');
	signups = JSON.parse(signups);
}

function saveItems() {
	localStorage.setItem('signups', JSON.stringify(signups));
}

function renderSignups() {
	let container = document.querySelector('textarea');
	let names = '';
	signups.forEach(user => {
		names += user.name + "\t" + user.email + "\n";
	});
	container.textContent = names;
}

function addEvents() {
	document.querySelector('#add-user').addEventListener('click', function(){
		let name = document.querySelector('#name').value;
		let email = document.querySelector('#email').value;
		let errors = errorCheck(name, email);

		if( errors ) {
			alert(errors);
			return;
		}
		signups.push({
			name: name,
			email: email
		});

		successLayer.classList.toggle('hidden');

		setTimeout( () => {
			AnimText.animate();
		}, 400 );

		setTimeout( () => {
			successLayer.classList.toggle('hidden');
			document.querySelector('form').reset();
		}, 2500 );

		saveItems();
	});

	document.querySelector('#data-button').addEventListener('click', function(){
		renderSignups();
		document.querySelector('.data.layer').classList.toggle('hidden');
	});

	document.querySelector('.close').addEventListener('click', function(){
		document.querySelector('.data.layer').classList.toggle('hidden');
	});

	document.querySelector('#nuke').addEventListener('click', function(){
		if( confirm('FIGYELEM!!! Biztos törlöd az összes feliratkozót?') ) {
			signups = [];
			saveItems();
			renderSignups();
		}
	});
}

function errorCheck(name, email) {
	let res = false;
	if( !name.length ) {
		res = 'Név megadása kötlelező';
	}
	if( !email.length ) {
		res = 'Email megadása kötelező';
	}
	if( email.indexOf('@') == -1 || email.indexOf('.') == -1 ) {
		res = 'Email nem valid';
	}
	return res;
}

function clearWorkers() {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
		for(let registration of registrations) {
			registration.unregister();
		} 
	});
}

class GlitchyText {

	constructor(id) {
		this.animNode = document.querySelector(id);
		this.animCount = 0;
		this.chars = '%@#_-÷×~^*⬛◮🞨⧨▤▥▦■□⚛☠☢☣⚠⚡☡';
		this.origText = this.animNode.textContent;
		this.anim = null; // interval ID 

		this.stepText();
	}

	stepText() {
		let mess = '';
		for(let i = 0; i < this.animNode.textContent.length; i++) {
			let rnd = Math.floor( Math.random() * this.chars.length );
			mess += (i <= this.animCount) ? this.origText[i] : this.chars[rnd];
		}
		this.animNode.textContent = mess;
	}

	animate() {
		this.anim = setInterval( () => {
			if( this.animCount == this.animNode.textContent.length - 1  ) {
				this.stepText();
				clearInterval(this.anim);
				this.animCount = 0;
			} else {
				this.stepText();
				this.animCount++;
			}
		}, 50 );
	}
}

// INITIALIZE APP
addEvents();

let AnimText = new GlitchyText('.success h1');

// ADD CLIPBOARD SUPPORT
var clipboard = new Clipboard('#copy');
clipboard.on('success', function(e) {
	alert('Adatok a vágólapra másolva')
    e.clearSelection();
});
