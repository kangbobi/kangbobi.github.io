export function validatePublishedFiles(manifest, exists) {
  const missing = [];
  for (const level of manifest) {
    for (const module of level.modules) {
      if (!module.published) continue;
      if (!exists(module.href)) missing.push(module.href);
    }
  }
  return missing;
}
