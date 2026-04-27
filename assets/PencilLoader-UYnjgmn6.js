import{j as r}from"./chunk-react-CHYD3jVH.js";const s=()=>r.jsxs("div",{className:"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111]",children:[r.jsx("style",{children:`
        .card {
          /* color used to softly clip top and bottom of the .words container */
          --bg-color: #111;
          background-color: var(--bg-color);
          padding: 1rem 2rem;
          border-radius: 1.25rem;
        }
        .loader {
          color: rgb(124, 124, 124);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-weight: 500;
          font-size: 25px;
          -webkit-box-sizing: content-box;
          box-sizing: content-box;
          height: 40px;
          padding: 10px 10px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          border-radius: 8px;
        }

        .words {
          overflow: hidden;
          position: relative;
        }
        .words::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            var(--bg-color) 10%,
            transparent 30%,
            transparent 70%,
            var(--bg-color) 90%
          );
          z-index: 20;
        }

        .word {
          display: block;
          height: 100%;
          padding-left: 6px;
          color: #956afa;
          animation: spin_4991 4s infinite;
        }

        @keyframes spin_4991 {
          10% {
            -webkit-transform: translateY(-102%);
            transform: translateY(-102%);
          }

          25% {
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
          }

          35% {
            -webkit-transform: translateY(-202%);
            transform: translateY(-202%);
          }

          50% {
            -webkit-transform: translateY(-200%);
            transform: translateY(-200%);
          }

          60% {
            -webkit-transform: translateY(-302%);
            transform: translateY(-302%);
          }

          75% {
            -webkit-transform: translateY(-300%);
            transform: translateY(-300%);
          }

          85% {
            -webkit-transform: translateY(-402%);
            transform: translateY(-402%);
          }

          100% {
            -webkit-transform: translateY(-400%);
            transform: translateY(-400%);
          }
        }
      `}),r.jsx("div",{className:"card",children:r.jsxs("div",{className:"loader",children:[r.jsx("p",{children:"exploring"}),r.jsxs("div",{className:"words",children:[r.jsx("span",{className:"word",children:"IMAT EXAMS"}),r.jsx("span",{className:"word",children:"CEnT-S 2026"}),r.jsx("span",{className:"word",children:"ITALY GUIDES"}),r.jsx("span",{className:"word",children:"SCHOLARSHIPS"}),r.jsx("span",{className:"word",children:"IMAT EXAMS"})]})]})})]});export{s as P};
