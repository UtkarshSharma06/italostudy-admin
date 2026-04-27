const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunk-katex-BXYkUF8E.js","assets/chunk-katex-ASjZcBK0.css","assets/chunk-vendor-By63Marc.js","assets/chunk-react-CHYD3jVH.js","assets/chunk-ai-UIHv_u-O.js","assets/chunk-capacitor-DNsR1HAV.js","assets/chunk-three-DtD8smo0.js","assets/chunk-utils-DGcNHC-c.js","assets/chunk-radix-1-ZMmsX9.js"])))=>i.map(i=>d[i]);
import{_ as d}from"./chunk-capacitor-DNsR1HAV.js";import{r as l,j as s}from"./chunk-react-CHYD3jVH.js";import"./chunk-katex-BXYkUF8E.js";import{c as y}from"./main-DpQKsHOR.js";const $=l.memo(({content:m,className:f,isHtml:c=!1,variant:u="premium",...p})=>{const a=l.useRef(null);return l.useEffect(()=>{const h=async()=>{if(a.current)try{const o=(await d(async()=>{const{default:e}=await import("./chunk-katex-BXYkUF8E.js").then(r=>r.a);return{default:e}},__vite__mapDeps([0,1]))).default,t=Array.from(a.current.querySelectorAll("table")),n=[];t.forEach(e=>{const r=document.createComment("table-placeholder");e.parentNode?.insertBefore(r,e),e.parentNode?.removeChild(e),n.push({placeholder:r,table:e})}),o(a.current,{delimiters:[{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1},{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1}],throwOnError:!1,errorColor:"#cc0000",trust:!0,strict:!1,fleqn:!1}),n.forEach(({placeholder:e,table:r})=>{e.parentNode?.insertBefore(r,e),e.parentNode?.removeChild(e),setTimeout(async()=>{r&&o(r,{delimiters:[{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1},{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1}],throwOnError:!1,errorColor:"#cc0000",trust:!0,strict:!1,fleqn:!1})},0)})}catch{}};(async()=>{if(a.current){const o=(await d(async()=>{const{default:i}=await import("./chunk-vendor-By63Marc.js").then(x=>x.c0);return{default:i}},__vite__mapDeps([2,3,4,5,6,7,8,0,1]))).default;let t=m||"";const e=["\\frac","\\sqrt","\\text{","\\alpha","\\beta","\\gamma","\\sum","\\int","\\pm","\\times","\\div"].some(i=>t.includes(i)),r=["$","\\(","\\["].some(i=>t.includes(i));if(e&&!r&&t.trim().startsWith("\\")&&(t=`\\[ ${t} \\]`),t=t.replace(new RegExp("(?<!\\\\)%","g"),"\\%"),c)a.current.innerHTML=o.sanitize(t);else{const i=t.replace(/\n/g,"<br/>");a.current.innerHTML=o.sanitize(i)}h()}})()},[m,c]),s.jsxs(s.Fragment,{children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`
                .katex-premium .katex { 
                    color: #4f46e5 !important; 
                    font-weight: 700 !important; 
                }
                .dark .katex-premium .katex { 
                    color: #818cf8 !important; 
                }
                .katex-premium .katex-display {
                    margin: 1.5em 0 !important;
                    overflow-x: auto !important;
                    overflow-y: hidden !important;
                    padding: 1rem 0 !important;
                    max-width: 100% !important;
                    scrollbar-width: thin;
                }
                .katex-premium .katex-display::-webkit-scrollbar {
                    height: 4px;
                }
                .katex-premium .katex-display::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .dark .katex-premium .katex-display::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                /* Handle inline math overflow if necessary, although rare */
                .katex-premium .katex-html {
                    max-width: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    vertical-align: middle;
                }
            `}}),s.jsx("div",{ref:a,className:y(f,u==="premium"&&"katex-premium"),...p})]})});export{$ as M};
