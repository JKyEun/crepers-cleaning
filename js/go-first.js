function goPre() { // 이전 페이지 버튼
    localStorage.removeItem('yearmonth');
    location.reload();
    if (localStorage.getItem('checkArr') != null) { // 체크박스 기억하기 위한 코드
        for (let i = 0; i < studentName.length; i++) {
            for (let j = 1; j <= 5; j++) {
                console.log(document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`));
                document.getElementById(`studentcheck${i}`).querySelector(`#checkbox${j}`).checked = getCheckArr[i][j]
            }
        }
    }
}

function goFirst() { // 처음으로 버튼
    localStorage.removeItem('studentsfin');
    location.reload();
}

function allDelete() { // 모두 지우기 버튼
    localStorage.removeItem('students');
    localStorage.removeItem('studentsfin');
    localStorage.removeItem('checkArr');
    localStorage.removeItem('yearmonth');
    localStorage.removeItem('yearmonth-copy');
    localStorage.removeItem('cleaningNumArr');
    location.reload();
}

function showManual() { // 깃헙 사용법에 링크
    window.open("https://github.com/JKyEun/crepers-cleaning#%EC%82%AC%EC%9A%A9%EB%B2%95", "_blank");
}

document.querySelector('#all-delete').addEventListener('click', allDelete);
document.querySelector('#go-pre').addEventListener('click', goPre);
document.querySelector('#go-first').addEventListener('click', goFirst);
document.querySelector('#manual').addEventListener('click', showManual);