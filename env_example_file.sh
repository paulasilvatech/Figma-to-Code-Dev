# =============================================================================
# Design-to-Code Workshop - Environment Variables Template
# =============================================================================
# Copy this file to .env and fill in your actual values
# Never commit .env file to version control!

# =============================================================================
# GITHUB COPILOT & AUTHENTICATION
# =============================================================================
# GitHub Personal Access Token for Copilot integration
# Get from: https://github.com/settings/tokens
# Required scopes: repo, read:user, user:email
GITHUB_TOKEN=ghp_your_github_personal_access_token_here

# GitHub Copilot API endpoint (usually don't need to change)
GITHUB_COPILOT_API_URL=https://api.github.com

# =============================================================================
# FIGMA INTEGRATION (Optional - for advanced features)
# =============================================================================
# Figma Personal Access Token
# Get from: https://www.figma.com/developers/api#access-tokens
FIGMA_ACCESS_TOKEN=figd_your_figma_access_token_here

# Figma file IDs for each scenario (optional)
FIGMA_ECOMMERCE_FILE_ID=your_ecommerce_figma_file_id
FIGMA_SAAS_FILE_ID=your_saas_figma_file_id
FIGMA_AGENCY_FILE_ID=your_agency_figma_file_id
FIGMA_TRAVEL_FILE_ID=your_travel_figma_file_id

# =============================================================================
# SCENARIO 1: E-COMMERCE PRODUCT PAGE
# =============================================================================
# Stripe API keys for payment integration
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Product API endpoints
REACT_APP_PRODUCTS_API_URL=https://api.yourstore.com/products
REACT_APP_INVENTORY_API_URL=https://api.yourstore.com/inventory

# Image CDN for product photos
REACT_APP_IMAGES_CDN_URL=https://cdn.yourstore.com

# Reviews API (for demo purposes)
REACT_APP_REVIEWS_API_URL=http://localhost:3001/api/reviews

# =============================================================================
# SCENARIO 2: SAAS DASHBOARD (CloudSync)
# =============================================================================
# WebSocket endpoint for real-time updates
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_WS_URL_PROD=wss://ws.cloudsync.demo

# Dashboard API endpoints
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_API_URL_PROD=https://api.cloudsync.demo

# Database connection (for demo backend)
DATABASE_URL=postgresql://user:password@localhost:5432/cloudsync_demo

# Redis for caching and sessions
REDIS_URL=redis://localhost:6379

# Email service for notifications
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
FROM_EMAIL=noreply@cloudsync.demo

# =============================================================================
# SCENARIO 3: AGENCY PORTFOLIO (Nexus Creative)
# =============================================================================
# Contact form submission endpoint
REACT_APP_CONTACT_API_URL=https://api.nexuscreative.demo/contact

# Portfolio CMS (optional - for dynamic content)
REACT_APP_CMS_API_URL=https://cms.nexuscreative.demo
CMS_ACCESS_TOKEN=your_cms_access_token

# Image optimization service
REACT_APP_IMAGE_OPTIMIZATION_URL=https://img.nexuscreative.demo

# Google reCAPTCHA for contact form
REACT_APP_RECAPTCHA_SITE_KEY=6Le-your-recaptcha-site-key-here
RECAPTCHA_SECRET_KEY=6Le-your-recaptcha-secret-key-here

# =============================================================================
# SCENARIO 4: TRAVEL PLATFORM (TravelWise)
# =============================================================================
# Mapbox for interactive maps
REACT_APP_MAPBOX_TOKEN=pk.eyJ1your_mapbox_access_token_here

# Google Places API for destination search
REACT_APP_GOOGLE_PLACES_KEY=AIza-your-google-places-api-key-here

# Weather API for destination info
REACT_APP_WEATHER_API_KEY=your_openweather_api_key_here
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5

# Booking/Travel APIs (demo endpoints)
REACT_APP_DESTINATIONS_API_URL=http://localhost:3003/api/destinations
REACT_APP_BOOKINGS_API_URL=http://localhost:3003/api/bookings

# Currency conversion API
REACT_APP_CURRENCY_API_KEY=your_currency_api_key_here
REACT_APP_CURRENCY_API_URL=https://api.exchangerate-api.com/v4

