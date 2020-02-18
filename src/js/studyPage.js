document.addEventListener('DOMContentLoaded', function() {
	const lnbItems = document.querySelectorAll('#main .lnb .lnb_item')
	const elSection = document.querySelectorAll('section')

	function hideElSection() {
		elSection.forEach(function(item) {
			item.hidden = true
		})
	}

	lnbItems.forEach(function(item) {
		item.addEventListener('click', function(e) {
			hideElSection()

			currentContent = e.currentTarget.dataset.value
			document.querySelector(`section[data-value='${currentContent}']`).hidden = false
		})
	})
})
