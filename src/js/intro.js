import '../scss/intro.scss'

window.addEventListener('DOMContentLoaded', function() {
	function changeTextNo(e) {
		e.currentTarget.text = 'No'
	}
	function changeTextYes(e) {
		e.currentTarget.text = 'Yes'
	}

	let answerNo = document.querySelector('.non-click')

	answerNo.addEventListener('mouseover', changeTextYes, false)
	answerNo.addEventListener('focus', changeTextYes, false)
	answerNo.addEventListener('mouseleave', changeTextNo, false)
	answerNo.addEventListener('blur', changeTextNo, false)

	// 엔터키로 입장
	const _body = document.querySelector('body')
	_body.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			window.location = window.location + 'public/main/'
		}
	})
})
