import { mountLessonShell } from '../core/lesson-shell.mjs';
import { node, clear } from '../core/dom.mjs';
import {
  simpleTokenize,
  cosineSimilarity,
  attentionWeights,
  causalMask,
  temperatureScale,
  topK,
  crossEntropy,
  bigramNext,
} from './logic.mjs';

const id = document.body.dataset.module;
mountLessonShell({ levelId: 'level-3', moduleId: id });

const root = document.getElementById('labRoot');
const explain = document.getElementById('labExplain');

const cfg = {
  '01': [['context','model','logits','next token'], 'Next-token prediction bukan database lookup; output adalah distribution yang dipelajari.', 'Mengapa language model bisa menghasilkan banyak token?', 'Karena token yang terpilih ditambahkan ke context lalu proses diulang.'],
  '02': [['text','tokens','IDs','embeddings'], 'Toy tokenizer di lab bukan implementasi BPE produksi.', 'Apakah token selalu sama dengan satu kata?', 'Tidak. Token dapat berupa bagian kata, karakter tertentu, atau simbol.'],
  '03': [['token ID','embedding lookup','vector','network'], 'Kedekatan toy vector bukan bukti makna kausal atau fakta dunia.', 'Kenapa ID 100 tidak “lebih besar maknanya” dari ID 5?', 'ID hanya indeks; representasinya ada di embedding vector.'],
  '04': [['token embedding','+ position','ordered representation'], 'Tanpa positional information, urutan sequence tidak terwakili dengan cara yang dibutuhkan model.', 'Apa yang berubah saat token sama pindah posisi?', 'Representasi inputnya karena komponen posisi berbeda.'],
  '05': [['Q asks','K matches','softmax weights','V contributes'], 'Attention weight tinggi menunjukkan kontribusi dalam komputasi, bukan penjelasan kausal lengkap.', 'Apa peran value V?', 'Informasi yang dijumlahkan menggunakan attention weights.'],
  '06': [['Q·K','scale','softmax','weighted V'], 'Softmax membuat relative weighting; score mentah bukan probabilitas.', 'Kenapa score dibagi √d?', 'Untuk mengendalikan skala dot product agar softmax lebih stabil.'],
  '07': [['past tokens','causal mask','allowed attention','multiple heads'], 'Causal mask mencegah leakage saat next-token training; menghapusnya mengubah objective.', 'Bolehkah token posisi 2 melihat posisi 5?', 'Tidak pada causal self-attention.'],
  '08': [['norm','attention','residual','norm','MLP','residual'], 'Residual bukan shortcut yang boleh dihapus tanpa mengubah optimization/data flow.', 'Apa fungsi residual connection secara sederhana?', 'Menjaga jalur informasi dan membantu optimization pada network dalam.'],
  '09': [['IDs','embeddings','N blocks','norm','LM head','logits'], 'Lebih banyak parameter tidak otomatis menjamin kualitas jika data/training buruk.', 'LM head menghasilkan apa?', 'Satu score/logit untuk setiap token vocabulary pada tiap posisi.'],
  '10': [['token windows','forward','cross entropy','backward','update'], 'Training loss turun belum membuktikan model berguna atau aman; perlu validation/evaluation.', 'Target pretraining causal LM apa?', 'Token berikutnya untuk setiap posisi yang diprediksi.'],
  '11': [['logits','temperature','filter','sample/select','token'], 'Temperature tidak menambah knowledge; hanya mengubah distribution decoding.', 'Apa efek temperature lebih rendah?', 'Distribution lebih tajam sehingga output cenderung lebih deterministik.'],
  '12': [['pretrained model','task/instruction data','loss','updated behavior'], 'Fine-tuning data buruk dapat menurunkan kemampuan atau mengajarkan pola yang tidak diinginkan.', 'Apakah fine-tuning mengganti tokenizer otomatis?', 'Tidak. Tokenizer biasanya tetap kecuali desain secara eksplisit mengubahnya.'],
  '13': [['candidate behaviors','preference signal','optimization','policy behavior'], 'Preference optimization tidak menjamin semua tujuan safety/quality terpecahkan.', 'Alignment terjadi sebelum atau sesudah base pretraining?', 'Biasanya sebagai tahap setelah base capabilities sudah dipelajari.'],
  '14': [['text','tokens','embeddings','attention','blocks','logits','decode'], 'Toy trace menjelaskan mekanisme, bukan mereplikasi ukuran atau perilaku model produksi.', 'Bagian mana memilih token akhir?', 'Decoding policy yang bekerja pada probability/logit output model.'],
};

