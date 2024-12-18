document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector(".modal")
    const openModalButton = document.querySelector('.open-modal');
    const closeModalButton = document.querySelector('.close');
    const feedbackForm = document.querySelector('#feedback-form');
    const responseMessage = document.querySelector('.response-message');

    openModalButton.onclick = () => {
        modal.style.display = 'block';
        history.pushState({ modalOpen: true }, '', '?modal=open');
        loadFormData();
    };

    closeModalButton.onclick = () => {
        closeModal();
    };

    window.onkeydown = (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    window.onpopstate = (event) => {
        if (event.state && event.state.modalOpen) {
            modal.style.display = 'block';
            loadFormData();
        } else {
            closeModal();
        }
    };

    feedbackForm.onsubmit = (event) => {
        
        event.preventDefault();
        const formData = new FormData(feedbackForm);
        const data = {};
        formData.forEach((v, k) => data[k] = v);
        const dataJSON = JSON.stringify(data);

        console.log(dataJSON)
        fetch('https://formcarry.com/s/xCAxz_RE3dU', { 
            method: 'POST',
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: dataJSON,
        })
        .then(data => {
            console.log(data)
            if (data.success) {
                responseMessage.textContent = 'Спасибо за ваше сообщение!';
                feedbackForm.reset();
                clearFormData();
            } else {
                responseMessage.textContent = 'Произошла ошибка.';
            }
        })
        .catch(error => {
            responseMessage.textContent = 'Ошибка при отправке формы.';
        });
    };


    function closeModal() {
        modal.style.display = 'none';
        history.pushState(null, '', window.location.pathname);
        saveFormData();
    }

    function saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
            agreement: document.getElementById('agreement').checked
        };
        localStorage.setItem('feedbackFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('feedbackFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('message').value = formData.message || '';
            document.getElementById('agreement').checked = formData.agreement || false;
        }
    }

    function clearFormData() {
        localStorage.removeItem('feedbackFormData');
    }
});
