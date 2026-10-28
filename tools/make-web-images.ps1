# Generates web-sized copies of the site's images from the untouched originals in images/.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File tools/make-web-images.ps1
# Needs only Windows PowerShell 5.1 and the built-in System.Drawing library.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'images'
$web = Join-Path $src 'web'
New-Item -ItemType Directory -Force $web | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$maxBytes = 280KB
$report = New-Object System.Collections.ArrayList

function Resize-Region([System.Drawing.Image]$image, [System.Drawing.Rectangle]$region, [int]$width, [int]$height) {
  $bmp = New-Object System.Drawing.Bitmap $width, $height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode = 'HighQuality'
  $g.CompositingQuality = 'HighQuality'
  $g.SmoothingMode = 'HighQuality'
  $attrs = New-Object System.Drawing.Imaging.ImageAttributes
  $attrs.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
  $g.DrawImage($image, (New-Object System.Drawing.Rectangle 0, 0, $width, $height), $region.X, $region.Y, $region.Width, $region.Height, [System.Drawing.GraphicsUnit]::Pixel, $attrs)
  $attrs.Dispose(); $g.Dispose()
  return $bmp
}

# Saves as JPEG, lowering quality from 82 (not below 60) until the file fits $maxBytes.
function Save-Jpeg([System.Drawing.Bitmap]$bitmap, [string]$path) {
  foreach ($quality in 82, 78, 74, 70, 66, 62, 60) {
    $params = New-Object System.Drawing.Imaging.EncoderParameters 1
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$quality)
    $stream = New-Object System.IO.MemoryStream
    $bitmap.Save($stream, $jpegCodec, $params)
    $params.Dispose()
    if ($stream.Length -le $maxBytes -or $quality -eq 60) {
      [System.IO.File]::WriteAllBytes($path, $stream.ToArray())
      $stream.Dispose()
      return $quality
    }
    $stream.Dispose()
  }
}

function Add-Report([string]$path, [string]$note) {
  $file = Get-Item -LiteralPath $path
  [void]$report.Add([pscustomobject]@{ File = $file.FullName.Substring($root.Length + 1); KB = [math]::Round($file.Length / 1KB, 1); Note = $note })
}

# Crop to an aspect ratio (width / height); FocusX/FocusY (0–1) choose which part is kept.
function Get-CropRegion([System.Drawing.Image]$image, $aspect, [double]$focusX = 0.5, [double]$focusY = 0.5) {
  if (-not $aspect) { return New-Object System.Drawing.Rectangle 0, 0, $image.Width, $image.Height }
  if ($image.Width / $image.Height -gt $aspect) {
    $w = [int][math]::Round($image.Height * $aspect)
    return New-Object System.Drawing.Rectangle ([int](($image.Width - $w) * $focusX)), 0, $w, $image.Height
  }
  $h = [int][math]::Round($image.Width / $aspect)
  return New-Object System.Drawing.Rectangle 0, ([int](($image.Height - $h) * $focusY)), $image.Width, $h
}

# --- Photos (contracts/assets.md) ---
$photos = @(
  @{ Name = 'hero'; File = 'hero.jpg'; Aspect = 1.5; Widths = 960, 1440, 1920 },
  @{ Name = 'hero-portrait'; File = 'hero.jpg'; Aspect = 0.8; Widths = 480, 720, 1080 },
  @{ Name = 'women'; File = 'women.jpg'; Widths = 480, 800, 1080 },
  @{ Name = 'community'; File = 'community.jpg'; Aspect = 16 / 9; FocusY = 0.92; Widths = 640, 1280, 1440 },
  @{ Name = 'youth'; File = 'youth.jpg'; Widths = 480, 800, 1200 }
)
foreach ($photo in $photos) {
  $image = [System.Drawing.Image]::FromFile((Join-Path $src $photo.File))
  $focusY = if ($photo.FocusY) { $photo.FocusY } else { 0.5 }
  $region = Get-CropRegion $image $photo.Aspect 0.5 $focusY
  foreach ($width in $photo.Widths) {
    $height = [int][math]::Round($width * $region.Height / $region.Width)
    $bmp = Resize-Region $image $region $width $height
    $out = Join-Path $web ('{0}-{1}.jpg' -f $photo.Name, $width)
    $quality = Save-Jpeg $bmp $out
    Add-Report $out ('{0}x{1}, quality {2}' -f $width, $height, $quality)
    $bmp.Dispose()
  }
  $image.Dispose()
}

