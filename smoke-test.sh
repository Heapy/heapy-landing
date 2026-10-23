#!/usr/bin/env bash
set -euo pipefail

image="${1:-heapy-landing:test}"
container="$(docker run -d "$image")"
trap 'docker rm -f "$container" >/dev/null' EXIT

for attempt in $(seq 1 30); do
    if docker exec "$container" wget -q -O /dev/null http://127.0.0.1/healthz; then
        break
    fi
    sleep 1
done

docker exec "$container" nginx -t
docker exec "$container" sh -eu -c '
    wget -qO- http://127.0.0.1/healthz | grep -qx ok
    wget -qO- http://127.0.0.1/ | grep -q "Everything flows into"
    wget -qO- http://127.0.0.1/komok/ | grep -q "Your plans, knowledge and memories"
    for asset in favicon.svg app.js style.css komok/site.js komok/style.css komok/assets/favicon.svg komok/assets/komok-stream.png komok/assets/komok-library.png; do
        wget -q -O /dev/null "http://127.0.0.1/$asset"
    done
    for path in missing/nested/page komok/missing STORY.md docs/architecture.md .git/config; do
        if wget -S -O /tmp/missing "http://127.0.0.1/$path" 2>/tmp/response; then
            echo "Expected 404 for $path" >&2
            exit 1
        fi
        grep -q "HTTP/1.1 404" /tmp/response
    done
'
printf 'Landing container checks passed.\n'
