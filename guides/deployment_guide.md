# 🚀 Deployment Guide

## 📍 You Are Here

You've completed all demos! Now let's deploy your projects to production.

**Workshop Progress**: Setup ✓ → Demos ✓ → **Deployment** → Contributing

## Overview

Complete deployment guide for all workshop scenarios covering development, staging, and production environments with modern DevOps best practices.

---

## 🏗️ Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │     Staging     │    │   Production    │
│                 │    │                 │    │                 │
│ • Local Docker  │───▶│ • AWS/Vercel   │───▶│ • Multi-region  │
│ • Hot Reload    │    │ • Auto Deploy  │    │ • Load Balanced │
│ • Mock APIs     │    │ • E2E Testing  │    │ • CDN           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🎯 Quick Deployment

### Deploy All Scenarios

```bash
# Build all scenarios
npm run build:all

# Deploy to staging
npm run deploy:staging

# Deploy to production (requires approval)
npm run deploy:production
```

### Individual Scenario Deployment

```bash
# Deploy specific scenario
npm run deploy:ecommerce
npm run deploy:saas
npm run deploy:agency  
npm run deploy:travel
```

---

## 🌍 Platform-Specific Deployments

### Vercel Deployment

#### Setup Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

#### Deploy Commands
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy specific scenario
vercel --cwd scenario-1-ecommerce --prod
```

#### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "scenario-1-ecommerce/package.json",
      "use": "@vercel/node"
    },
    {
      "src": "scenario-2-saas/package.json", 
      "use": "@vercel/next"
    },
    {
      "src": "scenario-3-agency/package.json",
      "use": "@vercel/gatsby"
    },
    {
      "src": "scenario-4-travel/package.json",
      "use": "@vercel/vue"
    }
  ],
  "routes": [
    { "src": "/ecommerce/(.*)", "dest": "/scenario-1-ecommerce/$1" },
    { "src": "/dashboard/(.*)", "dest": "/scenario-2-saas/$1" },
    { "src": "/portfolio/(.*)", "dest": "/scenario-3-agency/$1" },
    { "src": "/travel/(.*)", "dest": "/scenario-4-travel/$1" }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Netlify Deployment

#### Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize project
netlify init
```

#### Configuration
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build:all"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

[[redirects]]
  from = "/ecommerce/*"
  to = "/scenario-1-ecommerce/:splat"
  status = 200

[[redirects]]
  from = "/dashboard/*"
  to = "/scenario-2-saas/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### AWS Deployment

#### S3 + CloudFront Setup
```bash
# Install AWS CLI
npm install -g aws-cli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://design-to-code-workshop

# Deploy to S3
npm run deploy:aws
```

#### AWS Infrastructure as Code
```yaml
# aws-infrastructure.yml (CloudFormation)
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Design-to-Code Workshop Infrastructure'

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: design-to-code-workshop
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt S3Bucket.DomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: ''
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
        Enabled: true
        DefaultRootObject: index.html
```

### Docker Deployment

#### Multi-stage Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build stage
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build:all

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose Production
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    build:
      context: .
      target: production
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    restart: unless-stopped
```

#### Kubernetes Deployment
```yaml
# k8s-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: design-to-code-workshop
spec:
  replicas: 3
  selector:
    matchLabels:
      app: design-to-code-workshop
  template:
    metadata:
      labels:
        app: design-to-code-workshop
    spec:
      containers:
      - name: web
        image: design-to-code-workshop:latest
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: design-to-code-service
spec:
  selector:
    app: design-to-code-workshop
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

---

## 🔧 Environment Configuration

### Environment Variables

#### Development (.env.development)
```bash
NODE_ENV=development
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WS_URL=ws://localhost:8001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GATSBY_API_URL=http://localhost:8000
VUE_APP_API_URL=http://localhost:8000

# Development only
REACT_APP_DEBUG=true
REACT_APP_MOCK_API=true
```

#### Staging (.env.staging)
```bash
NODE_ENV=staging
REACT_APP_API_URL=https://api-staging.design-to-code.dev
REACT_APP_WS_URL=wss://ws-staging.design-to-code.dev
NEXT_PUBLIC_SITE_URL=https://staging.design-to-code.dev
GATSBY_API_URL=https://api-staging.design-to-code.dev
VUE_APP_API_URL=https://api-staging.design-to-code.dev

# Analytics
REACT_APP_GA_ID=G-STAGING123
NEXT_PUBLIC_SENTRY_DSN=https://staging@sentry.io/project
```

