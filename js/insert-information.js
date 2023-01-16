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
    let countArr = [0, 0, 0, 0, 0];
    for (let i = 0; i < (studentName.length * 5); i++) {
        let checkBox = document.getElementsByName('checkbox');
        checkArr2.push(checkBox[i].checked);
        if ((i+1)%5 == 0) {
            checkArr.push(checkArr2);
            checkArr2 = [];
        }
    }
    localStorage.setItem('checkArr', JSON.stringify(checkArr));
    const getCheckArr = JSON.parse(localStorage.getItem('checkArr'));
    for (let i = 0; i < getCheckArr.length; i++) {
        if (getCheckArr[i][0] && getCheckArr[i][1] && getCheckArr[i][2] && getCheckArr[i][3] && getCheckArr[i][4]) {
            return cannotCleanAllDay();
        }
        for (let j = 0; j < 5; j++) {
            if (getCheckArr[i][j]) {
                countArr[j]++;
            }
            if (countArr[j] == studentName.length) {
                return allStudentCannotClean();
            }
        }
    }
}

function allStudentCannotClean() {
    localStorage.removeItem('yearmonth');
    alert('모든 학생이 청소할 수 없는 요일이 존재합니다.');
}

function wrongYearInput() {
    alert('입력한 연도가 잘못되었습니다.');
}

function wrongMonthInput() {
    alert('입력한 월이 잘못되었습니다.');
}

function getYearMonth() {
    const startYear = document.getElementById('start-year').value;
    const startMonth = document.getElementById("start-month").value;
    const startDay = document.getElementById('start-day').value;
    const endYear = document.getElementById('end-year').value;
    const endMonth = document.getElementById("end-month").value;
    const endDay = document.getElementById('end-day').value;
    const yearMonth = [startYear, startMonth, startDay, endYear, endMonth, endDay];

    if (startYear != endYear) {
        return wrongYearInput();
    }
    if (startMonth > endMonth) {
        return wrongMonthInput();
    }
    
    localStorage.setItem('yearmonth', JSON.stringify(yearMonth));
    localStorage.setItem('yearmonth-copy', JSON.stringify(yearMonth));
}

function cannotCleanAllDay() {
    localStorage.removeItem('yearmonth');
    alert('모든 요일에 청소 불가능한 학생이 존재합니다.');
}

function informationSubmit(event) {
    event.preventDefault();
    getYearMonth();
    isChecked();
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
    const endMonth = parseInt(yearMonth[4]);
    const endDay = parseInt(yearMonth[5]);

    document.getElementById('start-year').value = startYear;
    document.getElementById('start-month').value = startMonth;
    document.getElementById('start-day').value = startDay;
    document.getElementById('end-year').value = endYear;
    document.getElementById('end-month').value = endMonth;
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