---
title: "Architecting High-Availability Virtualization with Proxmox VE & Mirrored ZFS Pools"
description: "A technical guide to provisioning fault-tolerant virtualization clusters, tuning ZFS ARC, and automating snapshot disaster recovery."
pubDate: 2026-04-12
tags: ["infrastructure", "proxmox", "zfs", "linux", "virtualization"]
author: "Khoirul Anam"
featured: true
---

Designing institutional infrastructure requires balancing raw I/O throughput against rigorous data redundancy. When deploying hypervisors supporting multi-tenant workloads—such as a 60-user Nextcloud private cloud and containerized services—bare-metal reliability is paramount.

Here is an architectural breakdown of how I designed and deployed high-availability virtualization utilizing **Proxmox VE** and **ZFS** mirrored pools at Universitas Diponegoro (UNDIP).

## Hardware Topology & Storage Layout

A resilient storage layer starts with avoiding hardware RAID controllers that obfuscate drive health. ZFS requires direct HBA (Host Bus Adapter) access in IT (Initiator Target) mode to manage physical disk blocks, perform checksum verifications, and orchestrate self-healing scrubs.

```
+-----------------------------------------------------------+
|                      Proxmox VE 8.x                       |
|   +-------------------+              +----------------+   |
|   | Nextcloud VM      |              | Local LLM / AI |   |
|   | (ZFS Pool: data)  |              | (GPU Passthrough)  |
|   +-------------------+              +----------------+   |
+-----------------------------------------------------------+
                              |
                     [ Mirrored ZFS vdev ]
                 +-----------+   +-----------+
                 | NVMe / SAS|   | NVMe / SAS|
                 |  Disk 0   |   |  Disk 1   |
                 +-----------+   +-----------+
```

### ZFS Pool Creation & Baseline Tuning

When initializing the mirrored storage pool, setting the right dataset properties from day one prevents performance degradation:

```bash
# Create mirrored zpool with 4K sector alignment (ashift=12)
zpool create -f -o ashift=12 rpool mirror /dev/disk/by-id/nvme-disk0 /dev/disk/by-id/nvme-disk1

# Enable modern ZSTD compression
zfs set compression=zstd rpool

# Disable unnecessary access time updates to prevent write amplification
zfs set atime=off rpool

# Set standard recordsize (16k for databases, 1M for sequential bulk media)
zfs set recordsize=128k rpool/data
```

## Memory Allocation & ARC Management

By default, ZFS can consume up to 50% of host RAM for its Adaptive Replacement Cache (ARC). On a hypervisor running dense guest VMs, memory contention between KVM and the ZFS ARC will trigger the kernel OOM killer if left unconstrained.

To cap ARC usage to 16GB on a 64GB node, create `/etc/modprobe.d/zfs.conf`:

```ini
# /etc/modprobe.d/zfs.conf
# 16 GB max ARC (16 * 1024 * 1024 * 1024)
options zfs zfs_arc_max=17179869184

# 4 GB min ARC
options zfs zfs_arc_min=4294967296
```

Rebuild the initramfs after modifying module parameters:

```bash
update-initramfs -u -k all
```

## Automated Disaster Recovery with Sanoid

Snapshots are instantaneous and copy-on-write in ZFS, but snapshots alone do not prevent data loss if the underlying hardware fails. A robust policy requires:
1. Hourly snapshots retained for 48 hours.
2. Daily snapshots retained for 30 days.
3. Monthly snapshots retained for 1 year.
4. Remote block-level replication via `syncoid`.

```ini
# /etc/sanoid/sanoid.conf
[rpool/data/nextcloud]
    use_template = production
    recursive = yes

[template_production]
    hourly = 36
    daily = 30
    monthly = 12
    yearly = 1
    autosnap = yes
    autoprune = yes
```

## Enabling PCIe GPU Passthrough for Local AI

For research and local LLM execution, assigning a physical PCIe GPU directly to a guest VM bypasses host hypervisor overhead:

1. Enable `intel_iommu=on` or `amd_iommu=on iommu=pt` in `/etc/default/grub`.
2. Blacklist proprietary host drivers (`nouveau`, `nvidia*`).
3. Bind the GPU PCIe device IDs to `vfio-pci`.

The result is near-native GPU compute speeds inside an isolated virtual machine, protected by the snapshotting and self-healing resilience of ZFS.
