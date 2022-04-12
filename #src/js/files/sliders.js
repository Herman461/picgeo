//BuildSlider


let sliders = document.querySelectorAll("._swiper");

if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-build')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement("div");
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = "";
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-build');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_build_callback();
}

function sliders_build_callback() { }


let mainslider = new Swiper('.mainslider__body', {
	autoplay: {
		delay: 2500,
	},

	slidesPerView: 1,
	speed: 800,
	loop: true,
	pagination: {
		el: '.mainslider__dotts',
		clickable: true,
	},
})

let product_subslider = new Swiper(".images-product__subslider", {
	slidesPerView: 3,
});
let product_mainslider = new Swiper(".images-product__mainslider", {
	slidesPerView: 1,
	thumbs: {
		swiper: product_subslider,
	},
});
