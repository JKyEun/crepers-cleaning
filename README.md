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
- [X] 해당 기간의 달력을 표시하는 기능
    - date 변수에 시작 날짜를 입력한다.
    - firstDay 변수는 시작 날짜의 요일을 가진다.
    - lastDay 변수는 해당 월이 끝나는 날의 날짜(일)를 가진다.
    - 이를 이용해 for문으로 div태그로 감싼 숫자를 추가하면서 달력을 만든다.
    - 한 학기는 4개월이므로 해당 for문은 4개로 하여 4개월 달력이 이어지도록 만들었다.
- [X] 청소 일정을 정하여 달력에 입력하는 기능
    - shuffle()을 이용해 객체 배열의 순서를 섞고 다시 청소 횟수에 따라 오름차순으로 정렬한다.
    - 3월 3일이나 10월 2일, 3월 20일 등 20230303의 형식으로 표시할 때 10의 자리에 0을 넣어주어야 하는 경우 앞자리에 0을 추가해준다.
    - 이를 이용하여, 요일이 토,일이 아니고 holidays 배열에 있는 날짜에 포함되지 않으면 청소 학생을 추가한다.
    - 청소학생을 추가하면 해당 학생의 객체에 cleaning_num을 1 증가시키고 같은 학생이 다시 나오지 않게 하여 다시 다른 학생을 뽑는다.
    - 이를 반복한다.
- [X] 처음부터 다시 시작하는 기능 (학생 리스트는 지우지 않음)
    - 버튼을 클릭하면 goFirst()함수를 실행하도록 한다.
    - goFirst()는 localStorage에 첫번째 학생 리스트를 제외한 나머지 항목을 삭제하고 페이지를 새로고침한다.
- [X] 학생별 청소횟수를 알려주는 기능 구현
    - alert를 이용하여 학생별 청소횟수를 알려준다.

## 사용법
1. 이번 학기 청소에 참여하는 인원(청소명단)을 한명씩 입력한다.
    - Enter로 입력
    - 명단 아래에는 현재 입력한 인원을 알려준다.
    - 입력 완료한 모습 
    <img width="917" alt="스크린샷 2023-01-13 오전 11 35 48" src="https://user-images.githubusercontent.com/108623656/212239949-f590ffae-abca-45c9-b38f-509ddfb6dae2.png">

2. 명단 작성 완료 후 '명단 작성 완료' 버튼을 누르면 다음 페이지로 이동한다.
    - 다음 페이지 모습
    <img width="918" alt="스크린샷 2023-01-13 오전 11 36 25" src="https://user-images.githubusercontent.com/108623656/212240018-024b4b81-e7b5-4998-91c6-4f4dc93f0350.png">

3. 학생별로 청소 불가능한 요일을 조사하여 입력한다.

4. 학기 개강일과 학기 종강일을 형식에 맞게 입력한다.
    - '처음으로' 버튼을 클릭하면 명단 작성 화면으로 돌아간다. (입력한 학생 명단은 사라지지 않음)
    - 입력 완료한 모습
    <img width="921" alt="스크린샷 2023-01-13 오전 11 37 38" src="https://user-images.githubusercontent.com/108623656/212240168-5b5a1c05-f79e-48aa-8f4d-828041b100eb.png">

5. '작성 완료' 버튼을 누르면 청소표가 만들어진다.
    - 공휴일과 주말은 청소일정에 포함하지 않는다.
    - '작성 완료' 버튼 클릭 후 모습
    <img width="920" alt="스크린샷 2023-01-13 오전 11 38 02" src="https://user-images.githubusercontent.com/108623656/212240360-aa0ff292-da39-4543-b78b-ef19f19fbab8.png">


6. '학생별 청소횟수' 버튼을 클릭하면 학생 별로 이번 학기에 청소를 몇번 하게 되는지 알 수 있다.
    - '처음으로' 버튼을 클릭하면 명단 작성 화면으로 돌아간다. (입력한 학생 명단은 사라지지 않음)
    <img width="921" alt="스크린샷 2023-01-13 오전 11 38 35" src="https://user-images.githubusercontent.com/108623656/212240450-835e6fdb-27f9-49d0-8075-a67f60b4928e.png">