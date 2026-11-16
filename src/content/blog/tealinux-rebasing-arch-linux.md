---
title: "Rebasing an OS Distribution: Lessons from Migrating TeaLinux OS to Arch"
description: "Why we decided to transition TeaLinux OS from an Ubuntu/Xubuntu base to Arch Linux, and how we engineered reproducible package builds."
pubDate: 2026-03-05
tags: ["linux", "arch", "os-dev", "tealinux", "sysadmin"]
author: "Khoirul Anam"
featured: true
---

For over a decade, **TeaLinux OS** served Indonesian university campuses, coding bootcamps, and novice software developers as a Debian/Xubuntu derivative. It came pre-configured with development SDKs, local web servers, and an easy installer.

However, maintainers were battling recurring upstream Debian/Ubuntu friction: frozen package versions, PPA dependency breakage, and prolonged point-release delay cycles. In 2023–2024, the core engineering team made a foundational architectural decision: **rebase TeaLinux OS onto Arch Linux**.

## The Problem with Fixed Point Releases

In rapid tech ecosystems—where PHP, Node.js, Rust, and Python introduce major syntax revisions every 12 months—relying on a 2-year fixed LTS base creates friction for students and developers. Users frequently added unofficial PPAs that inevitably broke during standard `apt upgrade` runs.

Arch Linux offered compelling fundamentals:
- **Rolling Releases:** Constant access to latest toolchains without OS reinstalls.
- **Upstream Purity:** Minimal downstream patching of packages.
- **PKGBUILD & Pacman:** Extremely transparent, single-shell-script packaging compared to Debian source packages (`debian/rules`, `control`, `changelog`).

```
Legacy Architecture (Xubuntu Base):
[ Upstream Debian ] -> [ Ubuntu LTS ] -> [ PPAs / Custom Repos ] -> [ TeaLinux ]
                                               (Dependency Conflicts!)

Modern Architecture (Arch Base):
[ Upstream Arch ] -> [ TeaLinux Meta-Packages & Dotfiles ] -> [ Modern Rolling OS ]
```

## Designing the Custom Package Repository

Rather than fork every package, TeaLinux OS maintains an overlay repository providing:
1. Custom branding and installer scripts (`calamares` configuration).
2. Desktop environment presets (Cosmic Desktop & KDE Plasma).
3. Pre-configured developer environments (`tealinux-ide`, `tealinux-lamp`, `tealinux-rust`).

Here is an example `PKGBUILD` structure used for our environment orchestrator:

```bash
# Maintainer: Dinus Open Source Community <dosc@dinus.ac.id>
pkgname=tealinux-dev-meta
pkgver=2.1.0
pkgrel=1
pkgdesc="TeaLinux OS Developer Suite Meta Package"
arch=('x86_64')
url="https://github.com/tealinuxos"
license=('GPL3')
depends=(
    'git'
    'curl'
    'docker'
    'docker-compose'
    'neovim'
    'zsh'
    'base-devel'
    'linux-headers'
)

package() {
    install -d "${pkgdir}/etc/skel/.config"
    install -m 644 configs/zshrc "${pkgdir}/etc/skel/.zshrc"
}
```

## Automated ISO Generation with `archiso`

We automated our build pipelines using `mkarchiso`. A standard GitHub Actions matrix tests ISO creation on every release candidate tag:

```bash
# Create working profile
cp -r /usr/share/archiso/configs/releng/ tealinux-profile
cd tealinux-profile

# Inject custom packages & mirrors
echo "tealinux-keyring" >> packages.x86_64
echo "tealinux-desktop-cosmic" >> packages.x86_64

# Generate bootable hybrid ISO
sudo mkarchiso -v -w /tmp/archiso-tmp -o ./out .
```

## Key Takeaways

1. **Keep Downstream Deltas Small:** The fewer packages you fork from upstream, the easier your rolling release pipeline is to maintain.
2. **Standardize User Configurations in `/etc/skel`:** Avoid overwriting user dotfiles in `/home`. Provide clean skeletons that can be restored.
3. **Decouple the Desktop Environment:** Transitioning to Arch allowed us to introduce multiple DE spin-offs, including Cosmic (Rust-based) and KDE Plasma, without branching our core base.
