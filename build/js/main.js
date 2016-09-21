//--------- tamplate function --------------

Handlebars.registerHelper('getPointsHTML', (slidesQuantity, index) => {
	let pointsBarHTML = '';
	let markedPointHtml =
			'<div class="slide__point slide__point_marked"></div>';
	for(let i = 0; i < slidesQuantity; i++) {
		if(i == index) {
			pointsBarHTML += markedPointHtml;
		} else {
			pointsBarHTML += `<div class='slide__point' data-index='${i}'></div>`;
		}
	}
	return new Handlebars.SafeString(pointsBarHTML);
});



//--------- Carousel class --------------------

class Carousel {

	constructor(slideList) {
		this.slideList = slideList;
		this.slideList.forEach( (slide, index) => {
			slide.slidesQuantity = slideList.length;
			slide.index = index;
		});
	}

	render(container) {
		this.container = container;
		this.renderSlide(0);
	}

	renderNextSlide() {
		if(this.currentSlideIndex + 1 === this.slideList.length) {
			this.renderSlide(0);
		} else {
			this.renderSlide(this.currentSlideIndex + 1);
		}
	}

	renderPreviousSlide() {
		if(this.currentSlideIndex === 0) {
			this.renderSlide(this.slideList.length - 1);
		} else {
			this.renderSlide(this.currentSlideIndex - 1);
		}
	}

	renderWhichPointClicked(e) {
		if(e.target.dataset.index) {
			this.renderSlide(parseInt(e.target.dataset.index));
		}
	}

	renderSlide(index) {
		this.currentSlideIndex = index;
		this.container.innerHTML = this.getCarouselBody(index);
		this.setHandlers();

		//Event dispatcher. Next line need only for switcher works.
		this.dispatchEvent();
	}

	setHandlers() {
		let nextArrow = document.getElementById('nextArrow');
		let previousArrow = document.getElementById('previousArrow');
		let pointsBar = document.getElementById('pointsBar');

		let slide = document.getElementById('slide');

		nextArrow.addEventListener('click', this.renderNextSlide.bind(this));
		previousArrow.addEventListener('click', this.renderPreviousSlide.bind(this));
		slide.addEventListener('mouseover', this.addHoveredClass.bind(this));
		slide.addEventListener('mouseout', this.removeHoveredClass.bind(this));
		slide.addEventListener('click', this.renderWhichPointClicked.bind(this));
	}

	//Event dispatcher. Next method need only for switcher works
	dispatchEvent() {
		let slide = document.getElementById('slide');

		let nextSlideEvent = new CustomEvent('nextSlide', {bubbles: true});
		slide.dispatchEvent(nextSlideEvent);
	}

	addHoveredClass(e) {
		let classList = e.target.classList;
		let classesQuantity = classList.length;
		for( let i = 0; i < classesQuantity; i++) {
			if(classList[i].includes('__')) {
				classList.add(`${classList[i]}_hovered`);
			}
		}
	}

	removeHoveredClass(e) {
		let classList = e.target.classList;
		for( let i = 0; i < classList.length; i++) {
			if(classList[i].includes('_hovered')) {
				classList.remove( classList[i] );
			}
		}
	}

	getCarouselBody(index) {
		this.tamplate = Handlebars.compile(
			document.getElementById('carouselTamplate').innerHTML
		);
		return this.tamplate(this.slideList[index]);
	}
};



//----------------------- main code --------------------

//------------------carousels init -----------------

