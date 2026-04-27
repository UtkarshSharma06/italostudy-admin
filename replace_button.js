const fs = require('fs');
let content = fs.readFileSync('c:/Users/Planet pc/Downloads/italostudy/src/pages/Results.tsx', 'utf8');

const regex = /<Button\s+variant="outline"\s+size="sm"\s+onClick=\{\(\) => \{\s+if \(isMock && test\.session_id\) \{\s+navigate\(`\/waiting-room\/\$\{test\.session_id\}`\);\s+\}\s+else\s+if\s+\(test\.exam_type\)\s+\{\s+navigate\(`\/practice\/\$\{test\.exam_type\}`\);\s+\}\s+else\s+\{\s+navigate\('\/practice'\);\s+\}\s+\}\}\s+className="text-\[10px\] sm:text-xs font-black border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:text-indigo-600 shrink-0"\s*>\s*<RotateCcw className="w-3\.5 h-3\.5 mr-1" \/> Reattempt\s*<\/Button>/g;

const newBtn = `{isMock && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (test.session_id) {
                      const params = new URLSearchParams({
                        session_id: test.session_id,
                        exam_type: test.exam_type || ''
                      });
                      navigate(\`/mock-guidelines?\${params.toString()}\`);
                    }
                  }}
                  className="text-[10px] sm:text-xs font-black border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:text-indigo-600 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reattempt
                </Button>
              )}`;

const newContent = content.replace(regex, newBtn);
if(content !== newContent) {
   fs.writeFileSync('c:/Users/Planet pc/Downloads/italostudy/src/pages/Results.tsx', newContent);
   console.log("Success: Replaced");
} else {
   console.log("Fail: Regex did not match");
}
