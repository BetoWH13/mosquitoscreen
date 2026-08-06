param(
  [string]$SiteRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string]$OutputPath = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'docs\preservation-manifest.json')
)

$ErrorActionPreference = 'Stop'
$canonicalHost = 'https://www.mosquitoscreen.net'
$pages = Get-ChildItem -LiteralPath $SiteRoot -Recurse -Filter '*.html' -File |
  Where-Object { $_.FullName -notmatch '[\\/]docs[\\/]' } |
  Sort-Object FullName

$manifestPages = foreach ($page in $pages) {
  $html = Get-Content -LiteralPath $page.FullName -Raw
  $relativePath = $page.FullName.Substring($SiteRoot.Length + 1).Replace('\', '/')
  $livePath = if ($relativePath -eq 'index.html') { '/' } else { "/$relativePath" }

  $title = if ($html -match '(?is)<title>(.*?)</title>') { $matches[1].Trim() } else { $null }
  $description = if ($html -match '(?is)<meta\s+name=["'']description["'']\s+content=["'']([^"'']*)["'']') { $matches[1].Trim() } else { $null }
  $canonical = if ($html -match '(?is)<link\s+rel=["'']canonical["'']\s+href=["'']([^"'']*)["'']') { $matches[1].Trim() } else { $null }
  $h1 = [regex]::Matches($html, '(?is)<h1[^>]*>(.*?)</h1>') | ForEach-Object { ([regex]::Replace($_.Groups[1].Value, '<[^>]+>', '')).Trim() }
  $hrefs = [regex]::Matches($html, '(?is)<a\s+[^>]*href=["'']([^"'']+)["'']') | ForEach-Object { $_.Groups[1].Value }
  $affiliateLinks = @($hrefs | Where-Object { $_ -match '^https://(?:amzn\.to|(?:www\.)?amazon\.)' })
  $internalLinks = @($hrefs | Where-Object { $_ -notmatch '^(?:https?:|mailto:|tel:|#|javascript:)' } | Sort-Object -Unique)

  [ordered]@{
    source_path = $relativePath
    live_url = "$canonicalHost$livePath"
    title = $title
    meta_description = $description
    canonical = $canonical
    h1 = @($h1)
    affiliate_links = $affiliateLinks
    internal_links = $internalLinks
    preservation_action = if ($relativePath -eq 'bed-nets.html') { '301 to /mosquito-net-for-bed.html' } else { 'retain exact URL' }
  }
}

$affiliateTargets = @($manifestPages.affiliate_links | ForEach-Object { $_ } | Sort-Object -Unique)
$manifest = [ordered]@{
  captured_at_utc = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
  source_commit = (git -C $SiteRoot rev-parse HEAD).Trim()
  canonical_host = $canonicalHost
  preservation_policy = [ordered]@{
    retain_existing_html_paths = $true
    affiliate_destinations_must_not_change = $true
    legacy_redirects = [ordered]@{ '/bed-nets.html' = '/mosquito-net-for-bed.html' }
  }
  summary = [ordered]@{
    html_page_count = @($manifestPages).Count
    affiliate_placement_count = @($manifestPages | ForEach-Object { $_.affiliate_links.Count } | Measure-Object -Sum).Sum
    unique_affiliate_target_count = $affiliateTargets.Count
  }
  affiliate_targets = $affiliateTargets
  pages = @($manifestPages)
}

$outputDirectory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $OutputPath -Encoding utf8
Write-Output "Captured $($manifest.summary.html_page_count) pages and $($manifest.summary.unique_affiliate_target_count) unique affiliate targets in $OutputPath"
