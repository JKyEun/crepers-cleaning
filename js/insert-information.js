const tbody = weekTable.querySelector('tbody');
const studentName = JSON.parse(savedStudents);
const calender = document.querySelector(`#calender`);
let checkArr = [];

function makeTable() { // 청소 불가능 요일을 입력받을 표 생성
    for (let i = 0; i < studentName.length; i++) {  // 학생 수만큼
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td.innerText = studentName[i].text;
        tbody.appendChild(tr);
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td2.id = `studentcheck${i}`;
        for (let j = 0; j < 5; j++) {   // 체크박스 5개 삽입
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.name = 'checkbox';
            checkBox.classList.add("checkbox");
            checkBox.id = `checkbox${j}`    // 각각 다른 id를 가지게 함
            td2.appendChild(checkBox);
        }
        const numInput = document.createElement('input'); // 누적 청소 횟수 입력칸
        numInput.type = 'number';
        numInput.id = `cleaning-num-input${i}`;
        numInput.classList.add('cleaning-num-input');
        numInput.value = 0;
        td3.appendChild(numInput);
    }
}

function isChecked() {  // 체크박스를 입력받는 함수
    let checkArr2 = [];
    let countArr = [0, 0, 0, 0, 0];
    for (let i = 0; i < (studentName.length * 5); i++) {    // 학생 수 * 5개의 체크박스가 존재하므로 모두 받아옴
        let checkBox = document.getElementsByName('checkbox');
        checkArr2.push(checkBox[i].checked);
        if ((i+1)%5 == 0) { // 5개 마다 실행
            checkArr.push(checkArr2);   // checkArr 안에 checkArr2가 들어있는 이중 배열 구조
            checkArr2 = []; // 비워줌
        }
    }
    localStorage.setItem('checkArr', JSON.stringify(checkArr)); // checkArr localStorage에 저장
    const getCheckArr = JSON.parse(localStorage.getItem('checkArr'));   // 예외상황 확인 위해 받아옴
    for (let i = 0; i < getCheckArr.length; i++) {
        if (getCheckArr[i][0] && getCheckArr[i][1] && getCheckArr[i][2] && getCheckArr[i][3] && getCheckArr[i][4]) {    // 월화수목금 모두 체크된 경우
            return cannotCleanAllDay();
        }
        for (let j = 0; j < 5; j++) {
            if (getCheckArr[i][j]) {
                countArr[j]++;
            }
            if (countArr[j] == studentName.length) {    // 모든 학생이 특정 요일에 체크한 경우
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

function getYearMonth() {   // 연월일을 입력받는 함수
    const startYear = document.getElementById('start-year').value;
    const startMonth = document.getElementById("start-month").value;
    const startDay = document.getElementById('start-day').value;
    const endYear = document.getElementById('end-year').value;
    const endMonth = document.getElementById("end-month").value;
    const endDay = document.getElementById('end-day').value;
    const yearMonth = [startYear, startMonth, startDay, endYear, endMonth, endDay];

    if (startYear != endYear) { // 시작 연도와 종료 연도가 다른 경우
        return wrongYearInput();
    }
    if (startMonth - endMonth > 0) { // startMonth보다 endMonth가 더 앞인 경우
        return wrongMonthInput();
    }
    if (startMonth < 1 || startMonth > 12) { // startMonth에 입력된 숫자가 1~12 사이가 아닌 경우
        return wrongMonthInput();
    }
    if (endMonth < 1 || endMonth > 12) { // endMonth에 입력된 숫자가 1~12 사이가 아닌 경우
        return wrongMonthInput();
    }
    
    localStorage.setItem('yearmonth', JSON.stringify(yearMonth));
    localStorage.setItem('yearmonth-copy', JSON.stringify(yearMonth)); // 다시 돌아와도 Form을 기억하기 위해 사본 저장
}

function getCleaningNum() { // 누적 청소 횟수를 받아오는 함수
    let cleaningNumArr = [];
    for (let i = 0; i < studentName.length; i++) {
        if (document.querySelector(`#cleaning-num-input${i}`).value == "") {
            cleaningNumArr.push(0);
        } else {
            cleaningNumArr.push(document.querySelector(`#cleaning-num-input${i}`).value);
        }
    }
    localStorage.setItem('cleaningNumArr', JSON.stringify(cleaningNumArr));
}

function cannotCleanAllDay() {
    localStorage.removeItem('yearmonth');
    alert('모든 요일에 청소 불가능한 학생이 존재합니다.');
}

function informationSubmit(event) { // 모든 정보 제출, 다음 화면으로
    event.preventDefault();
    getYearMonth();
    isChecked();
    getCleaningNum();
    calender.classList.remove('hidden');
    weekTable.classList.add('hidden');
    yearMonthForm.classList.add('hidden');
    location.reload();
}

function rememberForm() {   // 다시 돌아와도 Form 기억
    const yearMonth = JSON.parse(localStorage.getItem('yearmonth-copy'));
    const cleaningNumArr = JSON.parse(localStorage.getItem('cleaningNumArr'));
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

    for (let i = 0; i < cleaningNumArr.length; i++) {
        document.querySelector(`#cleaning-num-input${i}`).value = cleaningNumArr[i];
    }
}

makeTable();

const getCheckArr = JSON.parse(localStorage.getItem('checkArr'));
if (localStorage.getItem('checkArr') != null) { // 체크박스 기억
    for (let i = 0; i < studentName.length; i++) {
        for (let j = 0; j < 5; j++) {
            document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
        }
    }
}

yearMonthForm.addEventListener("submit", informationSubmit);

if (localStorage.getItem('yearmonth') != null) {
    weekTable.classList.add('hidden');
    yearMonthForm.classList.add('hidden');
}

if (localStorage.getItem('yearmonth-copy') != null) {
    rememberForm();
}