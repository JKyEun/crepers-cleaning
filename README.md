## 개요
- 이 프로젝트는 인천대학교 중앙 밴드동아리 크레퍼스의 동아리방 청소 작업을 원활히 하기 위하여 시작되었다.

## 기능목록
- [X] 학생 리스트를 작성하고 저장하는 기능
    - 함수 saveStudents()는 "students"라는 키의 로컬 스토리지에 학생 객체를 저장한다.
    - 함수 addStudent()는 새로운 학생이 추가되면 학생의 이름을 리스트에 포함시킨다. 이 과정에서 li태그와 span태그, button태그는 동적으로 생성한다.
    - 함수 deleteStudent()는 li 태그를 삭제하고 id를 이용하여 해당 학생을 리스트에서 지운다.
    - 함수 studentSubmit()은 preventDefault를 사용하여 새로고침을 막아주고, 새로운 학생의 이름을 받아 그 이름을 newStudentObj의 text 프로퍼티에 넣으면서 Date.now()를 이용해 id를 생성해준다. 이후 students 배열에 푸시, addStudent에 인수로 넣어 실행, saveStudents를 실행해준다.
    - 함수 studentFinSubmit()은 fin-button이 클릭되면 실행되는 것으로, 'studentsfin'이라는 키를 가진 로컬스토리지에 저장하고 studentForm과 studentList의 hidden 클래스를 다시 더해주어 보이지 않게 한다.
    - studentForm이 submit되면 studentSubmit를 실행한다.
    - 'students' 로컬 스토리지가 null이 아니면 STUDENTS_KEY의 내용을 가져와서 addStudent()를 해준다.
    - savedStudentsFin이 null이면 아직 명단 작성이 완료되지 않은 것으로, hidden 클래스를 지워주고 명단 작성 완료를 클릭하면 studentFinSubmit()을 실행해준다.
- [X] 작성한 학생 리스트에서 학생별 청소 불가능 요일, 일정표를 작성하려는 달을 입력받는 기능
    - makeTable()은 학생 수만큼 학생의 이름과 요일별 checkbox가 포함된 표를 작성한다.
    - isChecked()는 체크박스가 체크되어있는지에 대한 정보를 배열에 저장하여 localStorage에 업로드한다.
    - getYearMonth()는 연도와 월을 입력받는다.
    - informationSubmit은 #fin-button2를 클릭하면 실행되며, isChecked(), getYearMonth()를 실행하고 #week-table표와 #yearmonth-form을 보이지 않게 한다.
- [ ] 청소 일정을 생성 후 달력에 표시하는 기능
- [ ] 청소 일정표를 png파일로 저장하는 기능
- [ ] 처음부터 다시 시작하는 기능 (학생 리스트는 지우지 않음)