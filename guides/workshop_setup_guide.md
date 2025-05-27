# 🛠️ Complete Setup Guide
## Design-to-Code Workshop Installation & Configuration

> **Get your development environment ready for AI-powered design-to-code conversion**

---

## 📋 Prerequisites Checklist

### Required Software
- [ ] **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- [ ] **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- [ ] **Git** (v2.34.0 or higher) - [Download](https://git-scm.com/)
- [ ] **VS Code** (latest version) - [Download](https://code.visualstudio.com/)

### Required Accounts & Services
- [ ] **GitHub Account** with Copilot subscription - [Get Copilot](https://github.com/features/copilot)
- [ ] **Figma Account** (free) - [Sign up](https://figma.com/)
- [ ] **Vercel Account** (optional, for deployment) - [Sign up](https://vercel.com/)

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 8GB, Recommended 16GB
- **Storage**: At least 5GB free space
- **Internet**: Stable connection for AI features

---

## 🚀 Quick Installation

### Option 1: Automated Setup (Recommended)
```bash
# Run the setup script
curl -fsSL https://raw.githubusercontent.com/design-to-code-workshop/main/scripts/setup.sh | bash

# Or with PowerShell on Windows
iwr -useb https://raw.githubusercontent.com/design-to-code-workshop/main/scripts/setup.ps1 | iex
```

### Option 2: Manual Setup
```bash
# 1. Clone the repository
git clone https://github.com/design-to-code-workshop/design-to-code-workshop.git
cd design-to-code-workshop

# 2. Install global dependencies
npm install -g create-react-app @modelcontextprotocol/cli typescript

# 3. Install workshop dependencies
npm install

# 4. Run setup verification
npm run setup:verify
```

---

## 🔧 VS Code Configuration

### Required Extensions
Install these extensions in VS Code:

```bash
# Install via command line
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-json
```

### VS Code Settings
Create `.vscode/settings.json` in your workspace:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": true
  },
  "github.copilot.advanced": {
    "debug.overrideEngine": "codex"
  }
}
```

### Recommended Extensions (Optional)
```bash
code --install-extension ms-vscode.vscode-react-native
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vscode.vscode-color-info
```

---

## 🔑 Environment Configuration

### Create Environment Files

#### Global Environment (.env)
```bash
# Copy the example file
cp .env.example .env
```

```env
# GitHub Copilot
GITHUB_TOKEN=your_github_personal_access_token

# Figma API (Optional - for advanced features)
FIGMA_ACCESS_TOKEN=your_figma_access_token

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=your_ga_id

# Error Tracking (Optional)
SENTRY_DSN=your_sentry_dsn
```

#### Scenario-Specific Environment

**E-commerce (.env.local)**
```env
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
REACT_APP_API_URL=http://localhost:3001/api
```

**SaaS Dashboard (.env.local)**
```env
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_API_URL=https://api.cloudsync.demo
```

**Travel Platform (.env.local)**
```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_GOOGLE_PLACES_KEY=your_google_places_key
```

### API Keys Setup Guide

#### 1. GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:user`, `user:email`
4. Copy the token to your `.env` file

#### 2. Figma Access Token (Optional)
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Copy the token to your `.env` file

#### 3. Mapbox Token (For Travel Scenario)
1. Sign up at [Mapbox](https://account.mapbox.com/)
2. Go to "Access tokens" page
3. Copy the default public token
4. Add to travel scenario `.env.local`

---

## 📦 Package Dependencies

### Core Dependencies Installation
```bash
# Navigate to specific scenario
cd scenario-1-ecommerce

# Install dependencies
npm install

# Or install all scenarios at once
npm run install:all
```

### Common Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "styled-components": "^6.0.0",
    "framer-motion": "^10.0.0",
    "@tanstack/react-query": "^4.0.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/styled-components": "^5.1.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 🐳 Docker Setup (Optional)

### Using Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  workshop:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
      - "3002:3002"
      - "3003:3003"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev:all
```

```bash
# Start all scenarios with Docker
docker-compose up

# Or individual scenario
docker-compose run --service-ports ecommerce npm start
```

---

## ✅ Verification & Testing

### Run Setup Verification
```bash
# Verify entire setup
npm run setup:verify

# Test individual components
npm run test:copilot    # Test GitHub Copilot integration
npm run test:figma      # Test Figma API connection
npm run test:build      # Test build process
npm run test:lint       # Test code quality
```

### Expected Output
```bash
✅ Node.js version: 18.17.0
✅ npm version: 9.6.7
✅ GitHub Copilot: Connected
✅ VS Code Extensions: All installed
✅ Environment variables: Configured
✅ Dependencies: Installed
✅ Build process: Working
🎉 Setup complete! Ready for workshop.
```

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### Issue: GitHub Copilot not working
```bash
# Solution 1: Check authentication
gh auth login

# Solution 2: Reload VS Code
# Ctrl+Shift+P > "Developer: Reload Window"

# Solution 3: Check subscription
# Visit https://github.com/settings/copilot
```

#### Issue: npm install failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use different registry
npm install --registry https://registry.npmjs.org/
```

#### Issue: Port conflicts
```bash
# Check which processes are using ports
lsof -i :3000
lsof -i :3001

# Kill processes if needed
kill -9 <PID>

# Or use different ports
npm start -- --port 3010
```

#### Issue: TypeScript errors
```bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P > "TypeScript: Restart TS Server"

# Update TypeScript
npm install -g typescript@latest
```

---

## 🔄 Updates & Maintenance

### Keep Workshop Updated
```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm run update:all

# Verify everything still works
npm run setup:verify
```

### Version Management
```bash
# Check current version
npm run version

# Update to specific version
git checkout v2.1.0
npm install
```

---

## 🎯 Next Steps

### After Setup is Complete:

1. **Choose Your Scenario**
   ```bash
   # E-commerce Product Page
   cd scenario-1-ecommerce && npm start
   
   # SaaS Dashboard  
   cd scenario-2-saas && npm run dev
   
   # Agency Portfolio
   cd scenario-3-agency && npm start
   
   # Travel Platform
   cd scenario-4-travel && npm start
   ```

2. **Open the Workshop Guide**
   - Read the scenario-specific README
   - Follow the step-by-step instructions
   - Use the provided Copilot prompts

---

## 🆘 Getting Help

### Support Channels
- 🐛 **GitHub Issues**: For bugs and feature requests

### Before Asking for Help
1. Check this setup guide thoroughly
2. Review the troubleshooting section
3. Search existing GitHub issues
4. Include your system info and error messages

---

*Last Updated: May 2025*  
*Testing Guide Version: 2.0*

---

## 🎯 What's Next?

**Setup complete!** Now let's start building amazing projects:

**[→ Continue to Demo Setup Guide](demo-setup-guide.md)**

---

## 🗺️ Workshop Navigation

- **← Previous**: [Main README](../README.md)
- **→ Next**: [Demo Setup Guide](demo-setup-guide.md)
- **Alternative**: [Docker Setup](docker_setup_guide.md) (optional)
- **Help**: [FAQ](faq_guide.md) | [Troubleshooting](#troubleshooting)

---

**✨ You're all set! Time to experience the future of development with AI.**