let jsCarousel = new Carousel([
	{
		header: 'MapsReview',
		text: 'Приложение представляет из себя Яндекс-карту. На карте можно выбирать объекты и оставлять свои отзывы о них.Для выбора объекта необходимо просто кликнуть по нему. При клике на объект отображается всплывающее окно (окно отзывов). В заголовке окна отображен адрес выбранного объекта. Окно позволяет добавить отзыв об объекту и посмотреть уже имеющиеся отзывы.При создании отзыва в соответствующее место карты добавляется метка. Все метки одного объекта и объектов поблизости группируются в одну. У сгруппированных меток показывается их количество.Если кликнуть на одиночную метку, то появится окно отзывов по данному объекту. Если кликнуть на сгруппированную метку, то откроется карусель с отзывами. Каждый элемент карусели содержит адрес объекта. При клике на адрес, откроется окно с отзывами по данному объекту. При масштабировании карты происходит группировка меток.Примененные технологии: JavaScript ES2015 (ES6), Yandex Maps API, Handlebars.',
		preview: 'http://img.yinnyang.ru/product_list/img6a/33235176873_1.jpg',
		exampleKind: 'JS Examples'
	},
	{
		header: 'FriendsFilter',
		text: 'Приложение представляет из себя два списка. В левом перечислены все ваши друзья ВКонтакте. В правом списке только те друзья, которых вы выберете. Друзей можно перемещать между списками двумя способами: перетаскиванием (Drag&Drop) и нажимая на "+ / x" рядом с другом. В обоих списках работает поиск по фамилии. Нажав на "сохранить" оба списка сохраняются и при перезагрузке страницы восстанавливаются.Примененные технологии и парадигмы: JavaScript ES2015 (ES6), VK API, Handlebars, ООП.',
		preview: 'http://img.yinnyang.ru/product_list/img6a/33235176873_1.jpg',
		exampleKind: 'JS Examples'
	}
]);

let webPagesCarousel = new Carousel([
	{
		header: 'Respo Page',
		text: 'Example of my design and slicing skills',
		preview: 'http://img.yinnyang.ru/product_list/img6a/33235176873_1.jpg',
		exampleKind: 'Web Pages Examples'
	},
	{
		header: 'to CSSSR test',
		text: 'Test tusk to CSSSR team',
		preview: 'http://img.yinnyang.ru/product_list/img6a/33235176873_1.jpg',
		exampleKind: 'Web Pages Examples'
	}
]);

let carousels = {jsCarousel, webPagesCarousel};
//------------------------------------------------------------------

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

//---------------------- carousel ---------------------------------

document.getElementById('body').addEventListener('click', showCarousel);

};

//------------------- Handlers init ---------------------------------

//--------------------Handlers from bcard script ----------------------------

