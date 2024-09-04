
// база Данных

let listData = [{
        name: 'Олег',
        surename: 'Иванович',
        lastname: 'Мостин',
        age: 18,
        hobby: 'Игры'
    },
    {
        name: 'Юлия',
        surename: 'Александровна',
        lastname: 'Воронина',
        age: 21,
        hobby: 'Танцы'
    },
    {
        name: 'Евгения',
        surename: 'Анатольевна',
        lastname: 'Ильина',
        age: 18,
        hobby: 'Спорт'
    },
    {
        name: 'Юлия',
        surename: 'Олеговна',
        lastname: 'Антонова',
        age: 21,
        hobby: 'Спорт'
    },
    {
        name: 'Александр',
        surename: 'Иванович',
        lastname: 'Воронин',
        age: 19,
        hobby: 'Танцы'
    },
]

let sortColumnFlag = 'fio',
    sortDirFlag = true


// Создание элементов
const $app = document.getElementById('app'),
    $addForm = document.getElementById('add-form'), 
    $nameInp = document.getElementById('add-form__name-inp'), 
    $sureInp = document.getElementById('add-form__surename-inp'), 
    $lastInp = document.getElementById('add-form__lastname-inp'), 

    $ageInp = document.getElementById('add-form__age-inp'), 
    $hobbyInp = document.getElementById('add-form__hobby-inp'), 

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $hobbyFilterInp = document.getElementById('filter-form__hobby-inp'),

    $sortFIOBtn =  document.getElementById('sort__fio'), 
    $sortAgeBtn = document.getElementById('sort__age'), 
    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),

    $tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThAGE = document.createElement('th'),
    $tableHeadThBirthYear = document.createElement('th'),
    $tableHeadThHobby = document.createElement('th');

$table.classList.add('table', 'table-dark')


$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThAGE.textContent = 'Возраст'
$tableHeadThBirthYear.textContent = 'Год рождения'
$tableHeadThHobby.textContent = 'Хобби'


$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThAGE)
$tableHeadTr.append($tableHeadThBirthYear)
$tableHeadTr.append($tableHeadThHobby)



    $tableHead.append($tableHeadTr)
    $table.append($tableHead)
    $table.append($tableBody)
    $app.append($table)


// Создание Тг одного пользователя
function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
            $userFIO = document.createElement('th'),
            $userAge = document.createElement('th'),
            $userBirthYear = document.createElement('th'),
            $userHobby = document.createElement('th');


        $userFIO.textContent = oneUser.fio
        $userAge.textContent = oneUser.age
        $userBirthYear.textContent = oneUser.birthYear
        $userHobby.textContent = oneUser.hobby


        $userTr.append($userFIO)
        $userTr.append($userAge)
        $userTr.append($userBirthYear)
        $userTr.append($userHobby)

        return $userTr
}



// Фильтрация
function filter(arr, prop, value) {
    return arr.filter(function(oneUser) {
        if (oneUser[prop].includes(value.trim())) return true
    });
}




// Рендер
function render(arrData) {
    $tableBody.innerHTML= '';
    let copyListData = [...arrData]

    // Подготовка 
    for (const oneUser of copyListData) {
        oneUser.fio = oneUser.name + ' ' + oneUser.surename + ' ' + oneUser.lastname
        oneUser.birthYear = 2024 - oneUser.age
    }

    // Сортировка
    copyListData = copyListData.sort(function(a, b) {
        let sort = a[sortColumnFlag] < b[sortColumnFlag]
        if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
        if (sort) return -1
    })

    // Фильтрация
    if ($fioFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
    }

    if ($hobbyFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'hobby', $hobbyFilterInp.value)
    }


    // Отрисовка
    for (const oneUser of copyListData) {
        const $newTr = createUserTr(oneUser) 
        $tableBody.append($newTr)
        }
}


render(listData)





// Добавление
$addForm.addEventListener('submit', function(event) {
    event.preventDefault()

    // Валидация
    if ($nameInp.value.trim() == "") {
        alert('Имя не Введено!')
        return
    }


    if ($sureInp.value.trim() == "") {
        alert('Фамилия не Введено!')
        return
    }

    if ($lastInp.value.trim() == "") {
        alert('Отчество не Введено!')
        return
    }

    if ($ageInp.value.trim() == "") {
        alert('Возраст не Введен!')
        return
    }



    listData.push({
        name: $nameInp.value.trim(),
        surename: $sureInp.value.trim(),
        lastname: $lastInp.value.trim(),
        age: parseInt($ageInp.value.trim()),
        hobby: $hobbyInp.value.trim()
    })
    
    render(listData)
})


// Событие сортировки
$sortFIOBtn.addEventListener('click', function(){
    sortColumnFlag = 'fio'
    sortDirFlag = !sortDirFlag 
    render(listData)
})

$sortAgeBtn.addEventListener('click', function(){
    sortColumnFlag = 'age'
    sortDirFlag = !sortDirFlag 
    render(listData)
})


// Фильтр
$filterForm.addEventListener('submit', function(event) {
    event.preventDefault()
})

$fioFilterInp.addEventListener('input', function() {
    render(listData)
    console.log("fff");
    
})

$hobbyFilterInp.addEventListener('input', function() {
    render(listData)
    console.log("fff");
})

