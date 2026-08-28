const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const safeRatio = (numerator, denominator) => denominator === 0 ? 0 : numerator / denominator;
const round = (value, digits = 6) => Number(value.toFixed(digits));

export function gradientStep({ x, y, weight, bias, learningRate }) {
  const prediction = weight * x + bias;
  const error = prediction - y;
  const lossBefore = error ** 2;
  const weightGradient = 2 * error * x;
  const biasGradient = 2 * error;
  const nextWeight = weight - learningRate * weightGradient;
  const nextBias = bias - learningRate * biasGradient;
  const nextPrediction = nextWeight * x + nextBias;
  const nextError = nextPrediction - y;

  return {
    prediction: round(prediction),
    error: round(error),
    lossBefore: round(lossBefore),
    weightGradient: round(weightGradient),
    biasGradient: round(biasGradient),
    weight: round(nextWeight),
    bias: round(nextBias),
    lossAfter: round(nextError ** 2),
  };
}

export function sigmoid(score) {
  return 1 / (1 + Math.exp(-score));
}

export function classifyProbability(score, threshold = 0.5) {
  const probability = sigmoid(score);
  return {
    probability: round(probability),
    threshold,
    label: probability >= threshold ? 1 : 0,
  };
}

export function forestVote(votes) {
  const positive = votes.filter(vote => vote === 1).length;
  const negative = votes.length - positive;
  return { label: positive >= negative ? 1 : 0, positive, negative };
}

export function minMaxScale(value, min, max) {
  if (max === min) return 0;
  return round(clamp((value - min) / (max - min)));
}

export function confusionMetrics({ tp, fp, fn, tn }) {
  const precision = safeRatio(tp, tp + fp);
  const recall = safeRatio(tp, tp + fn);
  const accuracy = safeRatio(tp + tn, tp + fp + fn + tn);
  const f1 = safeRatio(2 * precision * recall, precision + recall);
  return {
    precision: round(precision),
    recall: round(recall),
    accuracy: round(accuracy),
    f1: round(f1),
  };
}

export function operationalRisk({ temperature, humidity, activeCrac, itLoad }) {
  const temperatureRisk = clamp((temperature - 22) / 15) * 0.35;
  const humidityRisk = clamp((humidity - 50) / 35) * 0.15;
  const cracRisk = clamp((8 - activeCrac) / 4) * 0.30;
  const loadRisk = clamp((itLoad - 250) / 300) * 0.20;
  const score = round(temperatureRisk + humidityRisk + cracRisk + loadRisk, 3);
  const band = score < 0.35 ? 'low' : score < 0.65 ? 'medium' : 'high';
  return { score, band };
}
