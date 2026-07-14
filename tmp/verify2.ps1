$c = [System.IO.File]::ReadAllText('c:\Users\Admin\WebSites\mana_mun\pages.css')
Write-Host "pages.css size: $($c.Length)"
Write-Host "logo invert: $($c.Contains('invert(1)'))"
Write-Host "committee-card cursor none: $($c.Contains('cursor:none'))"
Write-Host "marquee 28s: $($c.Contains('28s'))"
