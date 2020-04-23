import "../style/index.scss"

window.addEventListener("DOMContentLoaded", function() {
	let answers = document.querySelectorAll("strong a")

	function changeTextNo(e) {
		if (e.currentTarget.classList.contains('no')) e.currentTarget.text = "No"
		e.currentTarget.style.color = "greenyellow"
	}
	function changeTextYes(e) {
		e.currentTarget.text = "Yes"
		e.currentTarget.style.color = "green"
	}
	function addEvent (targets) {
		targets.forEach((target)=>{
			target.addEventListener("mouseover", changeTextYes, false)
			target.addEventListener("focus", changeTextYes, false)
			target.addEventListener("mouseleave", changeTextNo, false)
			target.addEventListener("blur", changeTextNo, false)
		})
	}
	addEvent(answers)

	// 엔터키로 입장
	const _body = document.querySelector("body")
	_body.addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {
			window.location = window.location + "my/"
		}
	})
})
