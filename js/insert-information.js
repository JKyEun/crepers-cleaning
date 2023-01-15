const table = document.querySelector('#week-table');
const tbody = table.querySelector('tbody');
const studentName = JSON.parse(savedStudents);
let checkArr = [];

function makeTable() {
    for (let i = 0; i < studentName.length; i++) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td2 = document.createElement('td');
        td.innerText = studentName[i].text;
        tbody.appendChild(tr);
        tr.appendChild(td);
        tr.appendChild(td2);
        td2.id = `studentcheck${i}`;
        for (let j = 0; j < 5; j++) {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.name = 'checkbox';
            checkBox.classList.add("checkbox");
            checkBox.id = `checkbox${j}`
            td2.appendChild(checkBox);
        }
    }
}

function isChecked() {
    let checkArr2 = [];
    for (let i = 0; i < (studentName.length * 5); i++) {
        let checkBox = document.getElementsByName('checkbox');
        checkArr2.push(checkBox[i].checked);
        if ((i+1)%5 == 0) {
            checkArr.push(checkArr2);
            checkArr2 = [];
        }
    }
    localStorage.setItem('checkArr', JSON.stringify(checkArr));
}

function wrongYearInput() {
    alert('입력한 연도가 잘못되었습니다.');
}

function wrongMonthInput() {
    alert('입력한 월이 잘못되었습니다.');
}

function getYearMonth() {
    const startYear = document.getElementById('start-year').value;
    const startMonthList = document.getElementById("start-month");
    const startMonth = startMonthList.options[startMonthList.selectedIndex].value;
    const startDay = document.getElementById('start-day').value;
    const endYear = document.getElementById('end-year').value;
    const endMonthList = document.getElementById("end-month");
    const endMonth = endMonthList.options[endMonthList.selectedIndex].value;
    const endDay = document.getElementById('end-day').value;
    const yearMonth = [startYear, startMonth, startDay, endYear, endMonth, endDay];

    if (startYear != endYear) {
        return wrongYearInput();
    }
    if (endMonth - startMonth != 3) {
        return wrongMonthInput();
    }
    
    localStorage.setItem('yearmonth', JSON.stringify(yearMonth));
    localStorage.setItem('yearmonth-copy', JSON.stringify(yearMonth));
}

function informationSubmit() {
    isChecked();
    getYearMonth();
    document.querySelector(`#calender`).classList.remove('hidden');
    document.querySelector('#week-table').classList.add('hidden');
    document.querySelector('#yearmonth-form').classList.add('hidden');
    location.reload();
}

function rememberForm() {
    const yearMonth = JSON.parse(localStorage.getItem('yearmonth-copy'));
    const startYear = parseInt(yearMonth[0]);
    const startMonth = parseInt(yearMonth[1]);
    const startDay = parseInt(yearMonth[2]);
    const endYear = parseInt(yearMonth[3]);
    const endDay = parseInt(yearMonth[5]);
    const startMonthList = document.getElementById("start-month");
    const endMonthList = document.getElementById("end-month");
    let monthIndex = 0;

    if (startMonth == 3) {
        monthIndex = 0;
    } else {
        monthIndex = 1;
    }

    document.getElementById('start-year').value = startYear;
    startMonthList.options[monthIndex].selected = true;
    document.getElementById('start-day').value = startDay;
    document.getElementById('end-year').value = endYear;
    endMonthList.options[monthIndex].selected = true;
    document.getElementById('end-day').value = endDay;
}

if (localStorage.getItem('yearmonth-copy') != null) {
    rememberForm();
}

makeTable();
const getCheckArr = JSON.parse(localStorage.getItem('checkArr'));
if (localStorage.getItem('checkArr') != null) {
    for (let i = 0; i < studentName.length; i++) {
        for (let j = 0; j < 5; j++) {
            document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
        }
    }
}

document.querySelector('#yearmonth-form').addEventListener("submit", informationSubmit);

if (localStorage.getItem('yearmonth') != null) {
    document.querySelector('#week-table').classList.add('hidden');
    document.querySelector('#yearmonth-form').classList.add('hidden');
}