# 🔍 Multi-Cloud Observability Guide
## Unified Monitoring with Datadog & Azure Monitor

> **Complete observability solution for multi-cloud deployments across Azure, AWS, and Google Cloud**

---

## 📊 Overview

This guide provides a comprehensive observability strategy using Datadog as the primary monitoring platform, integrated with Azure Monitor for enhanced Azure-specific insights, enabling unified monitoring across all three major cloud providers.

### Key Benefits
- 🌐 **Unified Dashboard** - Single pane of glass for all clouds
- 🔄 **Real-time Monitoring** - Live metrics and alerts
- 📈 **Performance Insights** - APM and infrastructure metrics
- 🚨 **Intelligent Alerting** - ML-powered anomaly detection
- 📝 **Compliance Reporting** - Automated audit trails

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Applications"
        A1[Azure App Service]
        A2[AWS ECS/Lambda]
        A3[GCP Cloud Run]
    end
    
    subgraph "Data Collection Layer"
        DC1[Datadog Agent - Azure]
        DC2[Datadog Agent - AWS]
        DC3[Datadog Agent - GCP]
        AM[Azure Monitor]
    end
    
    subgraph "Integration Layer"
        DI[Datadog Integration Hub]
        AMC[Azure Monitor Connector]
    end
    
    subgraph "Datadog Platform"
        DD1[Metrics Store]
        DD2[Logs Management]
        DD3[APM Traces]
        DD4[Synthetics]
        DD5[RUM]
    end
    
    subgraph "Visualization & Alerting"
        DB[Unified Dashboards]
        AL[Alert Manager]
        ML[Machine Learning]
        RP[Reports]
    end
    
    A1 --> DC1
    A1 --> AM
    A2 --> DC2
    A3 --> DC3
    
    DC1 --> DI
    DC2 --> DI
    DC3 --> DI
    AM --> AMC
    AMC --> DI
    
    DI --> DD1
    DI --> DD2
    DI --> DD3
    DI --> DD4
    DI --> DD5
    
    DD1 --> DB
    DD2 --> DB
    DD3 --> DB
    DD4 --> AL
    DD5 --> ML
    
    DB --> RP
    AL --> RP
    
    style DD1 fill:#632ca6,stroke:#fff,stroke-width:2px,color:#fff
    style AM fill:#0078d4,stroke:#fff,stroke-width:2px,color:#fff
    style DB fill:#10b981,stroke:#fff,stroke-width:2px,color:#fff
```

---

## 🚀 Quick Start

### Prerequisites
1. **Datadog Account** - [Sign up for free trial](https://www.datadoghq.com/free-datadog-trial/)
2. **Azure Subscription** - [Create free account](https://azure.microsoft.com/free/)
3. **API Keys** - Datadog API and Application keys
4. **Cloud CLI Tools** - Azure CLI, AWS CLI, gcloud

### Initial Setup
```bash
# Install Datadog CLI
pip install datadog

# Configure Datadog
export DD_API_KEY="your-api-key"
export DD_APP_KEY="your-app-key"
export DD_SITE="datadoghq.com"  # or datadoghq.eu for EU

# Verify connection
datadog-cli config validate
```

---

## 🔷 Azure Integration

### Step 1: Configure Azure Monitor

```bash
# Create Azure Monitor workspace
az monitor log-analytics workspace create \
  --resource-group figma-to-code-rg \
  --workspace-name figma-to-code-logs \
  --location eastus

# Get workspace ID and key
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group figma-to-code-rg \
  --workspace-name figma-to-code-logs \
  --query customerId -o tsv)

WORKSPACE_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group figma-to-code-rg \
  --workspace-name figma-to-code-logs \
  --query primarySharedKey -o tsv)
```

### Step 2: Install Datadog Agent on Azure

```yaml
# azure-datadog-agent.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - name: datadog-agent
        image: gcr.io/datadoghq/agent:latest
        env:
          - name: DD_API_KEY
            valueFrom:
              secretKeyRef:
                name: datadog-secret
                key: api-key
          - name: DD_SITE
            value: "datadoghq.com"
          - name: DD_LOGS_ENABLED
            value: "true"
          - name: DD_APM_ENABLED
            value: "true"
          - name: DD_PROCESS_AGENT_ENABLED
            value: "true"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: logpodpath
            mountPath: /var/log/pods
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "400m"
      volumes:
        - name: dockersocket
          hostPath:
            path: /var/run/docker.sock
        - name: logpodpath
          hostPath:
            path: /var/log/pods
