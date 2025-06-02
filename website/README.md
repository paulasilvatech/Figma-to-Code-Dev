# Figma to Code AI Workshop - Website

Landing page para o workshop Figma to Code AI.

## 🚀 Setup Rápido

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Deploy local
npm run deploy
```

## 📋 Requisitos

- Node.js 18+
- npm ou yarn
- Navegador moderno

## 🛠️ Tecnologias

- React 18
- TailwindCSS
- Lucide React (ícones)
- PostCSS

## 📁 Estrutura

```
website/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── figma-to-code-landing-yellow.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design

O design segue o template amarelo/âmbar com:
- Layout responsivo
- Animações fluidas
- Tipografia moderna (Inter)
- Acessibilidade otimizada

## 📦 Deploy

### Deploy Automático via GitHub Actions

O deploy é feito automaticamente via GitHub Actions para GitHub Pages:

1. **Push para main branch** - Triggers automático do workflow
2. **Deploy URL**: https://paulasilvatech.github.io/Figma-to-Code-Dev
3. **Workflow**: `.github/workflows/deploy-website.yml`

### Deploy Manual Local

Para testar localmente:

```bash
npm run build
npm run deploy
```

### Configuração GitHub Pages

1. Ir para Settings > Pages no repositório
2. Source: GitHub Actions
3. O workflow irá fazer deploy automaticamente