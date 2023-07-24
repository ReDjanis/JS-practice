'use strict'
// Первый вариант задачи - находим совпадения и выводим на страницу.
let objFullName = [
    {
        name: 'РМК Батайск Воровского 21 ККМ (ООО ТД "Арктика")',
        regNumber: '0007027508044680',
    },
    {
        name: 'РМК Азов Петровский (ООО ТД "Арктика")',
        regNumber: '0007121627006270',
    },
    {
        name: 'РМК Белая Калитва Площадь Майдан ООО ТД "Арктика"',
        regNumber: '0007249012023125',
    },
    {
        name: 'РМК Днепровский 116 (ООО ТД "Арктика")',
        regNumber: '0003081700016049',
    },
    {
        name: 'РМК Веселый Комсомольский 50 ООО ТД "Арктика"',
        regNumber: '0007349350030860',
    }
];

let objOFD = [
    {
        name: 'РТТ Батайск Воровского',
        regNumber: '0007027508044680',
    },
    {
        name: 'РТТ Азов Петровский',
        regNumber: '0007121627006270',
    },
    {
        name: 'РТТ Белая Калитва Площадь Майдан',
        regNumber: '0007249012023125',
    },
    {
        name: 'РТТ Днепровский 116',
        regNumber: '456',
    },
    {
        name: 'РТТ Шахты Майская 12',
        regNumber: '123',
    }
];
/*
let divWrapper = document.querySelector('#task-one');

objOFD.forEach((item) => {
    item.name = item.name.slice(4);
});
console.log(objOFD);

let objOFDWithoutAMatch = [];
let objFullNameWithoutAMatch = [];

objFullName.forEach((item) => {
    objOFD.forEach((elem) => {
        if (item.name.includes(elem.name)) {
            if (item.regNumber === elem.regNumber) {
                console.log('все совпало');
                let div = document.createElement('div');
                div.className = 'container';

                divWrapper.append(div);
                div.insertAdjacentHTML('beforeend', `<div class='str'>${item.name}</div> <div class='str-number'>${item.regNumber}</div> <div class='strComparison'>${elem.name}</div> <div class='strComparison-number'>${elem.regNumber}</div>`);
                div.style.border = '5px solid green';


            } else {
                console.log('в хтмл покрасим другим цветом');
                let div = document.createElement('div');
                div.className = 'container';
                divWrapper.append(div);



                div.insertAdjacentHTML('beforeend', `<div class='str'>${item.name}</div> <div class='str-number'>${item.regNumber}</div> <div class='strComparison'>${elem.name}</div> <div class='strComparison-number'>${elem.regNumber}</div>`);
                div.style.border = '5px solid red';

             
            }
        }
    })
})
*/

// --------------------------------------------------------------------------------------------------------------------------------------------------
// Второй вариант задачи - использование выпадающего меню

// переменная, в которой лежит wrapper будущей "таблицы"
let divWrapperTwo = document.querySelector('#task-two');

// создаем div контейнеры по количеству объектов в массиве objFullName (1С_KKM); заполняем первые два divs данными из объектов (полное название и рег.номер)
objFullName.forEach((item, index) => {
    let div = document.createElement('div');
    div.className = 'container';
    div.id = `num_container-${index}`;
    divWrapperTwo.append(div);
    div.insertAdjacentHTML('beforeend', `<div id="C1_KKM-${index}" class='str'>${item.name}</div> <div class='str-number'>${item.regNumber}</div>`);
});

// создаем в третьем div'е выпадающий список с помощью тега select
for (let i = 0; i < divWrapperTwo.children.length; i++) {
    divWrapperTwo.children[i].insertAdjacentHTML('beforeend', `<select name="OFD_KKM" id="OFD_KKM-${i}" class='strComparison'></select>`)
};

// заполняем выпадающий список из названий объектов массива objOFD (OFD_KKM)
for (let i = 0; i < objOFD.length; i++) {
    // создаем значение option по умолчанию
    document.querySelector(`#OFD_KKM-${i}`).insertAdjacentHTML('beforeend', `<option selected>Выберите из списка</option>`);
    // заполняем все options из массива objOFD
    objOFD.forEach((item, index) => {
        document.querySelector(`#OFD_KKM-${i}`).insertAdjacentHTML('beforeend', `<option id="option-${i}-${index}" value="${item.name}">${item.name}</option>`);
    });
}

// автоматическая подстановка ларька и его рег.номера
for (let i = 0; i < objFullName.length; i++) {

    for (let j = 0; j < objOFD.length; j++) {

        if (document.querySelector(`#C1_KKM-${i}`).textContent.includes(document.querySelector(`#option-${i}-${j}`).textContent.slice(4))) {
            document.querySelector(`#option-${i}-${j}`).setAttribute('selected', '');

            document.querySelector(`#num_container-${i}`).insertAdjacentHTML('beforeend', `<div class='strComparison-number'>${objOFD[j].regNumber}</div>`);

            if (document.querySelector(`#num_container-${i}`).children[1].textContent === document.querySelector(`#num_container-${i}`).children[3].textContent) {
                document.querySelector(`#num_container-${i}`).style.border = '5px solid green';
            } else {
                document.querySelector(`#num_container-${i}`).style.border = '5px solid darkviolet';
            };
        }
    };
};

// создаем переменную для всех divs с рег.номерами из ОФД
let kkm = document.querySelectorAll('.strComparison');

// Проходим по каждому div из переменной kkm  и вешаем событие change
for (let i = 0; i < objOFD.length; i++) {
    kkm[i].addEventListener('change', (e) => {
      
        // через перебор массива будем подставлять необходимые рег.номера
        objOFD.forEach((item) => {
            if (document.querySelector(`#num_container-${i}`).children[3] === undefined && item.name === e.target.value) {
                document.querySelector(`#num_container-${i}`).insertAdjacentHTML('beforeend', `<div class='strComparison-number'>${item.regNumber}</div>`);
            } else if (item.name === e.target.value) {
                document.querySelector(`#num_container-${i}`).children[3].textContent = item.regNumber;
            }
        });

        // подсвечиваем границы 
        if (document.querySelector(`#num_container-${i}`).children[2].firstElementChild.selected === true) {
            document.querySelector(`#num_container-${i}`).style.border = '0.5px solid black';
            document.querySelector(`#num_container-${i}`).style.borderRight = '5px solid transparent';
            document.querySelector(`#num_container-${i}`).style.borderLeft = '5px solid transparent';
            document.querySelector(`#num_container-${i}`).children[3].textContent = '';
        } else if (document.querySelector(`#num_container-${i}`).children[1].textContent === document.querySelector(`#num_container-${i}`).children[3].textContent) {
            document.querySelector(`#num_container-${i}`).style.border = '5px solid green';
        } else if (!document.querySelector(`#C1_KKM-${i}`).textContent.includes(e.target.value.slice(4))) {
            document.querySelector(`#num_container-${i}`).style.border = '5px solid red';
        } else {
            document.querySelector(`#num_container-${i}`).style.border = '5px solid darkviolet';
        }
    });
}