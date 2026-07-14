$f = 'c:\Users\Admin\WebSites\mana_mun\style.css'
$c = [System.IO.File]::ReadAllText($f)
$marker = '.section-red{background:var(--red)'
$i1 = $c.IndexOf($marker)
$i2 = $c.IndexOf($marker, $i1 + 50)
Write-Host "First at $i1, Second at $i2, Total length $($c.Length)"
if ($i2 -gt 0) {
  $keep = $c.Substring(0, $i2)
  $media480 = '@media(max-width:480px)'
  $tailIdx = $c.LastIndexOf($media480)
  $tail = $c.Substring($tailIdx)
  $final = $keep + "`n" + $tail
  [System.IO.File]::WriteAllText($f, $final)
  Write-Host "Done. New length: $($final.Length)"
} else {
  Write-Host "No duplicate found"
}
