import { useEffect, useRef } from "react";

function useClickOutside(handler, capturingPhase) {
  const ref = useRef();

  useEffect(
    function () {
      //事件从DOM顶端travel到target的位置，然后又冒泡回DOM顶端。当点击add form按钮时，实际上点击了modal之外的按钮，在capturing phase过程中就打开了modal，但是在bubbling phase过程中，点击外部的事件在modal打开的情况下再次被捕做到。结果modal就被关上了。所以，Modal出现了几毫秒，然后就又关上了。所以要禁止事件冒泡（capturingPhase = true）
      document.addEventListener("click", handleClickEvent, capturingPhase);

      function handleClickEvent(e) {
        //如果ref不为空，并且ref不包含点击的部分，并且点击的部分不是按钮，就执行handler()
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      return () =>
        document.removeEventListener("click", handleClickEvent, capturingPhase);
    },
    [handler, capturingPhase]
  );

  return { ref };
}

export default useClickOutside;
