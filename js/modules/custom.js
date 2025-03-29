export default function () {
  const cardPreview = document.querySelector('.card__preview')
  const highlight = document.querySelector('.card__preview--highlight')

  const cardNumberInput = document.querySelector('#cardNumber')
  const cardPreviewNumber = document.querySelector('.card__preview--number')

  const visaImage = document.querySelectorAll('.card__preview--visa')
  const mastercardImage = document.querySelectorAll('.card__preview--mastercard')

  const cardHolderInput = document.querySelector('#cardHolder')
  const cardPreviewHolder = document.querySelector('.card__preview--holder')

  const expirationDateMonthInput = document.querySelector('#month')
  const cardPreviewMonth = document.querySelector('.card__preview--month')

  const expirationDateYearInput = document.querySelector('#year')
  const cardPreviewYear = document.querySelector('.card__preview--year')

  const cardCWInput = document.querySelector('#cw')
  const cardPreviewCW = document.querySelector('.card__preview--cw')

  let expirationPreviewTransformChange = 23
  let monthNewTransformValue = -expirationPreviewTransformChange
  let yearNewTransformValue = -expirationPreviewTransformChange
  const changeYearAndMonthTransforms = () => {
    const windowWidth = window.innerWidth
    if (windowWidth <= 340) {
      expirationPreviewTransformChange = 14
      monthNewTransformValue = -expirationPreviewTransformChange
      yearNewTransformValue = -expirationPreviewTransformChange
    } else if (windowWidth <= 500) {
      expirationPreviewTransformChange = 20
      monthNewTransformValue = -expirationPreviewTransformChange
      yearNewTransformValue = -expirationPreviewTransformChange
    } else {
      expirationPreviewTransformChange = 23
      monthNewTransformValue = -expirationPreviewTransformChange
      yearNewTransformValue = -expirationPreviewTransformChange
    }
  }
  changeYearAndMonthTransforms()

  let cardPreviewRect = cardPreview.getBoundingClientRect()
  window.addEventListener('resize', (e) => {
    cardPreviewRect = cardPreview.getBoundingClientRect()

    changeYearAndMonthTransforms()
  })

  //Create Card Number Text
  for (let i = 0; i < 16; i++) {
    const span = document.createElement('span')
    span.innerHTML = '<div>#<br></div>'
    cardPreviewNumber.appendChild(span)
  }

  //Create Year Options
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < 5; i++) {
    const option = document.createElement('option')
    option.innerHTML = currentYear + i
    expirationDateYearInput.appendChild(option)
  }

  let previousEnteredCardNumbers = 0
  cardNumberInput.addEventListener('input', (e) => {
    const value = e.target.value
    const enteredCardNumbers = value.replace(/\D/g, '').length

    for (let i = 0; i < 2; i++) {
      if (enteredCardNumbers > 0 && value.slice(0, 1) == 4 && previousEnteredCardNumbers == 0) {
        visaImage[i].classList.add('visible')
        mastercardImage[i].classList.remove('visible')
        mastercardImage[i].classList.add('fade-out')
        setTimeout(() => {
          mastercardImage[i].classList.remove('fade-out')
        }, 200)
      } else if (enteredCardNumbers > 0 && value.slice(0, 1) == 5 && previousEnteredCardNumbers == 0) {
        mastercardImage[i].classList.add('visible')
        visaImage[i].classList.remove('visible')
        visaImage[i].classList.add('fade-out')
        setTimeout(() => {
          visaImage[i].classList.remove('fade-out')
        }, 200)
      }
    }

    if (previousEnteredCardNumbers > enteredCardNumbers) {
      cardPreviewNumber.children[15 - (15 - enteredCardNumbers)].classList.remove('filled')
      cardPreviewNumber.children[enteredCardNumbers].children[1].remove()
    } else {
      const div = document.createElement('div')
      div.innerHTML = value.slice(-1)
      const appendedChild = cardPreviewNumber.children[enteredCardNumbers - 1].appendChild(div)
      appendedChild.parentElement.classList.add('filled')
    }

    const newValue = value.replace(/(\d{4})(?=\d)/g, '$1 ')
    e.target.value = newValue

    previousEnteredCardNumbers = enteredCardNumbers
  })

  let previousEnteredHolderLetters = 0
  cardHolderInput.addEventListener('input', (e) => {
    const value = e.target.value
    const enteredHolderLetters = value.length

    if (enteredHolderLetters > 0) {
      cardPreviewHolder.classList.add('filled')
    } else {
      cardPreviewHolder.classList.remove('filled')
    }

    if (previousEnteredHolderLetters > enteredHolderLetters) {
      cardPreviewHolder.children[1].children[enteredHolderLetters].remove()
    } else {
      const div = document.createElement('div')
      div.innerHTML = value.slice(-1)
      const appendedChild = cardPreviewHolder.children[1].appendChild(div)
      requestAnimationFrame(() => {
        appendedChild.classList.add('filled')
      })
    }

    previousEnteredHolderLetters = enteredHolderLetters
  })

  let month = '0'
  expirationDateMonthInput.addEventListener('input', (e) => {
    const value = e.target.value

    if (month != value) {
      cardPreviewMonth.innerHTML += value + '<br>'
      cardPreviewMonth.style.transform = `translateY(${monthNewTransformValue}px)`
      monthNewTransformValue -= expirationPreviewTransformChange
    }

    month = value
  })

  let year = '0'
  expirationDateYearInput.addEventListener('input', (e) => {
    const value = e.target.value.slice(2, 4)

    if (year != value) {
      cardPreviewYear.innerHTML += value + '<br>'
      cardPreviewYear.style.transform = `translateY(${yearNewTransformValue}px)`
      yearNewTransformValue -= expirationPreviewTransformChange
    }

    year = value
  })

  cardCWInput.addEventListener('input', (e) => {
    const value = e.target.value

    cardPreviewCW.innerHTML = value
  })

  const setHighlightToElement = (element, leftOffset, topOffset, widthOffset, heightOffset) => {
    const elementRect = element.getBoundingClientRect()
    console.log(elementRect.width)

    highlight.style.width = `${elementRect.width + widthOffset}px`
    highlight.style.height = `${elementRect.height + heightOffset}px`
    highlight.style.left = `${elementRect.left - cardPreviewRect.left + leftOffset}px`
    highlight.style.top = `${elementRect.top - cardPreviewRect.top + topOffset}px`
  }

  const disableHighlight = () => {
    highlight.classList.add('disabled')
    highlight.style.width = '0px'
    highlight.style.height = '0px'
    highlight.style.left = '0px'
    highlight.style.top = '0px'
    setTimeout(() => {
      highlight.classList.remove('disabled')
    })
  }

  cardCWInput.addEventListener('focus', (e) => {
    cardPreview.classList.add('flipped')
    disableHighlight()
  })
  cardCWInput.addEventListener('focusout', (e) => {
    cardPreview.classList.remove('flipped')
  })

  cardNumberInput.addEventListener('focus', (e) => {
    window.innerWidth > 500
      ? setHighlightToElement(cardPreviewNumber, -10, 0, 0, 0)
      : window.innerWidth > 350
      ? setHighlightToElement(cardPreviewNumber, -5, 0, 0, 0)
      : setHighlightToElement(cardPreviewNumber, -5, 0, 0, 0)
  })
  cardHolderInput.addEventListener('focus', (e) => {
    window.innerWidth > 500
      ? setHighlightToElement(cardPreviewHolder, -5, -22, 0, 22)
      : window.innerWidth > 350
      ? setHighlightToElement(cardPreviewHolder, -5, -16, 0, 16)
      : setHighlightToElement(cardPreviewHolder, -5, -14, 0, 14)
  })
  const setHighlightToExpirationDate = () => {
    window.innerWidth > 500
      ? setHighlightToElement(cardPreviewMonth, -5, -22, 62, 22)
      : window.innerWidth > 350
      ? setHighlightToElement(cardPreviewMonth, -5, -16, 55, 16)
      : setHighlightToElement(cardPreviewMonth, -5, -14, 40, 14)
  }
  expirationDateMonthInput.addEventListener('focus', (e) => {
    setHighlightToExpirationDate()
  })
  expirationDateYearInput.addEventListener('focus', (e) => {
    setHighlightToExpirationDate()
  })
}
