// closing menu

$('.burger_menu svg').click(function(){
	$('.menu').toggleClass('show');
	$('html').css('overflow-y', 'hidden');
});
$('.menu_btn-close').click(function(){
	$('.menu').removeClass('show');
	$('html').css('overflow-y', 'scroll');
});

// closing after clicking on the link

$('.menu_right a').click(function(){
	$('.menu').removeClass('show');
	$('html').css('overflow-y', 'scroll');
})

// switch pages

let arrNameBlock = ['header', 'about-us', 'services', 'cost', 'consult', 'comment', 'footer'];

$('.arrow-control').click(function(e){
	let thisArrow = $(this)[0].className;
	let nameBlock = thisArrow.split(' ')[1].split('__')[1];
	let position = e.target.dataset.position;

	arrNameBlock.map((el, i, arr) => {
		if (nameBlock === el && position === 'bottom') {
			if (!arr[i+1]) return;
			$('html, body').stop().animate({ scrollTop:$(`.${arr[++i]}`).offset().top}, 400);
		} else if (nameBlock === el && position === 'top'){
			if (!arr[i-1]) return;
			$('html, body').stop().animate({ scrollTop:$(`.${arr[--i]}`).offset().top}, 400);
		}
	})
})

// switch bar services

$('.services_configurator__bottom-bar').on('click', 'p', function() {
	$('.services_configurator__bottom-bar p').removeClass('configurator_bottom_active')
	$(this).addClass('configurator_bottom_active');
});
	
// switch bar cost

$('.cost_configurator p').click(function(){
	$('.cost_configurator p').removeClass('cost_active')
	$(this).addClass('cost_active');
});

// open/close popup

$('.order-phone').click(function(e){
	popUpToggle();
	$('.pop-up__wrapper').fadeIn();
});
$('.pop-up__btn-close').click(function(e){
	popUpToggle();
});

function popUpToggle(){
	$('.pop-up').fadeToggle();
}

$('.answer__btn-close').click(function(){
	popUpToggle();
	$('.answer').fadeOut();
})

// slider comment

$('.comment_section').slick({
	centerMode: true,
	arrows:false,
	autoplay: true,
	centerPadding: '60px',
	slidesToShow: 1,
	dots: true,
	responsive: [
	{
	  breakpoint: 800,
	  settings: {
	    centerMode: true,
	    centerPadding: '20px',
	    slidesToShow: 1
	  }
	},
	{
	  breakpoint: 600,
	  settings: {
	    centerMode: true,
	    centerPadding: '20px',
	    slidesToShow: 1
	  }
	},
	{
	  breakpoint: 480,
	  settings: {
	    centerMode: true,
	    centerPadding: '10px',
	    slidesToShow: 1
	  }
	}
	]
});

// switch services

let data = fetch('data/services.json')
.then((response) => {
	return response.json();
})
.then((resp) => {
	let data = resp.data;
	outPointBarItem();
	outServices();
	outCost();

	$('.services_configurator__bottom-bar').on('click', 'p', function(){
		outServices($(this)[0].innerHTML);
	});
	
	function outPointBarItem(){
		data.map((el, i, arr)=>{
			let white = 'class="configurator_bottom_active"';
			if (i !== 0) white = '';
			$('.services_configurator__bottom-bar').append(`<div><p ${white}>${el.title}</p></div>`);
		});
	}

	function outServices(name){
		data.map((el, i, arr) => {
			if (el.title === name){
				$('.services_configurator__output')[0].innerHTML = '';

				el.item.forEach((article)=>{
					$('.services_configurator__output').append(`
						<div>
							<div class="services_configurator__line"></div>
							<p>${article}</p>
						</div>
					`);
				})
			} else if (i === 0){
				arr[i].item.forEach((article)=>{
					$('.services_configurator__output').append(`
						<div>
							<div class="services_configurator__line"></div>
							<p>${article}</p>
						</div>
					`);
				})
			}
		});
	}

	function outCost(){
		data.map((el, i, arr)=>{
			$('.cost_table > table').append(`
				<tr>
					<td>${el.title}</td>
					<td>от 10 000₽</td>
				</tr>
			`);
		})
	}
})
.catch(function(err) {  
	console.log('Fetch Error :-S', err);  
});