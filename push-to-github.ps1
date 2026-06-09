Param(
  [Parameter(Mandatory=$true)] [string]$RemoteUrl,
  [string]$Branch = "main",
  [string]$CommitMessage = "Fix: remove stray text before DOCTYPE; fix IIFE syntax"
)

function Check-Git {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not on PATH. Install Git and re-run this script."
    exit 1
  }
}

Check-Git

Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

try {
  if (-not (Test-Path -Path ".git")) {
    git init
    Write-Host "Initialized new git repository."
  }

  $remotes = git remote
  if ($remotes -notcontains 'origin') {
    git remote add origin $RemoteUrl
    Write-Host "Added remote origin -> $RemoteUrl"
  } else {
    git remote set-url origin $RemoteUrl
    Write-Host "Set origin URL -> $RemoteUrl"
  }

  git add -A
  git commit -m "$CommitMessage" 2>$null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "No changes to commit or commit failed. Continuing to push."
  } else {
    Write-Host "Committed changes."
  }

  git push -u origin $Branch
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushed to origin/$Branch successfully."
  } else {
    Write-Error "Push failed. Check your remote URL, authentication, and network."
    exit 1
  }
} catch {
  Write-Error "An error occurred: $_"
  exit 1
}

Write-Host "Done."