function slider(label, min, max, step, value, onInput) {
  const row = node('label', { className: 'lab-row' });
  const name = node('span', { text: label });
  const input = node('input', { attrs: { type: 'range', min, max, step, value } });
  const display = node('strong', { text: value });
  input.addEventListener('input', () => {
    display.textContent = input.value;
    onInput(Number(input.value));
  });
  row.append(name, input, display);
  root.append(row);
  return input;
}

function tokenStrip(items, target = root) {
  const box = node('div', { className: 'tokens' });
  for (const item of items) box.append(node('span', { className: 'token', text: item }));
  target.append(box);
  return box;
}

function probabilityStrip(labels, probabilities, target = root) {
  const box = node('div', { className: 'probs' });
  labels.forEach((label, index) => {
    box.append(node('span', { className: 'prob', text: `${label}: ${(probabilities[index] * 100).toFixed(1)}%` }));
  });
  target.append(box);
  return box;
}

function renderLanguageModel() {
  const sequence = ['model','belajar','dari','data','model','belajar','pola'];
  tokenStrip(sequence);
  const out = node('div', { className: 'big' });
  root.append(out);
  const show = word => {
    const result = bigramNext(sequence, word);
    out.textContent = result.length
      ? `${word} → ${result.map(([token, p]) => `${token} ${(p * 100).toFixed(0)}%`).join(', ')}`
      : 'tidak ada contoh next token';
  };
  const button = node('button', { text: 'Coba context “model”' });
  button.addEventListener('click', () => show('model'));
  root.append(button);
  show('model');
  explain.textContent = 'Bigram ini model sangat kecil untuk memperlihatkan objective next-token.';
}

function renderTokenizer() {
  const area = node('textarea', { attrs: { rows: 3 } });
  area.value = 'AI belajar dari data!';
  root.append(area);
  const out = node('div', { className: 'tokens' });
  root.append(out);
  const update = () => {
    clear(out);
    simpleTokenize(area.value).forEach((token, index) => {
      out.append(node('span', { className: 'token', text: `${index}: ${token}` }));
    });
  };
  area.addEventListener('input', update);
  update();
  explain.textContent = 'Tokenizer pedagogis berbasis pola Unicode, bukan tokenizer model komersial.';
}

function renderEmbedding() {
  let x = 0.8;
  let y = 0.2;
  const out = node('div', { className: 'big' });
  root.append(out);
  const update = () => {
    out.textContent = `cosine([${x.toFixed(1)},${y.toFixed(1)}],[1,0]) = ${cosineSimilarity([x,y],[1,0]).toFixed(3)}`;
  };
  slider('vector x', -1, 1, 0.1, x, value => { x = value; update(); });
  slider('vector y', -1, 1, 0.1, y, value => { y = value; update(); });
  update();
}

function renderPosition() {
  let position = 0;
  const out = node('div', { className: 'big' });
  root.append(out);
  const update = () => {
    out.textContent = `same token + position ${position} → toy vector [${(1 + position * 0.1).toFixed(1)}, ${(0.5 - position * 0.03).toFixed(2)}]`;
  };
  slider('position', 0, 12, 1, position, value => { position = value; update(); });
  update();
}

function renderAttention() {
  let q1 = 1;
  let q2 = 0;
  const out = node('div');
  root.append(out);
  const update = () => {
    clear(out);
    const weights = attentionWeights([q1,q2], [[1,0],[0.5,0.5],[0,1]]);
    probabilityStrip(['token A','token B','token C'], weights, out);
  };
  slider('query dim 1', -2, 2, 0.1, q1, value => { q1 = value; update(); });
  slider('query dim 2', -2, 2, 0.1, q2, value => { q2 = value; update(); });
  update();
}

