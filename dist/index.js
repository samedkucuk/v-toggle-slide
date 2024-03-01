!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).VToggleSlide={})}(this,(function(e){"use strict";const t={duration:300,easing:"ease"};function i(e,i=t){let n=[];const o=function(e,t){e.dispatchEvent(new CustomEvent(t))};e.directive("toggle-slide",{mounted(e,t){const s=t?.arg,l=s?t?.instance?.$refs?.[s]:void 0;let d=l?l.$el:e;if(!d)return;let a=i.easing,r=i.duration;Object.keys(t?.modifiers).forEach((e=>{if(!Number.isNaN(parseInt(e)))return r=parseInt(e);"string"==typeof e&&(a=e)}));const u=function(){return"none"!==window.getComputedStyle(d).getPropertyValue("display")};u()||(d.style.height="0px",d.style.padding="0px",d.style.margin="0px",d.style.display="none"),d.style.overflow="hidden",d.style.transition=`height ${a} ${r}ms, padding ${a} ${r}ms, margin ${a} ${r}ms`,n.push({el:d,isOpen:l?u():t.value,duration:r,durationInSeconds:r/1e3+"ms",easing:a,isAnimating:!1});l&&e.addEventListener("click",(function(){const e=function(e){const t=n.find((t=>t.el.isSameNode(e)));if(void 0===t)throw"Element not found!";return t}(d);e.isOpen?function(e,t){o(e,"slide-close-start"),t.isOpen=!1,t.isAnimating=!0;const i=e.scrollHeight;e.style.height=`${i}px`,setTimeout((()=>{e.style.height="0px",e.style.padding="0px",e.style.margin="0px",e.style.borderWidth="0px"}),2),t.isAnimating&&clearTimeout(t.timeout);const n=setTimeout((()=>{t.isAnimating=!1,e.style.display="none",o(e,"slide-close-end")}),t.duration);t.timeout=n}(d,e):function(e,t){o(e,"slide-open-start"),t.isOpen=!0,t.isAnimating=!0,e.style.display="block";const i=e.scrollHeight,n=window.getComputedStyle(e),s=parseFloat(n.getPropertyValue("border-bottom-width")),l=parseFloat(n.getPropertyValue("border-top-width"));e.style.height=`${i+s+l}px`,e.style.padding="",e.style.margin="",e.style.borderWidth="",t.isAnimating&&clearTimeout(t.timeout);const d=setTimeout((()=>{e.style.height="",t.isAnimating=!1,o(e,"slide-open-end")}),t.duration);t.timeout=d}(d,e)}))},updated(e,t){"boolean"==typeof t?.value&&t?.value!==t?.oldValue&&handleClick()}})}e.default=i,e.setupToggleSlide=i,Object.defineProperty(e,"__esModule",{value:!0})}));