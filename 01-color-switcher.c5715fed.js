const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");let n=null;function o(){t.disabled=!1,e.disabled=!0}function a(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}o(),t.addEventListener("click",(()=>{a(),n=setInterval((()=>{a()}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(()=>{clearInterval(n),o()}));
//# sourceMappingURL=01-color-switcher.c5715fed.js.map