function renderCausalMask() {
  let size = 5;
  const box = node('div', { className: 'heatmap' });
  root.append(box);
  const draw = () => {
    clear(box);
    causalMask(size).forEach((rowValues, rowIndex) => {
      const row = node('div', { className: 'heat-row' });
      rowValues.forEach((value, columnIndex) => {
        row.append(node('span', {
          className: 'heat',
          text: value === -Infinity ? 'BLOCK' : 'ALLOW',
          attrs: { title: `query ${rowIndex} key ${columnIndex}` },
        }));
      });
      box.append(row);
    });
  };
  slider('sequence length', 2, 7, 1, size, value => { size = value; draw(); });
  draw();
}

function renderLoss() {
  let probability = 0.55;
  const out = node('div', { className: 'big' });
  root.append(out);
  const update = () => {
    out.textContent = `target probability ${probability.toFixed(2)} → cross entropy ${crossEntropy([probability,1-probability], 0).toFixed(3)}`;
  };
  slider('target probability', 0.05, 0.99, 0.01, probability, value => { probability = value; update(); });
  update();
  explain.textContent = 'Semakin tinggi probability target benar, semakin rendah loss.';
}

function renderDecoding() {
  let temperature = 1;
  const labels = ['data','server','model','kopi'];
  const logits = [3,2.2,1.5,0.5];
  const out = node('div');
  root.append(out);
  const update = () => {
    clear(out);
    probabilityStrip(labels, temperatureScale(logits, temperature), out);
    const top = topK(logits, 2);
    explain.textContent = `Top-2 kandidat menurut logit: ${top.indices.map(index => labels[index]).join(', ')}.`;
  };
  slider('temperature', 0.2, 2, 0.1, temperature, value => { temperature = value; update(); });
  update();
}

function renderTrainingStage() {
  tokenStrip(['Base behavior','Task/preference examples','Updated behavior']);
  explain.textContent = id === '12'
    ? 'Objective dan format data menentukan perilaku yang ditekankan saat fine-tuning.'
    : 'Preference stage membandingkan perilaku yang lebih/kurang disukai; ini overview, bukan training RL di browser.';
}

function renderCapstone() {
  const prompt = node('textarea', { attrs: { rows: 2 } });
  prompt.value = 'capacity power naik';
  root.append(prompt);
  const out = node('div');
  root.append(out);
  const update = () => {
    clear(out);
    tokenStrip(simpleTokenize(prompt.value), out);
    probabilityStrip(['next aman','next perlu','next cek'], temperatureScale([2.5,1.7,0.8],0.8), out);
    explain.textContent = 'Trace toy: tokenizer + fixed illustrative logits. Tidak menjalankan model GPT sungguhan.';
  };
  prompt.addEventListener('input', update);
  update();
}

function render() {
  clear(root);
  if (id === '01') return renderLanguageModel();
  if (id === '02') return renderTokenizer();
  if (id === '03') return renderEmbedding();
  if (id === '04') return renderPosition();
  if (id === '05' || id === '06') return renderAttention();
  if (id === '07') return renderCausalMask();
  if (id === '08' || id === '09') {
    tokenStrip(cfg[id][0]);
    explain.textContent = id === '08'
      ? 'Transformer block mempertahankan shape sequence × d_model sambil mengubah representasinya.'
      : 'Forward pass menghasilkan logits untuk vocabulary; decoding yang kemudian memilih token.';
    return;
  }
  if (id === '10') return renderLoss();
  if (id === '11') return renderDecoding();
  if (id === '12' || id === '13') return renderTrainingStage();
  return renderCapstone();
}

const current = cfg[id];
for (const item of current[0]) document.getElementById('mentalFlow').append(node('span', { text: item }));
document.getElementById('failureText').textContent = current[1];
document.getElementById('checkpointText').textContent = current[2];
document.getElementById('checkpointAnswer').textContent = current[3];
document.getElementById('revealCheckpoint').addEventListener('click', () => {
  document.getElementById('checkpointAnswer').hidden = false;
});

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).innerText);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Copy gagal';
    }
  });
});

render();
