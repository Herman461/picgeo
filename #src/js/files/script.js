const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

const iconMenu = document.querySelector(".icon-menu");
const header = document.querySelector('.header')
if (iconMenu) {
	const menuContent = document.querySelector(".menu");
	iconMenu.addEventListener('click', function() {
		document.body.classList.toggle("_lock");
		iconMenu.classList.toggle("_active");
		menuContent.classList.toggle("_active");
	})
}

window.addEventListener('scroll', function() {
	if (document.documentElement.scrollTop > 10 && !header.classList.contains('_scroll')) {
		header.classList.add('_scroll')
		return
	}

	if (document.documentElement.scrollTop < 10 && header.classList.contains('_scroll')) {
		header.classList.remove('_scroll')
	}
})

const menuMoreButtons = document.querySelectorAll('.menu__more')

window.addEventListener('click', function(e) {
	if (e.target.closest('.menu__more')) {
		const button = e.target.closest('.menu__more')
		const submenu = button.parentElement.querySelector('.submenu')

		if (!submenu) return

		if (submenu.classList.contains('_slide')) return
		button.classList.toggle('_active')
		_slideToggle(submenu, 300)
	}
})

const menuItems = document.querySelectorAll('.menu__item')

if (menuItems) {
	for (let index = 0; index < menuItems.length; index++) {
		const menuItem = menuItems[index]
		menuItem.addEventListener('mouseenter', function(e) {
			if (isMobile.any()) return

			const submenu = menuItem.querySelector('.submenu')

			if (!submenu) return
			if (submenu.classList.contains('_slide')) return
			menuItem.classList.add('_active')
			_slideDown(submenu, 300)

			setTimeout(function() {
				if (!menuItem.classList.contains('_active')) {
					_slideUp(submenu, 300)
				}
			}, 300)

		})
		menuItem.addEventListener('mouseleave', function(e) {
			if (isMobile.any()) return

			const submenu = menuItem.querySelector('.submenu')

			menuItem.classList.remove('_active')
			_slideUp(submenu, 300)
		})
		menuItem.addEventListener('click', function(e) {
			if (!isMobile.any()) return

			if (!window.matchMedia('(max-width: 767px').matches) {
				const submenu = menuItem.querySelector('.submenu')
				if (submenu.classList.contains('_slide')) return
				menuItem.classList.toggle('_active')
				_slideToggle(submenu, 300)
			}
		})
	}
}

const select = document.querySelectorAll('.select')

for (let index = 0; index < select.length; ++index) {
	const item = select[index]
	const selectOption = item.querySelectorAll('option')
	const selectOptionLength = selectOption.length
	const selectedOption = item.querySelector('option[selected]')
	const disabledOption = item.querySelector('option[disabled]')
	const duration = 300

	item.querySelector('select').hidden = true

	const head = document.createElement('div')
	const text = document.createElement('span')

	head.classList.add('select__head')
	text.textContent = disabledOption.textContent
	head.append(text)
	item.append(head)

	const icon = item.querySelector('.select__icon')

	if (icon) {
		head.append(icon)
	}

	const selectList = document.createElement('ul')
	selectList.classList.add('select__list')
	item.append(selectList)


	for (let index = 1; index < selectOptionLength; index++) {
		const newOption = document.createElement('li')
		newOption.textContent = selectOption[index].textContent
		newOption.classList.add('select__item')
		newOption.dataset.value = selectOption[index].value
		selectList.append(newOption)
	}
	_slideUp(selectList)
	head.addEventListener('click', function(e) {
		if (!selectList.classList.contains('_slide') && e.target.closest('.select__head')) {
			head.classList.toggle('_active')
			_slideToggle(selectList)
		}
	})
	selectList.addEventListener('click', function(e) {
		if (e.target.closest('.select__item')) {
			const target = e.target.closest('.select__item')
			const value = target.dataset.value
			let newSelectedEl = item.querySelector(`option[value="${value}"]`)
			const oldSelectedEl = item.querySelector('option[selected]')

			if (!newSelectedEl) {
				for (let index = 1; index < selectOptionLength; index++) {
					const option = selectOption[index]
					if (option.textContent === value) {
						newSelectedEl = option
					}
				}
			}

			if (oldSelectedEl) {
				oldSelectedEl.removeAttribute('selected')
			}
			if (newSelectedEl) {
				newSelectedEl.setAttribute('selected', 'selected')
				text.textContent = newSelectedEl.textContent
			}
			head.classList.remove('_active')
			_slideUp(selectList)
		}
	})
}


const filterBtn = document.querySelector('.actions-catalog__filter-btn')

function toggleFilterMenu() {
	const menu = document.querySelector('.filter__content')
	if (menu.classList.contains('_slide')) return
	if (window.matchMedia('(max-width: 991.98px)').matches && !menu.hidden) {
		menu.hidden = true
	}
	if (window.matchMedia('(min-width: 991.98px)').matches && menu.hidden) {
		menu.hidden = false
	}
}
if (filterBtn) {

	toggleFilterMenu()
	filterBtn.addEventListener('click', function() {
		const menu = document.querySelector('.filter__content')
		filterBtn.parentElement.classList.toggle('_active-filter')
		_slideToggle(menu)
	})
	window.addEventListener('resize', toggleFilterMenu)
}
