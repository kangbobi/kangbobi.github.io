import test from 'node:test';import assert from 'node:assert/strict';import {majorityVote,bestOfN,relativeAdvantages,policyUpdateToy,budgetCurve,judgeAgreement,distillationBlend} from '../level-4/logic.mjs';
test('majorityVote returns winning answer and counts',()=>assert.deepEqual(majorityVote(['A','B','A']),{winner:'A',counts:{A:2,B:1}}));
test('bestOfN selects highest score',()=>assert.deepEqual(bestOfN([{id:'a',score:.2},{id:'b',score:.9}]),{id:'b',score:.9}));
test('relativeAdvantages centers rewards around group mean',()=>assert.deepEqual(relativeAdvantages([1,2,3]),[-1,0,1]));
test('policyUpdateToy increases probability for positive advantage',()=>assert.ok(policyUpdateToy(.4,.5,.2)>.4));
test('budgetCurve improves then saturates',()=>{const c=budgetCurve(6,.4);assert.ok(c[1]>c[0]);assert.ok(c[5]-c[4]<c[1]-c[0])});
test('judgeAgreement computes agreement',()=>assert.equal(judgeAgreement(['A','B','A'],['A','A','A']),2/3));
test('distillation blend moves student toward teacher',()=>assert.equal(distillationBlend(.2,.8,.5),.5));
