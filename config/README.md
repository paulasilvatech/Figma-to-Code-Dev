# Config Directory

This directory contains configuration files and setup scripts for the workshop.

## Files

### 📄 docker_compose_setup.txt
Docker Compose configuration for running the workshop in containers. Includes:
- Service definitions for all demo scenarios
- Volume mappings
- Environment variable configuration
- Network setup

### 📄 env_example_file.sh
Example environment variables file with:
- API keys configuration
- Service endpoints
- Feature flags
- Development settings

### 📄 package_json_scripts.json
NPM scripts configuration including:
- Build scripts
- Development server commands
- Testing scripts
- Deployment commands

## Usage

1. Copy `env_example_file.sh` to `.env` and fill in your values
2. Use `docker_compose_setup.txt` as reference for Docker setup
3. Reference `package_json_scripts.json` for available npm commands

## Quick Links

- [← Back to Main README](../README.md)
- [View Setup Guide](../guides/workshop_setup_guide.md) 