# --- Logo, share image and icons (contracts/assets.md) ---
function Save-Png([System.Drawing.Bitmap]$bitmap, [string]$path) {
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function Get-PngBytes([System.Drawing.Bitmap]$bitmap) {
  $stream = New-Object System.IO.MemoryStream
  $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
  $bytes = $stream.ToArray()
  $stream.Dispose()
  return ,$bytes
}

# Draws $image scaled into a square canvas with the given padding fraction.
function New-Icon([System.Drawing.Image]$image, [int]$size, [double]$padding) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode = 'HighQuality'
  $box = $size * (1 - 2 * $padding)
  $scale = [math]::Min($box / $image.Width, $box / $image.Height)
  $w = [int][math]::Round($image.Width * $scale)
  $h = [int][math]::Round($image.Height * $scale)
  $g.DrawImage($image, [int](($size - $w) / 2), [int](($size - $h) / 2), $w, $h)
  $g.Dispose()
  return $bmp
}

function Save-Ico([object[]]$pngs, [int[]]$sizes, [string]$path) {
  $stream = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter $stream
  $writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]$pngs.Count)
  $offset = 6 + 16 * $pngs.Count
  for ($i = 0; $i -lt $pngs.Count; $i++) {
    $writer.Write([byte]$sizes[$i]); $writer.Write([byte]$sizes[$i]); $writer.Write([byte]0); $writer.Write([byte]0)
    $writer.Write([uint16]1); $writer.Write([uint16]32); $writer.Write([uint32]$pngs[$i].Length); $writer.Write([uint32]$offset)
    $offset += $pngs[$i].Length
  }
  foreach ($png in $pngs) { $writer.Write([byte[]]$png) }
  $writer.Flush()
  [System.IO.File]::WriteAllBytes($path, $stream.ToArray())
  $writer.Dispose()
}

$logo = [System.Drawing.Image]::FromFile((Join-Path $src 'logo.jpg'))
$full = New-Object System.Drawing.Rectangle 0, 0, $logo.Width, $logo.Height

# Find the WC mark on a quarter-size copy: rows and columns with ink, minus the bottom-most
# run of rows, which is the logo's built-in "We Can Organization" wordmark.
$step = 4
$small = Resize-Region $logo $full ([int]($logo.Width / $step)) ([int]($logo.Height / $step))
$isInk = { param($c) $c.R -lt 230 -or $c.G -lt 230 -or $c.B -lt 230 }
$runs = New-Object System.Collections.ArrayList
$start = -1
for ($y = 0; $y -lt $small.Height; $y++) {
  $ink = $false
  for ($x = 0; $x -lt $small.Width; $x++) { if (& $isInk $small.GetPixel($x, $y)) { $ink = $true; break } }
  if ($ink -and $start -lt 0) { $start = $y }
  if (-not $ink -and $start -ge 0) { [void]$runs.Add(@($start, ($y - 1))); $start = -1 }
}
if ($start -ge 0) { [void]$runs.Add(@($start, ($small.Height - 1))) }
if ($runs.Count -lt 2) { throw 'Could not separate the WC mark from the wordmark in logo.jpg' }
$top = $runs[0][0]; $bottom = $runs[$runs.Count - 2][1]
$left = $small.Width; $right = 0
for ($y = $top; $y -le $bottom; $y++) {
  for ($x = 0; $x -lt $small.Width; $x++) {
    if (& $isInk $small.GetPixel($x, $y)) { if ($x -lt $left) { $left = $x }; if ($x -gt $right) { $right = $x } }
  }
}
$small.Dispose()
$pad = [int]($logo.Width * 0.02)
$mx = [math]::Max(0, $left * $step - $pad); $my = [math]::Max(0, $top * $step - $pad)
$markRegion = New-Object System.Drawing.Rectangle $mx, $my, ([math]::Min($logo.Width, ($right + 1) * $step + $pad) - $mx), ([math]::Min($logo.Height, ($bottom + 1) * $step + $pad) - $my)
$mark = Resize-Region $logo $markRegion $markRegion.Width $markRegion.Height

