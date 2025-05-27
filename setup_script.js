#!/usr/bin/env node

/**
 * Design-to-Code Workshop - Automated Setup Script
 * This script handles the complete setup of the workshop environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

// Configuration
const SCENARIOS = [
  {
    name: 'E-commerce Product Page',
    folder: 'scenario-1-ecommerce',
    template: 'create-react-app',
    port: 3000,
    description: 'Nike Air Max product page with React + TypeScript'
  },
  {
    name: 'SaaS Dashboard',
    folder: 'scenario-2-saas',
    template: 'next',
    port: 3001,
    description: 'CloudSync analytics dashboard with Next.js'
  },
  {
    name: 'Agency Portfolio',
    folder: 'scenario-3-agency',
    template: 'gatsby',
    port: 3002,
    description: 'Nexus Creative portfolio with Gatsby + animations'
  },
  {
    name: 'Travel Platform',
    folder: 'scenario-4-travel',
    template: 'vite',
    port: 3003,
    description: 'TravelWise booking platform with Vue.js'
  }
];

const REQUIRED_TOOLS = {
  node: { min: '18.0.0', cmd: 'node --version' },
  npm: { min: '8.0.0', cmd: 'npm --version' },
  git: { min: '2.0.0', cmd: 'git --version' }
};

// Utility functions
const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  title: (msg) => console.log(chalk.cyan.bold(`\n🚀 ${msg}\n`))
};

const spinner = (text) => ora({ text, color: 'cyan' });

function checkVersion(current, required) {
  const currentParts = current.replace(/[^\d.]/g, '').split('.').map(Number);
  const requiredParts = required.split('.').map(Number);
  
  for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
    const curr = currentParts[i] || 0;
    const req = requiredParts[i] || 0;
    
    if (curr > req) return true;
    if (curr < req) return false;
  }
  return true;
}

function checkPrerequisites() {
  log.title('Checking Prerequisites');
  
  let allGood = true;
  
  for (const [tool, config] of Object.entries(REQUIRED_TOOLS)) {
    try {
      const version = execSync(config.cmd, { encoding: 'utf8' }).trim();
      const versionNumber = version.match(/\d+\.\d+\.\d+/)?.[0];
      
      if (!versionNumber) {
        log.error(`${tool}: Could not detect version`);
        allGood = false;
        continue;
      }
      
      if (checkVersion(versionNumber, config.min)) {
        log.success(`${tool}: ${version} (✓ >= ${config.min})`);
      } else {
        log.error(`${tool}: ${version} (✗ requires >= ${config.min})`);
        allGood = false;
      }
    } catch (error) {
      log.error(`${tool}: Not installed`);
      allGood = false;
    }
  }
  
  if (!allGood) {
    log.error('\nPlease install the required tools before continuing.');
    log.info('Installation guides:');
    log.info('• Node.js 18+: https://nodejs.org/');
    log.info('• Git: https://git-scm.com/downloads');
    process.exit(1);
  }
  
  return true;
}

function checkVSCode() {
  try {
    execSync('code --version', { stdio: 'ignore' });
    log.success('VS Code: Installed');
    return true;
  } catch {
    log.warning('VS Code: Not found in PATH (optional but recommended)');
    return false;
  }
}

function checkDockerAndCopilot() {
  let docker = false;
  let copilot = false;
  
  try {
    execSync('docker --version', { stdio: 'ignore' });
    execSync('docker-compose --version', { stdio: 'ignore' });
    docker = true;
    log.success('Docker: Installed and ready');
  } catch {
    log.warning('Docker: Not installed (optional - enables container development)');
  }
  
  try {
    const extensions = execSync('code --list-extensions', { encoding: 'utf8' });
    if (extensions.includes('github.copilot')) {
      copilot = true;
      log.success('GitHub Copilot: Extension installed');
    } else {
      log.warning('GitHub Copilot: Extension not found');
    }
  } catch {
    log.warning('Cannot check VS Code extensions');
  }
  
  return { docker, copilot };
}

async function selectScenarios() {
  log.title('Select Workshop Scenarios');
  
  const { selectedScenarios } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedScenarios',
      message: 'Which scenarios would you like to set up?',
      choices: SCENARIOS.map(scenario => ({
        name: `${scenario.name} - ${scenario.description}`,
        value: scenario,
        checked: true
      })),
      validate: (answer) => {
        if (answer.length === 0) {
          return 'Please select at least one scenario.';
        }
        return true;
      }
    }
  ]);
  
  return selectedScenarios;
}

function createProjectStructure() {
  log.title('Creating Project Structure');
  
  const directories = [
    'docs',
    'scripts',
    'shared-services/api',
    'shared-services/auth',
    'shared-services/database',
    'mock-data',
    'reports',
    '.github/workflows'
  ];
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      log.success(`Created directory: ${dir}`);
    }
  });
}

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const examplePath = path.join(process.cwd(), '.env.example');
  
  if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    log.success('Created .env file from .env.example');
    log.warning('⚠️  Please update .env with your actual API keys and tokens');
  }
}

async function setupScenario(scenario) {
  const loadingSpinner = spinner(`Setting up ${scenario.name}...`);
  loadingSpinner.start();
  
  try {
    const scenarioPath = path.join(process.cwd(), scenario.folder);
    
    // Create scenario directory if it doesn't exist
    if (!fs.existsSync(scenarioPath)) {
      fs.mkdirSync(scenarioPath, { recursive: true });
    }
    
    // Setup based on template type
    switch (scenario.template) {
      case 'create-react-app':
        if (!fs.existsSync(path.join(scenarioPath, 'package.json'))) {
          execSync(`npx create-react-app@latest ${scenario.folder} --template typescript`, {
            stdio: 'ignore',
            cwd: process.cwd()
          });
          
          // Install additional dependencies
          execSync('npm install styled-components framer-motion axios react-query', {
            stdio: 'ignore',
            cwd: scenarioPath
          });
        }
        break;
        
      case 'next':
        if (!fs.existsSync(path.join(scenarioPath, 'package.json'))) {
          execSync(`npx create-next-app@latest ${scenario.folder} --typescript --tailwind --eslint --app`, {
            stdio: 'ignore',
            cwd: process.cwd()
          });
          
          // Install additional dependencies
          execSync('npm install recharts @tanstack/react-query styled-components', {
            stdio: 'ignore',
            cwd: scenarioPath
          });
        }
        break;
        
      case 'gatsby':
        if (!fs.existsSync(path.join(scenarioPath, 'package.json'))) {
          execSync(`npx gatsby new ${scenario.folder} https://github.com/gatsbyjs/gatsby-starter-default`, {
            stdio: 'ignore',
            cwd: process.cwd()
          });
          
          // Install additional dependencies
          execSync('npm install framer-motion react-spring gsap styled-components', {
            stdio: 'ignore',
            cwd: scenarioPath
          });
        }
        break;
        
      case 'vite':
        if (!fs.existsSync(path.join(scenarioPath, 'package.json'))) {
          execSync(`npm create vue@latest ${scenario.folder} -- --typescript --router --pinia`, {
            stdio: 'ignore',
            cwd: process.cwd()
          });
          
          // Install additional dependencies
          execSync('npm install axios @vueuse/core', {
            stdio: 'ignore',
            cwd: scenarioPath
          });
        }
        break;
    }
    
    // Copy mock data
    const mockDataSource = path.join(__dirname, '..', 'mock-data', `${scenario.folder}.json`);
    const mockDataDest = path.join(scenarioPath, 'src', 'data', 'mockData.json');
    
    if (fs.existsSync(mockDataSource)) {
      const destDir = path.dirname(mockDataDest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(mockDataSource, mockDataDest);
    }
    
    loadingSpinner.succeed(`${scenario.name} setup complete`);
    
  } catch (error) {
    loadingSpinner.fail(`Failed to setup ${scenario.name}: ${error.message}`);
    throw error;
  }
}

function generateGitHubWorkflows() {
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
  
  const ciWorkflow = `
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
        scenario: [scenario-1-ecommerce, scenario-2-saas, scenario-3-agency, scenario-4-travel]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        cd \${{ matrix.scenario }} && npm ci
    
    - name: Run linting
      run: cd \${{ matrix.scenario }} && npm run lint
    
    - name: Run tests
      run: cd \${{ matrix.scenario }} && npm test -- --coverage --watchAll=false
    
    - name: Build project
      run: cd \${{ matrix.scenario }} && npm run build
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        directory: \${{ matrix.scenario }}/coverage
        
  lighthouse:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build all scenarios
      run: npm run build:all
      
    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.12.x
        lhci autorun
`.trim();

  fs.writeFileSync(path.join(workflowsDir, 'ci.yml'), ciWorkflow);
  log.success('Created GitHub CI/CD workflow');
}

function displayNextSteps() {
  log.title('Setup Complete! 🎉');
  
  console.log(chalk.green('✨ Your Design-to-Code Workshop is ready!\n'));
  
  console.log(chalk.cyan('📚 Next Steps:\n'));
  console.log('1. Configure your environment:');
  console.log(chalk.gray('   • Update .env file with your API keys'));
  console.log(chalk.gray('   • Install GitHub Copilot extension if not already installed'));
  console.log(chalk.gray('   • Sign in to GitHub Copilot in VS Code\n'));
  
  console.log('2. Start development:');
  console.log(chalk.gray('   • Run "npm run dev" to start all scenarios'));
  console.log(chalk.gray('   • Or run individual scenarios: "npm run dev:ecommerce"\n'));
  
  console.log('3. Learn and explore:');
  console.log(chalk.gray('   • Read README.md for workshop overview'));
  console.log(chalk.gray('   • Check PROMPTS.md for GitHub Copilot tips'));
  console.log(chalk.gray('   • Follow the step-by-step guides in docs/\n'));
  
  console.log(chalk.yellow('🔗 Quick Links:'));
  console.log(chalk.gray('   • Workshop Site: https://design-to-code.dev'));
  console.log(chalk.gray('   • Documentation: ./docs/'));
  console.log(chalk.gray('   • FAQ: ./FAQ.md'));
  console.log(chalk.gray('   • Troubleshooting: ./TROUBLESHOOTING.md\n'));
  
  console.log(chalk.magenta('🚀 Ready to start coding with AI? Run: npm run dev'));
}

// Main execution
async function main() {
  try {
    console.log(chalk.cyan.bold('\n🎨 Design-to-Code Workshop Setup\n'));
    console.log(chalk.gray('Setting up your AI-powered development environment...\n'));
    
    // Step 1: Check prerequisites
    checkPrerequisites();
    
    // Step 2: Check optional tools
    const hasVSCode = checkVSCode();
    const { docker, copilot } = checkDockerAndCopilot();
    
    // Step 3: Select scenarios
    const selectedScenarios = await selectScenarios();
    
    // Step 4: Create project structure
    createProjectStructure();
    
    // Step 5: Create .env file
    createEnvFile();
    
    // Step 6: Setup each scenario
    for (const scenario of selectedScenarios) {
      await setupScenario(scenario);
    }
    
    // Step 7: Generate CI/CD workflows
    generateGitHubWorkflows();
    
    // Step 8: Display next steps
    displayNextSteps();
    
  } catch (error) {
    log.error(`Setup failed: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkPrerequisites, setupScenario, SCENARIOS };