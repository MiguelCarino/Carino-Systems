param (
    [string]$Arg1,
    [string[]]$AdditionalArgs  # Collects all additional arguments
)

function Invoke-ScriptFromURL {
    param (
        [string]$Url,
        [string]$Arguments
    )

    $TempScript = [System.IO.Path]::GetTempFileName() + ".ps1"
    Invoke-WebRequest -Uri $Url -UseBasicParsing | Select-Object -ExpandProperty Content | Set-Content -Path $TempScript
    & $TempScript @Arguments  # Execute the script with arguments
    Remove-Item -Path $TempScript -Force  # Clean up
}

if ($Arg1) {
    switch -Wildcard ($Arg1) {
        "*setup*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleSetup/setup.ps1" -Arguments ($AdditionalArgs -join " ")
        }
        "*vp9*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleTranscoding/transcode.ps1" -Arguments ($AdditionalArgs -join " ")
        }
        "*av1*" {
            Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleTranscoding/transcode.ps1" -Arguments ($AdditionalArgs -join " ")
        }
        "test" {
            if (Test-Path "./test.ps1") {
                Write-Host "Running test.ps1..."
                & "./test.ps1" @AdditionalArgs
            } else {
                Write-Host "test.ps1 not found!"
            }
        }
        default {
            Write-Host "No valid option provided."
        }
    }
} else {
    Invoke-ScriptFromURL -Url "https://miguelcarino.github.io/SimpleSetup/setup.ps1"
}
