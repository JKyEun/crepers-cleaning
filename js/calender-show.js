const holidays = [
20230101,
20230121,
20230122,
20230123,
20230124,
20230301,
20230505,
20230527,
20230529,
20230606,
20230815, 
20230928,
20230929,
20230930,
20231003,
20231009,
20231225,
20240101,
20240209,
20240210,
20240211,
20240212,
20240301,
20240505,
20240506,
20240515,
20240606,
20240815,
20240916,
20240917,
20240918,
20241003,
20241009,
20241225,
20250101,
20250128,
20250129,
20250130,
20250301,
20250303,
20250505,
20250506,
20250508,
20250606,
20250815,
20251003,
20251005,
20251006,
20251007,
20251008,
20251009,
20251225,
20260101,
20260216,
20260217,
20260218,
20260301,
20260505,
20260508,
20260606,
20260815,
20260924,
20260925,
20260926,
20260927,
20261003,
20261009,
20261225,
20260302,
20260525,
20260817,
20261005,
20270101,
20270206,
20270207,
20270208,
20270209,
20270301,
20270303,
20270505,
20270513,
20270606,
20270815,
20270816,
20270914,
20270915,
20270916,
20271003,
20271004,
20271009,
20271011,
20271225,
20280101,
20280126,
20280127,
20280128,
20280301,
20280502,
20280505,
20280606,
20280815,
20281002,
20281003,
20281004,
20281005,
20281009,
20281225,
20290101,
20290212,
20290213,
20290214,
20290301,
20290505,
20290507,
20290520,
20290606,
20290815,
20290921,
20290922,
20290923,
20290924,
20291003,
20291009,
20291225
]
const yearMonth = JSON.parse(localStorage.getItem('yearmonth'));
const dateBoard = document.querySelector(`.dateBoard`);
const dateTitle = document.querySelector(`.dateTitle`);
const cleaningNumDiv = document.querySelector('#cleaning-num');
const cleaningNumBtn = document.querySelector('#show-cleaning-num');
let newStartMonth = '';
let studentsObj = [];
let cleaningNum = '';
let isHiding = true;

function makeCalendar() { // 날짜를 받아와 달력을 만드는 함수
    const startYear = parseInt(yearMonth[0]);
    const startMonth = parseInt(yearMonth[1]);
    const startDay = parseInt(yearMonth[2]);
    const endMonth = parseInt(yearMonth[4]);
    const endDay = parseInt(yearMonth[5]);
    const date = new Date(startYear, (startMonth-1), startDay);
    const firstDay = date.getDay();
    let lastDay = new Date(startYear, startMonth, 0).getDate();
    let htmlDummy = '';
    let currentMonth = startMonth;
    let count = startDay;
        
    for (let i = 0; i < firstDay; i++) { // 달의 첫째날 전까지 회색으로 처리
        htmlDummy += `<div class="noColor"></div>`;
    }

    while ((currentMonth != endMonth) || (count != endDay+1)) { // 현재 월이 마지막 월이고 count(현재 일)가 endDay+1과 같아지면 종료됨
        htmlDummy += `<div id='M${currentMonth}day${count}'>${currentMonth}월 ${count}일</div>`;
        count++;

        if (count > lastDay) {
            count = 1;
            currentMonth++;
            lastDay = new Date(startYear, currentMonth, 0).getDate();
        }
    }

    dateBoard.innerHTML = htmlDummy;
    let allMonth = `${startYear}년 `;
    for (let i = 0; i <= (endMonth-startMonth); i++) {
        allMonth += `${startMonth+i}월 `;
    }
    dateTitle.innerText = allMonth;
}

function makeStudentsObj() { // 학생들의 이름, 청소 불가능 요일, 청소 횟수 등을 담은 객체배열
    for (let i = 0; i < studentName.length; i++) {
        studentsObj[i] = {
            name: studentName[i].text,
            available_day: getCheckArr[i],
            cleaning_num: 0
        };
    }
}

function cleaningNumSort(arr) { // 청소 횟수로 객체배열을 정렬
    arr.sort((a, b) => 
    a.cleaning_num - b.cleaning_num
);
}

function shuffle(arr) { // 객체배열 무작위로 섞는 함수
    arr.sort(() => Math.random() - 0.5);
}

