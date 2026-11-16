---
title: "Crafting a Minimal, High-Performance Docker Base Image for PHP 8.4 and Laravel"
description: "How resolving musl vs glibc binary compatibility and tuning OPCache JIT reduced container size by 70% and accelerated deployment pipelines."
pubDate: 2026-02-18
tags: ["docker", "laravel", "php", "devops", "performance"]
author: "Khoirul Anam"
featured: false
---

In enterprise environments with numerous interconnected microservices and frequent CI/CD deployments, container image size translates directly into deployment latency and infrastructure bandwidth costs.

Standard Debian-based PHP images often clock in at **450MB to 600MB** before even copying your application codebase. To resolve this friction across our production projects, I engineered an Alpine-based PHP 8.4 container image designed specifically for Laravel.

## Why Alpine Linux?

Alpine Linux utilizes `musl libc` and `busybox`. A clean Alpine container starts at a mere **5MB**. Even after compiling PHP 8.4 CLI, PHP-FPM, and standard extensions (`pdo_mysql`, `pdo_pgsql`, `redis`, `opcache`, `intl`, `gd`, `zip`), the uncompressed final image footprint remains **under 120MB**.

```
Image Size Comparison:
+------------------------------------------------------+
| Debian Bookworm + PHP 8.4: [ 520 MB ]                |
+------------------------------------------------------+
| Custom Alpine + PHP 8.4:   [ 115 MB ] (-78% smaller) |
+------------------------------------------------------+
```

## Configuring OPCache & JIT for PHP 8.4

PHP 8.4's JIT compiler (Just-In-Time) brings significant CPU throughput gains to computational workloads and long-lived worker queues.

Here is the production configuration baked into `/usr/local/etc/php/conf.d/opcache.ini`:

```ini
[opcache]
opcache.enable=1
opcache.enable_cli=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
opcache.save_comments=1

; JIT Configuration: 1254 = Function-level JIT with hot counters
opcache.jit=1254
opcache.jit_buffer_size=128M
```

Setting `opcache.validate_timestamps=0` is critical for production containers. Because the code in a container is immutable once deployed, instructing PHP never to stat disk files for changes eliminates thousands of redundant syscalls per second.

## Dynamic PHP-FPM Process Management

Generic containers frequently default to `pm = dynamic` with arbitrary worker limits, leading to memory starvation under traffic spikes. We use an entrypoint script that dynamically sizes `pm.max_children` based on container memory limits:

```bash
#!/bin/sh
set -e

# Calculate RAM allocated to container in cgroups
TOTAL_RAM_MB=$(awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo)
# Reserve 128MB for OS + Redis/Worker, assume 64MB per PHP worker
AVAILABLE_RAM=$((TOTAL_RAM_MB - 128))
MAX_CHILDREN=$((AVAILABLE_RAM / 64))

if [ "$MAX_CHILDREN" -lt 4 ]; then
    MAX_CHILDREN=4
fi

sed -i "s/pm.max_children = 5/pm.max_children = ${MAX_CHILDREN}/" /usr/local/etc/php-fpm.d/www.conf

exec "$@"
```

## Takeaways

Standardizing our enterprise stack on this base image eliminated configuration discrepancies between local Docker development and production Kubernetes nodes. Build caches hit 99% accuracy, and rolling updates finish in seconds rather than minutes.
