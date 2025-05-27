# 🐳 Docker Setup Guide
## Complete Container-based Development Environment

> **Run all 4 workshop scenarios in isolated containers with one command**

---

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** 4.0+ installed
- **Docker Compose** 2.0+ (included with Docker Desktop)
- **8GB+ RAM** available for Docker
- **Git** for cloning the repository

### One-Command Setup
```bash
# Clone and start everything
git clone https://github.com/design-to-code-workshop/workshop.git
cd design-to-code-workshop
cp .env.example .env
docker-compose up
```

**That's it!** All 4 scenarios will be available at:
- 🛍️ **E-commerce**: http://localhost:3000
- 📊 **SaaS Dashboard**: http://localhost:3002
- 🎨 **Agency Portfolio**: http://localhost:3003
- ✈️ **Travel Platform**: http://localhost:3004

---

## 📁 Docker Files Structure

The repository includes these Docker configurations:

```
design-to-code-workshop/
├── docker-compose.yml              # Main orchestration
├── .env.example                    # Environment template
├── scenario-1-ecommerce/
│   └── Dockerfile                  # React app container
├── scenario-2-saas/
│   └── Dockerfile                  # Next.js app container
├── scenario-3-agency/
│   └── Dockerfile                  # Gatsby app container
├── scenario-4-travel/
│   └── Dockerfile                  # React app container
└── shared-services/
    ├── ecommerce-api/Dockerfile    # E-commerce backend
    ├── saas-api/Dockerfile         # SaaS backend + WebSocket
    ├── agency-api/Dockerfile       # Contact form API
    ├── travel-api/Dockerfile       # Travel bookings API
    └── nginx/
        └── nginx.conf              # Reverse proxy config
```

---

## 🔧 Individual Service Dockerfiles

### React/Next.js Frontend Template
```dockerfile
# scenario-1-ecommerce/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Install dev dependencies and build
RUN npm ci && npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start application
CMD ["npm", "start"]
```

### API Backend Template
```dockerfile
# shared-services/ecommerce-api/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001
USER nodeuser

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start API server
CMD ["node", "server.js"]
```

---

## ⚙️ Environment Configuration

### Create Environment File
```bash
# Copy template and customize
cp .env.example .env
```

### Essential Variables
```env
# GitHub Copilot (required)
GITHUB_TOKEN=your_github_token

# API Keys (optional for demo)
MAPBOX_TOKEN=your_mapbox_token
STRIPE_PUBLIC_KEY=pk_test_demo
GOOGLE_PLACES_KEY=your_google_key

# Email Testing (uses Mailhog)
SMTP_HOST=mailhog
SMTP_PORT=1025

# Database passwords (auto-generated)
POSTGRES_PASSWORD=workshop
MONGO_INITDB_ROOT_PASSWORD=workshop
```

---

## 🎯 Usage Examples

### Start All Scenarios
```bash
# Development mode with all tools
docker-compose --profile development up

# Production mode with nginx
docker-compose --profile production up

# Background mode (detached)
docker-compose up -d
```

### Individual Scenarios
```bash
# E-commerce only
docker-compose up ecommerce ecommerce-api

# SaaS Dashboard with dependencies
docker-compose up saas saas-api postgres redis

# Agency Portfolio
docker-compose up agency agency-api

# Travel Platform
docker-compose up travel travel-api mongo
```

### Development Commands
```bash
# View logs
docker-compose logs -f ecommerce

# Execute commands in container
docker-compose exec ecommerce npm test

# Rebuild specific service
docker-compose build --no-cache saas

# Stop everything
docker-compose down

# Remove volumes (full reset)
docker-compose down -v
```

---

## 🔍 Service Details

### Frontend Applications

#### E-commerce (Port 3000)
- **Framework**: Create React App + TypeScript
- **Features**: Product gallery, cart, payments
- **Dependencies**: ecommerce-api
- **Hot Reload**: ✅ Enabled

#### SaaS Dashboard (Port 3002)
- **Framework**: Next.js + TypeScript
- **Features**: Real-time charts, WebSocket
- **Dependencies**: saas-api, postgres, redis
- **Hot Reload**: ✅ Enabled

#### Agency Portfolio (Port 3003)
- **Framework**: Gatsby + TypeScript
- **Features**: Animations, contact forms
- **Dependencies**: agency-api
- **Hot Reload**: ✅ Enabled

#### Travel Platform (Port 3004)
- **Framework**: Create React App + TypeScript
- **Features**: Maps, search, bookings
- **Dependencies**: travel-api, mongo
- **Hot Reload**: ✅ Enabled

### Backend APIs

#### E-commerce API (Port 3001)
- **Framework**: Express.js
- **Features**: Product data, cart management
- **Database**: SQLite (in-memory for demo)
- **Endpoints**: `/api/products`, `/api/cart`

#### SaaS API (Port 3012)
- **Framework**: Express.js + Socket.io
- **Features**: WebSocket, real-time data
- **Database**: PostgreSQL
- **Endpoints**: `/api/metrics`, `/ws`

#### Agency API (Port 3013)
- **Framework**: Express.js
- **Features**: Contact forms, email
- **Email**: Mailhog for testing
- **Endpoints**: `/api/contact`

#### Travel API (Port 3014)
- **Framework**: Express.js
- **Features**: Destinations, bookings
- **Database**: MongoDB
- **Endpoints**: `/api/destinations`, `/api/bookings`

### Supporting Services

#### PostgreSQL (Port 5432)
- **Version**: 15 Alpine
- **Database**: `cloudsync`
- **User**: `postgres` / `workshop`
- **Admin**: Available via Adminer (port 8080)

