window.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product')
    const typesList = document.getElementById("types")
    const optionsList = document.getElementById("options")
    const additionsList = document.getElementById("additions")

    optionsList.style.display = "none"
    const products = {
        "Вода": {
            price: 100,
            types: null,
            options: null,
            addition: null,
        },
        "Пицца": {
            price: 500,
            types: [
                {
                    name: "Маленькая",
                    multi: 1,
                },
                {
                    name: "Средняя",
                    multi: 1.5,
                },
                {
                    name: "Большая",
                    multi: 2,
                },
            ],
            options: [
                {
                    name: "Пепперони",
                    multi: 1,
                },
                {
                    name: "С сыром пармезан",
                    multi: 1.2,
                },
                {
                    name: "Сардиния",
                    multi: 1.3,
                },
            ],
            addition: [
                {
                    name: "Помидоры",
                    price: 20,
                },
                {
                    name: "Оливки",
                    price: 15,
                }
            ],
        },
        "Роллы": {
            price: 500,
            types: null,
            options: [
                {
                    name: "Филадельфия",
                    multi: 1,
                },
                {
                    name: "Калифорния",
                    multi: 1.2,
                },
                {
                    name: "Темпура",
                    multi: 1.4,
                }
            ],
            addition: [
                {
                    name: "Имбирь",
                    price: 20,
                },
                {
                    name: "Васаби",
                    price: 30,
                },
            ],
        },
    }

    for (let product in products) {
        const option = document.createElement('option')
        option.value = product
        option.textContent = `${product} - от ${products[product].price} руб`
        productSelect.appendChild(option)
    }

    function change() {
        typesList.innerHTML = ''
        optionsList.innerHTML = ''
        additionsList.innerHTML = ''
        optionsList.style.display = "none"
        const product = products[productSelect.value]
        if (product.types != null) {
            for (const typeId in product.types) {
                const type = product.types[typeId]
                const newType = document.createElement("input")
                const newTypeLabel = document.createElement("label")
                newType.type = "radio"
                newType.name = productSelect.value
                newType.value = type.multi
                newType.id = productSelect.value
                newTypeLabel.for = productSelect.value
                newTypeLabel.textContent = type.name
                newType.checked = true
                typesList.appendChild(newTypeLabel)
                typesList.appendChild(newType)
            }
        }
        if (product.options != null) {
            optionsList.style.display = "block"
            for (const optionId in product.options) {
                const option = product.options[optionId]
                const newOption = document.createElement("option")
                newOption.value = option.multi
                newOption.textContent = option.name
                optionsList.appendChild(newOption)
            }
        }
        if (product.addition != null) {
            for (const additionId in product.addition) {
                const addition = product.addition[additionId]
                const newAddition = document.createElement("input")
                const newAdditionLabel = document.createElement("label")
                newAddition.type = "checkbox"
                newAddition.name = addition.name
                newAddition.value = addition.price
                newAdditionLabel.textContent = `${addition.name} - ${addition.price} рублей`
                newAdditionLabel.for = addition.name
                additionsList.appendChild(newAdditionLabel)
                additionsList.appendChild(newAddition)
            }
        }
    }


    productSelect.addEventListener('change', (event) => {
        change()
    })

    const calculateBtn = document.getElementById('calculateBtn')

    calculateBtn.addEventListener('click', event => {
        event.preventDefault()
        const quantityInput = document.getElementById('quantity')
        const resultDiv = document.getElementById('result')
        let multi = 1
        let add = 0

        const product = products[productSelect.value]
        const price = product.price
        console.log(product)

        if (product.types != null) {
            const type = document.querySelector('#types > input:checked')
            multi *= type.value
        }

        if (product.options != null) {
            multi *= optionsList.value
        }

        if (product.addition != null) {
            const additions = document.querySelectorAll('#additions > input:checked')
            additions.forEach(a => {
                add += Number(a.value)
            })
        }


        const quantity = quantityInput.value

        const regex = /^\d+$/

        if (!regex.test(quantity)) {
            resultDiv.textContent = 'Некорректное значение'
            return
        }

        console.log(multi)
        console.log(add)

        const totalCost = (price * multi + add) * quantity
        resultDiv.textContent = `Стоимость вашего заказа: ${totalCost} руб.`
    })

})