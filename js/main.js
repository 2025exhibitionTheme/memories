window.lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  autoResize: true,
});

const menuToggle = document.getElementById("menu-toggle");
let savedScrollPosition = 0; // 스크롤 위치를 저장할 변수

if (menuToggle) {
  menuToggle.addEventListener("change", function () {
    if (this.checked) {
      // [메뉴 열림]

      // 1. 현재 스크롤 위치 저장
      savedScrollPosition = window.scrollY;

      // 2. Body 고정 (튀는 현상 방지를 위해 top에 현재 위치를 음수로 지정)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollPosition}px`;
      document.body.style.width = "100%";

      // 3. Lenis 멈춤
      window.lenis?.stop();
    } else {
      // [메뉴 닫힘]

      // 1. Body 스타일 초기화 (removeProperty가 더 확실함)
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");

      // 2. 저장해둔 위치로 즉시 이동 (복구)
      window.scrollTo(0, savedScrollPosition);

      // 3. Lenis 재개
      window.lenis?.start();
      // 위치 복구 후 Lenis가 꼬이지 않도록 즉시 업데이트
      // (약간의 딜레이를 주는 것이 안전할 때가 많음)
      requestAnimationFrame(() => {
        window.lenis?.resize();
      });
    }
  });
}