```

### Step 3: Azure Monitor to Datadog Integration

```python
# azure-monitor-datadog-sync.py
import os
from azure.monitor.query import LogsQueryClient
from azure.identity import DefaultAzureCredential
from datadog import initialize, api
import datetime

# Initialize Azure Monitor client
credential = DefaultAzureCredential()
logs_client = LogsQueryClient(credential)

# Initialize Datadog
options = {
    'api_key': os.environ['DD_API_KEY'],
    'app_key': os.environ['DD_APP_KEY']
}
initialize(**options)

# Query Azure Monitor
workspace_id = os.environ['AZURE_WORKSPACE_ID']
query = """
AppRequests
| where TimeGenerated > ago(5m)
| summarize 
    RequestCount = count(),
    AvgDuration = avg(DurationMs),
    P95Duration = percentile(DurationMs, 95),
    P99Duration = percentile(DurationMs, 99)
    by AppRoleName, bin(TimeGenerated, 1m)
"""

response = logs_client.query_workspace(
    workspace_id=workspace_id,
    query=query,
    timespan=datetime.timedelta(minutes=5)
)

# Send to Datadog
for table in response.tables:
    for row in table.rows:
        timestamp = row[0]
        app_name = row[1]
        metrics = [
            {
                'metric': f'azure.app.requests.count',
                'points': [(timestamp, row[2])],
                'tags': [f'app:{app_name}', 'cloud:azure']
            },
            {
                'metric': f'azure.app.duration.avg',
                'points': [(timestamp, row[3])],
                'tags': [f'app:{app_name}', 'cloud:azure']
            },
            {
                'metric': f'azure.app.duration.p95',
                'points': [(timestamp, row[4])],
                'tags': [f'app:{app_name}', 'cloud:azure']
            },
            {
                'metric': f'azure.app.duration.p99',
                'points': [(timestamp, row[5])],
                'tags': [f'app:{app_name}', 'cloud:azure']
            }
        ]
        
        api.Metric.send(metrics)
```

### Step 4: Azure App Service Integration

```bash
# Enable Application Insights
az monitor app-insights component create \
  --app figma-to-code-insights \
  --location eastus \
  --resource-group figma-to-code-rg \
  --application-type web

# Get instrumentation key
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app figma-to-code-insights \
  --resource-group figma-to-code-rg \
  --query instrumentationKey -o tsv)

# Configure App Service
az webapp config appsettings set \
  --name figma-to-code-workshop \
  --resource-group figma-to-code-rg \
  --settings \
    APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY \
    ApplicationInsightsAgent_EXTENSION_VERSION=~3 \
    XDT_MicrosoftApplicationInsights_Mode=Recommended
```

---

## 🔶 AWS Integration

### AWS CloudWatch to Datadog

```yaml
# cloudformation-datadog-integration.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Datadog AWS Integration'

Parameters:
  DatadogApiKey:
    Type: String
    NoEcho: true
    Description: Datadog API Key

