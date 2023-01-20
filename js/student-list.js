const studentForm = document.querySelector('#student-form');
const studentInput = document.querySelector('#student-form input');
const studentList = document.querySelector('#student-list');
const studentListButton = document.querySelector("#student-list-button");
const studentNum = document.querySelector('#student-num');
const weekTable = document.querySelector('#week-table');
const yearMonthForm = document.querySelector('#yearmonth-form');
const finButton = document.querySelector('#fin-button');
const STUDENTS_KEY = "students";
const STUDENTSFIN_KEY = "studentsfin";
let students = [];  // 학생들을 담을 배열

function showStudentsNum() {    // 현재 등록된 학생수를 표시하는 함수
    studentNum.innerText = `${students.length}명`;
}

function saveStudents() {   // 학생 배열을 localStorage에 저장
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function addStudent(newStudent) {   // 학생을 추가하는 함수
    const li = document.createElement("li");
    li.id = newStudent.id;  // Date.now()로 생성한 id 등록
    const span = document.createElement("span");
    span.innerText = newStudent.text;   // 새로운 학생의 이름을 넣어줌
    const button = document.createElement("button");
    button.innerText = "❌";
    button.classList.add('btn');    // 버튼에 btn 클래스를 추가하여 css 적용
    button.addEventListener("click", deleteStudent);    // 버튼 클릭시 deleteStudent 함수 실행
    li.appendChild(span);   // li 태그 밑에 span태그 위치시킴
    li.appendChild(button); // li 태그 밑에 button태그 위치시킴
    studentList.appendChild(li);    // ul태그 밑에 li태그 위치시킴
    showStudentsNum();  // 다시 학생 수를 보여줌
}

function deleteStudent(event) { // 학생을 삭제하는 함수
    const li = event.target.parentElement; // li는 button의 parentElement
    li.remove();
    students = students.filter((s) => s.id !== parseInt(li.id)); // 등록했던 id로 검색하여 불일치하는 것들만 다시 등록
    saveStudents(); // 삭제한 채로 저장
    showStudentsNum(); // 다시 학생 수를 보여줌
}

function studentSubmit(event) { // 새로운 학생을 받는 함수
    event.preventDefault(); // 새로고침 막기
    const newStudent = studentInput.value;   // 이름 받아오기
    studentInput.value = "";    // 다시 빈칸으로 만들어주기
    const newStudentObj = { // 객체배열로 만들어 저장
        text : newStudent,
        id : Date.now(),
    };
    students.push(newStudentObj);   // students 배열에 푸시
    addStudent(newStudentObj);
    saveStudents(newStudent);
}

function preventNextStep() {    // 경고창 뜨게하기
    alert('청소명단이 입력되지 않았습니다.');
}

function studentFinSubmit(event) {  // 작성 완료후 제출하는 함수
    event.preventDefault();
    if (students.length == 0) { // 등록된 학생이 없으면 해당 함수 실행
        return preventNextStep()
    }
    studentForm.classList.add('hidden');
    studentListButton.classList.add('hidden');
    weekTable.classList.remove('hidden');
    yearMonthForm.classList.remove('hidden');
    localStorage.setItem(STUDENTSFIN_KEY, JSON.stringify(students));
    location.reload();  // 새로고침
}

studentForm.addEventListener("submit", studentSubmit)

const savedStudents = localStorage.getItem(STUDENTS_KEY);
const savedStudentsFin = localStorage.getItem(STUDENTSFIN_KEY);

if (savedStudents != null) {    // localStorage에 저장된 학생 배열이 있으면 가져온다
    const parsedStudents = JSON.parse(savedStudents);   // stringify되었던 것을 다시 parse
    students = parsedStudents;
    parsedStudents.forEach(addStudent); // 동기화
}

if (savedStudentsFin === null) {    // 아직 제출된 학생 배열이 없으면 hidden class 삭제
    studentForm.classList.remove('hidden');
    studentListButton.classList.remove('hidden');
    finButton.addEventListener("click", studentFinSubmit);
}

if (savedStudentsFin != null) {  // 제출된 학생 배열 있으면 다음 화면 보이게 함
    weekTable.classList.remove('hidden');
    yearMonthForm.classList.remove('hidden');
}