function getZero(Num) { // hoilday와 비교를 위해 10 아래 숫자들은 앞에 0을 붙여줌
    if (Num < 10) {
        newNum = '0'+String(Num);
        return newNum;
    } else {
        return String(Num);
    }
}

function noCleaningPerson() { // 청소할 사람이 없는 경우
    alert('특정 요일에 청소할 인원이 부족합니다.');
    localStorage.removeItem('yearmonth');
    location.reload();
    if (localStorage.getItem('checkArr') != null) {
        for (let i = 0; i < studentName.length; i++) {
            for (let j = 1; j <= 5; j++) {
                document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
            }
        }
    }
}

function makeCleaningSchedule() { // 청소 일정을 넣는 함수
    const startYear = parseInt(yearMonth[0]);
    const startMonth = parseInt(yearMonth[1]);
    const startDay = parseInt(yearMonth[2]);
    const endMonth = parseInt(yearMonth[4]);
    const endDay = parseInt(yearMonth[5]);
    let lastDay = new Date(startYear, startMonth, 0).getDate();
    let currentDay = 0;
    let currentDate = 0;
    let currentMonth = startMonth;
    let count = startDay;
    let index = 0;

    lastDay = new Date(startYear, currentMonth, 0).getDate();
    while ((currentMonth != endMonth) || (count != endDay+1)) {
        shuffle(studentsObj); // 새로고침 시 바뀔 수 있도록
        currentDay = new Date(startYear, currentMonth-1, count).getDay();
        currentDate = parseInt(String(startYear) + getZero(currentMonth) + getZero(count));
        if (currentDay != 0 && currentDay != 6 && !(holidays.includes(currentDate))) {
            cleaningNumSort(studentsObj);
            index = 0;
            while (studentsObj[index]['available_day'][currentDay-1]) { // 0번 인덱스부터 1씩 증가시키며 가능한 사람을 찾는다.
                index++;
                if (index == studentsObj.length) {
                    return noCleaningPerson();
                }
            }
            document.querySelector(`#M${currentMonth}day${count}`).innerHTML += `<br>${studentsObj[index].name}`;
            studentsObj[index]['cleaning_num']++;

            let compare = studentsObj[index];
            cleaningNumSort(studentsObj);
            index = 0;
            while ((compare == studentsObj[index]) || studentsObj[index]['available_day'][currentDay-1]) { // 한명이 하루에 두번배정되지 않도록 가능한 사람을 찾는다.
                index++;
                if (index == studentsObj.length) {
                    return noCleaningPerson();
                }
            }
            document.querySelector(`#M${currentMonth}day${count}`).innerHTML += `<br>${studentsObj[index].name}`;
            studentsObj[index]['cleaning_num']++;
        } else if (currentDay == 6) {
            document.querySelector(`#M${currentMonth}day${count}`).classList.add('blue');
        } else {
            document.querySelector(`#M${currentMonth}day${count}`).classList.add('red');
        }
        count++;

        if (count > lastDay) {
            count = 1;
            currentMonth++;
            lastDay = new Date(startYear, currentMonth, 0).getDate();
        }
    }
    cleaningNumSort(studentsObj);
}

function showCleaningNum() { // 청소 횟수 보기/닫기
    if (isHiding) {
        cleaningNumDiv.innerText = cleaningNum;
        cleaningNumDiv.classList.remove('hidden');
        isHiding = false;
        cleaningNumBtn.innerText = '학생별 청소횟수 닫기';
    } else {
        cleaningNumDiv.innerText = '';
        cleaningNumDiv.classList.add('hidden');
        isHiding = true;
        cleaningNumBtn.innerText = '학생별 청소횟수 보기';
    }
}

if (yearMonth != null) {
    makeStudentsObj();
    makeCalendar();
    makeCleaningSchedule();
    calender.classList.remove('hidden');
}

for (let i = 0; i < studentsObj.length; i++) {
    cleaningNum += `${studentsObj[i]['name']} : ${studentsObj[i]['cleaning_num']}번\n`; 
}

cleaningNumBtn.addEventListener('click', showCleaningNum);

if (yearMonth == null) {
    calender.classList.add('hidden');
}