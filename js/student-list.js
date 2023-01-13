const studentForm = document.querySelector('#student-form');
const studentInput = document.querySelector('#student-form input');
const studentList = document.querySelector('#student-list');
const studentListButton = document.querySelector("#student-list-button");
let students = [];
const STUDENTS_KEY = "students";
const STUDENTSFIN_KEY = "studentsfin";

function showStudentsNum() {
    document.querySelector('#student-num').innerText = `${students.length}명`;
}

function saveStudents() {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function deleteStudent(event) {
    const li = event.target.parentElement;
    li.remove();
    students = students.filter((s) => s.id !== parseInt(li.id));
    saveStudents();
    showStudentsNum();
}

function addStudent(newStudent) {
    const li = document.createElement("li");
    li.id = newStudent.id;
    const span = document.createElement("span");
    span.innerText = newStudent.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.classList.add('btn');
    button.addEventListener("click", deleteStudent);
    li.appendChild(span);
    li.appendChild(button);
    studentList.appendChild(li);
    showStudentsNum();
}

function studentSubmit(event) {
    event.preventDefault();
    const newStudent = studentInput.value;
    studentInput.value = "";
    const newStudentObj = {
        text : newStudent,
        id : Date.now(),
    };
    students.push(newStudentObj);
    addStudent(newStudentObj);
    saveStudents(newStudent);
}

function preventNextStep() {
    alert('청소명단이 입력되지 않았습니다.');
}

function studentFinSubmit(event) {
    event.preventDefault();
    if (students.length == 0) {
        return preventNextStep()
    }
    studentForm.classList.add('hidden');
    studentListButton.classList.add('hidden');
    document.querySelector('#week-table').classList.remove('hidden');
    document.querySelector('#yearmonth-form').classList.remove('hidden');
    localStorage.setItem(STUDENTSFIN_KEY, JSON.stringify(students));
    location.reload();
}

studentForm.addEventListener("submit", studentSubmit)

const savedStudents = localStorage.getItem(STUDENTS_KEY);
const savedStudentsFin = localStorage.getItem(STUDENTSFIN_KEY);

if (savedStudents != null) {
    const parsedStudents = JSON.parse(savedStudents);
    students = parsedStudents;
    parsedStudents.forEach(addStudent);
}

if (savedStudentsFin === null) {
    studentForm.classList.remove('hidden');
    studentListButton.classList.remove('hidden');
    document.querySelector('#fin-button').addEventListener("click", studentFinSubmit);
}

if (savedStudentsFin != null) {
    document.querySelector('#week-table').classList.remove('hidden');
    document.querySelector('#yearmonth-form').classList.remove('hidden');
}