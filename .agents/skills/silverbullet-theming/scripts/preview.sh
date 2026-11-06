#!/usr/bin/env bash
# Throwaway, auth-less SilverBullet for visual checks. The space folder is mounted read-only.
#
#   preview.sh start <space-dir> [--port 3399] [--prefix /notes] [--image IMAGE] [--name sb-theme-preview]
#   preview.sh stop  [--name sb-theme-preview]
#
# Match production: same --image tag (version) and --prefix (URL prefix). On success, prints the base URL.
set -euo pipefail

cmd=${1:-}
shift || true
name=sb-theme-preview
port=3399
prefix=""
image=${SB_IMAGE:-ghcr.io/silverbulletmd/silverbullet:latest}
space=""
while [ $# -gt 0 ]; do
  case $1 in
    --port) port=$2; shift 2 ;;
    --prefix) prefix=${2%/}; shift 2 ;;
    --image) image=$2; shift 2 ;;
    --name) name=$2; shift 2 ;;
    *) space=$1; shift ;;
  esac
done

[ -z "$prefix" ] || [ "${prefix#/}" != "$prefix" ] || prefix="/$prefix"   # ensure a leading slash

case $cmd in
  start)
    [ -d "$space" ] || { echo "usage: $0 start <space-dir> [...]" >&2; exit 2; }
    docker rm -f "$name" >/dev/null 2>&1 || true
    args=(-d --name "$name" -p "127.0.0.1:$port:3000"
      -e SB_FOLDER=/space -e SB_DISABLE_SERVICE_WORKER=1
      -v "$(cd "$space" && pwd)":/space:ro)
    [ -n "$prefix" ] && args+=(-e "SB_URL_PREFIX=$prefix")
    docker run "${args[@]}" "$image" >/dev/null
    url="http://127.0.0.1:$port$prefix"
    for _ in $(seq 60); do
      if curl -sf -o /dev/null "$url/.client/main.css"; then echo "$url"; exit 0; fi
      sleep 1
    done
    echo "SilverBullet did not come up at $url" >&2
    docker logs --tail 30 "$name" >&2
    exit 1
    ;;
  stop)
    docker rm -f "$name" >/dev/null && echo "removed $name"
    ;;
  *)
    sed -n '2,7p' "$0" >&2
    exit 2
    ;;
esac