function showOtherContacts(e) {
	let otherContacts = document.createElement('div');
	otherContacts.classList.add('additionalContacts')

	let tamplate = document.getElementById('otherContactsTemplate').innerHTML;
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

//--------------------Handlers from carousel script----------------------------

let slide, switcher, currentExample;

function addHoveredClass(e) {
	let classList = e.target.classList;
	let classesQuantity = classList.length;
	for( let i = 0; i < classesQuantity; i++) {
		if(classList[i].includes('__')) {
			classList.add(`${classList[i]}_hovered`);
		}
	}
};

function removeHoveredClass(e) {
	let classList = e.target.classList;
	for( let i = 0; i < classList.length; i++) {
		if(classList[i].includes('_hovered')) {
			classList.remove( classList[i] );
		}
	}
};

function enableSwitcher(e) {
	if(e.target.classList[0] === 'slide__examples-switcher') {
		currentExample = switcher.innerHTML;
		switcher.innerHTML = '';
		for( let carousel in carousels ) {
			let example = document.createElement('div');
			example.classList.add('examples-switcher__example');
			example.innerHTML = carousels[carousel].slideList[0].exampleKind;
			example.dataset.carousel = carousel; // save the link to carousel object
			switcher.appendChild(example);
		}
	}
};

function disableSwitcher(e) {
	if(e.relatedTarget.classList[0] != 'examples-switcher__example') {
		removeAllChidrens(switcher);
		switcher.innerHTML = currentExample;
		switcher.classList.remove('slide__examples-switcher_hovered');
	}
	else if (e.relatedTarget.classList[0] === 'examples-switcher__example' && e.target.classList[0] != 'examples-switcher__example') { //чтобы не сработал обработчик, отменяющий класс hovered у switcher. В этом классе прописана обводка рамки
		e.stopPropagation();
	}
};

function removeAllChidrens(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
};

function chooseCarousel(e) {
	if(e.target.dataset.carousel) {
		carousels[e.target.dataset.carousel].render(document.getElementById('carouselContainer'));
	}
};

function setSwitcherHandlers() {
	switcher = document.getElementById('switcher');
	slide = document.getElementById('slide');

	switcher.addEventListener('mouseover', enableSwitcher);
	switcher.addEventListener('mouseout', disableSwitcher);
	switcher.addEventListener('click', chooseCarousel);
};

//----------------------------------------------------

//--------------- lats parts Handlers for render carousels after button click ----------------------

function showCarousel(e) {
	if(e.target.dataset.type) {
		carousels[e.target.dataset.type].render(body);
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tIHRhbXBsYXRlIGZ1bmN0aW9uIC0tLS0tLS0tLS0tLS0tXHJcblxyXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdnZXRQb2ludHNIVE1MJywgKHNsaWRlc1F1YW50aXR5LCBpbmRleCkgPT4ge1xyXG5cdGxldCBwb2ludHNCYXJIVE1MID0gJyc7XHJcblx0bGV0IG1hcmtlZFBvaW50SHRtbCA9XHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwic2xpZGVfX3BvaW50IHNsaWRlX19wb2ludF9tYXJrZWRcIj48L2Rpdj4nO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBzbGlkZXNRdWFudGl0eTsgaSsrKSB7XHJcblx0XHRpZihpID09IGluZGV4KSB7XHJcblx0XHRcdHBvaW50c0JhckhUTUwgKz0gbWFya2VkUG9pbnRIdG1sO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9pbnRzQmFySFRNTCArPSBgPGRpdiBjbGFzcz0nc2xpZGVfX3BvaW50JyBkYXRhLWluZGV4PScke2l9Jz48L2Rpdj5gO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhwb2ludHNCYXJIVE1MKTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tIENhcm91c2VsIGNsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5jbGFzcyBDYXJvdXNlbCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHNsaWRlTGlzdCkge1xyXG5cdFx0dGhpcy5zbGlkZUxpc3QgPSBzbGlkZUxpc3Q7XHJcblx0XHR0aGlzLnNsaWRlTGlzdC5mb3JFYWNoKCAoc2xpZGUsIGluZGV4KSA9PiB7XHJcblx0XHRcdHNsaWRlLnNsaWRlc1F1YW50aXR5ID0gc2xpZGVMaXN0Lmxlbmd0aDtcclxuXHRcdFx0c2xpZGUuaW5kZXggPSBpbmRleDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNvbnRhaW5lcikge1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnJlbmRlclNsaWRlKDApO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyTmV4dFNsaWRlKCkge1xyXG5cdFx0aWYodGhpcy5jdXJyZW50U2xpZGVJbmRleCArIDEgPT09IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnJlbmRlclNsaWRlKDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUluZGV4ICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJQcmV2aW91c1NsaWRlKCkge1xyXG5cdFx0aWYodGhpcy5jdXJyZW50U2xpZGVJbmRleCA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLnJlbmRlclNsaWRlKHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUluZGV4IC0gMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJXaGljaFBvaW50Q2xpY2tlZChlKSB7XHJcblx0XHRpZihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSB7XHJcblx0XHRcdHRoaXMucmVuZGVyU2xpZGUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyU2xpZGUoaW5kZXgpIHtcclxuXHRcdHRoaXMuY3VycmVudFNsaWRlSW5kZXggPSBpbmRleDtcclxuXHRcdHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuZ2V0Q2Fyb3VzZWxCb2R5KGluZGV4KTtcclxuXHRcdHRoaXMuc2V0SGFuZGxlcnMoKTtcclxuXHJcblx0XHQvL0V2ZW50IGRpc3BhdGNoZXIuIE5leHQgbGluZSBuZWVkIG9ubHkgZm9yIHN3aXRjaGVyIHdvcmtzLlxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCk7XHJcblx0fVxyXG5cclxuXHRzZXRIYW5kbGVycygpIHtcclxuXHRcdGxldCBuZXh0QXJyb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dEFycm93Jyk7XHJcblx0XHRsZXQgcHJldmlvdXNBcnJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aW91c0Fycm93Jyk7XHJcblx0XHRsZXQgcG9pbnRzQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvaW50c0JhcicpO1xyXG5cclxuXHRcdGxldCBzbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZScpO1xyXG5cclxuXHRcdG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVuZGVyTmV4dFNsaWRlLmJpbmQodGhpcykpO1xyXG5cdFx0cHJldmlvdXNBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVuZGVyUHJldmlvdXNTbGlkZS5iaW5kKHRoaXMpKTtcclxuXHRcdHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuYWRkSG92ZXJlZENsYXNzLmJpbmQodGhpcykpO1xyXG5cdFx0c2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLnJlbW92ZUhvdmVyZWRDbGFzcy5iaW5kKHRoaXMpKTtcclxuXHRcdHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW5kZXJXaGljaFBvaW50Q2xpY2tlZC5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8vRXZlbnQgZGlzcGF0Y2hlci4gTmV4dCBtZXRob2QgbmVlZCBvbmx5IGZvciBzd2l0Y2hlciB3b3Jrc1xyXG5cdGRpc3BhdGNoRXZlbnQoKSB7XHJcblx0XHRsZXQgc2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGUnKTtcclxuXHJcblx0XHRsZXQgbmV4dFNsaWRlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ25leHRTbGlkZScsIHtidWJibGVzOiB0cnVlfSk7XHJcblx0XHRzbGlkZS5kaXNwYXRjaEV2ZW50KG5leHRTbGlkZUV2ZW50KTtcclxuXHR9XHJcblxyXG5cdGFkZEhvdmVyZWRDbGFzcyhlKSB7XHJcblx0XHRsZXQgY2xhc3NMaXN0ID0gZS50YXJnZXQuY2xhc3NMaXN0O1xyXG5cdFx0bGV0IGNsYXNzZXNRdWFudGl0eSA9IGNsYXNzTGlzdC5sZW5ndGg7XHJcblx0XHRmb3IoIGxldCBpID0gMDsgaSA8IGNsYXNzZXNRdWFudGl0eTsgaSsrKSB7XHJcblx0XHRcdGlmKGNsYXNzTGlzdFtpXS5pbmNsdWRlcygnX18nKSkge1xyXG5cdFx0XHRcdGNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NMaXN0W2ldfV9ob3ZlcmVkYCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbW92ZUhvdmVyZWRDbGFzcyhlKSB7XHJcblx0XHRsZXQgY2xhc3NMaXN0ID0gZS50YXJnZXQuY2xhc3NMaXN0O1xyXG5cdFx0Zm9yKCBsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYoY2xhc3NMaXN0W2ldLmluY2x1ZGVzKCdfaG92ZXJlZCcpKSB7XHJcblx0XHRcdFx0Y2xhc3NMaXN0LnJlbW92ZSggY2xhc3NMaXN0W2ldICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldENhcm91c2VsQm9keShpbmRleCkge1xyXG5cdFx0dGhpcy50YW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nhcm91c2VsVGFtcGxhdGUnKS5pbm5lckhUTUxcclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gdGhpcy50YW1wbGF0ZSh0aGlzLnNsaWRlTGlzdFtpbmRleF0pO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtYWluIGNvZGUgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tY2Fyb3VzZWxzIGluaXQgLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmxldCBqc0Nhcm91c2VsID0gbmV3IENhcm91c2VsKFtcclxuXHR7XHJcblx0XHRoZWFkZXI6ICdNYXBzUmV2aWV3JyxcclxuXHRcdHRleHQ6ICfQn9GA0LjQu9C+0LbQtdC90LjQtSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0LjQtyDRgdC10LHRjyDQr9C90LTQtdC60YEt0LrQsNGA0YLRgy4g0J3QsCDQutCw0YDRgtC1INC80L7QttC90L4g0LLRi9Cx0LjRgNCw0YLRjCDQvtCx0YrQtdC60YLRiyDQuCDQvtGB0YLQsNCy0LvRj9GC0Ywg0YHQstC+0Lgg0L7RgtC30YvQstGLINC+INC90LjRhS7QlNC70Y8g0LLRi9Cx0L7RgNCwINC+0LHRitC10LrRgtCwINC90LXQvtCx0YXQvtC00LjQvNC+INC/0YDQvtGB0YLQviDQutC70LjQutC90YPRgtGMINC/0L4g0L3QtdC80YMuINCf0YDQuCDQutC70LjQutC1INC90LAg0L7QsdGK0LXQutGCINC+0YLQvtCx0YDQsNC20LDQtdGC0YHRjyDQstGB0L/Qu9GL0LLQsNGO0YnQtdC1INC+0LrQvdC+ICjQvtC60L3QviDQvtGC0LfRi9Cy0L7QsikuINCSINC30LDQs9C+0LvQvtCy0LrQtSDQvtC60L3QsCDQvtGC0L7QsdGA0LDQttC10L0g0LDQtNGA0LXRgSDQstGL0LHRgNCw0L3QvdC+0LPQviDQvtCx0YrQtdC60YLQsC4g0J7QutC90L4g0L/QvtC30LLQvtC70Y/QtdGCINC00L7QsdCw0LLQuNGC0Ywg0L7RgtC30YvQsiDQvtCxINC+0LHRitC10LrRgtGDINC4INC/0L7RgdC80L7RgtGA0LXRgtGMINGD0LbQtSDQuNC80LXRjtGJ0LjQtdGB0Y8g0L7RgtC30YvQstGLLtCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC+0YLQt9GL0LLQsCDQsiDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQviDQutCw0YDRgtGLINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LzQtdGC0LrQsC4g0JLRgdC1INC80LXRgtC60Lgg0L7QtNC90L7Qs9C+INC+0LHRitC10LrRgtCwINC4INC+0LHRitC10LrRgtC+0LIg0L/QvtCx0LvQuNC30L7RgdGC0Lgg0LPRgNGD0L/Qv9C40YDRg9GO0YLRgdGPINCyINC+0LTQvdGDLiDQoyDRgdCz0YDRg9C/0L/QuNGA0L7QstCw0L3QvdGL0YUg0LzQtdGC0L7QuiDQv9C+0LrQsNC30YvQstCw0LXRgtGB0Y8g0LjRhSDQutC+0LvQuNGH0LXRgdGC0LLQvi7QldGB0LvQuCDQutC70LjQutC90YPRgtGMINC90LAg0L7QtNC40L3QvtGH0L3Rg9GOINC80LXRgtC60YMsINGC0L4g0L/QvtGP0LLQuNGC0YHRjyDQvtC60L3QviDQvtGC0LfRi9Cy0L7QsiDQv9C+INC00LDQvdC90L7QvNGDINC+0LHRitC10LrRgtGDLiDQldGB0LvQuCDQutC70LjQutC90YPRgtGMINC90LAg0YHQs9GA0YPQv9C/0LjRgNC+0LLQsNC90L3Rg9GOINC80LXRgtC60YMsINGC0L4g0L7RgtC60YDQvtC10YLRgdGPINC60LDRgNGD0YHQtdC70Ywg0YEg0L7RgtC30YvQstCw0LzQuC4g0JrQsNC20LTRi9C5INGN0LvQtdC80LXQvdGCINC60LDRgNGD0YHQtdC70Lgg0YHQvtC00LXRgNC20LjRgiDQsNC00YDQtdGBINC+0LHRitC10LrRgtCwLiDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINCw0LTRgNC10YEsINC+0YLQutGA0L7QtdGC0YHRjyDQvtC60L3QviDRgSDQvtGC0LfRi9Cy0LDQvNC4INC/0L4g0LTQsNC90L3QvtC80YMg0L7QsdGK0LXQutGC0YMuINCf0YDQuCDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Lgg0LrQsNGA0YLRiyDQv9GA0L7QuNGB0YXQvtC00LjRgiDQs9GA0YPQv9C/0LjRgNC+0LLQutCwINC80LXRgtC+0Lou0J/RgNC40LzQtdC90LXQvdC90YvQtSDRgtC10YXQvdC+0LvQvtCz0LjQuDogSmF2YVNjcmlwdCBFUzIwMTUgKEVTNiksIFlhbmRleCBNYXBzIEFQSSwgSGFuZGxlYmFycy4nLFxyXG5cdFx0cHJldmlldzogJ2h0dHA6Ly9pbWcueWlubnlhbmcucnUvcHJvZHVjdF9saXN0L2ltZzZhLzMzMjM1MTc2ODczXzEuanBnJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnSlMgRXhhbXBsZXMnXHJcblx0fSxcclxuXHR7XHJcblx0XHRoZWFkZXI6ICdGcmllbmRzRmlsdGVyJyxcclxuXHRcdHRleHQ6ICfQn9GA0LjQu9C+0LbQtdC90LjQtSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0LjQtyDRgdC10LHRjyDQtNCy0LAg0YHQv9C40YHQutCwLiDQkiDQu9C10LLQvtC8INC/0LXRgNC10YfQuNGB0LvQtdC90Ysg0LLRgdC1INCy0LDRiNC4INC00YDRg9C30YzRjyDQktCa0L7QvdGC0LDQutGC0LUuINCSINC/0YDQsNCy0L7QvCDRgdC/0LjRgdC60LUg0YLQvtC70YzQutC+INGC0LUg0LTRgNGD0LfRjNGPLCDQutC+0YLQvtGA0YvRhSDQstGLINCy0YvQsdC10YDQtdGC0LUuINCU0YDRg9C30LXQuSDQvNC+0LbQvdC+INC/0LXRgNC10LzQtdGJ0LDRgtGMINC80LXQttC00YMg0YHQv9C40YHQutCw0LzQuCDQtNCy0YPQvNGPINGB0L/QvtGB0L7QsdCw0LzQuDog0L/QtdGA0LXRgtCw0YHQutC40LLQsNC90LjQtdC8IChEcmFnJkRyb3ApINC4INC90LDQttC40LzQsNGPINC90LAgXCIrIC8geFwiINGA0Y/QtNC+0Lwg0YEg0LTRgNGD0LPQvtC8LiDQkiDQvtCx0L7QuNGFINGB0L/QuNGB0LrQsNGFINGA0LDQsdC+0YLQsNC10YIg0L/QvtC40YHQuiDQv9C+INGE0LDQvNC40LvQuNC4LiDQndCw0LbQsNCyINC90LAgXCLRgdC+0YXRgNCw0L3QuNGC0YxcIiDQvtCx0LAg0YHQv9C40YHQutCwINGB0L7RhdGA0LDQvdGP0Y7RgtGB0Y8g0Lgg0L/RgNC4INC/0LXRgNC10LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINCy0L7RgdGB0YLQsNC90LDQstC70LjQstCw0Y7RgtGB0Y8u0J/RgNC40LzQtdC90LXQvdC90YvQtSDRgtC10YXQvdC+0LvQvtCz0LjQuCDQuCDQv9Cw0YDQsNC00LjQs9C80Ys6IEphdmFTY3JpcHQgRVMyMDE1IChFUzYpLCBWSyBBUEksIEhhbmRsZWJhcnMsINCe0J7Qny4nLFxyXG5cdFx0cHJldmlldzogJ2h0dHA6Ly9pbWcueWlubnlhbmcucnUvcHJvZHVjdF9saXN0L2ltZzZhLzMzMjM1MTc2ODczXzEuanBnJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnSlMgRXhhbXBsZXMnXHJcblx0fVxyXG5dKTtcclxuXHJcbmxldCB3ZWJQYWdlc0Nhcm91c2VsID0gbmV3IENhcm91c2VsKFtcclxuXHR7XHJcblx0XHRoZWFkZXI6ICdSZXNwbyBQYWdlJyxcclxuXHRcdHRleHQ6ICdFeGFtcGxlIG9mIG15IGRlc2lnbiBhbmQgc2xpY2luZyBza2lsbHMnLFxyXG5cdFx0cHJldmlldzogJ2h0dHA6Ly9pbWcueWlubnlhbmcucnUvcHJvZHVjdF9saXN0L2ltZzZhLzMzMjM1MTc2ODczXzEuanBnJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnV2ViIFBhZ2VzIEV4YW1wbGVzJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0aGVhZGVyOiAndG8gQ1NTU1IgdGVzdCcsXHJcblx0XHR0ZXh0OiAnVGVzdCB0dXNrIHRvIENTU1NSIHRlYW0nLFxyXG5cdFx0cHJldmlldzogJ2h0dHA6Ly9pbWcueWlubnlhbmcucnUvcHJvZHVjdF9saXN0L2ltZzZhLzMzMjM1MTc2ODczXzEuanBnJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnV2ViIFBhZ2VzIEV4YW1wbGVzJ1xyXG5cdH1cclxuXSk7XHJcblxyXG5sZXQgY2Fyb3VzZWxzID0ge2pzQ2Fyb3VzZWwsIHdlYlBhZ2VzQ2Fyb3VzZWx9O1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICAoKSA9PiB7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tIGJhY2tncm91bmQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0bGV0IGJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZCcpO1xyXG5cdGxldCBiYWNrZ3JvdW5kQ292ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZENvdmVyJyk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdET0NVTUVOVCBMT0FERUQnKTtcclxuXHRiYWNrZ3JvdW5kLmhpZGRlbiA9IGZhbHNlO1xyXG5cdGJhY2tncm91bmRDb3Zlci5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLWNvdmVyX2xvYWRlZCcpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLSBvdGhlciBjb250YWN0cyBwb3AtdXAgLS0tLS0tLS0tLS0tXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dPdGhlckNvbnRhY3RzKTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVPdGhlckNvbnRhY3RzKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjYXJvdXNlbCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93Q2Fyb3VzZWwpO1xyXG5cclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLSBIYW5kbGVycyBpbml0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLUhhbmRsZXJzIGZyb20gYmNhcmQgc2NyaXB0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIHNob3dPdGhlckNvbnRhY3RzKGUpIHtcclxuXHRsZXQgb3RoZXJDb250YWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdG90aGVyQ29udGFjdHMuY2xhc3NMaXN0LmFkZCgnYWRkaXRpb25hbENvbnRhY3RzJylcclxuXHJcblx0bGV0IHRhbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyQ29udGFjdHNUZW1wbGF0ZScpLmlubmVySFRNTDtcclxuXHRvdGhlckNvbnRhY3RzLmlubmVySFRNTCA9IEhhbmRsZWJhcnMuY29tcGlsZSh0YW1wbGF0ZSkoKTtcclxuXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmQnKS5hcHBlbmRDaGlsZChvdGhlckNvbnRhY3RzKTtcclxuXHJcblx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlT3RoZXJDb250YWN0cyhlKSB7XHJcblx0aWYgKCBlLnRhcmdldC5jbGFzc0xpc3RbMF0gJiYgZS50YXJnZXQuY2xhc3NMaXN0WzBdLmluY2x1ZGVzKCdhZGRpdGlvbmFsQ29udGFjdHMnKSApIHJldHVybjtcclxuXHRpZiAoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRpdGlvbmFsQ29udGFjdHMnKSApXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZCcpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRpdGlvbmFsQ29udGFjdHMnKSk7XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tSGFuZGxlcnMgZnJvbSBjYXJvdXNlbCBzY3JpcHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5sZXQgc2xpZGUsIHN3aXRjaGVyLCBjdXJyZW50RXhhbXBsZTtcclxuXHJcbmZ1bmN0aW9uIGFkZEhvdmVyZWRDbGFzcyhlKSB7XHJcblx0bGV0IGNsYXNzTGlzdCA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuXHRsZXQgY2xhc3Nlc1F1YW50aXR5ID0gY2xhc3NMaXN0Lmxlbmd0aDtcclxuXHRmb3IoIGxldCBpID0gMDsgaSA8IGNsYXNzZXNRdWFudGl0eTsgaSsrKSB7XHJcblx0XHRpZihjbGFzc0xpc3RbaV0uaW5jbHVkZXMoJ19fJykpIHtcclxuXHRcdFx0Y2xhc3NMaXN0LmFkZChgJHtjbGFzc0xpc3RbaV19X2hvdmVyZWRgKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiByZW1vdmVIb3ZlcmVkQ2xhc3MoZSkge1xyXG5cdGxldCBjbGFzc0xpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcblx0Zm9yKCBsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmKGNsYXNzTGlzdFtpXS5pbmNsdWRlcygnX2hvdmVyZWQnKSkge1xyXG5cdFx0XHRjbGFzc0xpc3QucmVtb3ZlKCBjbGFzc0xpc3RbaV0gKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBlbmFibGVTd2l0Y2hlcihlKSB7XHJcblx0aWYoZS50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnc2xpZGVfX2V4YW1wbGVzLXN3aXRjaGVyJykge1xyXG5cdFx0Y3VycmVudEV4YW1wbGUgPSBzd2l0Y2hlci5pbm5lckhUTUw7XHJcblx0XHRzd2l0Y2hlci5pbm5lckhUTUwgPSAnJztcclxuXHRcdGZvciggbGV0IGNhcm91c2VsIGluIGNhcm91c2VscyApIHtcclxuXHRcdFx0bGV0IGV4YW1wbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0ZXhhbXBsZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlcy1zd2l0Y2hlcl9fZXhhbXBsZScpO1xyXG5cdFx0XHRleGFtcGxlLmlubmVySFRNTCA9IGNhcm91c2Vsc1tjYXJvdXNlbF0uc2xpZGVMaXN0WzBdLmV4YW1wbGVLaW5kO1xyXG5cdFx0XHRleGFtcGxlLmRhdGFzZXQuY2Fyb3VzZWwgPSBjYXJvdXNlbDsgLy8gc2F2ZSB0aGUgbGluayB0byBjYXJvdXNlbCBvYmplY3RcclxuXHRcdFx0c3dpdGNoZXIuYXBwZW5kQ2hpbGQoZXhhbXBsZSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZGlzYWJsZVN3aXRjaGVyKGUpIHtcclxuXHRpZihlLnJlbGF0ZWRUYXJnZXQuY2xhc3NMaXN0WzBdICE9ICdleGFtcGxlcy1zd2l0Y2hlcl9fZXhhbXBsZScpIHtcclxuXHRcdHJlbW92ZUFsbENoaWRyZW5zKHN3aXRjaGVyKTtcclxuXHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IGN1cnJlbnRFeGFtcGxlO1xyXG5cdFx0c3dpdGNoZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfX2V4YW1wbGVzLXN3aXRjaGVyX2hvdmVyZWQnKTtcclxuXHR9XHJcblx0ZWxzZSBpZiAoZS5yZWxhdGVkVGFyZ2V0LmNsYXNzTGlzdFswXSA9PT0gJ2V4YW1wbGVzLXN3aXRjaGVyX19leGFtcGxlJyAmJiBlLnRhcmdldC5jbGFzc0xpc3RbMF0gIT0gJ2V4YW1wbGVzLXN3aXRjaGVyX19leGFtcGxlJykgeyAvL9GH0YLQvtCx0Ysg0L3QtSDRgdGA0LDQsdC+0YLQsNC7INC+0LHRgNCw0LHQvtGC0YfQuNC6LCDQvtGC0LzQtdC90Y/RjtGJ0LjQuSDQutC70LDRgdGBIGhvdmVyZWQg0YMgc3dpdGNoZXIuINCSINGN0YLQvtC8INC60LvQsNGB0YHQtSDQv9GA0L7Qv9C40YHQsNC90LAg0L7QsdCy0L7QtNC60LAg0YDQsNC80LrQuFxyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiByZW1vdmVBbGxDaGlkcmVucyhlbGVtZW50KSB7XHJcblx0d2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0ZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGNob29zZUNhcm91c2VsKGUpIHtcclxuXHRpZihlLnRhcmdldC5kYXRhc2V0LmNhcm91c2VsKSB7XHJcblx0XHRjYXJvdXNlbHNbZS50YXJnZXQuZGF0YXNldC5jYXJvdXNlbF0ucmVuZGVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJvdXNlbENvbnRhaW5lcicpKTtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRTd2l0Y2hlckhhbmRsZXJzKCkge1xyXG5cdHN3aXRjaGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaGVyJyk7XHJcblx0c2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGUnKTtcclxuXHJcblx0c3dpdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZW5hYmxlU3dpdGNoZXIpO1xyXG5cdHN3aXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZGlzYWJsZVN3aXRjaGVyKTtcclxuXHRzd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNob29zZUNhcm91c2VsKTtcclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0gbGF0cyBwYXJ0cyBIYW5kbGVycyBmb3IgcmVuZGVyIGNhcm91c2VscyBhZnRlciBidXR0b24gY2xpY2sgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gc2hvd0Nhcm91c2VsKGUpIHtcclxuXHRpZihlLnRhcmdldC5kYXRhc2V0LnR5cGUpIHtcclxuXHRcdGNhcm91c2Vsc1tlLnRhcmdldC5kYXRhc2V0LnR5cGVdLnJlbmRlcihib2R5KTtcclxuXHR9XHJcbn07Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