foreach ($height in 64, 128, 192) {
  $width = [int][math]::Round($height * $markRegion.Width / $markRegion.Height)
  $bmp = Resize-Region $mark (New-Object System.Drawing.Rectangle 0, 0, $mark.Width, $mark.Height) $width $height
  $out = Join-Path $web ('logo-mark-{0}.png' -f $height)
  Save-Png $bmp $out
  Add-Report $out ('{0}x{1}, mark crop {2}' -f $width, $height, $markRegion)
  $bmp.Dispose()
}

foreach ($width in 240, 480) {
  $bmp = Resize-Region $logo $full $width $width
  $out = Join-Path $web ('logo-full-{0}.png' -f $width)
  Save-Png $bmp $out
  Add-Report $out ('{0}x{0}, complete logo' -f $width)
  $bmp.Dispose()
}

# Share image: complete logo on Paper White (#FAF8F2). Multiplying the logo by that color
# turns its white background into the canvas color, so no white box shows.
$og = New-Object System.Drawing.Bitmap 1200, 630
$g = [System.Drawing.Graphics]::FromImage($og)
$g.Clear([System.Drawing.Color]::FromArgb(250, 248, 242))
$g.InterpolationMode = 'HighQualityBicubic'
$g.PixelOffsetMode = 'HighQuality'
$matrix = New-Object System.Drawing.Imaging.ColorMatrix
$matrix.Matrix00 = 250 / 255; $matrix.Matrix11 = 248 / 255; $matrix.Matrix22 = 242 / 255
$attrs = New-Object System.Drawing.Imaging.ImageAttributes
$attrs.SetColorMatrix($matrix)
$attrs.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
$g.DrawImage($logo, (New-Object System.Drawing.Rectangle 320, 35, 560, 560), 0, 0, $logo.Width, $logo.Height, [System.Drawing.GraphicsUnit]::Pixel, $attrs)
$attrs.Dispose(); $g.Dispose()
$out = Join-Path $web 'og-image.jpg'
$quality = Save-Jpeg $og $out
Add-Report $out ('1200x630, quality {0}' -f $quality)
$og.Dispose()

$icons = Join-Path $src 'icons'
New-Item -ItemType Directory -Force $icons | Out-Null
foreach ($icon in @(@{ Size = 180; Path = (Join-Path $root 'apple-touch-icon.png') }, @{ Size = 192; Path = (Join-Path $icons 'icon-192.png') }, @{ Size = 512; Path = (Join-Path $icons 'icon-512.png') })) {
  $bmp = New-Icon $mark $icon.Size 0.12
  Save-Png $bmp $icon.Path
  Add-Report $icon.Path ('{0}x{0}, mark on white' -f $icon.Size)
  $bmp.Dispose()
}
$pngs = @()
foreach ($size in 32, 48) {
  $bmp = New-Icon $mark $size 0.06
  $pngs += ,(Get-PngBytes $bmp)
  $bmp.Dispose()
}
$out = Join-Path $root 'favicon.ico'
Save-Ico $pngs @(32, 48) $out
Add-Report $out '32x32 and 48x48 PNG inside ICO'
$mark.Dispose(); $logo.Dispose()

$report | Format-Table -AutoSize | Out-String -Width 200
$over = @($report | Where-Object { $_.KB -gt 300 })
if ($over.Count) { Write-Warning "$($over.Count) file(s) exceed 300 KB"; exit 1 }
