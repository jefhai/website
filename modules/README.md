# Website modules

Each tool is stored as a submodule at `modules/<module-name>`.

To appear on the main page, a module provides this standard integration folder:

```text
site/
  card.html
  card.css
```

The card markup must have a single root element. Its stylesheet should scope every selector beneath a unique `data-module-card="<module-name>"` attribute so module styles cannot leak into the host page or neighboring cards.

Add a module's folder name to the `data-module-cards` attribute in the main page. `load-cards.js` then loads that module's markup and stylesheet in the listed order.
