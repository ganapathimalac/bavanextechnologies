#Requires -Version 5.1
<#
.SYNOPSIS
  Deploy Bavanex Technologies website to Azure App Service (Linux + Docker)

.PREREQUISITES
  1. Azure CLI:  winget install Microsoft.AzureCLI
  2. Login:       az login
  3. Docker Desktop running (for container deploy)

.PARAMETER ResourceGroup
  Azure resource group name (created if missing)

.PARAMETER Location
  Azure region, e.g. eastus, centralindia

.PARAMETER AppName
  Globally unique app name (used in *.azurewebsites.net URL)

.EXAMPLE
  .\scripts\deploy-azure.ps1 -ResourceGroup rg-bavanex -AppName bavanex-technologies
#>

param(
  [string]$ResourceGroup = "rg-bavanex-prod",
  [string]$Location = "eastus",
  [string]$AppName = "bavanex-technologies",
  [string]$Domain = "bavanextechnologies.com",
  [string]$Sku = "B1"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "==> Checking Azure CLI..." -ForegroundColor Cyan
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
  throw "Azure CLI not found. Install: winget install Microsoft.AzureCLI"
}

$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
  Write-Host "Please login to Azure..."
  az login
}

Write-Host "==> Creating resource group: $ResourceGroup" -ForegroundColor Cyan
az group create --name $ResourceGroup --location $Location --output none

Write-Host "==> Creating App Service plan (Linux)..." -ForegroundColor Cyan
az appservice plan create `
  --name "${AppName}-plan" `
  --resource-group $ResourceGroup `
  --location $Location `
  --is-linux `
  --sku $Sku `
  --output none

Write-Host "==> Creating Web App (container)..." -ForegroundColor Cyan
az webapp create `
  --resource-group $ResourceGroup `
  --plan "${AppName}-plan" `
  --name $AppName `
  --deployment-container-image-name "nginx" `
  --output none 2>$null

# Switch to Docker container from ACR or local build via zip deploy alternative
# Build and push to Azure Container Registry (recommended for production)

$AcrName = "${AppName}acr".ToLower() -replace '[^a-z0-9]', ''
Write-Host "==> Creating Azure Container Registry: $AcrName" -ForegroundColor Cyan
az acr create --resource-group $ResourceGroup --name $AcrName --sku Basic --admin-enabled true --output none 2>$null

Write-Host "==> Building Docker image..." -ForegroundColor Cyan
Set-Location $ProjectRoot
az acr build --registry $AcrName --image bavanex-web:latest --file Dockerfile .

$AcrPassword = az acr credential show --name $AcrName --query "passwords[0].value" -o tsv
$AcrLoginServer = az acr show --name $AcrName --query loginServer -o tsv

Write-Host "==> Configuring Web App container..." -ForegroundColor Cyan
az webapp config container set `
  --name $AppName `
  --resource-group $ResourceGroup `
  --docker-custom-image-name "${AcrLoginServer}/bavanex-web:latest" `
  --docker-registry-server-url "https://${AcrLoginServer}" `
  --docker-registry-server-user $AcrName `
  --docker-registry-server-password $AcrPassword `
  --output none

Write-Host "==> Setting app settings..." -ForegroundColor Cyan
az webapp config appsettings set `
  --resource-group $ResourceGroup `
  --name $AppName `
  --settings `
    NEXT_PUBLIC_SITE_URL="https://$Domain" `
    WEBSITES_PORT=8080 `
    NODE_ENV=production `
  --output none

az webapp config set `
  --resource-group $ResourceGroup `
  --name $AppName `
  --always-on true `
  --http20-enabled true `
  --output none

Write-Host "==> Enabling HTTPS only..." -ForegroundColor Cyan
az webapp update --resource-group $ResourceGroup --name $AppName --set httpsOnly=true --output none

$DefaultHost = az webapp show --resource-group $ResourceGroup --name $AppName --query defaultHostName -o tsv

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " DEPLOYMENT COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "App URL:  https://$DefaultHost"
Write-Host ""
Write-Host "CUSTOM DOMAIN ($Domain) — configure in Azure Portal:" -ForegroundColor Yellow
Write-Host "  1. App Service > Custom domains > Add custom domain"
Write-Host "  2. Add: $Domain and www.$Domain"
Write-Host "  3. DNS records at your registrar:"
Write-Host "       CNAME  www  ->  $DefaultHost"
Write-Host "       ALIAS/A  @  ->  (use Azure IP from portal for apex)"
Write-Host "  4. App Service > TLS/SSL > Create managed certificate (free)"
Write-Host "  5. Add binding for HTTPS on both hostnames"
Write-Host ""
