window.addEventListener('DOMContentLoaded', function() {
	console.log('loaded')
	// common component fetch
	fetch('/src/components/header.html')
		.then((response) => {
			return response.text()
		})
		.then((data) => {
			document.querySelector('#header').innerHTML = data
			fetch('/src/components/footer.html')
				.then((response) => {
					return response.text()
				})
				.then((data) => {
					document.querySelector('#footer').innerHTML = data
					ready()
				})
		})
})

function ready() {
	let _body = document.querySelector('body')
	let _header = document.querySelector('#header')
	let _main = document.querySelector('#main')
	let _footer = document.querySelector('#footer')
	let lnbItemStudy = document.querySelector('.gnb_item.study a')
	let studyList = document.querySelector('.study_list--wrap')

	let allPopupLayer = document.querySelectorAll('.popup-layer')
	let allOpenPopupLayer = document.querySelectorAll('.open-popup-layer')

	// page loading UI
	document.querySelector('#pageLoading').hidden = true
	document.querySelector('#pageLoaded').hidden = false

	// gnb item(study) show
	lnbItemStudy.addEventListener('click', function(e) {
		if (studyList.classList.contains('is-show')) {
			studyList.classList.remove('is-show')
		} else {
			studyList.classList.add('is-show')
		}
	})

	allPopupLayer.forEach(function(item) {
		item.addEventListener('click', function(e) {
			e.stopPropagation()
		})
	})
	allOpenPopupLayer.forEach(function(item) {
		item.addEventListener('click', function(e) {
			e.stopPropagation()
			e.preventDefault()
		})
	})

	// all popup-layer close event
	_body.addEventListener('click', function(e) {
		console.log('click')
		allPopupLayer.forEach(function(item) {
			item.classList.remove('is-show')
		})
	})
}
