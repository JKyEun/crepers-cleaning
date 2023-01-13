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

function goFirst2() {
    localStorage.removeItem('studentsfin');
    localStorage.removeItem('yearmonth');
    location.reload();
}

document.querySelector('#go-pre').addEventListener('click', goPre);
document.querySelector('#go-first2').addEventListener('click', goFirst2);