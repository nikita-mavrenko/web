window.addEventListener('DOMContentLoaded', () => {
	const products = {
		'Товар 1': 100,
		'Товар 2': 150,
		'Товар 3': 200,
	}

	const productSelect = document.getElementById('product')

	for (let product in products) {
		const option = document.createElement('option')
		option.value = products[product]
		option.textContent = `${product} - ${products[product]} руб`
		productSelect.appendChild(option)
	}

	const calculateBtn = document.getElementById('calculateBtn')

	calculateBtn.addEventListener('click', event => {
		event.preventDefault()
		const quantityInput = document.getElementById('quantity')
		const resultDiv = document.getElementById('result')

		const price = productSelect.value
		const quantity = quantityInput.value

		const regex = /^\d+$/

		if (!regex.test(quantity)) {
			resultDiv.textContent = 'Некорректное значение'
			return
		}

		const totalCost = price * quantity
		resultDiv.textContent = `Стоимость вашего заказа: ${totalCost} руб.`
	})
})
