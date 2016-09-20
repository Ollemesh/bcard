
window.onload =  () => {

//-------------- background -----------------------

	let background = document.getElementById('background');
	let backgroundCover = document.getElementById('backgroundCover');

	console.log('DOCUMENT LOADED');
	background.hidden = false;
	backgroundCover.classList.add('background-cover_loaded');

//----------------- other contacts pop-up ------------

document.getElementById('contacts').addEventListener('click', showOtherContacts);
document.getElementById('body').addEventListener('click', hideOtherContacts);

};

//------------------- Handlers init ---------------------------------

function showOtherContacts(e) {
	let otherContacts = document.createElement('div');
	otherContacts.classList.add('additionalContacts')

	let tamplate = document.getElementById('other-contacts-template').innerHTML;
	otherContacts.innerHTML = Handlebars.compile(tamplate)();

	document.getElementById('card').appendChild(otherContacts);

	e.stopPropagation();
}
function hideOtherContacts(e) {
	if ( e.target.classList[0] && e.target.classList[0].includes('additionalContacts') ) return;
	if ( document.querySelector('.additionalContacts') )
		document.getElementById('card').removeChild(document.querySelector('.additionalContacts'));
}
//----------------------------------------------------
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG53aW5kb3cub25sb2FkID0gICgpID0+IHtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0gYmFja2dyb3VuZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRsZXQgYmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kJyk7XHJcblx0bGV0IGJhY2tncm91bmRDb3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kQ292ZXInKTtcclxuXHJcblx0Y29uc29sZS5sb2coJ0RPQ1VNRU5UIExPQURFRCcpO1xyXG5cdGJhY2tncm91bmQuaGlkZGVuID0gZmFsc2U7XHJcblx0YmFja2dyb3VuZENvdmVyLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtY292ZXJfbG9hZGVkJyk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tIG90aGVyIGNvbnRhY3RzIHBvcC11cCAtLS0tLS0tLS0tLS1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd090aGVyQ29udGFjdHMpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZU90aGVyQ29udGFjdHMpO1xyXG5cclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLSBIYW5kbGVycyBpbml0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gc2hvd090aGVyQ29udGFjdHMoZSkge1xyXG5cdGxldCBvdGhlckNvbnRhY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0b3RoZXJDb250YWN0cy5jbGFzc0xpc3QuYWRkKCdhZGRpdGlvbmFsQ29udGFjdHMnKVxyXG5cclxuXHRsZXQgdGFtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItY29udGFjdHMtdGVtcGxhdGUnKS5pbm5lckhUTUw7XHJcblx0b3RoZXJDb250YWN0cy5pbm5lckhUTUwgPSBIYW5kbGViYXJzLmNvbXBpbGUodGFtcGxhdGUpKCk7XHJcblxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkJykuYXBwZW5kQ2hpbGQob3RoZXJDb250YWN0cyk7XHJcblxyXG5cdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZU90aGVyQ29udGFjdHMoZSkge1xyXG5cdGlmICggZS50YXJnZXQuY2xhc3NMaXN0WzBdICYmIGUudGFyZ2V0LmNsYXNzTGlzdFswXS5pbmNsdWRlcygnYWRkaXRpb25hbENvbnRhY3RzJykgKSByZXR1cm47XHJcblx0aWYgKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkaXRpb25hbENvbnRhY3RzJykgKVxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmQnKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkaXRpb25hbENvbnRhY3RzJykpO1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
