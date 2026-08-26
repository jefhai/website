const moduleList = document.querySelector("[data-module-cards]");

async function loadModuleCard(moduleName) {
  const moduleRoot = new URL(`./${encodeURIComponent(moduleName)}/site/`, import.meta.url);
  const response = await fetch(new URL("card.html", moduleRoot));

  if (!response.ok) {
    throw new Error(`Could not load the ${moduleName} module card.`);
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("card.css", moduleRoot).href;
  stylesheet.dataset.moduleCardStyles = moduleName;
  document.head.append(stylesheet);

  const template = document.createElement("template");
  template.innerHTML = (await response.text()).trim();
  moduleList.append(template.content);
}

if (moduleList) {
  const moduleNames = moduleList.dataset.moduleCards
    .split(/\s+/)
    .map((name) => name.trim())
    .filter(Boolean);

  moduleList.setAttribute("aria-busy", "true");

  for (const moduleName of moduleNames) {
    try {
      await loadModuleCard(moduleName);
    } catch (error) {
      console.error(error);
    }
  }

  moduleList.removeAttribute("aria-busy");
}
