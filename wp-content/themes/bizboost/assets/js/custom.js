console.log('Custom JS loaded');

/**
 * Custom JS for theme elements
 */

/**
 * Wocommerce active class for category list
 */
let url = window.location.href;
const catLink = document.querySelectorAll(
    ".wc-block-product-categories-list li a"
);
catLink.forEach((item) => {
    if (item.href === url) {
        item.classList.add("active");
    }
});

/*
    Add class in body when search clicked
*/
let searchBtn = document.querySelector(".search-controller svg.search");

if (searchBtn !== null) {
    searchBtn.addEventListener("click", function (e) {
        document.body.classList.remove("open-social");
        document.body.classList.add("open-search");
        document.body.addEventListener("click", function () {
            document.body.classList.remove("open-search");
        });

        let searchContainer = document.querySelector(".search-container");
        searchContainer.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        var searchInput = document.querySelector(".wp-block-search__input");
        window.setTimeout(() => searchInput.focus(), 0);
    });
}

var searchBtnClose = document.querySelector(
    ".search-controller svg.cross"
);

if (searchBtnClose !== null) {
    searchBtnClose.addEventListener("click", function (e) {
        document.body.classList.remove("open-search");

    });
}


/*
    Add class in body when social clicked
*/
let socialBtn = document.querySelector(".social-controller svg.social");

if (socialBtn !== null) {
    socialBtn.addEventListener("click", function (e) {
        document.body.classList.remove("open-search");
        document.body.classList.add("open-social");
        document.body.addEventListener("click", function () {
            document.body.classList.remove("open-social");
        });

        let socialContainer = document.querySelector(".social-container");
        socialContainer.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        var socialInput = document.querySelector(".wp-block-social__input");
        window.setTimeout(() => socialInput.focus(), 0);
    });
}

var socialBtnClose = document.querySelector(
    ".social-controller svg.cross"
);

if (socialBtnClose !== null) {
    socialBtnClose.addEventListener("click", function (e) {
        document.body.classList.remove("open-social");

    });
}

/*
    Add blinker on input field when active
*/
let blinkerField = document.querySelector(".social-controller svg.search");

if (blinkerField !== null) {
    blinkerField.addEventListener("click", function () {
        var searchInput = document.querySelector(".wp-block-search__input");
        window.setTimeout(() => searchInput.focus(), 0);
    });
}

// Moving Object With Cursor

const bob = document.getElementsByClassName('custom-cursor')[0];

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let speed = 0.2;  //how fast ball catches up to mouse pointer;

function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX = ballX + (distX * speed);
    ballY = ballY + (distY * speed);

    bob.style.left = ballX + 'px';
    bob.style.top = ballY + 'px';

    requestAnimationFrame(animate)

};

animate();

document.addEventListener('mousemove', function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

document.addEventListener('click', function (e) {
    e.preventDefault;
    bob.classList.remove('active');
    //some rando comment

    void bob.offsetWidth;

    bob.classList.add('active');

}, false);

//


// Changing Cursor Styles in Menu Item

// storing all menu item in a variable
let menuLinks = document.getElementsByClassName("wp-block-navigation-item__content");

// event listener must be in loop so we only modify
// the actual element being touched, instead of all
// elements that are stored in variable
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("mouseover", menuHoverOn);
    menuLinks[i].addEventListener("mouseout", menuHoverOff);
}

// functions to add and remove menu__active class for changing cursor styles
let menuCursor = document.getElementById("custom-cursor");

function menuHoverOn() {
    menuCursor.classList.add("menu__active")
}
function menuHoverOff() {
    menuCursor.classList.remove("menu__active")
}



// Changing Cursor Styles in Team Section

// storing all menu item in a variable
let teamLinks = document.getElementsByClassName("wp-block-post-group");

// event listener must be in loop so we only modify
// the actual element being touched, instead of all
// elements that are stored in variable
for (var i = 0; i < teamLinks.length; i++) {
    teamLinks[i].addEventListener("mouseover", teamHoverOn);
    teamLinks[i].addEventListener("mouseout", teamHoverOff);
}

// functions to add and remove menu__active class for changing cursor styles
let teamCursor = document.getElementById("custom-cursor");

