# XUI Components ✦

The official open-source component registry for [XUI](https://xui.dev) — high-performance kinetic UI components ready to drop into modern web applications.

## 🚀 Quick Install (CLI)

Install any component directly into your project with a single command:

```bash
npx xui add <component-name>
```

Example:

```bash
npx xui add dynamic-floating-dock
```

This will:
1. Detect your package manager (`npm`, `pnpm`, `yarn`, `bun`).
2. Automatically install required dependencies (e.g. `lucide-react`, `motion`).
3. Place the clean, self-contained component into `components/xui/<ComponentName>.tsx`.

---

## 📦 Available Components

| Component | Category | CLI Command |
| :--- | :--- | :--- |
| **Floating Liquid Dock** | `Navbar` | `npx xui add dynamic-floating-dock` |

---

## 🛠 Registry Structure

```text
XUI-components-/
├── registry.json                 # Master registry catalog
└── components/
    └── <component-name>/
        ├── index.tsx             # Source React / Tailwind component
        └── meta.json             # Dependencies & metadata
```

## 📜 License

MIT License © 2026 [XUI](https://xui.dev)
