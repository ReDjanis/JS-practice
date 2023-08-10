'use strict'

// переменные с формами входа и регистрации
const formRegistration = document.form_registration;
const formLogin = document.form_login;

// переменная с кнопками замены формы для заполнения
const btnNavigation = document.querySelectorAll('.navigation__btn');
// переменные с кнопками входа и регистрации
const btnRegistration = document.querySelector('#btn-registration');
const btnLogin = document.querySelector('#btn-login');

console.log(btnNavigation[1]);
// переключение формы на регистрацию
btnNavigation[0].addEventListener('click', function () {
    event.preventDefault();
    formRegistration.style.display = 'block';
    formLogin.style.display = 'none';
});
// переключение формы на логин
btnNavigation[1].addEventListener('click', function () {
    event.preventDefault();
    formLogin.style.display = 'block';
    formRegistration.style.display = 'none';
});

// данные для проверки равенства паролей
const password = document.form_registration.password;
const passwordCheck = document.form_registration.passwordCheck;

let objCheckPassword = {
    password: '',
    repeatPassword: '',
};

password.addEventListener('change', (e) => {
    objCheckPassword.password = e.target.value;
});

passwordCheck.addEventListener('change', (e) => {
    objCheckPassword.repeatPassword = e.target.value;
});

// Проверка email'a:
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// проверка возраста
const ageUser = document.form_registration.age;

ageUser.addEventListener('change', (e) => {
    if (e.target.value < 7 && e.target.value != '') {
        e.target.value = 7;
    } else if (e.target.value > 90) {
        e.target.value = 90;
    }
});

// Радиокнопки

const radioButtons = Array.from(document.form_registration.gender);

let objRadioButtons = {
    radioButtonsOne: false,
    radioButtonsTwo: false,
}

radioButtons[0].addEventListener('change', (e) => {
    objRadioButtons.radioButtonsOne = e.target.checked;
    if (objRadioButtons.radioButtonsOne) {
        objRadioButtons.radioButtonsTwo = false;
    }
});

radioButtons[1].addEventListener('change', (e) => {
    objRadioButtons.radioButtonsTwo = e.target.checked;
    if (objRadioButtons.radioButtonsTwo) {
        objRadioButtons.radioButtonsOne = false;
    }
});

// работа с файлом
const photoFile = document.form_registration.photo;
const imgTagFile = document.querySelector('#imgFile');
const buttonDeleteImg = document.querySelector('.form__input-btnDel');

photoFile.addEventListener('change', (e) => {

    let selectedFile = photoFile.files[0];
    let fileURL = URL.createObjectURL(selectedFile);
    imgTagFile.setAttribute('src', fileURL);

    buttonDeleteImg.style.display = 'block';
});

buttonDeleteImg.addEventListener('click', (e) => {
    buttonDeleteImg.style.display = 'none';
    imgTagFile.setAttribute('src', '');
});

// переменные модального окна
const modalWindow = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const modalBtn = document.querySelector('.modal__btn');
// закрытие модального окна при клике на backdrop и кнопку
modalWindow.addEventListener("click", closeOnBackDropClickOrBtn);

