$c = [System.IO.File]::ReadAllText('c:\Users\Admin\WebSites\mana_mun\style.css')
Write-Host "File size: $($c.Length)"
Write-Host "agenda muted: $($c.Contains('agenda{position:absolute;bottom:21px;left:22px;color:var(--muted)}'))"
Write-Host "cursor z-index 9999: $($c.Contains('z-index:9999'))"
Write-Host "featured agenda: $($c.Contains('.featured .agenda'))"
Write-Host "logo invert: $($c.Contains('invert(1)'))"
