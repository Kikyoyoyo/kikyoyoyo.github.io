# 在项目根目录执行: .\build_and_run.ps1
# 默认复用已有镜像。强制重建: .\build_and_run.ps1 -Build
# 依赖: Docker + Docker Compose v2（docker compose）
param(
    [switch]$Build
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
if ($Build) {
    docker compose up --build
} else {
    docker compose up
}
