import test from 'node:test';import assert from 'node:assert/strict';import {softmax,dot,cosineSimilarity,causalMask,attentionWeights,crossEntropy,topK,temperatureScale,simpleTokenize,bigramNext} from '../level-3/logic.mjs';
test('softmax normalizes logits',()=>{const p=softmax([0,0]);assert.deepEqual(p,[.5,.5]);assert.equal(Number(p.reduce((a,b)=>a+b,0).toFixed(6)),1)});
test('dot and cosine similarity expose vector relations',()=>{assert.equal(dot([1,2],[3,4]),11);assert.equal(cosineSimilarity([1,0],[0,1]),0);assert.equal(cosineSimilarity([1,0],[2,0]),1)});
test('causalMask blocks future positions',()=>assert.deepEqual(causalMask(3),[[0,-Infinity,-Infinity],[0,0,-Infinity],[0,0,0]]));
test('attention weights normalize allowed keys',()=>{const w=attentionWeights([1,0],[[1,0],[0,1]]);assert.ok(w[0]>w[1]);assert.equal(Number(w.reduce((a,b)=>a+b,0).toFixed(6)),1)});
test('cross entropy is lower for high target probability',()=>assert.ok(crossEntropy([.9,.1],0)<crossEntropy([.6,.4],0)));
test('temperature and top-k reshape distribution',()=>{assert.deepEqual(topK([1,4,2],2).indices,[1,2]);assert.deepEqual(temperatureScale([2,1],1),softmax([2,1]))});
test('toy tokenizer and bigram model are deterministic',()=>{assert.deepEqual(simpleTokenize('AI belajar!'),['AI','belajar','!']);assert.deepEqual(bigramNext(['a','b','a'],'a'),[['b',1]])});
