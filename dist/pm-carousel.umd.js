var J=Object.defineProperty,K=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var $=(i,n,r)=>n in i?J(i,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[n]=r,c=(i,n)=>{for(var r in n||(n={}))U.call(n,r)&&$(i,r,n[r]);if(E)for(var r of E(n))Y.call(n,r)&&$(i,r,n[r]);return i},y=(i,n)=>K(i,G(n));(function(i,n){typeof exports=="object"&&typeof module!="undefined"?module.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis!="undefined"?globalThis:i||self,i["pm-carousel"]=n())})(this,function(){"use strict";const i="data-pm-carousel",n=`${i}-paging`,r=`${i}-wrapper`,_=`${i}-overflow`,M=`${i}-item`,d=`${i}-prev`,u=`${i}-next`,f=`${i}-playstop`,m="transform .5s ease-in-out",p="is-active";function w(){const t={};let e=!1,s=0;const a=arguments.length;Object.prototype.toString.call(arguments[0])==="[object Boolean]"&&(e=arguments[0],s++);const o=function(h){for(const l in h)Object.prototype.hasOwnProperty.call(h,l)&&(e&&Object.prototype.toString.call(h[l])==="[object Object]"?t[l]=w(!0,t[l],h[l]):t[l]=h[l])};for(;s<a;s++){const h=arguments[s];o(h)}return t}function q(t){try{return JSON.parse(t)}catch{return{}}}var S={extend:w,returnJson:q};const X={playstop:function(){!this.nodes.playstop||(this.nodes.playstop.hidden=!this.config.autoplay)},wrappers:function(){const t=this.config.noStartSpace?0:this.config.spaceAround;this.nodes.overflow.style.transform=`translateX(${this.active*-100+t}%)`,this.config.noStartSpace?this.nodes.overflow.style.paddingRight=this.config.spaceAround+"%":(this.nodes.overflow.style.paddingRight=t+"%",this.nodes.overflow.style.paddingLeft=t+"%"),this.nodes.overflow.style.transition=m,this.nodes.overflow.style.display="flex",this.nodes.wrapper.style.overflow="hidden",this.el.classList.add(p)},slides:function(){const t=[];for(this.nodes.items.forEach((e,s)=>{e.setAttribute("tabindex","-1"),e.setAttribute(i+"-item",s),e.style.flex=`1 0 ${100/this.config.group}%`,e.style.overflow="hidden"});this.nodes.items.length>0;)t.push(this.nodes.items.splice(0,this.config.group));this.nodes.items=t,this.slideLength=this.nodes.items.length},paging:function(){if(!this.nodes.paging)return;let t,e;const s=document.createDocumentFragment();this.nodes.paging.innerHTML="",this.nodes.pages=[],this.nodes.items.forEach((a,o)=>{e=this.pagingBtnString,t=document.createElement("div"),t.innerHTML=e.replace("{nbr}",++o),this.nodes.pages.push(t.firstElementChild),s.appendChild(t.firstElementChild)}),this.nodes.paging.append(s),this.nodes.paging.hidden=!1}};function C(t=[]){t.forEach(e=>X[e].call(this))}function R(t){let e=this.active;const s=t.target,a=s.closest(`[${i}-playstop]`),o=s.closest(`[${i}-prev]`),h=s.closest(`[${i}-next]`),l=s.closest(`[${i}-paging]`);if(a){this.toggleAutoplay();return}else if(o)e--;else if(h)e++;else if(l&&l.querySelector("button")){const V=s.closest(`[${i}-paging] li`);e=this.nodes.pages.indexOf(V)}else return;this.stop(),this.changeActive(e)}function W(t){let e=!1;switch(console.log(t.key),t.key){case"ArrowUp":case"ArrowLeft":e=!0,this.changeActive(this.active-1);break;case"ArrowDown":case"ArrowRight":e=!0,this.changeActive(this.active+1);break;case"Home":e=!0,this.changeActive(0);break;case"End":e=!0,this.changeActive(this.slideLength-1);break}e&&t.preventDefault()}function k(t){this.nodes.overflow.style.transition="none",this._touchstartX=Math.round(t.touches[0].pageX),this._slideWidth=this.nodes.wrapper.offsetWidth}function P(t){this._touchmoveX=Math.round(t.touches[0].pageX),this._moveX=this._touchstartX-this._touchmoveX,this.nodes.overflow.style.transform=`translateX(${-this._distance-this._moveX/2}px)`}function H(t){let e=this.active;if(this.nodes.overflow.style.transition=m,this._moveX>this._slideWidth/3)e++;else if(this._moveX<-this._slideWidth/3)e--;else{this.nodes.overflow.style.transform=`translateX(${-this._distance}px)`;return}this.changeActive(e)}var g={onTouchStart:k,onTouchMove:P,onTouchEnd:H};function T(){this.nodes={paging:this.el.querySelector(`[${n}]`),wrapper:this.el.querySelector(`[${r}]`),overflow:this.el.querySelector(`[${_}]`),items:[].slice.call(this.el.querySelectorAll(`[${M}]`)),prev:this.el.querySelector(`[${d}]`),next:this.el.querySelector(`[${u}]`),playstop:this.el.querySelector(`[${f}]`)},this.active=0,this._interval=null,this.autoplayStatus="stop",this._slideWidth=0,this._touchstartX=0,this._touchmoveX=0,this._moveX=0,C.call(this,["slides","wrappers","playstop","paging"]),this.onClick=R.bind(this),this.onTouchStart=g.onTouchStart.bind(this),this.onTouchMove=g.onTouchMove.bind(this),this.onTouchEnd=g.onTouchEnd.bind(this),this.onKeydown=W.bind(this),this.el.addEventListener("click",this.onClick),this.el.addEventListener("keydown",this.onKeydown),this.nodes.wrapper.addEventListener("touchstart",this.onTouchStart),this.nodes.wrapper.addEventListener("touchmove",this.onTouchMove),this.nodes.wrapper.addEventListener("touchend",this.onTouchEnd),this.config.autoplay>1&&this.nodes.playstop?(this.config.loop=!0,this.autoplayStatus="play",this.play(),this.el.addEventListener("mouseenter",this.pause.bind(this)),this.el.addEventListener("mouseleave",this.play.bind(this))):this.changeActive(this.active)}function I(){this._slideWidth=this.activeSlides[0].offsetWidth*this.config.group,this._distance=this.active*this._slideWidth,this.active===this.slideLength-1&&(this._distance=this.nodes.overflow.scrollWidth-this._slideWidth,this.config.spaceAround&&(this._distance-=parseInt(window.getComputedStyle(this.nodes.overflow).getPropertyValue("padding-right"),10))),this.nodes.overflow.style.transform=`translateX(${-this._distance}px`}function O(){if(!this.nodes.prev)return;const t=this.prevString;this.nodes.prev.innerHTML=t.replace("{text}",this.active===0?this.texts.prevFirst:this.texts.prev),this.config.loop?this.nodes.prev.hidden=!1:this.nodes.prev.hidden=this.active===0}function N(){if(!this.nodes.next)return;const t=this.nextString;this.nodes.next.innerHTML=t.replace("{text}",this.active===this.slideLength-1?this.texts.nextLast:this.texts.next),this.config.loop?this.nodes.next.hidden=!1:this.nodes.next.hidden=this.active===this.slideLength-1}function B(){this.activeSlides=[],this.nodes.paging&&this.nodes.pages.forEach((t,e)=>{let s=t;const a=t.querySelector("button");a&&(s=a),e===this.active?(s.setAttribute("aria-current","true"),t.classList.add(p)):(s.removeAttribute("aria-current"),t.classList.remove(p))}),this.nodes.items.forEach((t,e)=>{t.forEach((s,a)=>{e===this.active?(a===0&&this.autoplayStatus!=="play"&&s.focus({preventScroll:!0}),s.setAttribute("aria-hidden","false"),this.activeSlides.push(s)):s.setAttribute("aria-hidden","true")})}),I.call(this),O.call(this),N.call(this)}function x(){const t=this.settings.responsive.slice().reverse().find(e=>window.matchMedia(`(min-width: ${e.minWidth})`).matches);return t?c(c({},this.settings.default),t):this.settings.default}let A,v=!1;function D(){v||(v=!0,A=setTimeout(()=>{this.config=x.call(this),this.config.disable?this.disable():this.reinit(),v=!1,clearTimeout(A)},500))}const F={default:{loop:!0,group:1,spaceAround:0,noStartSpace:!1,autoplay:0}};class j{constructor(e,s){this.el=e;const a=S.returnJson(this.el.getAttribute(i));if(this.settings=S.extend(!0,F,s,a),this.config=this.settings.default,this.settings.responsive&&(this.settings.responsive.sort((o,h)=>parseInt(o.minWidth,10)-parseInt(h.minWidth,10)),this.config=x.call(this),this.settings.responsive.forEach(o=>{window.matchMedia(`(min-width: ${o.minWidth})`).addEventListener("change",D.bind(this))})),this.nodes={paging:this.el.querySelector(`[${n}]`),prev:this.el.querySelector(`[${d}]`),next:this.el.querySelector(`[${u}]`),playstop:this.el.querySelector(`[${f}]`)},this.nodes.paging&&(this.pagingBtnString=this.nodes.paging.innerHTML),this.texts={},this.nodes.playstop){this.playstopString=this.nodes.playstop.innerHTML;const o=this.nodes.playstop.getAttribute(f).split("|");this.texts=y(c({},this.texts),{play:o[0],stop:o[1]})}if(this.nodes.prev&&this.nodes.next){this.prevString=this.nodes.prev.innerHTML,this.nextString=this.nodes.next.innerHTML;const o=this.nodes.prev.getAttribute(d).split("|"),h=this.nodes.next.getAttribute(u).split("|");this.texts=y(c({},this.texts),{prev:o[0],prevFirst:o[1],next:h[0],nextLast:h[1]})}this.config.disable||T.call(this)}reinit(){T.call(this)}play(){if(!this.nodes.playstop||this.autoplayStatus==="stop")return;this.pause(),this.autoplayStatus="play",this.nodes.playstop.classList.add("is-playing");const e=this.playstopString;this.nodes.playstop.innerHTML=e.replace("{text}",this.texts.play);let s=this.active;this._interval=window.setInterval(()=>{s++,s>this.slideLength-1&&(s=0),this.changeActive(s)},this.config.autoplay)}pause(){window.clearInterval(this._interval)}stop(){if(!this.nodes.playstop)return;this.autoplayStatus="stop",this.nodes.playstop.classList.remove("is-playing");const e=this.playstopString;this.nodes.playstop.innerHTML=e.replace("{text}",this.texts.stop),window.clearInterval(this._interval)}toggleAutoplay(){!this.nodes.playstop||(this.autoplayStatus==="play"?this.stop():this.autoplayStatus==="stop"&&(this.autoplayStatus="play",this.play()))}changeActive(e){this.active=e,this.active<0&&(this.active=this.config.loop?this.slideLength-1:0),this.active>this.slideLength-1&&(this.active=this.config.loop?0:this.slideLength-1),B.call(this)}disable(){this.stop(),this.nodes.wrapper.removeEventListener("touchstart",this.onTouchStart),this.nodes.wrapper.removeEventListener("touchmove",this.onTouchMove),this.nodes.wrapper.removeEventListener("touchend",this.onTouchEnd),this.el.removeEventListener("click",this.onClick),this.el.removeEventListener("mouseenter",this.pause),this.el.removeEventListener("mouseleave",this.play),this.nodes.paging.hidden=!0,this.nodes.prev.hidden=!0,this.nodes.next.hidden=!0,this.nodes.playstop.hidden=!0,this.nodes.overflow.removeAttribute("style"),this.nodes.wrapper.removeAttribute("style"),this.nodes.items.forEach(e=>{e.forEach(s=>{s.removeAttribute("tabindex"),s.removeAttribute("aria-hidden"),s.removeAttribute("style")})}),this.el.classList.remove(p)}}const L=(t,e)=>{!t.pmCarousel&&t.hasAttribute(i)&&(t.pmCarousel=new j(t,e))},b=function(t={},e){e!==null&&(e=e||document.querySelectorAll(`[${i}]`),e.length?e.forEach(s=>L(s,t)):L(e,t))};return window.pmCarousel=b,b});
