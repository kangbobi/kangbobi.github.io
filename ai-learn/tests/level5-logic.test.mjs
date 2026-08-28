import test from 'node:test';import assert from 'node:assert/strict';import {cosineSimilarity,rankDocuments,validateObject,authorizeTool,agentStop,evaluateBinary,routeModel,traceRag} from '../level-5/logic.mjs';
test('cosine and retrieval ranking sort best match',()=>{assert.equal(cosineSimilarity([1,0],[1,0]),1);assert.equal(rankDocuments([1,0],[{id:'a',vector:[.9,.1]},{id:'b',vector:[0,1]}])[0].id,'a')});
test('schema validator checks primitive types',()=>{assert.equal(validateObject({site:'JKT',risk:.8},{site:'string',risk:'number'}).ok,true);assert.equal(validateObject({site:4},{site:'string'}).ok,false)});
test('tool authorization requires allowlist',()=>{assert.equal(authorizeTool('read_metrics',['read_metrics']).allowed,true);assert.equal(authorizeTool('shutdown',['read_metrics']).allowed,false)});
test('agent stop obeys limits',()=>{assert.equal(agentStop({step:3,maxSteps:3,status:'working'}),true);assert.equal(agentStop({step:1,maxSteps:3,status:'working'}),false)});
test('binary evaluation computes metrics',()=>{const m=evaluateBinary([1,1,0,0],[1,0,1,0]);assert.equal(m.precision,.5);assert.equal(m.recall,.5)});
test('routing escalates high risk',()=>{assert.equal(routeModel({risk:.9,complexity:.8}).route,'strong+review');assert.equal(routeModel({risk:.1,complexity:.2}).route,'fast')});
test('RAG trace returns top evidence',()=>{const docs=[{id:'d1',vector:[1,0],text:'capacity power'},{id:'d2',vector:[0,1],text:'coffee'}];assert.equal(traceRag([1,0],docs,1).retrieved[0].id,'d1')});
