/*! For license information please see 344.60bfd459.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkmusical_cubes=globalThis.webpackChunkmusical_cubes||[]).push([[344],{9344:(e,t,o)=>{o.r(t),o.d(t,{startTapClick:()=>s});var i=o(4136),n=o(1811);const s=e=>{if(void 0===i.d)return;let t,o,s,p=0;const v=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),f=new WeakMap,h=()=>{s&&clearTimeout(s),s=void 0,t&&(b(!1),t=void 0)},m=(e,o)=>{if(e&&e===t)return;s&&clearTimeout(s),s=void 0;const{x:i,y:a}=(0,n.p)(o);if(t){if(f.has(t))throw new Error("internal error");t.classList.contains(l)||w(t,i,a),b(!0)}if(e){const t=f.get(e);t&&(clearTimeout(t),f.delete(e)),e.classList.remove(l);const o=()=>{w(e,i,a),s=void 0};r(e)?o():s=setTimeout(o,d)}t=e},w=(e,t,i)=>{if(p=Date.now(),e.classList.add(l),!v)return;const n=c(e);null!==n&&(L(),o=n.addRipple(t,i))},L=()=>{void 0!==o&&(o.then((e=>e())),o=void 0)},b=e=>{L();const o=t;if(!o)return;const i=u-Date.now()+p;if(e&&i>0&&!r(o)){const e=setTimeout((()=>{o.classList.remove(l),f.delete(o)}),u);f.set(o,e)}else o.classList.remove(l)};i.d.addEventListener("ionGestureCaptured",h),i.d.addEventListener("pointerdown",(e=>{t||2===e.button||m(a(e),e)}),!0),i.d.addEventListener("pointerup",(e=>{m(void 0,e)}),!0),i.d.addEventListener("pointercancel",h,!0)},a=e=>{if(void 0===e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const o=t[e];if(!(o instanceof ShadowRoot)&&o.classList.contains("ion-activatable"))return o}}},r=e=>e.classList.contains("ion-activatable-instant"),c=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},l="ion-activated",d=100,u=150}}]);
//# sourceMappingURL=344.60bfd459.chunk.js.map