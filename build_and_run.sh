#!/usr/bin/env bash
# 在项目根目录执行: bash ./build_and_run.sh
# 依赖: Docker + Docker Compose v2（docker compose）
# 默认复用已有镜像（快）。改 Dockerfile/想强制重建镜像时: bash ./build_and_run.sh --build
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ "${1:-}" = "--build" ] || [ "${1:-}" = "-b" ]; then
  docker compose up --build
else
  docker compose up
fi