#### Production (.env.production)
```bash
NODE_ENV=production
REACT_APP_API_URL=https://api.design-to-code.dev
REACT_APP_WS_URL=wss://ws.design-to-code.dev
NEXT_PUBLIC_SITE_URL=https://design-to-code.dev
GATSBY_API_URL=https://api.design-to-code.dev
VUE_APP_API_URL=https://api.design-to-code.dev

# Production Analytics
REACT_APP_GA_ID=G-PRODUCTION123
NEXT_PUBLIC_SENTRY_DSN=https://production@sentry.io/project

# Security
REACT_APP_ENABLE_HTTPS=true
REACT_APP_SECURITY_HEADERS=true
```

---

## 🚦 CI/CD Pipelines

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:all
    
    - name: Run linting
      run: npm run lint:all
    
    - name: Build projects
      run: npm run build:all

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Deploy to Staging
      run: npm run deploy:staging
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Deploy to Production
      run: npm run deploy:production
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
        
    - name: Notify Slack
      uses: 8398a7/action-slack@v3
      with:
        status: success
        text: '🚀 Production deployment successful!'
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Azure DevOps Pipeline

```yaml
# azure-pipelines.yml
trigger:
- main
- develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  nodeVersion: '18.x'

stages:
- stage: Build
  displayName: 'Build and Test'
  jobs:
  - job: BuildJob
    displayName: 'Build'
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: $(nodeVersion)
      displayName: 'Install Node.js'
    
    - script: |
        npm ci
        npm run build:all
        npm run test:all
      displayName: 'npm install, build and test'
    
    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: 'dist'
        ArtifactName: 'drop'

- stage: DeployStaging
  displayName: 'Deploy to Staging'
  dependsOn: Build
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/develop')
  jobs:
  - deployment: DeployStaging
    displayName: 'Deploy to Staging Environment'
    environment: 'staging'
    strategy:
      runOnce:
        deploy:
          steps:
          - script: npm run deploy:staging
            displayName: 'Deploy to Staging'

- stage: DeployProduction
  displayName: 'Deploy to Production'
  dependsOn: Build
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/main')
  jobs:
  - deployment: DeployProduction
    displayName: 'Deploy to Production Environment'
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - script: npm run deploy:production
            displayName: 'Deploy to Production'
```

---

## 📊 Monitoring & Observability

### Application Performance Monitoring

#### Sentry Configuration
```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
```

#### Google Analytics 4
```javascript
// analytics.js
import { gtag } from 'ga-gtag';

gtag('config', process.env.REACT_APP_GA_ID, {
  page_title: document.title,
  page_location: window.location.href
});

// Custom events
export const trackEvent = (action, category, label, value) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
```

### Infrastructure Monitoring

#### Uptime Monitoring
```javascript
// uptime-monitoring.js
const monitors = [
  {
    name: 'E-commerce Site',
    url: 'https://ecommerce.design-to-code.dev',
    interval: 60 // seconds
  },
  {
    name: 'SaaS Dashboard',
    url: 'https://dashboard.design-to-code.dev',
    interval: 30
  }
];

monitors.forEach(monitor => {
  setInterval(async () => {
    try {
      const response = await fetch(monitor.url);
      const status = response.ok ? 'up' : 'down';
      
      // Send to monitoring service
      await sendMetric({
        name: monitor.name,
        status,
        responseTime: response.headers.get('X-Response-Time')
      });
    } catch (error) {
      await sendAlert({
        name: monitor.name,
        status: 'down',
        error: error.message
      });
    }
  }, monitor.interval * 1000);
});
```

---

## 🔒 Security Hardening

### Content Security Policy

