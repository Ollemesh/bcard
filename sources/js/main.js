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