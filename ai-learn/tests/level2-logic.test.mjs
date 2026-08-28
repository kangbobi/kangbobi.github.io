import test from 'node:test';
import assert from 'node:assert/strict';
import { neuron, activate, denseForward, mse, backpropSingle, matmul, sgdStep } from '../level-2/logic.mjs';
test('neuron computes weighted sum and activation',()=>{assert.equal(neuron([2,3],[0.5,-1],1,'relu'),0);assert.equal(neuron([2,3],[1,1],-1,'relu'),4)});
test('activation functions behave at known points',()=>{assert.equal(activate('relu',-2),0);assert.equal(activate('sigmoid',0),0.5);assert.equal(Number(activate('tanh',0).toFixed(6)),0)});
test('denseForward computes one hidden layer',()=>assert.deepEqual(denseForward([1,2],[[1,0],[0,1]],[0,0],'relu'),[1,2]));
test('mse and backpropSingle expose gradients',()=>{assert.equal(mse([2],[4]),4);const g=backpropSingle({x:2,y:10,w:1,b:0});assert.equal(g.prediction,2);assert.equal(g.dw,-32);assert.equal(g.db,-16)});
test('matmul checks dimensions and multiplies matrices',()=>{assert.deepEqual(matmul([[1,2]],[[3],[4]]),[[11]]);assert.throws(()=>matmul([[1,2]],[[1,2]]))});
test('sgdStep updates parameter opposite gradient',()=>assert.deepEqual(sgdStep([1,2],[0.5,-1],0.1),[0.95,2.1]));