#### Redis (Port 6379)
- **Version**: 7 Alpine
- **Usage**: Caching, sessions
- **Admin**: Redis Commander (port 8081)

#### MongoDB (Port 27017)
- **Version**: 6
- **Database**: `travelwise`
- **Admin**: Built-in web interface

#### Development Tools
- **Mailhog** (Port 8025): Email testing UI
- **Adminer** (Port 8080): Database management
- **Redis Commander** (Port 8081): Redis management

---

## 🛠️ Development Workflow

### Code Changes
Hot reload is enabled for all frontend applications:
1. **Edit files** in your host system
2. **Changes sync** to containers automatically
3. **Apps reload** within seconds
4. **No rebuild** required

### Adding Dependencies
```bash
# Add to frontend
docker-compose exec ecommerce npm install new-package

# Add to backend
docker-compose exec ecommerce-api npm install new-package

# Rebuild if package.json changes
docker-compose build ecommerce
```

### Database Operations
```bash
# PostgreSQL console
docker-compose exec postgres psql -U postgres -d cloudsync

# MongoDB console
docker-compose exec mongo mongosh travelwise

# Redis console
docker-compose exec redis redis-cli
```

### Debugging
```bash
# View all logs
docker-compose logs

# Follow specific service logs
docker-compose logs -f saas

# Container shell access
docker-compose exec ecommerce sh

# Check container status
docker-compose ps
```

---

## 🚀 Production Deployment

### Build Production Images
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build --no-cache ecommerce

# Tag for registry
docker tag workshop-ecommerce:latest your-registry/workshop-ecommerce:v1.0
```

### Production Environment
```bash
# Use production profile
docker-compose --profile production up

# Scale services
docker-compose up --scale ecommerce=3

# Health checks
docker-compose exec ecommerce curl http://localhost:3000/health
```

### Registry Push
```bash
# Login to registry
docker login your-registry.com

# Push images
docker-compose push

# Deploy with swarm
docker stack deploy -c docker-compose.yml workshop
```

---

## 🔧 Customization

### Add New Scenario
1. **Create scenario directory**
   ```bash
   mkdir scenario-5-gaming
   cd scenario-5-gaming
   ```

2. **Add Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3005
   CMD ["npm", "start"]
   ```

3. **Update docker-compose.yml**
   ```yaml
   gaming:
     build: ./scenario-5-gaming
     ports:
       - "3005:3000"
     volumes:
       - ./scenario-5-gaming:/app
       - /app/node_modules
   ```

### Custom Backend API
```dockerfile
# shared-services/gaming-api/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3015
HEALTHCHECK CMD curl -f http://localhost:3015/health
CMD ["node", "server.js"]
```

### Environment Overrides
```bash
# Create override file
echo "
services:
  ecommerce:
    environment:
      - CUSTOM_VAR=custom_value
" > docker-compose.override.yml

# Automatically loaded with docker-compose up
```

---

## 🚨 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's using ports
lsof -i :3000
netstat -tulpn | grep :3000

# Use different ports
docker-compose up --scale ecommerce=0
PORT=3010 docker-compose up ecommerce
```

#### Container Won't Start
```bash
# Check logs
docker-compose logs ecommerce

# Common fixes
docker-compose down
docker-compose build --no-cache
docker-compose up
```

#### Out of Memory
```bash
# Check Docker resources
docker system df
docker system prune

# Increase Docker memory in settings
# Recommended: 8GB+ for all scenarios
```

#### Permission Issues (Linux/Mac)
```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Fix Docker socket
sudo chmod 666 /var/run/docker.sock
```

#### Database Connection Issues
```bash
# Check database status
docker-compose exec postgres pg_isready
docker-compose exec mongo mongosh --eval "db.adminCommand('ping')"
docker-compose exec redis redis-cli ping

# Restart databases
docker-compose restart postgres mongo redis
```

### Performance Optimization
```bash
# Increase Docker resources
# Docker Desktop → Settings → Resources
# CPU: 4+ cores
# Memory: 8GB+
# Disk: 100GB+

# Use BuildKit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Clean up regularly
docker system prune -f
docker volume prune -f
```

---

## 📊 Monitoring & Logs

### Log Management
```bash
# All logs with timestamps
docker-compose logs -t

# Specific timeframe
docker-compose logs --since="2h" ecommerce

# Save logs to file
docker-compose logs > workshop.log

# Live log streaming
docker-compose logs -f --tail=100
```

### Health Monitoring
```bash
# Check all service health
docker-compose ps

# Health check details
docker inspect --format='{{.State.Health}}' workshop-ecommerce

# Service statistics
docker stats $(docker-compose ps -q)
```

### Resource Usage
```bash
# Container resource usage
docker-compose top

# Detailed stats
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Disk usage
docker system df
```

---

## 🎯 Tips & Best Practices

### Development Tips
1. **Use profiles** for different environments
2. **Mount volumes** for hot reload
3. **Keep containers lightweight** 
4. **Use health checks** for reliability
5. **Name containers** for easy identification

### Security Best Practices
1. **Non-root users** in containers
2. **Environment variables** for secrets
3. **Network isolation** with custom networks
4. **Regular updates** of base images
5. **Scan images** for vulnerabilities

### Performance Tips
1. **Multi-stage builds** for smaller images
2. **Layer caching** optimization
3. **Resource limits** to prevent overconsumption
4. **Cleanup unused** images and volumes
5. **Use Alpine images** when possible

---

**🐳 Happy containerizing! Docker makes the workshop setup incredibly smooth and consistent.**

[🏠 Main README](README.md) | [🛠️ Setup Guide](SETUP.md) | [❓ FAQ](FAQ.md)
