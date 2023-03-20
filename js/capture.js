// 이미지 캡쳐, 저장하기
function captureExport() {
  if (isIphone) {
    alert("아이폰에서는 불가능한 기능입니다. 화면 캡쳐를 사용하세요!");
  } else {
    html2canvas(document.querySelector(".capture-area"), {}).then(function (
      canvas
    ) {
      // 이미지를 jpg 파일 타입으로 변경하는 코드
      const el = document.createElement("a");
      el.href = canvas.toDataURL("image/jpeg");
      el.download = "크레퍼스 청소표.jpg"; //다운로드 할 파일명 설정
      el.click();
    });
  }
}

// 아이폰인지 확인
let isIphone = false;
const user = navigator.userAgent;
if (user.includes("iPhone") || user.includes("iPad")) {
  isIphone = true;
}