# Unsplash for destination photos (optional)
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# =============================================================================
# SHARED ANALYTICS & MONITORING
# =============================================================================
# Google Analytics 4
REACT_APP_GA_ID=G-XXXXXXXXXX
REACT_APP_GA_DEBUG=false

# Sentry for error tracking
REACT_APP_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Hotjar for user behavior analytics (optional)
REACT_APP_HOTJAR_ID=your_hotjar_id
REACT_APP_HOTJAR_SV=your_hotjar_snippet_version

# Mixpanel for product analytics (optional)
REACT_APP_MIXPANEL_TOKEN=your_mixpanel_project_token

# =============================================================================
# DEVELOPMENT & TESTING
# =============================================================================
# Development mode settings
NODE_ENV=development
REACT_APP_ENV=development

# Enable detailed logging
DEBUG=true
REACT_APP_DEBUG=true

# Mock API responses (for offline development)
REACT_APP_USE_MOCK_DATA=true

# Test environment variables
REACT_APP_TEST_USER_EMAIL=test@example.com
REACT_APP_TEST_USER_PASSWORD=testpassword123

# Jest and testing
CI=false
WATCHPACK_POLLING=true

# =============================================================================
# PRODUCTION SETTINGS (Override in .env.production.local)
# =============================================================================
# Production API URLs
# REACT_APP_API_URL=https://api.yourproductionsite.com
# NEXT_PUBLIC_API_URL=https://api.yourproductionsite.com

# Production CDN URLs
# REACT_APP_CDN_URL=https://cdn.yourproductionsite.com

# Production database
# DATABASE_URL=your_production_database_url

# Security settings for production
# SECURE_COOKIES=true
# CORS_ORIGIN=https://yourproductionsite.com

# =============================================================================
# OPTIONAL INTEGRATIONS
# =============================================================================
# Slack notifications for demo/workshop updates
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook

# Discord bot for community features
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_discord_server_id

# Vercel/Netlify deployment tokens
VERCEL_TOKEN=your_vercel_deployment_token
NETLIFY_AUTH_TOKEN=your_netlify_auth_token

# =============================================================================
# AI & ML SERVICES (Optional - for advanced features)
# =============================================================================
# OpenAI for additional AI features
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic Claude (alternative to OpenAI)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Replicate for image generation/processing
REPLICATE_API_TOKEN=r8_your-replicate-api-token-here

# =============================================================================
# WORKSHOP-SPECIFIC SETTINGS
# =============================================================================
# Workshop mode (enables extra logging and debug features)
WORKSHOP_MODE=true

# Auto-save generated code (for learning purposes)
AUTO_SAVE_GENERATED_CODE=true

# Workshop participant identifier (optional)
WORKSHOP_PARTICIPANT_ID=participant_001

# Demo data refresh interval (in milliseconds)
DEMO_DATA_REFRESH_INTERVAL=30000

# =============================================================================
# QUICK SETUP VERIFICATION
# =============================================================================
# Set this to 'true' when you've configured the essential variables
SETUP_COMPLETE=false

# Essential variables checklist (set to 'true' when configured):
GITHUB_TOKEN_SET=false
MAPBOX_TOKEN_SET=false          # For travel scenario
STRIPE_KEYS_SET=false           # For e-commerce scenario
RECAPTCHA_KEYS_SET=false        # For contact forms

# =============================================================================
# NOTES & INSTRUCTIONS
# =============================================================================
# 1. Copy this file to .env in your project root
# 2. Fill in the values you need for your chosen scenarios
# 3. Never commit the .env file to version control
# 4. Use .env.local for local overrides
# 5. Use .env.production.local for production deployments
#
# For help with API keys and setup:
# - GitHub Token: https://github.com/settings/tokens
# - Mapbox: https://account.mapbox.com/access-tokens/
# - Stripe: https://dashboard.stripe.com/apikeys
# - Google APIs: https://console.developers.google.com/
#
# Workshop Documentation:
# https://github.com/design-to-code-workshop/docs
#
# Support: workshop-support@design-to-code.dev