let teamButton = document.getElementsByClassName(".wp-block-buttons");

function teamHoverOn() {
    teamCursor.classList.add("team__active")
}
function teamHoverOff() {
    teamCursor.classList.remove("team__active")
}






document.addEventListener('DOMContentLoaded', function () {
    const processorSelect = document.getElementById('processor-select');
    const processorDetailsDiv = document.getElementById('processor-details');
    const power_unitSelect = document.getElementById('power_unit-select');
    const power_unitDetailsDiv = document.getElementById('power_unit-details');
    const mother_boardSelect = document.getElementById('mother_board-select');
    const mother_boardDetailsDiv = document.getElementById('mother_board-details');
    const saveButton = document.getElementById('save-selection');
    const memorySelect = document.getElementById('memory-select');
    const memoryDetailsDiv = document.getElementById('memory-details');
    const video_cardSelect = document.getElementById('video_card-select');
    const video_cardDetailsDiv = document.getElementById('video_card-details');
    const internal_hard_driveSelect = document.getElementById('internal_hard_drive-select');
    const internal_hard_driveDetailsDiv = document.getElementById('internal_hard_drive-details');
    const caseSelect = document.getElementById('case-select');
    const caseDetailsDiv = document.getElementById('case-details');
    const fanSelect = document.getElementById('fan-select');
    const fanDetailsDiv = document.getElementById('fan-details');
    processorSelect.addEventListener('change', function () {
        const processorId = this.value;

        if (!processorId) {
            processorDetailsDiv.innerHTML = '<p>Информация о процессоре появится здесь...</p>';
            return;
        }

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_processor_details&processor_id=${processorId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { socket, tdw, freq, release_date } = data.data;
                    processorDetailsDiv.innerHTML = `
                        <p><strong>Сокет:</strong> ${socket || 'Не указано'}</p>
                        <p><strong>ТДП:</strong> ${tdw || 'Не указано'}</p>
                        <p><strong>Частота:</strong> ${freq || 'Не указано'}</p>
                        <p><strong>Дата релиза:</strong> ${release_date || 'Не указано'}</p>
                    `;
                } else {
                    processorDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch(() => {
                processorDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    power_unitSelect.addEventListener('change', function () {
        const power_unitId = this.value;

        if (!power_unitId) {
            power_unitDetailsDiv.innerHTML = '<p>Информация о блоке питания появится здесь...</p>';
            return;
        }

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_power_unit_details&power_unit_id=${power_unitId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { form_factor, effect, wat, color } = data.data;
                    power_unitDetailsDiv.innerHTML = `
 			            <p><strong>Форм фактор:</strong> ${form_factor || 'Не указано'}</p>
                        <p><strong>Эффективность:</strong> ${effect || 'Не указано'}</p>
                        <p><strong>Мощность:</strong> ${wat || 'Не указано'}</p>
                        <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
                    `;
                } else {
                    power_unitDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch(() => {
                power_unitDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    mother_boardSelect.addEventListener('change', function () {
        const mother_boardId = this.value;

        if (!mother_boardId) {
            mother_boardDetailsDiv.innerHTML = '<p>Информация о материнской плате появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${mother_boardId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_mother_board_details&mother_board_id=${mother_boardId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { socket, form_factor, max_memory, max_slots, color, type_DDR } = data.data;
                    mother_boardDetailsDiv.innerHTML = `
			<p><strong>Сокет:</strong> ${socket || 'Не указано'}</p>
 			<p><strong>Форм-фактор:</strong> ${form_factor || 'Не указано'}</p>
                        <p><strong>Максимальное количество памяти:</strong> ${max_memory || 'Не указано'}</p>
                        <p><strong>Максимальное количество плашек:</strong> ${max_slots || 'Не указано'}</p>
                        <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
			<p><strong>Тип DDR:</strong> ${type_DDR || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    mother_boardDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                mother_boardDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    video_cardSelect.addEventListener('change', function () {
        const video_cardId = this.value;

        if (!video_cardId) {
            video_cardDetailsDiv.innerHTML = '<p>Информация о видеокартах появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${video_cardId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_video_card_details&video_card_id=${video_cardId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { chipset, memory, core_clock, max_memory, color } = data.data;
                    video_cardDetailsDiv.innerHTML = `
			        <p><strong>Чипсет:</strong> ${chipset || 'Не указано'}</p>
 			        <p><strong>Количество памяти:</strong> ${memory || 'Не указано'}</p>
                        <p><strong>Тактовая частота:</strong> ${core_clock || 'Не указано'}</p>
                        <p><strong>Максимальное частота:</strong> ${max_memory || 'Не указано'}</p>
                        <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    video_cardDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                video_cardDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    memorySelect.addEventListener('change', function () {
        const memoryId = this.value;

        if (!memoryId) {
            memoryDetailsDiv.innerHTML = '<p>Информация о оперативной памяти появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${memoryId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_memory_details&memory_id=${memoryId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { speed, moduls, color, first_word, cas_latency } = data.data;
                    memoryDetailsDiv.innerHTML = `
			            <p><strong>Скорость:</strong> ${speed || 'Не указано'}</p>
 			            <p><strong>Количество модулей и их память:</strong> ${moduls || 'Не указано'}</p>
                        <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
                        <p><strong>Отклик:</strong> ${first_word || 'Не указано'}</p>
                        <p><strong>Задержка:</strong> ${cas_latency || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    memoryDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                memoryDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    internal_hard_driveSelect.addEventListener('change', function () {
        const internal_hard_driveId = this.value;

        if (!internal_hard_driveId) {
            internal_hard_driveDetailsDiv.innerHTML = '<p>Информация о устройства хранения появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${internal_hard_driveId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_internal_hard_drive_details&internal_hard_drive_id=${internal_hard_driveId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { capacity, type, form_factor, interface } = data.data;
                    internal_hard_driveDetailsDiv.innerHTML = `
			            <p><strong>Количество памяти:</strong> ${capacity || 'Не указано'}</p>
 			            <p><strong>Тип:</strong> ${type || 'Не указано'}</p>
                        <p><strong>Форм-фактор:</strong> ${form_factor || 'Не указано'}</p>
                        <p><strong>Интерфейс:</strong> ${interface || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    internal_hard_driveDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                internal_hard_driveDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });


    fanSelect.addEventListener('change', function () {
        const fanId = this.value;

        if (!fanId) {
            fanDetailsDiv.innerHTML = '<p>Информация о охлаждении появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${fanId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_fan_details&fan_id=${fanId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { rpm, noise_level, color, size } = data.data;
                    fanDetailsDiv.innerHTML = `
			            <p><strong>Оборотов в минуту</strong> ${rpm || 'Не указано'}</p>
 			            <p><strong>Уровень шума:</strong> ${noise_level || 'Не указано'}</p>
                        <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
                        <p><strong>Размер:</strong> ${size || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    fanDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                fanDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });



    caseSelect.addEventListener('change', function () {
        const caseId = this.value;

        if (!caseId) {
            caseDetailsDiv.innerHTML = '<p>Информация о устройства хранения. появится здесь...</p>';
            return;
        }

        console.log(`Отправка запроса с ID: ${caseId}`);

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_case_details&case_id=${caseId}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { for_factor, color, side_panel, internal_35_bays, external } = data.data;
                    caseDetailsDiv.innerHTML = `
			            <p><strong>Форм-фактор:</strong> ${for_factor || 'Не указано'}</p>
 			            <p><strong>Цвет:</strong> ${color || 'Не указано'}</p>
                        	<p><strong>Боковая панель:</strong> ${side_panel || 'Не указано'}</p>
                       		<p><strong>Количество отсеков для жестких дисков:</strong> ${internal_35_bays || 'Не указано'}</p>
				<p><strong>Внешний объем для корпуса:</strong> ${external || 'Не указано'}</p>
                    `;
                } else {
                    console.error('Ошибка получения данных:', data);
                    caseDetailsDiv.innerHTML = '<p>Ошибка получения данных.</p>';
                }
            })
            .catch((error) => {
                console.error('Ошибка соединения:', error);
                caseDetailsDiv.innerHTML = '<p>Ошибка соединения с сервером.</p>';
            });
    });

    // Устанавливаем белый цвет текста для всех этих элементов
    document.getElementById('processor-details').style.color = "white";
    document.getElementById('power_unit-details').style.color = "white";
    document.getElementById('mother_board-details').style.color = "white";
    document.getElementById('video_card-details').style.color = "white";
    document.getElementById('memory-details').style.color = "white";
    document.getElementById('internal_hard_drive-details').style.color = "white";
    document.getElementById('fan-details').style.color = "white";
    document.getElementById('case-details').style.color = "white";
    document.querySelectorAll('label').forEach((label) => {
        label.style.color = 'white';
    });

    // Проверка на существование всех элементов перед их использованием
    if (processorSelect && mother_boardSelect && power_unitSelect && memorySelect && video_cardSelect && internal_hard_driveSelect && fanSelect && caseSelect) {

        // Слушаем кнопку сохранения
        saveButton.addEventListener('click', function () {
            console.log("Кнопка сохранения нажата");

            // Собираем данные с выбранных компонентов
            const selectedProcessor = processorSelect.options[processorSelect.selectedIndex]?.text || 'Не выбран';
            const selectedMotherboard = mother_boardSelect.options[mother_boardSelect.selectedIndex]?.text || 'Не выбрана';
            const selectedpower_unit = power_unitSelect.options[power_unitSelect.selectedIndex]?.text || 'Не выбран';
            const selectedMemory = memorySelect.options[memorySelect.selectedIndex]?.text || 'Не выбрана';
            const selectedVideoCard = video_cardSelect.options[video_cardSelect.selectedIndex]?.text || 'Не выбрана';
            const selectedInternalHardDrive = internal_hard_driveSelect.options[internal_hard_driveSelect.selectedIndex]?.text || 'Не выбран';
            const selectedFan = fanSelect.options[fanSelect.selectedIndex]?.text || 'Не выбран';
            const selectedCase = caseSelect.options[caseSelect.selectedIndex]?.text || 'Не выбран';

            // Формируем строку данных
            const dataToSave = `
            Процессор: ${selectedProcessor}
            Материнская плата: ${selectedMotherboard}
            Блок питания: ${selectedpower_unit}
            Оперативная память: ${selectedMemory}
            Видеокарта: ${selectedVideoCard}
            Жесткий диск: ${selectedInternalHardDrive}
	    Охлаждение: ${selectedFan}
	    Корпус: ${selectedCase}
            `;

            console.log("Данные для сохранения:", dataToSave);

            // Проверка на наличие данных
            if (!dataToSave.trim()) {
                alert("Нет данных для сохранения!");
                return;
            }

            // Создание Blob-объекта с текстом
            const blob = new Blob([dataToSave], { type: 'text/plain;charset=utf-8' });

            // Создание ссылки для скачивания
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'выбор_компонентов.txt';

            // Программное нажатие на ссылку для скачивания
            link.style.display = 'none';  // Скрываем ссылку от пользователя
            document.body.appendChild(link); // Временное добавление ссылки в DOM
            link.click();  // Симулируем клик
            document.body.removeChild(link); // Удаление ссылки из DOM

            // Освобождение памяти
            URL.revokeObjectURL(link.href);
        });






        // Поиск по компонентам
        const searchInput = document.getElementById('component-search');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const searchQuery = searchInput.value.toLowerCase();
                filterList(searchQuery);
            });
        }

        function filterList(searchQuery) {
            filterOptions(processorSelect, searchQuery);
            filterOptions(mother_boardSelect, searchQuery);
            filterOptions(power_unitSelect, searchQuery);
            filterOptions(memorySelect, searchQuery);
            filterOptions(video_cardSelect, searchQuery);
            filterOptions(internal_hard_driveSelect, searchQuery);
            filterOptions(fanSelect, searchQuery);
            filterOptions(caseSelect, searchQuery);
        }

        function filterOptions(selectElement, searchQuery) {
            if (selectElement) {
                const options = selectElement.querySelectorAll('option');
                options.forEach(function (option) {
                    const optionText = option.textContent.toLowerCase();
                    if (optionText.indexOf(searchQuery) > -1) {
                        option.style.display = '';  // Показываем элемент
                    } else {
                        option.style.display = 'none';  // Скрываем элемент
                    }
                });
            }
        }

    } else {
        console.error("Один или несколько компонентов не найдены в DOM");
    }
});