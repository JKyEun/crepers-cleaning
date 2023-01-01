const studentForm = document.querySelector('#student-form');
const studentInput = document.querySelector('#student-form input');
const studentList = document.querySelector('#student-list');
const studentListButton = document.querySelector("#student-list-button");
let students = [];
const STUDENTS_KEY = "students";
const STUDENTSFIN_KEY = "studentsfin";

function saveStudents() {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function deleteStudent(event) {
    const li = event.target.parentElement;
    li.remove();
    students = students.filter((s) => s.id !== parseInt(li.id));
    saveStudents();
}

function addStudent(newStudent) {
    const li = document.createElement("li");
    li.id = newStudent.id;
    const span = document.createElement("span");
    span.innerText = newStudent.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteStudent);
    li.appendChild(span);
    li.appendChild(button);
    studentList.appendChild(li);
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

function studentFinSubmit(event) {
    event.preventDefault();
    studentForm.classList.add('hidden');
    studentListButton.classList.add('hidden');
    localStorage.setItem(STUDENTSFIN_KEY, JSON.stringify(students));
}

document.addEventListener("submit", studentSubmit)

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