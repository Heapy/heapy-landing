# Heapy landing

The Heapy ecosystem story at https://heapy.io/ and the Komok companion page at
https://heapy.io/komok/. Static HTML, CSS and JavaScript, with no build dependencies.

## Preview

```sh
python3 -m http.server 4174 --directory docs
```

Open http://localhost:4174/. See [the story guide](docs/STORY.md) for content edits.
The original product narrative stays in [Komok](https://github.com/Heapy/komok/blob/main/docs/landing.md).

## Container and release

```sh
node --check docs/app.js
node --check docs/komok/site.js
docker build -t heapy-landing:test .
bash smoke-test.sh heapy-landing:test
```

The Landing workflow checks each change and publishes main to
`ghcr.io/heapy/heapy-landing:main` and `sha-<commit>` for amd64 and arm64.
The image serves both pages on port 80 and exposes `/healthz`. Markdown documentation
is excluded from the image. Missing paths return 404.

Production runs the `heapy_io_root` service in `heapy-configuration/schwifty-server`.
After publishing, pull and recreate only that service:

```sh
docker compose pull heapy_io_root
docker compose up -d --no-deps heapy_io_root
docker compose exec -T heapy_io_root wget -qO- http://127.0.0.1/healthz
```

To roll back, select a previous `sha-<commit>` image in Compose and recreate the service.
The files can also be served by GitHub Pages from `main` → `/docs`.
