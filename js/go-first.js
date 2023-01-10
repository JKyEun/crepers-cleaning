function goFirst() {
    localStorage.removeItem('yearmonth');
    localStorage.removeItem('checkArr');
    localStorage.removeItem('studentsfin');
    location.reload();
}

document.querySelector('#go-first').addEventListener('click', goFirst);