// ************ Tabs ************
function tabs(
    headerSelector,
    tabSelector,
    contentSelector,
    activeClass,
    display = 'flex',
) {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector)
    function hideTabContent() {
        content.forEach((item) => {
            item.style.display = 'none'
        })
        tab.forEach((item) => {
            item.classList.remove(activeClass)
        })
    }
    function showTabContent(i = 0) {
        content[i].style.display = display
        tab[i].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()
    header.addEventListener('click', (e) => {
        const target = e.target
        if (
            target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
        ) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}
if (document.querySelector('.tabs__header')) {
    tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active')
}

// Select
function toggleSelect() {
    const select = document.querySelector('#select')
    const selectDropdown = document.querySelector('.select__dropdown')
    const selectBackdrop = document.querySelector('.select__backdrop')
    select.addEventListener('click', () => {
        selectDropdown.classList.toggle('open')
        select.classList.toggle('open')
    })

    selectBackdrop.addEventListener('click', () => {
        selectDropdown.classList.remove('open')
    })
}
if (document.querySelector('#select')) {
    toggleSelect()
}
// ************ Messages Dropdown toggle  ************
function editMessage() {
    const btns = document.querySelectorAll('.message__btn')
    const dropdown = document.querySelectorAll('.message__dropdown')

    btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            dropdown[i].classList.toggle('active')
        })
    })
}
editMessage()

// ************ Light Mode ************
function lightMode() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    const checkbox = document.querySelector('.switch__checkbox')
    const btn = document.querySelector('.switch__checkbox')

    if (
        localStorage.theme === 'light' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
        document.body.classList.add('light')
        checkbox.checked = true
    } else {
        document.body.classList.remove('light')
        checkbox.checked = false
    }

    btn.addEventListener('click', () => {
        document.querySelector('body').classList.toggle('light')

        if (document.querySelector('body').classList.contains('light')) {
            localStorage.theme = 'light'
            checkbox.checked = true
        } else {
            localStorage.theme = 'dark'
            checkbox.checked = false
        }
    })
}
if (document.querySelector('.switch__checkbox')) {
    lightMode()
}

if (document.querySelector('.login__form')) {
    if (
        localStorage.theme === 'light' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
        document.body.classList.add('light')
    } else {
        document.body.classList.remove('light')
    }
}
// Модальное окно
function bindModal(triggerClass, modalClass, closeClass) {
    const trigger = document.querySelector(triggerClass)
    const modal = document.querySelector(modalClass)
    const close = document.querySelector(closeClass)

    const body = document.body

    trigger.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'flex'
        body.classList.add('locked')
    })
    close.addEventListener('click', () => {
        modal.style.display = 'none'
        body.classList.remove('locked')
    })
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'
            body.classList.remove('locked')
        }
    })
}

// ПЕРВЫЙ аргумент - класс кнопки, при клике на которую будет открываться модальное окно.
// ВТОРОЙ аргумент - класс самого модального окна.
// ТРЕТИЙ аргумент - класс кнопки, при клике на которую будет закрываться модальное окно.
if (document.querySelector('.login__form')) {
    bindModal('.modal__btn-1', '.modal__wrapper-1', '.modal__close-1')
    bindModal('.modal__btn-2', '.modal__wrapper-2', '.modal__close-2')
    bindModal('.modal__btn-3', '.modal__wrapper-3', '.modal__close-3')
}
