const $popularSlider = $('.popular-slider');


$popularSlider.on('init reInit afterChange', function(event, slick) {
    if (slick.slideCount > slick.options.slidesToShow) {
        $('.popular .slick-list').css("padding-right", "10%")
    }
});


$popularSlider.slick({
    speed: 300,
    slidesToShow: 4,
    // infinite: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
})

const accordionsNodes = document.querySelectorAll('[data-accordion]')

if (accordionsNodes.length > 0) {
    initAccordions()
}

function initAccordions() {
    const accordions = []
    for (let index = 0; index < accordionsNodes.length; ++index) {
        const root = accordionsNodes[index]
        const accordion = {}

        accordion.root = root
        accordion.items = root.querySelectorAll('[data-accordion-item]') || []
        accordion.media = parseFloat(root.dataset.media)
        accordion.isActivated = false

        accordions.push(accordion)
    }
    initAccordionsEvent(accordions)
}

function initAccordionsEvent(accordions) {
    const listener = function () {
        for (let index = 0; index < accordions.length; ++index) {
            const accordion = accordions[index]
            const media = window.matchMedia('(max-width: ' + accordion.media + 'px)')
            if (media.matches && !accordion.isActivated) {
                activateAccordion(accordion)
            } else if (!media.matches && accordion.isActivated) {
                deactivateAccordion(accordion)
            }
        }
    }
    window.addEventListener('resize', listener)
    listener()
}

function activateAccordion(accordion) {

    for (let index = 0; index < accordion.items.length; ++index) {
        const item = accordion.items[index]
        const content = document.createElement('div')
        const id = item.dataset.accordionItem
        const isActive = item.dataset.accordionItemActive !== undefined
        content.className = 'accordion-collapse collapse' + (isActive ? " show" : "")
        content.id = id

        item.querySelectorAll('[data-accordion-content]')?.forEach(el => {
            const elClone = el.cloneNode(true)

            el.classList.add('d-none')
            content.appendChild(elClone)
        })

        const button = item.querySelector('[data-accordion-button]')

        button.dataset.bsToggle = "collapse"
        button.dataset.bsTarget = "#" + id

        if (isActive) {
            button.classList.remove('collapsed')
        } else {
            button.classList.add('collapsed')
        }
        item.appendChild(content)
    }


    accordion.isActivated = true
}

function deactivateAccordion(accordion) {
    accordion.isActivated = false
    const content = accordion.root.querySelectorAll('.accordion-collapse')

    for (let index = 0; index < content.length; ++index) {
        const el = content[index]
        el.remove()
    }

    for (let index = 0; index < accordion.items.length; ++index) {
        const item = accordion.items[index]

        item.querySelectorAll('[data-accordion-content]')?.forEach(el => {
            el.classList.remove('d-none')
        })

        const button = item.querySelector('[data-accordion-button]')
        console.log(button)
        button.removeAttribute('data-bs-toggle')
        button.removeAttribute('data-bs-target')
    }

}
