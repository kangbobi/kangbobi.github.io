const round=(v,d=6)=>Number(v.toFixed(d));
export function majorityVote(answers){const counts={};for(const a of answers)counts[a]=(counts[a]??0)+1;const winner=Object.entries(counts).sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(String(b[0])))[0]?.[0]??null;return{winner,counts}}
export function bestOfN(candidates){if(!candidates.length)return null;return candidates.reduce((best,c)=>c.score>best.score?c:best)}
export function relativeAdvantages(rewards){if(!rewards.length)return[];const mean=rewards.reduce((a,b)=>a+b,0)/rewards.length;return rewards.map(r=>round(r-mean))}
export function policyUpdateToy(probability,advantage,learningRate=.1){const p=Math.min(.999,Math.max(.001,probability));const logit=Math.log(p/(1-p))+learningRate*advantage;return round(1/(1+Math.exp(-logit)))}
export function budgetCurve(samples=6,base=.4){return Array.from({length:samples},(_,i)=>round(base+(1-base)*(1-Math.exp(-.55*(i+1)))))}
export function judgeAgreement(a,b){const n=Math.min(a.length,b.length);if(!n)return 0;let same=0;for(let i=0;i<n;i++)if(a[i]===b[i])same++;return same/n}
export function distillationBlend(student,teacher,alpha=.5){return round(student*(1-alpha)+teacher*alpha)}
