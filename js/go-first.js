function goPre() {
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
}

function goFirst() {
    localStorage.removeItem('studentsfin');
    location.reload();
}

function allDelete() {
    localStorage.removeItem('students');
    localStorage.removeItem('studentsfin');
    localStorage.removeItem('checkArr');
    localStorage.removeItem('yearmonth');
    localStorage.removeItem('yearmonth-copy');
    location.reload();
}

function showManual() {
    window.open("https://github.com/JKyEun/crepers-cleaning#%EC%82%AC%EC%9A%A9%EB%B2%95", "_blank");
}

document.querySelector('#all-delete').addEventListener('click', allDelete);
document.querySelector('#go-pre').addEventListener('click', goPre);
document.querySelector('#go-first').addEventListener('click', goFirst);
document.querySelector('#manual').addEventListener('click', showManual);