Resources:
  DatadogIntegrationRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              AWS: arn:aws:iam::464622532012:root
            Action: sts:AssumeRole
            Condition:
              StringEquals:
                sts:ExternalId: !Ref DatadogApiKey
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/SecurityAudit
      Policies:
        - PolicyName: DatadogAWSIntegrationPolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - apigateway:GET
                  - autoscaling:Describe*
                  - budgets:ViewBudget
                  - cloudfront:GetDistributionConfig
                  - cloudfront:ListDistributions
                  - cloudtrail:DescribeTrails
                  - cloudtrail:GetTrailStatus
                  - cloudtrail:LookupEvents
                  - cloudwatch:Describe*
                  - cloudwatch:Get*
                  - cloudwatch:List*
                  - codedeploy:List*
                  - codedeploy:BatchGet*
                  - directconnect:Describe*
                  - dynamodb:List*
                  - dynamodb:Describe*
                  - ec2:Describe*
                  - ecs:Describe*
                  - ecs:List*
                  - elasticache:Describe*
                  - elasticache:List*
                  - elasticfilesystem:DescribeFileSystems
                  - elasticfilesystem:DescribeTags
                  - elasticloadbalancing:Describe*
                  - elasticmapreduce:List*
                  - elasticmapreduce:Describe*
                  - es:ListTags
                  - es:ListDomainNames
                  - es:DescribeElasticsearchDomains
                  - fsx:DescribeFileSystems
                  - fsx:ListTagsForResource
                  - health:DescribeEvents
                  - health:DescribeEventDetails
                  - health:DescribeAffectedEntities
                  - kinesis:List*
                  - kinesis:Describe*
                  - lambda:GetPolicy
                  - lambda:List*
                  - logs:DeleteSubscriptionFilter
                  - logs:DescribeLogGroups
                  - logs:DescribeLogStreams
                  - logs:DescribeSubscriptionFilters
                  - logs:FilterLogEvents
                  - logs:PutSubscriptionFilter
                  - logs:TestMetricFilter
                  - organizations:DescribeOrganization
                  - rds:Describe*
                  - rds:List*
                  - redshift:DescribeClusters
                  - redshift:DescribeLoggingStatus
                  - route53:List*
                  - s3:GetBucketLogging
                  - s3:GetBucketLocation
                  - s3:GetBucketNotification
                  - s3:GetBucketTagging
                  - s3:ListAllMyBuckets
                  - s3:PutBucketNotification
                  - ses:Get*
                  - sns:List*
                  - sns:Publish
                  - sqs:ListQueues
                  - states:ListStateMachines
                  - states:DescribeStateMachine
                  - support:DescribeTrustedAdvisor*
                  - support:RefreshTrustedAdvisorCheck
                  - tag:GetResources
                  - tag:GetTagKeys
                  - tag:GetTagValues
                  - xray:BatchGetTraces
                  - xray:GetTraceSummaries
                Resource: '*'

  DatadogLogForwarder:
    Type: AWS::Serverless::Application
    Properties:
      Location:
        ApplicationId: arn:aws:serverlessrepo:us-east-1:464622532012:applications/Datadog-Log-Forwarder
        SemanticVersion: 3.91.0
      Parameters:
        DdApiKey: !Ref DatadogApiKey
        DdSite: datadoghq.com
        FunctionName: datadog-log-forwarder
