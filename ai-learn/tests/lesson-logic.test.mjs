import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyProbability,
  confusionMetrics,
  forestVote,
  gradientStep,
  minMaxScale,
  operationalRisk,
  sigmoid,
} from '../lesson-logic.mjs';

test('gradientStep moves weight toward lower squared error', () => {
  const result = gradientStep({ x: 2, y: 10, weight: 1, bias: 0, learningRate: 0.1 });
  assert.equal(result.prediction, 2);
  assert.equal(result.error, -8);
  assert.ok(result.weight > 1);
  assert.ok(result.lossAfter < result.lossBefore);
});

test('sigmoid and classifyProbability convert a score into thresholded probability', () => {
  assert.equal(sigmoid(0), 0.5);
  assert.equal(classifyProbability(0, 0.5).label, 1);
  assert.equal(classifyProbability(-2, 0.5).label, 0);
});

test('forestVote returns majority class and vote counts', () => {
  assert.deepEqual(forestVote([1, 0, 1, 1, 0]), { label: 1, positive: 3, negative: 2 });
});

test('minMaxScale maps a value into zero-to-one range', () => {
  assert.equal(minMaxScale(50, 0, 100), 0.5);
  assert.equal(minMaxScale(20, 20, 20), 0);
});

test('confusionMetrics calculates precision recall accuracy and f1', () => {
  const m = confusionMetrics({ tp: 8, fp: 2, fn: 2, tn: 8 });
  assert.equal(m.precision, 0.8);
  assert.equal(m.recall, 0.8);
  assert.equal(m.accuracy, 0.8);
  assert.equal(m.f1, 0.8);
});

test('operationalRisk increases with hotter temperature and fewer active CRAC units', () => {
  const normal = operationalRisk({ temperature: 24, humidity: 55, activeCrac: 8, itLoad: 300 });
  const stressed = operationalRisk({ temperature: 34, humidity: 75, activeCrac: 5, itLoad: 450 });
  assert.ok(stressed.score > normal.score);
  assert.equal(normal.band, 'low');
  assert.ok(['medium', 'high'].includes(stressed.band));
});
