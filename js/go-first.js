function goFirst() {
    localStorage.removeItem('yearmonth');
    localStorage.removeItem('checkArr');
    localStorage.removeItem('studentsfin');
    location.reload();
}

function goFirst2() {
    localStorage.removeItem('studentsfin');
    location.reload();
}

document.querySelector('#go-first').addEventListener('click', goFirst);
document.querySelector('#go-first2').addEventListener('click', goFirst2);