// кнопка 'зарегистрироваться'
btnRegistration.addEventListener('click', function () {
    event.preventDefault();

    const arrElementsFormReg = Array.from(document.form_registration.elements).filter(item => !!item.name);

    let booleanCheckValidate = true;

    arrElementsFormReg.forEach((input) => {

        const textErr = document.querySelector(`[data-group=${input.name}]`);

        switch (input.name) {

            case 'nameUser':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;

            case 'password':
            case 'passwordCheck':

                if (input.value.trim() === '' || input.value.length < 6) {
                    paintRed(textErr, input);
                    textErr.textContent = 'пароль должен быть не менее 6 символов';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (objCheckPassword.password !== objCheckPassword.repeatPassword) {
                    paintRed(textErr, input);
                    textErr.textContent = 'пароли не совпадают';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;

            case 'email':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (!validateEmail(input.value)) {
                    paintRed(textErr, input);
                    textErr.textContent = 'email введен некорректно';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;

            case 'age':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;

            case 'gender':

                if (objRadioButtons.radioButtonsOne === false && objRadioButtons.radioButtonsTwo === false) {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;

            case 'checkbox':

                if (!input.checked) {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;
        }

    });

    if (booleanCheckValidate) {
        const data = new FormData(formRegistration);
        console.log(Array.from(data.entries()));

        let arrUsers = JSON.parse(localStorage.getItem('users'));

        if (arrUsers === null) {
            arrUsers = [];
            arrUsers.push(Array.from(data.entries()));

            modalWindow.style.display = 'flex';
            modalText.textContent = 'Вы успешно зарегистрировались';
            modalWindow.showModal();

            cleaningInputs(arrElementsFormReg);
            formLogin.style.display = 'block';
            formRegistration.style.display = 'none';
        } else {

            let userRegistered = false;

            for (let key of arrUsers) {

                if (key[0][1] === arrElementsFormReg[0].value) {

                    modalWindow.style.display = 'flex';
                    modalText.textContent = 'Пользователь с таким именем уже существует';
                    modalWindow.showModal();

                    userRegistered = true;
                    break;
                }
            }

            if (!userRegistered) {
                arrUsers.push(Array.from(data.entries()));

                modalWindow.style.display = 'flex';
                modalText.textContent = 'Вы успешно зарегистрировались';
                modalWindow.showModal();

                cleaningInputs(arrElementsFormReg);
                formLogin.style.display = 'block';
                formRegistration.style.display = 'none';
            }

        }

        localStorage.setItem('users', JSON.stringify(arrUsers));
    }

});

// кнопка 'авторизоваться'
btnLogin.addEventListener('click', function () {
    event.preventDefault();

    const arrElementsFormLogin = Array.from(document.form_login.elements).filter(item => !!item.name);

    let booleanCheckValidate = true;

    arrElementsFormLogin.forEach((input) => {

        const textErr = document.querySelector(`[data-group=${input.name}]`);

        switch (input.name) {
            case 'emailLogin':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (!validateEmail(input.value)) {
                    paintRed(textErr, input);
                    textErr.textContent = 'email введен некорректно';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }

                break;

            case 'passwordLogin':

                if (input.value.trim() === '' || input.value.length < 6) {
                    paintRed(textErr, input);
                    textErr.textContent = 'пароль должен быть не менее 6 символов';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;
        }
    })

    if (booleanCheckValidate) {
        let arrUsers = JSON.parse(localStorage.getItem('users'));

        if (arrUsers === null) {

            modalWindow.style.display = 'flex';
            modalText.textContent = 'Такого пользователя не существует. Пожалуйста, заполните форму регистрации';
            modalWindow.showModal();

            formRegistration.style.display = 'block';
            formLogin.style.display = 'none';

        } else {
            let userRegistered = false;

            for (let key of arrUsers) {

                if (key[3][1] === arrElementsFormLogin[0].value && key[1][1] === arrElementsFormLogin[1].value) {

                    modalWindow.style.display = 'flex';
                    // modalText.textContent = 'Вы успешно вошли!';
                    modalText.innerHTML = 'Вы успешно вошли!</br>Переадресация через <span class="modal__timer"></span> сек';
                    let fiveSeconds = 5,
                        display = document.querySelector('.modal__timer');
                    
                    modalWindow.showModal();
                    startTimer(fiveSeconds, display);
                    modalBtn.style.display = 'none';
                    userRegistered = true;
                    cleaningInputs(arrElementsFormLogin);
                    setTimeout(redirect, 5000);
                    break;
                }
            }

            if (!userRegistered) {

                modalWindow.style.display = 'flex';
                modalText.textContent = 'Email или пароль введены неверно';
                modalWindow.showModal();

            }
        }
    }

});

function redirect() {
    window.location.href = 'https://redjanis.github.io/artigiani-boutique-project/';
}

function cleaningInputs(arr) {

    arr.forEach((item) => {

        if (item.type === 'checkbox' || item.type === 'radio') {
            item.checked = false;
        } else if (item.type === 'file') {
            imgTagFile.src = '';
            buttonDeleteImg.style.display = 'none';
        } else {
            item.value = '';
        }

    });
}

function paintRed(text, frame) {
    text.style.color = 'red';
    frame.style.border = '3px solid red';
}

function paintByDefault(text, frame) {
    text.style.color = '#a4dbd2';
    frame.style.border = 'none';
}

function closeOnBackDropClickOrBtn({ currentTarget, target }) {

    const isClickedOnBackDrop = target === currentTarget;
    const isClickedOnButton = target === modalBtn;

    if (isClickedOnBackDrop || isClickedOnButton) {
        modalWindow.style.display = 'none';
        modalText.textContent = '';
        modalWindow.close();
    }
}

function startTimer(duration, display) {
   
    let start = Date.now(),
        diff,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        seconds = (diff % 60) | 0;

        display.textContent = seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}










