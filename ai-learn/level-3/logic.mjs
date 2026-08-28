const round=(v,d=6)=>Number(v.toFixed(d));
export function dot(a,b){if(a.length!==b.length)throw new Error('dimension mismatch');return round(a.reduce((s,v,i)=>s+v*b[i],0))}
export function softmax(logits){if(!logits.length)return[];const m=Math.max(...logits),exps=logits.map(v=>Math.exp(v-m)),sum=exps.reduce((a,b)=>a+b,0);return exps.map(v=>round(v/sum))}
export function cosineSimilarity(a,b){const ab=dot(a,b),aa=Math.sqrt(dot(a,a)),bb=Math.sqrt(dot(b,b));return aa&&bb?round(ab/(aa*bb)):0}
export function causalMask(size){return Array.from({length:size},(_,i)=>Array.from({length:size},(_,j)=>j<=i?0:-Infinity))}
export function attentionWeights(query,keys,scale=Math.sqrt(query.length)){return softmax(keys.map(k=>dot(query,k)/scale))}
export function crossEntropy(probabilities,targetIndex){const p=Math.max(1e-12,probabilities[targetIndex]??0);return round(-Math.log(p))}
export function topK(values,k){const pairs=values.map((value,index)=>({value,index})).sort((a,b)=>b.value-a.value).slice(0,Math.max(0,k));return{indices:pairs.map(x=>x.index),values:pairs.map(x=>x.value)}}
export function temperatureScale(logits,temperature=1){const t=Math.max(.05,temperature);return softmax(logits.map(v=>v/t))}
export function simpleTokenize(text){return text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)??[]}
export function bigramNext(tokens,current){const counts=new Map();let total=0;for(let i=0;i<tokens.length-1;i++){if(tokens[i]!==current)continue;counts.set(tokens[i+1],(counts.get(tokens[i+1])??0)+1);total++}return[...counts].map(([token,count])=>[token,round(count/total)]).sort((a,b)=>b[1]-a[1])}
