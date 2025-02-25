param (
    [string]$Arg1
)

function Invoke-ScriptFromURL {
    param (
        [string]$Url,
        [string]$Arguments
    )
    
    $ScriptContent = Invoke-WebRequest -Uri $Url -UseBasicParsing | Select-Object -ExpandProperty Content
    Invoke-Expression "$ScriptContent $Arguments"
}

if ($Arg1) {
    switch -Wildcard ($Arg1) {
        "*setup*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleSetup/setup.ps1" -Arguments ($args -join " ")
        }
        "*vp9*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleTranscoding/transcode.ps1" -Arguments ($args -join " ")
        }
        "*av1*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleTranscoding/transcode.ps1" -Arguments ($args -join " ")
        }
        default {
            Write-Host "No valid option provided."
        }
    }
} else {
    Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleSetup/setup.ps1"
}
