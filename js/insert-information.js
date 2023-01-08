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

function getYearMonth() {
    const yearMonth = document.getElementById('yearmonth-input').value;
    localStorage.setItem('yearmonth', JSON.stringify(yearMonth));
}

function informationSubmit(event) {
    isChecked();
    getYearMonth();
    document.querySelector('#week-table').classList.add('hidden');
    document.querySelector('#yearmonth-form').classList.add('hidden');
}

makeTable();
document.querySelector('#fin-button2').addEventListener("click", informationSubmit);

if (localStorage.getItem('yearmonth') != null) {
    document.querySelector('#week-table').classList.add('hidden');
    document.querySelector('#yearmonth-form').classList.add('hidden');
}