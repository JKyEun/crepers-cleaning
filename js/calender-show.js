const yearMonth = JSON.parse(localStorage.getItem('yearmonth'));
const startYear = parseInt(yearMonth[0]);
const startMonth = parseInt(yearMonth[1]);
const startDay = parseInt(yearMonth[2]);
const endYear = parseInt(yearMonth[3]);
const endMonth = parseInt(yearMonth[4]);
const endDay = parseInt(yearMonth[5]);

const date = new Date(startYear, (startMonth-1), startDay);
const firstDay = date.getDay();
let lastDay = new Date(startYear, startMonth, 0).getDate();
let newStartMonth = '';
let studentsObj = [];
let cleaningNum = '';
let isHiding = true;
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

function makeCalendar() {
    let htmlDummy = '';

    for (let i = 0; i < firstDay; i++) {
        htmlDummy += `<div class="noColor"></div>`;
    }

    htmlDummy += `<div id='M${startMonth}day1'>${startMonth}월 ${startDay}일</div>`;
    for (let i = startDay+1; i <= lastDay; i++) {    
        htmlDummy += `<div id='M${startMonth}day${i}'>${i}</div>`;
    }

    for (let j = 1; j <= 2; j++) {
        lastDay = new Date(startYear, startMonth+j, 0).getDate();
        htmlDummy += `<div id='M${startMonth+j}day1'>${startMonth+j}월 1일</div>`;
        for (let i = 2; i <= lastDay; i++) {
            htmlDummy += `<div id='M${startMonth+j}day${i}'>${i}</div>`;
        }
    }

    htmlDummy += `<div id='M${startMonth+3}day1'>${startMonth+3}월 1일</div>`;
    for (let i = 2; i <= endDay; i++) {
        htmlDummy += `<div id='M${startMonth+3}day${i}'>${i}</div>`;
    }

    document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
    document.querySelector(`.dateTitle`).innerText = 
    `${startYear}년 ${startMonth}월, ${startMonth+1}월, ${startMonth+2}월, ${startMonth+3}월`;
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
                console.log(document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`));
                document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
            }
        }
    }
    alert('특정 요일에 청소할 인원이 부족합니다.');
}

function makeCleaningSchedule() {
    let currentDay = 0;
    let currentDate = 0;
    let count = 0;

    lastDay = new Date(startYear, startMonth, 0).getDate();
    for (let i = startDay; i <= lastDay; i++) {
        shuffle(studentsObj);
        currentDay = new Date(startYear, startMonth-1, i).getDay();
        currentDate = parseInt(String(startYear) + getZero(startMonth) + getZero(i));
        if (currentDay != 0 && currentDay != 6 && !(holidays.includes(currentDate))) {
            cleaningNumSort(studentsObj);
            count = 0;
            while (studentsObj[count]['available_day'][currentDay-1]) {
                if (count == studentsObj.length) {
                    return noCleaningPerson();
                }
                count++;
            }
            document.querySelector(`#M${startMonth}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
            studentsObj[count]['cleaning_num']++;

            let compare = studentsObj[count];
            cleaningNumSort(studentsObj);
            count = 0;
            while ((compare == studentsObj[count]) || studentsObj[count]['available_day'][currentDay-1]) {
                if (count == studentsObj.length) {
                    return noCleaningPerson();
                }
                count++;
            }
            document.querySelector(`#M${startMonth}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
            studentsObj[count]['cleaning_num']++;
        } else if (currentDay == 6) {
            document.querySelector(`#M${startMonth}day${i}`).classList.add('blue');
        } else {
            document.querySelector(`#M${startMonth}day${i}`).classList.add('red');
        }
    }

     for (let j = 1; j <= 2; j++) {
        lastDay = new Date(startYear, startMonth+j, 0).getDate();
        for (let i = startDay; i <= lastDay; i++) {
            shuffle(studentsObj);
            currentDay = new Date(startYear, startMonth-1+j, i).getDay();
            currentDate = parseInt(String(startYear) + getZero(startMonth+j) + getZero(i));
            if (currentDay != 0 && currentDay != 6 && !(holidays.includes(currentDate))) {
                cleaningNumSort(studentsObj);
                count = 0;
                while (studentsObj[count]['available_day'][currentDay-1]) {
                    if (count == studentsObj.length) {
                        return noCleaningPerson();
                    }
                    count++;
                }
                document.querySelector(`#M${startMonth+j}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
                studentsObj[count]['cleaning_num']++;

                let compare = studentsObj[count];
                cleaningNumSort(studentsObj);
                count = 0;
                while ((compare == studentsObj[count]) || studentsObj[count]['available_day'][currentDay-1]) {
                    if (count == studentsObj.length) {
                        return noCleaningPerson();
                    }
                    count++;
                }
                document.querySelector(`#M${startMonth+j}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
                studentsObj[count]['cleaning_num']++;
            } else if (currentDay == 6) {
                document.querySelector(`#M${startMonth+j}day${i}`).classList.add('blue');
            } else {
                document.querySelector(`#M${startMonth+j}day${i}`).classList.add('red');
            }
        }
    }

    for (let i = 1; i <= endDay; i++) {  
        shuffle(studentsObj); 
        currentDay = new Date(startYear, startMonth+2, i).getDay();
        currentDate = parseInt(String(startYear) + getZero(startMonth+3) + getZero(i));
        if (currentDay != 0 && currentDay != 6 && !(holidays.includes(currentDate))) {
            cleaningNumSort(studentsObj);
            count = 0;
            while (studentsObj[count]['available_day'][currentDay-1]) {
                if (count == studentsObj.length) {
                    return noCleaningPerson();
                }
                count++;
            }
            document.querySelector(`#M${startMonth+3}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
            studentsObj[count]['cleaning_num']++;

            let compare = studentsObj[count];
            cleaningNumSort(studentsObj);
            count = 0;
            while ((compare == studentsObj[count]) || studentsObj[count]['available_day'][currentDay-1]) {
                if (count == studentsObj.length) {
                    return noCleaningPerson();
                }
                count++;
            }
            document.querySelector(`#M${startMonth+3}day${i}`).innerHTML += `<br>${studentsObj[count].name}`;
            studentsObj[count]['cleaning_num']++;
        } else if (currentDay == 6) {
            document.querySelector(`#M${startMonth+3}day${i}`).classList.add('blue');
        } else {
            document.querySelector(`#M${startMonth+3}day${i}`).classList.add('red');
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