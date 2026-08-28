import { classifyProbability, confusionMetrics, forestVote, gradientStep, minMaxScale, operationalRisk } from './lesson-logic.mjs';

const KEY='ai-learn.progress.v1';
const TOTAL=8;
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];

function readProgress(){
  try{
    const value=JSON.parse(localStorage.getItem(KEY));
    return {completed:Array.isArray(value?.completed)?[...new Set(value.completed.filter(x=>typeof x==='string'))]:[]};
  }catch{return{completed:[]}}
}
function writeProgress(progress){localStorage.setItem(KEY,JSON.stringify(progress))}
function renderProgress(){
  const progress=readProgress();
  const pct=Math.round(progress.completed.length/TOTAL*100);
  if($('#progressLabel'))$('#progressLabel').textContent=`${pct}%`;
  if($('#progressBar'))$('#progressBar').style.width=`${pct}%`;
  $$('[data-complete]').forEach(button=>{
    const done=progress.completed.includes(button.dataset.complete);
    button.classList.toggle('done',done);
    button.textContent=done?'✓ Module selesai':'✓ Tandai module selesai';
  });
}
$$('[data-complete]').forEach(button=>button.addEventListener('click',()=>{
  const progress=readProgress();
  if(!progress.completed.includes(button.dataset.complete))progress.completed.push(button.dataset.complete);
  writeProgress(progress);renderProgress();
}));
$$('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const target=document.getElementById(button.dataset.copy);if(!target)return;
  try{await navigator.clipboard.writeText(target.innerText);button.textContent='Copied';setTimeout(()=>button.textContent='Copy',1000)}catch{button.textContent='Copy gagal'}
}));
renderProgress();

function initGradient(){
  const stepButton=$('#gdStep');if(!stepButton)return;
  let state={weight:1,bias:0};
  const x=2,y=10;
  const render=(last=null)=>{
    const prediction=state.weight*x+state.bias;
    const loss=(prediction-y)**2;
    $('#gdWeight').textContent=state.weight.toFixed(3);
    $('#gdBias').textContent=state.bias.toFixed(3);
    $('#gdPrediction').textContent=prediction.toFixed(3);
    $('#gdLoss').textContent=loss.toFixed(3);
    const bounded=Math.min(100,Math.max(0,100-Math.sqrt(loss)*9));
    $('#lossDot').style.left=`${bounded}%`;
    $('#lossDot').style.top=`${Math.max(18,82-bounded*.55)}%`;
    if(last)$('#gdMessage').textContent=`Loss ${last.lossBefore.toFixed(2)} → ${last.lossAfter.toFixed(2)}. Gradient mengubah weight ke arah error yang lebih kecil.`;
  };
  stepButton.addEventListener('click',()=>{
    const learningRate=Number($('#learningRate').value);
    const next=gradientStep({x,y,...state,learningRate});
    state={weight:next.weight,bias:next.bias};render(next);
  });
  $('#gdReset').addEventListener('click',()=>{state={weight:1,bias:0};render();$('#gdMessage').textContent='Mulai dari weight 1 dan bias 0. Klik satu langkah.'});
  $('#learningRate').addEventListener('input',e=>$('#lrValue').textContent=Number(e.target.value).toFixed(2));
  render();
}

function initClassification(){
  if(!$('#scoreSlider'))return;
  const update=()=>{
    const score=Number($('#scoreSlider').value),threshold=Number($('#thresholdSlider').value);
    const result=classifyProbability(score,threshold);
    const probability=result.probability;
    $('#scoreValue').textContent=score.toFixed(1);$('#thresholdValue').textContent=threshold.toFixed(2);
    $('#probabilityValue').textContent=`${(probability*100).toFixed(1)}%`;
    $('#classValue').textContent=result.label?'RISK':'NORMAL';
    $('#probFill').style.width=`${probability*100}%`;$('#thresholdLine').style.left=`${threshold*100}%`;
    $('#classExplain').textContent=result.label?`Probability melewati threshold ${threshold.toFixed(2)}.`:`Probability belum melewati threshold ${threshold.toFixed(2)}.`;
  };
  $('#scoreSlider').addEventListener('input',update);$('#thresholdSlider').addEventListener('input',update);update();
}

