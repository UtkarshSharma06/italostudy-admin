import{j as e,r as d,R as S}from"./chunk-react-CHYD3jVH.js";import{u as z,E as a}from"./EditableText-ujaAwNZQ.js";import{c as p,B as u}from"./main-DpQKsHOR.js";import{u as I}from"./chunk-i18n-B4uN7xiM.js";import{aF as R,aX as A,bI as E,bJ as F,aK as Q,L as V,bX as B,ao as q,aI as j}from"./chunk-utils-DGcNHC-c.js";import{m as b,A as L}from"./chunk-motion-BVYN7E__.js";import"./chunk-ai-UIHv_u-O.js";import"./chunk-vendor-By63Marc.js";import"./chunk-capacitor-DNsR1HAV.js";import"./chunk-three-DtD8smo0.js";import"./chunk-radix-1-ZMmsX9.js";import"./chunk-katex-BXYkUF8E.js";import"./chunk-router-Bi2q72bo.js";import"./chunk-supabase-DEWm8jo_.js";const M=()=>{const{getField:x}=z("landing-global"),l=x("reveal_bank_size","012000").split("");return e.jsxs("div",{className:"w-full flex flex-col items-center justify-center p-4 md:p-8 min-h-[250px] md:min-h-[400px]",children:[e.jsx("style",{children:`
        .reveal-container {
          display: grid;
          gap: 3rem;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .reveal-text {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 900;
          color: hsl(240 10% 40%);
          text-align: center;
          background: linear-gradient(hsl(240 10% 80%), hsl(240 10% 50%));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .reveal-code {
          font-size: 3rem;
          display: flex;
          flex-wrap: nowrap;
          color: hsl(0 0% 100%);
          border-radius: 1rem;
          background: hsl(240 20% 10%); /* Slightly tinted dark background */
          justify-content: center;
          box-shadow: 0 1px hsl(0 0% 100% / 0.25) inset, 0 20px 40px -10px rgba(0,0,0,0.5);
          padding: 0;
          margin: 0;
          list-style: none;
          overflow: hidden;
        }

        .reveal-code:hover {
          cursor: grab;
        }

        .reveal-digit {
          display: flex;
          height: 100%;
          padding: 2rem 0.5rem;   /* Reduced from 4rem 1rem */
          position: relative;
        }

        @media (min-width: 768px) {
          .reveal-digit {
            padding: 4rem 1rem;
          }
        }

        .reveal-digit:focus-visible {
          outline-color: hsl(0 0% 50% / 0.25);
          outline-offset: 1rem;
        }

        .reveal-digit span {
          scale: calc(var(--active, 0) + 0.5);
          filter: blur(calc((1 - var(--active, 0)) * 1rem));
          opacity: calc(var(--active, 0) + 0.2);
          transition: scale calc(((1 - var(--active, 0)) + 0.2) * 1s), filter calc(((1 - var(--active, 0)) + 0.2) * 1s), opacity calc(((1 - var(--active, 0)) + 0.2) * 1s);
          display: block;
          font-family: monospace;
          font-weight: 700;
        }

        /* Spacing for first/last to balance the look */
        .reveal-digit:first-of-type {
          padding-left: 3rem;
        }
        .reveal-digit:last-of-type {
          padding-right: 3rem;
        }

        /* Pre-calculated sin() values for lerp effect */
        :root {
          --lerp-0: 1;          /* sin(90deg) */
          --lerp-1: 0.766;      /* sin(50deg) */
          --lerp-2: 0.707;      /* sin(45deg) */
          --lerp-3: 0.573;      /* sin(35deg) */
          --lerp-4: 0.422;      /* sin(25deg) */
          --lerp-5: 0.258;      /* sin(15deg) */
        }

        /* Hover Interaction Logic */
        .reveal-digit:is(:hover, :focus-visible) {
          --active: var(--lerp-0);
        }
        .reveal-digit:is(:hover, :focus-visible) + .reveal-digit,
        .reveal-digit:has(+ .reveal-digit:is(:hover, :focus-visible)) {
          --active: var(--lerp-1);
        }
        .reveal-digit:is(:hover, :focus-visible) + .reveal-digit + .reveal-digit,
        .reveal-digit:has(+ .reveal-digit + .reveal-digit:is(:hover, :focus-visible)) {
          --active: var(--lerp-2);
        }
        .reveal-digit:is(:hover, :focus-visible) + .reveal-digit + .reveal-digit + .reveal-digit,
        .reveal-digit:has(+ .reveal-digit + .reveal-digit + .reveal-digit:is(:hover, :focus-visible)) {
          --active: var(--lerp-3);
        }
        
        /* Mobile fallback support - making sure it's somewhat visible on touch if tapped */
        .reveal-digit:active {
           --active: var(--lerp-0);
        }
      `}),e.jsxs("section",{className:"reveal-container",children:[e.jsx("p",{className:"reveal-text",children:e.jsx(a,{fieldKey:"reveal_title",fallback:"Question Bank Size"})}),e.jsx("p",{className:"text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 opacity-60",children:e.jsx(a,{fieldKey:"reveal_hint",fallback:"Move to Reveal"})}),e.jsx("ul",{className:"reveal-code",children:l.map((i,s)=>e.jsx("li",{tabIndex:0,className:"reveal-digit",children:e.jsx("span",{children:i})},s))}),e.jsx("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-widest mt-2",children:e.jsx(a,{fieldKey:"reveal_footer",fallback:"Verified Questions"})})]})]})},O=({onPracticeMore:x})=>{const{t}=I(),{getField:l}=z("landing-global"),i=[{subject:l("quiz_q1_subject",t("landing.global_challenge.quiz.subjects.logic")),icon:R,badge:l("quiz_q1_badge",t("landing.global_challenge.quiz.badges.rank_match")),question:l("quiz_q1_question",t("landing.global_challenge.quiz.questions.logic")),options:[l("quiz_q1_opt0",t("common.numbers.first","First")),l("quiz_q1_opt1",t("common.numbers.second","Second")),l("quiz_q1_opt2",t("common.numbers.third","Third")),l("quiz_q1_opt3",t("common.numbers.last","Last"))],correct:parseInt(l("quiz_q1_correct","1"))},{subject:l("quiz_q2_subject",t("landing.global_challenge.quiz.subjects.math")),icon:A,badge:l("quiz_q2_badge",t("landing.global_challenge.quiz.badges.speed_round")),question:l("quiz_q2_question",t("landing.global_challenge.quiz.questions.math")),options:[l("quiz_q2_opt0","10"),l("quiz_q2_opt1","14"),l("quiz_q2_opt2","12"),l("quiz_q2_opt3","15")],correct:parseInt(l("quiz_q2_correct","1"))},{subject:l("quiz_q3_subject",t("landing.global_challenge.quiz.subjects.biology")),icon:E,badge:l("quiz_q3_badge",t("landing.global_challenge.quiz.badges.daily_challenge")),question:l("quiz_q3_question",t("landing.global_challenge.quiz.questions.biology")),options:[l("quiz_q3_opt0","Nucleus"),l("quiz_q3_opt1","Ribosome"),l("quiz_q3_opt2","Mitochondria"),l("quiz_q3_opt3","Lysosome")],correct:parseInt(l("quiz_q3_correct","2"))},{subject:l("quiz_q4_subject",t("landing.global_challenge.quiz.subjects.physics")),icon:F,badge:l("quiz_q4_badge",t("landing.global_challenge.quiz.badges.concept_core")),question:l("quiz_q4_question",t("landing.global_challenge.quiz.questions.physics")),options:[l("quiz_q4_opt0","Joule"),l("quiz_q4_opt1","Watt"),l("quiz_q4_opt2","Newton"),l("quiz_q4_opt3","Pascal")],correct:parseInt(l("quiz_q4_correct","2"))},{subject:l("quiz_q5_subject",t("landing.global_challenge.quiz.subjects.chemistry")),icon:Q,badge:l("quiz_q5_badge",t("landing.global_challenge.quiz.badges.lab_sprint")),question:l("quiz_q5_question",t("landing.global_challenge.quiz.questions.chemistry")),options:[l("quiz_q5_opt0","5"),l("quiz_q5_opt1","7"),l("quiz_q5_opt2","9"),l("quiz_q5_opt3","14")],correct:parseInt(l("quiz_q5_correct","1"))}],[s,f]=d.useState(0),[n,m]=d.useState(null),[c,h]=d.useState(!1),[w,_]=d.useState(0),[y,v]=d.useState(!1),k=o=>{c||m(o)},N=()=>{n!==null&&(h(!0),n===i[s].correct&&_(o=>o+1))},K=()=>{s<i.length-1?(f(o=>o+1),m(null),h(!1)):v(!0)},C=()=>{f(0),m(null),h(!1),_(0),v(!1)};return e.jsxs("section",{className:"py-10 relative transform-gpu bg-white",children:[e.jsx("div",{className:"absolute inset-0 pointer-events-none",style:{background:`
                    linear-gradient(90deg, hsl(220 14% 100% / 0.05) 1px, transparent 1px) 0 0 / 10vmin 10vmin,
                    linear-gradient(hsl(220 14% 100% / 0.05) 1px, transparent 1px) 0 0 / 10vmin 10vmin
                `,mask:"linear-gradient(-15deg, transparent 30%, white)",WebkitMask:"linear-gradient(-15deg, transparent 30%, white)"}}),e.jsxs("div",{className:"container mx-auto px-6 relative z-10",children:[e.jsx("div",{className:"flex flex-col items-center text-center mb-12",children:e.jsxs(b.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"0px 0px -100px 0px"},transition:{duration:.6,ease:"easeOut"},className:"mb-6",children:[e.jsx(a,{fieldKey:"global_challenge_badge",fallback:t("landing.global_challenge.badge"),className:"px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4 inline-block"}),e.jsx("h2",{className:"text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6",children:e.jsx(a,{fieldKey:"global_challenge_title",fallback:t("landing.global_challenge.title")+" "+t("landing.global_challenge.title_highlight"),className:"text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"})}),e.jsx("p",{className:"text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed",children:e.jsx(a,{fieldKey:"global_challenge_description",fallback:t("landing.global_challenge.description"),multiline:!0})})]})}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch",children:[e.jsx("div",{className:"relative group perspective-1000",children:e.jsx("div",{className:"bg-white border border-white/5 rounded-[2.5rem] p-6 h-full flex flex-col justify-center items-center overflow-hidden relative shadow-sm backdrop-blur-md",children:e.jsx(M,{})})}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"bg-white backdrop-blur-lg rounded-[2.5rem] shadow-xl border border-white/5 p-8 md:p-10 h-full flex flex-col relative z-10",children:e.jsx(L,{mode:"wait",children:y?e.jsxs(b.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"h-full flex flex-col items-center justify-center text-center py-8",children:[e.jsxs("div",{className:"relative mb-8",children:[e.jsx("div",{className:"absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"}),e.jsx("div",{className:"relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 rotate-3",children:e.jsx(j,{className:"w-12 h-12 text-white drop-shadow-md"})}),e.jsx("div",{className:"absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg rotate-12",children:e.jsx("span",{className:"text-2xl",children:"🏆"})})]}),e.jsx("h3",{className:"text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight",children:e.jsx(a,{fieldKey:"quiz_complete_title",fallback:t("landing.global_challenge.quiz.complete_title")})}),e.jsx("p",{className:"text-slate-500 font-bold mb-10 max-w-xs mx-auto",children:t("landing.global_challenge.quiz.score_summary",{score:w,total:i.length})}),e.jsxs("div",{className:"flex gap-4 w-full",children:[e.jsx(u,{onClick:C,variant:"outline",className:"flex-1 h-14 rounded-2xl border-2 border-white/5 font-bold hover:border-slate-200 hover:bg-slate-50 text-slate-600",children:e.jsx(a,{fieldKey:"quiz_try_again_btn",fallback:t("landing.global_challenge.quiz.try_again")})}),e.jsx(u,{onClick:x,className:"flex-1 h-14 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100",children:e.jsx(a,{fieldKey:"quiz_practice_more_btn",fallback:t("landing.global_challenge.quiz.practice_more")})})]}),e.jsx("div",{className:"mt-8 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2",children:e.jsx(a,{fieldKey:"quiz_top_percent_label",fallback:t("landing.global_challenge.quiz.top_percent")})})]},"results"):e.jsxs(b.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"h-full flex flex-col",children:[e.jsxs("div",{className:"flex justify-between items-start mb-8 border-b border-indigo-50 pb-6",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-rose-500 animate-pulse"}),e.jsx("span",{className:"text-[10px] font-black text-rose-500 uppercase tracking-widest",children:e.jsx(a,{fieldKey:"quiz_live_badge",fallback:t("landing.global_challenge.quiz.live_badge")})})]}),e.jsx("div",{className:"text-sm font-bold text-slate-400",children:t("landing.global_challenge.quiz.question_count",{current:s+1,total:i.length})})]}),e.jsxs("div",{className:"bg-indigo-500/10 px-4 py-2 rounded-2xl flex flex-col items-end border border-indigo-400/20",children:[e.jsx("span",{className:"text-[10px] font-black text-indigo-400 uppercase tracking-widest",children:e.jsx(a,{fieldKey:"quiz_subject_label",fallback:t("landing.global_challenge.quiz.subject_label")})}),e.jsxs("span",{className:"text-indigo-300 font-bold text-sm flex items-center gap-1",children:[S.createElement(i[s].icon,{className:"w-4 h-4"}),i[s].subject]})]})]}),e.jsxs("div",{className:"flex-1 mb-8",children:[e.jsx("h4",{className:"text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-8",children:i[s].question}),e.jsx("div",{className:"space-y-3",children:i[s].options.map((o,r)=>{let g="border-slate-100 bg-slate-50/50 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 shadow-sm";return n===r&&(g="border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500 shadow-md"),c&&(r===i[s].correct?g="border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-md":n===r?g="border-rose-500 bg-rose-50 text-rose-700":g="opacity-40 border-slate-100 cursor-not-allowed"),e.jsxs("button",{onClick:()=>k(r),disabled:c,className:p("w-full text-left p-4 rounded-2xl border-2 transition-colors duration-150 font-semibold text-sm flex items-center gap-4 active:scale-[0.99] transform-gpu",g),children:[e.jsx("div",{className:p("w-8 h-8 rounded-xl border-2 flex items-center justify-center text-xs font-black transition-colors",n===r?"border-indigo-500 bg-indigo-500 text-white":"border-slate-200 text-slate-400"),children:String.fromCharCode(65+r)}),e.jsx("span",{className:"flex-1",children:o}),e.jsxs("div",{className:"w-6 flex justify-end",children:[c&&r===i[s].correct&&e.jsx(V,{className:"w-5 h-5 text-emerald-600"}),c&&n===r&&r!==i[s].correct&&e.jsx(B,{className:"w-5 h-5 text-rose-600"})]})]},r)})})]}),e.jsx("div",{className:"mt-auto pt-2",children:c?e.jsxs("div",{className:"flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300 fade-in",children:[e.jsx("div",{className:p("p-4 rounded-2xl text-xs font-bold uppercase tracking-wide text-center flex items-center justify-center gap-2",n===i[s].correct?"bg-emerald-100 text-emerald-800 border border-emerald-200":"bg-rose-100 text-rose-800 border border-rose-200"),children:n===i[s].correct?e.jsxs(e.Fragment,{children:[e.jsx(j,{className:"w-4 h-4"})," ",e.jsx(a,{fieldKey:"quiz_outstanding_label",fallback:t("landing.global_challenge.quiz.outstanding")})]}):e.jsx(a,{fieldKey:"quiz_nice_try_label",fallback:t("landing.global_challenge.quiz.nice_try")})}),e.jsxs(u,{onClick:K,className:"w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg active:scale-[0.98] transition-all group transform-gpu",children:[s<i.length-1?e.jsx(a,{fieldKey:"quiz_next_challenge_btn",fallback:t("landing.global_challenge.quiz.next_challenge")}):e.jsx(a,{fieldKey:"quiz_see_results_btn",fallback:t("landing.global_challenge.quiz.see_results")})," ",e.jsx(q,{className:"ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"})]})]}):e.jsxs(u,{onClick:N,disabled:n===null,className:"w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed group transform-gpu",children:[e.jsx(a,{fieldKey:"quiz_check_answer_btn",fallback:t("landing.global_challenge.quiz.check_answer")})," ",e.jsx(q,{className:"ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"})]})})]},"quiz")})}),e.jsx(b.div,{initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:.5,duration:.5},className:"absolute -bottom-16 left-0 right-0 text-center",children:e.jsxs("span",{className:"inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-sm transition-colors cursor-default",children:["👆 ",e.jsx(a,{fieldKey:"quiz_simulation_hint",fallback:t("landing.global_challenge.quiz.simulation_hint")})]})})]})]})]})]})},te=d.memo(O);export{te as default};