```javascript
// security-headers.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: *.unsplash.com *.google-analytics.com; connect-src 'self' *.sentry.io *.google-analytics.com"
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

### SSL/TLS Configuration

```nginx
# nginx-ssl.conf
server {
    listen 443 ssl http2;
    server_name design-to-code.dev;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🚀 Performance Optimization

### Build Optimization

```javascript
// webpack.config.js (production optimizations)
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean)
};
```

### CDN Configuration

```javascript
// cdn-setup.js
const cdnConfig = {
  domains: [
    'https://cdn.design-to-code.dev'
  ],
  caching: {
    static: {
      maxAge: 31536000, // 1 year
      immutable: true
    },
    dynamic: {
      maxAge: 3600, // 1 hour
      staleWhileRevalidate: 86400 // 24 hours
    }
  },
  compression: {
    gzip: true,
    brotli: true
  }
};
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] **Code Quality**
  - All tests passing
  - Linting issues resolved
  - Code review completed
  - Performance benchmarks met

- [ ] **Security**
  - Dependencies updated
  - Security scan completed
  - Environment variables secured
  - SSL certificates valid

- [ ] **Configuration**
  - Environment variables set
  - API endpoints configured
  - Database migrations run
  - Feature flags configured

### During Deployment
- [ ] **Build Process**
  - Clean build successful
  - Assets optimized
  - Bundle size acceptable
  - Source maps generated

- [ ] **Infrastructure**
  - Servers provisioned
  - Load balancers configured
  - CDN setup complete
  - DNS records updated

### Post-Deployment
- [ ] **Verification**
  - Health checks passing
  - Critical paths tested
  - Performance metrics normal
  - Error rates acceptable

- [ ] **Monitoring**
  - Alerts configured
  - Dashboards updated
  - Log aggregation working
  - Backup systems verified

---

## 🔄 Rollback Procedures

### Automated Rollback

```bash
# Quick rollback to previous version
npm run rollback:production

# Rollback to specific version
npm run rollback:production -- --version=v1.2.3

# Database rollback
npm run db:rollback -- --steps=1
```

### Manual Rollback Steps

1. **Stop Traffic** - Route traffic away from affected servers
2. **Rollback Code** - Deploy previous stable version
3. **Rollback Database** - Revert schema changes if needed
4. **Clear Caches** - Invalidate CDN and application caches
5. **Verify Systems** - Run health checks and monitor metrics
6. **Communication** - Notify stakeholders of rollback status

---

## 📈 Deployment Metrics

### Key Performance Indicators

| Metric | Target | Current |
|--------|--------|---------|
| Deployment Frequency | Daily | 2-3x/day |
| Lead Time | < 2 hours | 1.5 hours |
| Mean Time to Recovery | < 30 min | 25 min |
| Change Failure Rate | < 5% | 3% |

### Success Criteria

- **Zero Downtime** - No service interruption during deployment
- **Fast Rollback** - Ability to rollback within 5 minutes
- **Automated Testing** - 95%+ test automation coverage
- **Monitor Coverage** - 100% critical path monitoring

---

## 🔗 Resources

### Documentation
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deploy Docs](https://docs.netlify.com/)
- [AWS Deployment Best Practices](https://aws.amazon.com/architecture/well-architected/)

### Tools
- **CI/CD**: GitHub Actions, Azure DevOps, CircleCI
- **Monitoring**: Sentry, New Relic, DataDog
- **Infrastructure**: Terraform, CloudFormation, Pulumi
- **Security**: Snyk, OWASP ZAP, SonarQube

### Communities
- [DevOps Community](https://devops.com/community/)
- [SRE Weekly Newsletter](https://sreweekly.com/)
- [Platform Engineering Slack](https://platformengineering.slack.com/)

---

## 🎯 What's Next?

**Great job!** Your projects are now live. Want to give back to the community?

**[→ Continue to Contributing Guide](contributing_guide.md)**

---

## 🗺️ Workshop Navigation

- **← Previous**: [Demo 4: Travel Platform](../demos/standardized/demo-4-travelwise-standardized.md)
- **→ Next**: [Contributing Guide](contributing_guide.md)
- **Resources**: [Docker Setup](docker_setup_guide.md) | [Testing Guide](testing_guide.md)
- **Help**: [FAQ](faq_guide.md) | [Troubleshooting](workshop_setup_guide.md#troubleshooting)

---

*Last Updated: January 2025*  
*Deployment Guide Version: 2.0*

[🏠 Back to Main](../README.md) | [📚 All Guides](./) | [🎉 Celebrate Your Success](#)