function initForest(){
  if(!$('#forestTemp'))return;
  const update=()=>{
    const temp=Number($('#forestTemp').value),crac=Number($('#forestCrac').value);
    const votes=[temp>=30?1:0,crac<=6?1:0,temp>=28&&crac<=7?1:0,temp>=33?1:0,crac<=5?1:0];
    const result=forestVote(votes);
    $('#forestTempValue').textContent=temp;$('#forestCracValue').textContent=crac;
    const row=$('#voteRow');row.replaceChildren(...votes.map((vote,index)=>{const span=document.createElement('span');span.className=`vote ${vote?'one':'zero'}`;span.textContent=`Tree ${index+1}: ${vote?'RISK':'OK'}`;return span}));
    $('#forestDecision').textContent=result.label?'RISK':'NORMAL';
    $('#forestCount').textContent=`${result.positive} vs ${result.negative} votes`;
  };
  $('#forestTemp').addEventListener('input',update);$('#forestCrac').addEventListener('input',update);update();
}

function initFeatures(){
  if(!$('#featureLoad'))return;
  const update=()=>{
    const load=Number($('#featureLoad').value),capacity=Number($('#featureCapacity').value),site=$('#featureSite').value;
    $('#featureLoadValue').textContent=load;$('#featureCapacityValue').textContent=capacity;
    $('#scaledLoad').textContent=minMaxScale(load,0,500).toFixed(3);
    $('#utilization').textContent=`${(load/capacity*100).toFixed(1)}%`;
    $('#encodedSite').textContent=site==='JKT'?'[1, 0, 0]':site==='BTM'?'[0, 1, 0]':'[0, 0, 1]';
  };
  $('#featureLoad').addEventListener('input',update);$('#featureCapacity').addEventListener('input',update);$('#featureSite').addEventListener('change',update);update();
}

const CASES=[
  {p:.92,y:1},{p:.85,y:1},{p:.79,y:0},{p:.72,y:1},{p:.68,y:1},{p:.61,y:0},{p:.55,y:1},{p:.49,y:0},{p:.42,y:1},{p:.36,y:0},{p:.28,y:0},{p:.18,y:0}
];
function initEvaluation(){
  if(!$('#metricThreshold'))return;
  const update=()=>{
    const threshold=Number($('#metricThreshold').value);let tp=0,fp=0,fn=0,tn=0;
    CASES.forEach(item=>{const pred=item.p>=threshold?1:0;if(pred&&item.y)tp++;else if(pred&&!item.y)fp++;else if(!pred&&item.y)fn++;else tn++});
    const m=confusionMetrics({tp,fp,fn,tn});
    $('#metricThresholdValue').textContent=threshold.toFixed(2);$('#tp').textContent=tp;$('#fp').textContent=fp;$('#fn').textContent=fn;$('#tn').textContent=tn;
    $('#precision').textContent=m.precision.toFixed(2);$('#recall').textContent=m.recall.toFixed(2);$('#accuracy').textContent=m.accuracy.toFixed(2);$('#f1').textContent=m.f1.toFixed(2);
  };
  $('#metricThreshold').addEventListener('input',update);update();
}

function initCapstone(){
  if(!$('#capLoad'))return;
  const update=()=>{
    const values={itLoad:Number($('#capLoad').value),temperature:Number($('#capTemp').value),humidity:Number($('#capHumidity').value),activeCrac:Number($('#capCrac').value)};
    $('#capLoadValue').textContent=values.itLoad;$('#capTempValue').textContent=values.temperature;$('#capHumidityValue').textContent=values.humidity;$('#capCracValue').textContent=values.activeCrac;
    const risk=operationalRisk(values);const cooling=.17*values.itLoad+2;
    $('#capCooling').textContent=`${cooling.toFixed(1)} kW`;
    const riskNode=$('#capRisk');riskNode.textContent=`${risk.band.toUpperCase()} · ${(risk.score*100).toFixed(0)}%`;riskNode.className=`big risk ${risk.band}`;
    $('#capAdvice').textContent=risk.band==='high'?'Prioritaskan verifikasi cooling availability dan kapasitas sebelum mempercayai prediksi otomatis.':risk.band==='medium'?'Kondisi perlu observasi tambahan dan validasi sensor sebelum aksi.':'Kondisi ilustratif masih berada pada band risiko rendah.';
  };
  ['#capLoad','#capTemp','#capHumidity','#capCrac'].forEach(id=>$(id).addEventListener('input',update));update();
  $$('.checklist input').forEach(input=>input.addEventListener('change',()=>{const checked=$$('.checklist input:checked').length;$('#checkCount').textContent=`${checked}/5 checklist`;}));
}

initGradient();initClassification();initForest();initFeatures();initEvaluation();initCapstone();
