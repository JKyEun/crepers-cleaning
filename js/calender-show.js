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
let newStartMonth = '';
let studentsObj = [];
let cleaningNum = '';
let isHiding = true;

function makeCalendar() {
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
        
    for (let i = 0; i < firstDay; i++) {
        htmlDummy += `<div class="noColor"></div>`;
    }

    while ((currentMonth != endMonth) || (count != endDay)) {
        htmlDummy += `<div id='M${currentMonth}day${count}'>${currentMonth}월 ${count}일</div>`;
        count++;

        if (count > lastDay) {
            count = 1;
            currentMonth++;
            lastDay = new Date(startYear, currentMonth, 0).getDate();
        }
    }

    document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
    let allMonth = `${startYear}년 `;
    for (let i = 0; i <= (endMonth-startMonth); i++) {
        allMonth += `${startMonth+i}월 `;
    }
    document.querySelector(`.dateTitle`).innerText = allMonth;
}

function makeStudentsObj() {
    for (let i = 0; i < studentName.length; i++) {
        studentsObj[i] = {
            name: studentName[i].text,
            available_day: getCheckArr[i],
            cleaning_num: 0
        };
    }
}

function cleaningNumSort(arr) {
    arr.sort((a, b) => 
    a.cleaning_num - b.cleaning_num
);
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getZero(Num) {
    if (Num < 10) {
        newNum = '0'+String(Num);
        return newNum;
    } else {
        return String(Num);
    }
}

function noCleaningPerson() {
    localStorage.removeItem('yearmonth');
    location.reload();
    if (localStorage.getItem('checkArr') != null) {
        for (let i = 0; i < studentName.length; i++) {
            for (let j = 1; j <= 5; j++) {
                document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
            }
        }
    }
    alert('특정 요일에 청소할 인원이 부족합니다.');
}

function makeCleaningSchedule() {
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
    while ((currentMonth != endMonth) || (count != endDay)) {
        shuffle(studentsObj);
        currentDay = new Date(startYear, currentMonth-1, count).getDay();
        currentDate = parseInt(String(startYear) + getZero(currentMonth) + getZero(count));
        if (currentDay != 0 && currentDay != 6 && !(holidays.includes(currentDate))) {
            cleaningNumSort(studentsObj);
            index = 0;
            while (studentsObj[index]['available_day'][currentDay-1]) {
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
            while ((compare == studentsObj[index]) || studentsObj[index]['available_day'][currentDay-1]) {
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

function showCleaningNum() {
    if (isHiding) {
        document.querySelector('#cleaning-num').innerText = cleaningNum;
        document.querySelector('#cleaning-num').classList.remove('hidden');
        isHiding = false;
        document.querySelector('#show-cleaning-num').innerText = '학생별 청소횟수 닫기';
    } else {
        document.querySelector('#cleaning-num').innerText = '';
        document.querySelector('#cleaning-num').classList.add('hidden');
        isHiding = true;
        document.querySelector('#show-cleaning-num').innerText = '학생별 청소횟수 보기';
    }
}

if (yearMonth != null) {
    makeStudentsObj();
    makeCalendar();
    makeCleaningSchedule();
    document.querySelector(`#calender`).classList.remove('hidden');
}

for (let i = 0; i < studentsObj.length; i++) {
    cleaningNum += `${studentsObj[i]['name']} : ${studentsObj[i]['cleaning_num']}번\n`; 
}

document.querySelector('#show-cleaning-num').addEventListener('click', showCleaningNum);

if (yearMonth == null) {
    document.querySelector(`#calender`).classList.add('hidden');
}