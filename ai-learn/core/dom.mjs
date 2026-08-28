export function node(tag, { className = '', text = '', attrs = {}, children = [] } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  for (const [name, value] of Object.entries(attrs)) {
    if (value !== null && value !== undefined) el.setAttribute(name, String(value));
  }
  for (const child of children) if (child) el.append(child);
  return el;
}

export function clear(target) {
  if (target) target.replaceChildren();
  return target;
}

export function safeHref(value, fallback = './') {
  return typeof value === 'string' && !/^javascript:/i.test(value) ? value : fallback;
}
