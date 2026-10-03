"""A deliberately hostile raw-socket web server: hangs, resets, garbage, endless bodies, slow-loris, loops, truncation, gzip bomb."""
import asyncio, gzip, threading

GOOD = b"<html><head><title>Good Roofing</title><meta name='viewport' content='width=device-width'></head><body><h1>Roofing Contractor</h1><p>Roof repair, roof replacement and shingles. Free estimate. Call today. Serving Austin TX with quality roofing for years and years of happy customers.</p><a href='tel:5125550100'>call</a></body></html>"


_BOMB = []


def _bomb():
    if not _BOMB:                                        # compress once (it is ~300 MB uncompressed), not on every request
        _BOMB.append(gzip.compress(b"<html><body>" + b"roofing " * 40_000_000, 3))
    return _BOMB[0]


async def handle(reader, writer):
    try:
        head = await asyncio.wait_for(reader.readuntil(b"\r\n\r\n"), 5)
    except Exception:
        writer.close(); return
    host = ""
    for ln in head.split(b"\r\n"):
        if ln.lower().startswith(b"host:"):
            host = ln.split(b":", 1)[1].strip().decode().split(":")[0]
    kind = host.split(".")[0].split("-")[0]
    path = head.split(b" ")[1]
    try:
        if path == b"/robots.txt":
            writer.write(b"HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"); await writer.drain()
        elif kind == "hang":
            await asyncio.sleep(120)
        elif kind == "reset":
            writer.transport.abort(); return
        elif kind == "garbage":
            writer.write(b"\x16\x03\x01\x00\xa5\x01\x00\x00\xa1\x03\x03garbage-not-http\r\n\r\n"); await writer.drain()
        elif kind == "huge":
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nConnection: close\r\n\r\n<html><body>")
            for _ in range(4000):                       # up to ~250 MB if the client were naive
                writer.write(b"roof repair " * 5000); await writer.drain()
        elif kind == "slowloris":
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nConnection: close\r\n\r\n")
            for _ in range(200):
                writer.write(b"<p>x</p>"); await writer.drain(); await asyncio.sleep(1)
        elif kind == "loop":
            writer.write(b"HTTP/1.1 302 Found\r\nLocation: /\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"); await writer.drain()
        elif kind == "truncated":
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: 5000\r\nConnection: close\r\n\r\n<html><body>cut off"); await writer.drain()
        elif kind == "gzipbomb":
            body = _bomb()
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Encoding: gzip\r\nContent-Length: %d\r\nConnection: close\r\n\r\n" % len(body) + body); await writer.drain()
        elif kind == "bigheader":
            writer.write(b"HTTP/1.1 200 OK\r\nX-Big: " + b"a" * 200000 + b"\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"); await writer.drain()
        elif kind == "binary":
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: 3000\r\nConnection: close\r\n\r\n" + bytes(range(256)) * 12); await writer.drain()
        elif kind == "crashme":
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: %d\r\nConnection: close\r\n\r\n" % len(GOOD) + GOOD); await writer.drain()
        else:
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: %d\r\nConnection: close\r\n\r\n" % len(GOOD) + GOOD); await writer.drain()
    except Exception:
        pass
    finally:
        try:
            writer.close()
        except Exception:
            pass


class Chaos:
    def start(self):
        ready = threading.Event()

        def run():
            self.loop = asyncio.new_event_loop(); asyncio.set_event_loop(self.loop)
            srv = self.loop.run_until_complete(asyncio.start_server(handle, "127.0.0.1", 0, limit=2**20))
            self.port = srv.sockets[0].getsockname()[1]
            ready.set(); self.loop.run_forever()
        _bomb()
        threading.Thread(target=run, daemon=True).start(); ready.wait(10)
        return self