```

### ECS Task Definition with Datadog

```json
{
  "family": "figma-to-code-task",
  "taskRoleArn": "arn:aws:iam::account-id:role/ecsTaskRole",
  "executionRoleArn": "arn:aws:iam::account-id:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "figma-to-code-app",
      "image": "your-ecr-repo/figma-to-code:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DD_AGENT_HOST",
          "value": "localhost"
        },
        {
          "name": "DD_TRACE_AGENT_PORT",
          "value": "8126"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/figma-to-code",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    },
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account-id:secret:dd-api-key"
        },
        {
          "name": "DD_SITE",
          "value": "datadoghq.com"
        },
        {
          "name": "ECS_FARGATE",
          "value": "true"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_LOGS_ENABLED",
          "value": "true"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/datadog-agent",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## 🔵 Google Cloud Integration

### GCP Operations Suite to Datadog

```yaml
# gcp-datadog-exporter.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-gcp-exporter
spec:
  replicas: 1
  selector:
    matchLabels:
      app: datadog-gcp-exporter
  template:
    metadata:
      labels:
        app: datadog-gcp-exporter
    spec:
      serviceAccountName: datadog-exporter
      containers:
      - name: exporter
        image: gcr.io/datadoghq/gcp-exporter:latest
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/secrets/google/key.json
        - name: GCP_PROJECT_ID
          value: "figma-to-code-workshop"
        - name: EXPORT_INTERVAL
          value: "60"
        volumeMounts:
        - name: google-cloud-key
          mountPath: /var/secrets/google
      volumes:
      - name: google-cloud-key
        secret:
          secretName: gcp-key
```

### Cloud Run Integration

```dockerfile
# Dockerfile with Datadog APM
FROM node:18-alpine

# Install Datadog tracer
RUN npm install --save dd-trace

# Copy application
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Add Datadog initialization
RUN echo "require('dd-trace').init();" > dd-init.js

# Start with Datadog tracer
CMD ["node", "-r", "./dd-init.js", "server.js"]
```

```yaml
# cloud-run-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: figma-to-code-service
  annotations:
    run.googleapis.com/launch-stage: GA
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '100'
        autoscaling.knative.dev/minScale: '1'
    spec:
      containers:
      - image: gcr.io/project-id/figma-to-code:latest
        env:
        - name: DD_AGENT_HOST
          value: datadog-agent.datadog.svc.cluster.local
        - name: DD_TRACE_AGENT_PORT
          value: "8126"
        - name: DD_SERVICE
          value: figma-to-code-service
        - name: DD_ENV
          value: production
        - name: DD_VERSION
          value: "1.0.0"
        - name: DD_LOGS_INJECTION
          value: "true"
        - name: DD_RUNTIME_METRICS_ENABLED
          value: "true"
        - name: DD_PROFILING_ENABLED
          value: "true"
```

---

## 📊 Unified Dashboards

### Multi-Cloud Infrastructure Dashboard

```json
{
  "title": "Figma-to-Code Multi-Cloud Infrastructure",
  "description": "Unified view of Azure, AWS, and GCP deployments",
  "widgets": [
    {
      "id": 1,
      "definition": {
        "title": "Request Rate by Cloud Provider",
        "type": "timeseries",
        "requests": [
          {
            "q": "sum:azure.app.requests.count{*} by {cloud}.as_rate()",
            "display_type": "line",
            "style": {
              "palette": "blue"
            }
          },
          {
            "q": "sum:aws.applicationelb.request_count{*} by {cloud}.as_rate()",
            "display_type": "line",
            "style": {
              "palette": "orange"
            }
          },
          {
            "q": "sum:gcp.loadbalancing.https.request_count{*} by {cloud}.as_rate()",
            "display_type": "line",
            "style": {
              "palette": "green"
            }
          }
        ]
      }
    },
    {
      "id": 2,
      "definition": {
        "title": "Response Time P95 Comparison",
        "type": "timeseries",
        "requests": [
          {
            "q": "avg:azure.app.duration.p95{*}",
            "display_type": "line"
          },
          {
            "q": "avg:aws.applicationelb.target_response_time.p95{*}",
            "display_type": "line"
          },
          {
            "q": "avg:gcp.loadbalancing.https.backend_latencies.p95{*}",
            "display_type": "line"
          }
        ]
      }
    },
    {
      "id": 3,
      "definition": {
        "title": "Error Rate by Cloud",
        "type": "query_value",
        "requests": [
          {
            "q": "sum:azure.app.requests.failed{*}.as_rate()",
            "aggregator": "avg"
          }
        ],
        "precision": 2,
        "text_align": "center"
      }
    },
    {
      "id": 4,
      "definition": {
        "title": "Cost Analysis",
        "type": "toplist",
        "requests": [
          {
            "q": "sum:azure.cost.actual{*} by {service}",
            "style": {
              "palette": "blue"
            }
          },
          {
            "q": "sum:aws.cost.actual{*} by {service}",
            "style": {
              "palette": "orange"
            }
          },
          {
            "q": "sum:gcp.cost.actual{*} by {service}",
            "style": {
              "palette": "green"
            }
          }
        ]
      }
    }
  ]
}
```

### Application Performance Dashboard

```hcl
# terraform-datadog-dashboard.tf
resource "datadog_dashboard" "apm_dashboard" {
  title       = "Figma-to-Code APM Dashboard"
  description = "Application performance across all clouds"
  layout_type = "ordered"

  widget {
    service_map_definition {
      title         = "Service Dependencies"
      title_size    = "16"
      title_align   = "left"
      service       = "figma-to-code"
      filters       = ["env:production"]
      color_scheme  = "datadog16"
    }
  }

  widget {
    trace_service_definition {
      title              = "Service Performance"
      title_size         = "16"
      title_align        = "left"
      env                = "production"
      service            = "figma-to-code"
      span_name          = "all"
      show_errors        = true
      show_latency       = true
      show_hits          = true
      show_distribution  = true
      show_resource_list = true
      size_format        = "large"
      display_format     = "three_column"
    }
  }

  widget {
    timeseries_definition {
      title       = "Request Latency by Endpoint"
      title_size  = "16"
      title_align = "left"
      show_legend = true
      legend_size = "0"
      
      request {
        q            = "avg:trace.express.request{env:production} by {resource_name}.rollup(avg, 60)"
        display_type = "line"
        
        style {
          palette    = "cool"
          line_type  = "solid"
          line_width = "normal"
        }
      }
      
      yaxis {
        scale        = "linear"
        include_zero = true
      }
    }
  }
}
```

---

## 🚨 Alerting Configuration

### Multi-Cloud Alert Rules

```python
# datadog-alerts.py
from datadog import initialize, api

# Initialize Datadog API
initialize(api_key=DD_API_KEY, app_key=DD_APP_KEY)

# Multi-cloud availability monitor
availability_monitor = {
    "name": "Multi-Cloud Service Availability",
    "type": "service check",
    "query": "\"http.can_connect\".over(\"*\").by(\"host\",\"cloud\").last(2).count_by_status()",
    "message": """
{{#is_alert}}
🚨 Service unavailable in {{cloud.name}}!
- Host: {{host.name}}
- Cloud: {{cloud.name}}
- Last seen: {{last_triggered_at}}

Please check:
1. Service health in {{cloud.name}} console
2. Network connectivity
3. Recent deployments

@slack-alerts @pagerduty
{{/is_alert}}

{{#is_recovery}}
✅ Service recovered in {{cloud.name}}
{{/is_recovery}}
""",
    "tags": ["service:figma-to-code", "team:platform"],
    "options": {
        "thresholds": {
            "critical": 2,
            "warning": 1
        },
        "notify_no_data": True,
        "no_data_timeframe": 10,
        "renotify_interval": 5
    }
}

# Create monitor
api.Monitor.create(**availability_monitor)

# Performance degradation monitor
performance_monitor = {
    "name": "Multi-Cloud Performance Degradation",
    "type": "query alert",
    "query": "avg(last_5m):avg:trace.express.request.duration{env:production} by {cloud} > 1000",
    "message": """
{{#is_alert}}
⚠️ Performance degradation detected in {{cloud.name}}!

Current latency: {{value}}ms (threshold: 1000ms)
Cloud: {{cloud.name}}

Recent changes:
- Check recent deployments
- Review resource utilization
- Analyze error logs

Dashboard: https://app.datadoghq.com/dashboard/abc-123-def

@slack-performance
{{/is_alert}}
""",
    "tags": ["service:figma-to-code", "severity:warning"],
    "options": {
        "thresholds": {
            "critical": 2000,
            "warning": 1000
        },
        "evaluation_delay": 60
    }
}

api.Monitor.create(**performance_monitor)

# Cost anomaly detection
cost_monitor = {
    "name": "Cloud Cost Anomaly Detection",
    "type": "query alert",
    "query": "avg(last_4h):anomalies(sum:azure.cost.actual{*} + sum:aws.cost.actual{*} + sum:gcp.cost.actual{*}, 'agile', 3) >= 1",
    "message": """
{{#is_alert}}
💰 Unusual cloud spending detected!

Anomaly detected in cloud costs.
Please review:
- Recent resource provisioning
- Autoscaling events
- Unused resources

Cost Dashboard: https://app.datadoghq.com/dashboard/cost-analysis

@slack-finance @email-platform-team
{{/is_alert}}
""",
    "tags": ["team:platform", "type:cost"],
    "options": {
        "threshold_windows": {
            "trigger_window": "last_4h",
            "recovery_window": "last_1h"
        }
    }
}

api.Monitor.create(**cost_monitor)
```

---

## 📈 SLO Configuration

### Service Level Objectives

```yaml
# slo-definitions.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-slos
data:
  slos.json: |
    {
      "slos": [
        {
          "name": "API Availability",
          "description": "99.9% uptime for all API endpoints",
          "type": "monitor",
          "monitor_ids": [12345, 12346, 12347],
          "thresholds": [
            {
              "timeframe": "30d",
              "target": 99.9,
              "warning": 99.95
            },
            {
              "timeframe": "7d",
              "target": 99.9,
              "warning": 99.95
            }
          ],
          "tags": ["service:api", "team:platform"]
        },
        {
          "name": "Request Latency",
          "description": "95% of requests under 500ms",
          "type": "metric",
          "query": {
            "numerator": "sum:trace.express.request{env:production,duration:<500}.as_count()",
            "denominator": "sum:trace.express.request{env:production}.as_count()"
          },
          "thresholds": [
            {
              "timeframe": "30d",
              "target": 95.0,
              "warning": 97.0
            }
          ],
          "tags": ["service:api", "team:platform"]
        },
        {
          "name": "Error Rate",
          "description": "Less than 1% error rate",
          "type": "metric",
          "query": {
            "numerator": "sum:trace.express.request.errors{env:production}.as_count()",
            "denominator": "sum:trace.express.request{env:production}.as_count()"
          },
          "thresholds": [
            {
              "timeframe": "30d",
              "target": 99.0,
              "warning": 99.5
            }
          ],
          "tags": ["service:api", "team:platform"]
        }
      ]
    }
```

---

## 🔄 Automation Workflows

### Incident Response Automation

```mermaid
sequenceDiagram
    participant DD as Datadog
    participant AZ as Azure Monitor
    participant PD as PagerDuty
    participant SL as Slack
    participant GH as GitHub Actions
    participant ENG as On-Call Engineer
    
    DD->>DD: Detect anomaly/threshold breach
    DD->>AZ: Correlate with Azure metrics
    AZ->>DD: Return additional context
    DD->>PD: Create incident (Sev based on rules)
    DD->>SL: Post to #alerts channel
    PD->>ENG: Page on-call engineer
    
    alt Automated Response
        DD->>GH: Trigger remediation workflow
        GH->>GH: Execute runbook
        GH->>DD: Report status
        DD->>SL: Update incident thread
    else Manual Response
        ENG->>SL: Acknowledge incident
        ENG->>DD: Investigate dashboards
        ENG->>GH: Trigger manual remediation
    end
    
    GH->>DD: Send deployment markers
    DD->>PD: Resolve incident
    DD->>SL: Post resolution summary
```

### Auto-Remediation Workflow

```yaml
# .github/workflows/auto-remediation.yml
name: Auto-Remediation

on:
  repository_dispatch:
    types: [datadog-alert]

jobs:
  diagnose:
    runs-on: ubuntu-latest
    outputs:
      action: ${{ steps.analyze.outputs.action }}
      
    steps:
      - name: Analyze Alert
        id: analyze
        run: |
          ALERT_TYPE="${{ github.event.client_payload.alert_type }}"
          CLOUD="${{ github.event.client_payload.cloud }}"
          SEVERITY="${{ github.event.client_payload.severity }}"
          
          if [[ "$ALERT_TYPE" == "high_memory" ]]; then
            echo "action=scale-up" >> $GITHUB_OUTPUT
          elif [[ "$ALERT_TYPE" == "high_latency" ]]; then
            echo "action=restart-service" >> $GITHUB_OUTPUT
          elif [[ "$ALERT_TYPE" == "high_error_rate" ]]; then
            echo "action=rollback" >> $GITHUB_OUTPUT
          else
            echo "action=notify-only" >> $GITHUB_OUTPUT
          fi

  remediate:
    needs: diagnose
    runs-on: ubuntu-latest
    if: needs.diagnose.outputs.action != 'notify-only'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Scale Up Resources
        if: needs.diagnose.outputs.action == 'scale-up'
        run: |
          CLOUD="${{ github.event.client_payload.cloud }}"
          
          case $CLOUD in
            azure)
              az webapp scale --name ${{ secrets.AZURE_APP_NAME }} \
                --resource-group ${{ secrets.AZURE_RG }} \
                --instance-count 5
              ;;
            aws)
              aws ecs update-service \
                --cluster ${{ secrets.AWS_CLUSTER }} \
                --service ${{ secrets.AWS_SERVICE }} \
                --desired-count 5
              ;;
            gcp)
              gcloud run services update ${{ secrets.GCP_SERVICE }} \
                --min-instances=5 \
                --max-instances=20
              ;;
          esac
          
      - name: Restart Service
        if: needs.diagnose.outputs.action == 'restart-service'
        run: |
          # Implement rolling restart logic
          echo "Restarting service in ${{ github.event.client_payload.cloud }}"
          
      - name: Rollback Deployment
        if: needs.diagnose.outputs.action == 'rollback'
        run: |
          # Implement rollback logic
          echo "Rolling back in ${{ github.event.client_payload.cloud }}"
          
      - name: Update Datadog
        if: always()
        run: |
          curl -X POST "https://api.datadoghq.com/api/v1/events" \
            -H "DD-API-KEY: ${{ secrets.DD_API_KEY }}" \
            -H "DD-APPLICATION-KEY: ${{ secrets.DD_APP_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{
              "title": "Auto-remediation executed",
              "text": "Action: ${{ needs.diagnose.outputs.action }}\nCloud: ${{ github.event.client_payload.cloud }}\nStatus: ${{ job.status }}",
              "alert_type": "info",
              "tags": ["automation:remediation", "cloud:${{ github.event.client_payload.cloud }}"]
            }'
```

---

## 📊 Cost Optimization

### Multi-Cloud Cost Tracking

```python
# cost-optimization.py
import boto3
import pandas as pd
from azure.mgmt.costmanagement import CostManagementClient
from google.cloud import billing_v1
from datadog import initialize, api

class MultiCloudCostOptimizer:
    def __init__(self):
        self.dd_api = initialize(api_key=DD_API_KEY, app_key=DD_APP_KEY)
        
    def analyze_azure_costs(self):
        """Analyze Azure costs and send to Datadog"""
        client = CostManagementClient(credential, subscription_id)
        
        query = {
            "type": "Usage",
            "timeframe": "MonthToDate",
            "dataset": {
                "granularity": "Daily",
                "aggregation": {
                    "totalCost": {
                        "name": "Cost",
                        "function": "Sum"
                    }
                },
                "grouping": [
                    {"type": "Dimension", "name": "ServiceName"},
                    {"type": "Dimension", "name": "ResourceGroup"}
                ]
            }
        }
        
        result = client.query.usage(scope, query)
        
        # Send to Datadog
        for row in result.rows:
            api.Metric.send([{
                'metric': 'azure.cost.daily',
                'points': [(row[0], row[2])],
                'tags': [
                    f'service:{row[1]}',
                    f'resource_group:{row[2]}',
                    'cloud:azure'
                ]
            }])
    
    def analyze_aws_costs(self):
        """Analyze AWS costs using Cost Explorer"""
        ce = boto3.client('ce')
        
        response = ce.get_cost_and_usage(
            TimePeriod={
                'Start': start_date,
                'End': end_date
            },
            Granularity='DAILY',
            Metrics=['UnblendedCost'],
            GroupBy=[
                {'Type': 'DIMENSION', 'Key': 'SERVICE'},
                {'Type': 'TAG', 'Key': 'Environment'}
            ]
        )
        
        # Process and send to Datadog
        for result in response['ResultsByTime']:
            for group in result['Groups']:
                api.Metric.send([{
                    'metric': 'aws.cost.daily',
                    'points': [(result['TimePeriod']['Start'], 
                               float(group['Metrics']['UnblendedCost']['Amount']))],
                    'tags': [
                        f'service:{group["Keys"][0]}',
                        f'environment:{group["Keys"][1]}',
                        'cloud:aws'
                    ]
                }])
    
    def identify_optimization_opportunities(self):
        """Identify cost optimization opportunities"""
        opportunities = []
        
        # Check for idle resources
        idle_query = """
        avg(last_1h):avg:system.cpu.user{*} by {host,cloud} < 5
        """
        
        idle_hosts = api.Metric.query(
            from_time=int(time.time()) - 3600,
            to_time=int(time.time()),
            query=idle_query
        )
        
        for series in idle_hosts['series']:
            if series['pointlist'][-1][1] < 5:  # CPU < 5%
                opportunities.append({
                    'type': 'idle_resource',
                    'resource': series['scope'],
                    'recommendation': 'Consider downsizing or terminating',
                    'potential_savings': 'High'
                })
        
        return opportunities
```

---

## 🔗 Official Documentation Links

### Datadog Resources
- [Datadog Documentation](https://docs.datadoghq.com/)
- [Azure Integration](https://docs.datadoghq.com/integrations/azure/)
- [AWS Integration](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [GCP Integration](https://docs.datadoghq.com/integrations/google_cloud_platform/)
- [APM Setup](https://docs.datadoghq.com/tracing/)
- [Log Management](https://docs.datadoghq.com/logs/)
- [Dashboards](https://docs.datadoghq.com/dashboards/)
- [Monitors & Alerts](https://docs.datadoghq.com/monitors/)
- [API Reference](https://docs.datadoghq.com/api/latest/)

### Azure Monitor Resources
- [Azure Monitor Overview](https://docs.microsoft.com/en-us/azure/azure-monitor/)
- [Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview)
- [Azure Monitor REST API](https://docs.microsoft.com/en-us/rest/api/monitor/)
- [Datadog Azure Integration](https://docs.microsoft.com/en-us/azure/partner-solutions/datadog/)

### Cloud Provider Monitoring
- [AWS CloudWatch](https://docs.aws.amazon.com/cloudwatch/)
- [Google Cloud Operations](https://cloud.google.com/products/operations)
- [Azure Monitor Metrics](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/data-platform-metrics)

---

## 🎯 Best Practices

### 1. Tagging Strategy
```yaml
# Consistent tagging across all clouds
tags:
  # Required tags
  - environment: production|staging|development
  - service: figma-to-code
  - version: 1.0.0
  - cloud: azure|aws|gcp
  - region: us-east-1|eastus|us-central1
  - team: platform|frontend|backend
  
  # Optional tags
  - cost-center: engineering
  - project: workshop
  - owner: team-email@company.com
```

### 2. Log Aggregation
```javascript
// Structured logging format
const logger = require('winston');
const datadogWinston = require('datadog-winston');

logger.add(
  new datadogWinston({
    apiKey: process.env.DD_API_KEY,
    hostname: process.env.HOSTNAME,
    service: 'figma-to-code',
    ddsource: 'nodejs',
    ddtags: `env:${process.env.NODE_ENV},cloud:${process.env.CLOUD_PROVIDER}`,
  })
);

// Consistent log format
logger.info('Request processed', {
  requestId: req.id,
  userId: req.user.id,
  action: 'create_project',
  duration: responseTime,
  status: res.statusCode,
  cloud: process.env.CLOUD_PROVIDER
});
```

### 3. Custom Metrics
```python
# Custom business metrics
from datadog import statsd

# Track business KPIs
statsd.increment('figma.projects.created', tags=['cloud:azure'])
statsd.histogram('figma.conversion.time', conversionTime, tags=['step:design_to_code'])
statsd.gauge('figma.active.users', activeUsers, tags=['tier:premium'])

# Track feature usage
statsd.increment('figma.feature.usage', tags=['feature:ai_generation', 'cloud:aws'])
```

---

## 🚀 Getting Started Checklist

- [ ] Create Datadog account and get API keys
- [ ] Set up Azure Monitor workspace
- [ ] Configure cloud provider integrations
- [ ] Deploy Datadog agents to all environments
- [ ] Create unified dashboards
- [ ] Set up alerting rules
- [ ] Configure SLOs
- [ ] Implement auto-remediation workflows
- [ ] Set up cost tracking
- [ ] Train team on Datadog usage

---

## 🎯 Next Steps

**Your multi-cloud observability platform is ready!** Continue improving:

1. **Advanced APM** - Implement distributed tracing
2. **Security Monitoring** - Add SIEM capabilities
3. **Synthetic Monitoring** - Set up user journey tests
4. **RUM (Real User Monitoring)** - Track frontend performance

---

## 🗺️ Navigation

- **Related Guides**: [Deployment Guide](deployment_guide.md) | [Testing Guide](testing_guide.md)
- **Cloud Providers**: [Azure](https://azure.microsoft.com) | [AWS](https://aws.amazon.com) | [Google Cloud](https://cloud.google.com)
- **Monitoring Tools**: [Datadog](https://www.datadoghq.com) | [Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/)

---

*Last Updated: January 2025*  
*Observability Guide Version: 1.0*

[🏠 Back to Main](../README.md) | [📚 All Guides](./) | [🔍 Monitor Your Success](#) 