export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  role: string;
  category: string;
  context: string;
  summary: string;
  impact?: string;
  learnings?: string;
  tech: string[];
  links?: {
    label: string;
    url: string;
  }[];
  images?: string[];
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  type?: 'work' | 'volunteer' | 'project';
  description: string[];
  highlight?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface CVData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  primaryOs: string;
  contact: {
    email: string;
    phone: string;
    whatsappUrl: string;
    linkedin: string;
    github: string;
    website: string;
  };
  summary: string;
  skills: SkillCategory[];
  workExperience: Experience[];
  volunteerExperience: Experience[];
  education: Education[];
  projects: Project[];
}

export const cvData: CVData = {
  name: "Khoirul Anam",
  title: "Infrastructure Engineer & Backend Developer",
  tagline: "Building reliable backend architectures, managing Void Linux & Proxmox servers, and engineering resilient systems with Laravel and Vue.",
  location: "Ambarawa / Semarang, Central Java, Indonesia",
  primaryOs: "Void Linux (runit, xbps)",
  contact: {
    email: "akunnyakhoirulanam@gmail.com",
    phone: "+62 831-9523-4531",
    whatsappUrl: "https://wa.me/+6283195234531",
    linkedin: "https://linkedin.com/in/sangpencerah/",
    github: "https://github.com/khoirulanammyid",
    website: "https://khoirulanam.my.id",
  },
  summary: "Infrastructure Engineer and Backend Developer specializing in Void Linux administration, virtualization (Proxmox VE + ZFS), and the Laravel/Vue ecosystem. Experienced in re-architecting enterprise systems, maintaining data integrity during database migrations, and directing open-source system releases. Focused on calm, reliable, and minimal technical solutions.",
  skills: [
    {
      title: "Infrastructure & Virtualization",
      skills: ["Proxmox VE", "ZFS Storage Pools", "Docker", "AWS", "Nginx", "Caddy", "Nextcloud", "PCIe GPU Passthrough"]
    },
    {
      title: "Systems & Linux Engineering",
      skills: ["Void Linux (runit, xbps)", "Kernel Tuning", "Debian / Arch", "Libreboot / SeaBIOS", "Wayland (Niri) / Foot"]
    },
    {
      title: "Programming & Scripting",
      skills: ["PHP", "JavaScript / TypeScript", "SQL", "Python", "Bash / Shell", "C", "C++", "C#", "Java"]
    },
    {
      title: "Web Frameworks & Ecosystem",
      skills: ["Laravel", "Vue.js", "Livewire", "FilamentPHP", "Tailwind CSS", "Node.js", "Astro"]
    },
    {
      title: "Databases & Storage",
      skills: ["PostgreSQL", "MySQL", "SQLite", "Redis"]
    },
    {
      title: "Methodologies & Tools",
      skills: ["Agile Management", "RESTful API Design", "Legacy Data Migration", "Git / GitHub", "Neovim & Zed"]
    }
  ],
  workExperience: [
    {
      company: "Universitas Diponegoro (UNDIP)",
      role: "Infrastructure Engineer",
      period: "April 2026 – Present",
      location: "Semarang, Indonesia",
      type: "project",
      description: [
        "Installed and configured Proxmox VE for institutional server virtualization and efficient resource management.",
        "Designed and provisioned ZFS storage pools, implementing automated snapshot schedules for data redundancy and rapid disaster recovery.",
        "Designed and deployed a 60-user Nextcloud server architecture utilizing Proxmox virtualization and ZFS mirroring to guarantee high availability.",
        "Configured PCIe GPU passthrough (IOMMU/VFIO) on virtual machines for direct hardware acceleration."
      ],
      highlight: "High-availability virtualization with automated ZFS snapshotting and GPU passthrough."
    },
    {
      company: "PT. Indo Acidatama, Tbk",
      role: "Project Manager",
      period: "May 2025 – January 2026",
      location: "Surakarta / Karanganyar, Indonesia",
      type: "work",
      description: [
        "Led the re-architecting project for the Integrated Marketing System (IMS) to eliminate legacy performance bottlenecks.",
        "Managed the development team and oversaw the implementation of Vue.js to modernize the user interface, improving responsiveness and development speed.",
        "Supervised the development of a barcode-based package tracking application from the ground up, reaching 99.5% inventory tracking accuracy.",
        "Enforced export delivery constraints through standardized DLX prefix indexing protocols."
      ],
      highlight: "Modernized IMS frontend with Vue.js and built barcode inventory tracking."
    },
    {
      company: "PT. Indo Acidatama, Tbk",
      role: "Backend Programmer",
      period: "August 2024 – May 2025",
      location: "Surakarta / Karanganyar, Indonesia",
      type: "work",
      description: [
        "Designed and built the system architecture for the Integrated Marketing System (IMS) from scratch using Laravel.",
        "Planned and executed complex multi-year legacy data migrations into the new relational schema using explicit SQL joins.",
        "Cleansed and restructured fragmented legacy datasets during migration, ensuring zero data loss during system transition.",
        "Architected distinct entity mapping logic for chemical product grades, isolating items like ethanol neutral as standalone products."
      ],
      highlight: "Zero-data-loss SQL legacy migration across multi-year enterprise datasets."
    },
    {
      company: "Masjid Agung Jawa Tengah (MAJT)",
      role: "Project Manager & Backend Programmer",
      period: "January 2024 – March 2025",
      location: "Semarang, Indonesia",
      type: "work",
      description: [
        "Led the complete overhaul of the MAJT official web portal and built its backend architecture.",
        "Implemented a Content Management System (CMS) for staff autonomy and an automated WhatsApp Gateway for notifications.",
        "Achieved a 200% increase in online traffic through performance upgrades and automated visitor alerts."
      ],
      highlight: "Portal overhaul resulting in 200% traffic growth and WhatsApp alert infrastructure."
    },
    {
      company: "Bintang Jus",
      role: "Fullstack Programmer",
      period: "November 2025 – December 2025",
      location: "Ambarawa, Indonesia",
      type: "work",
      description: [
        "Developed a web-based Point of Sales (POS) application from scratch to replace manual transaction logging.",
        "Built a full-stack solution using Laravel and FilamentPHP, covering menu management, order processing, and automated real-time sales reporting.",
        "Eliminated manual recording errors and provided real-time sales analytics for the business owner."
      ],
      highlight: "Digitized physical merchant workflows with zero transaction recording errors."
    },
    {
      company: "PPNI Central Java",
      role: "IT Staff & Journal Editor",
      period: "May 2019 – November 2022",
      location: "Semarang, Indonesia",
      type: "work",
      description: [
        "Managed institutional website services and oversaw the technical publication workflow for multiple scientific journals."
      ]
    },
    {
      company: "KIP Grobogan Regency",
      role: "Data Entry Admin",
      period: "September 2019 – December 2019",
      location: "Grobogan, Indonesia",
      type: "work",
      description: [
        "Processed, verified, and entered student registration records for the Smart Indonesia Card program."
      ]
    }
  ],
  volunteerExperience: [
    {
      company: "Dinus Open Source Community (DOSC)",
      role: "Project Manager",
      period: "August 2024 – July 2025",
      type: "volunteer",
      description: [
        "Led the development and release cycle for TeaLinux OS, managing the product roadmap, backlog, and coordination of global contributors.",
        "Directed the technical implementation and testing of official spin-offs featuring Cosmic and KDE Plasma Desktop Environments."
      ],
      highlight: "Guided open-source release engineering and delivered modern desktop spin-offs."
    },
    {
      company: "Dinus Open Source Community (DOSC)",
      role: "Core Team",
      period: "August 2023 – July 2024",
      type: "volunteer",
      description: [
        "Initiated and engineered the architectural transition of TeaLinux OS from a Xubuntu base to Arch Linux to streamline performance and package maintainability."
      ],
      highlight: "Successfully rebased an entire operating system distribution to Arch Linux."
    },
    {
      company: "Unity Game Dev Mech AI Volunteer",
      role: "Game Networking Contributor",
      period: "November 2022 – February 2023",
      type: "volunteer",
      description: [
        "Contributed to client-server networking components for multiplayer gameplay with AI integration."
      ]
    }
  ],
  education: [
    {
      institution: "Universitas Dian Nuswantoro (UDINUS)",
      degree: "Bachelor of Computer Science in Informatics Engineering",
      period: "2022 – Present",
      details: "Undergraduate Program (GPA: 2.94 / 4.00)"
    },
    {
      institution: "SMA Negeri 1 Ambarawa",
      degree: "High School Diploma, Science Major",
      period: "2019 – 2022",
      details: "Mathematics and Natural Sciences focus"
    }
  ],
  projects: [
    {
      id: "ims-rearchitecture",
      title: "Integrated Marketing System (IMS) Re-architecture",
      subtitle: "Enterprise Marketing & Inventory Logistics Modernization",
      role: "Project Manager & Backend Programmer",
      category: "Enterprise Systems",
      context: "PT. Indo Acidatama, Tbk",
      summary: "A complete structural re-architecture of an enterprise marketing and inventory management system to eliminate legacy performance bottlenecks and streamline multi-departmental workflows across chemical manufacturing divisions.",
      impact: "Modernized frontend with Vue.js, improved inventory tracking accuracy to 99.5% with custom barcode tracking, and executed complex multi-year SQL data migrations with zero data loss.",
      learnings: "Navigating complex legacy business logic, executing rigorous SQL migrations, and leading a cross-functional development team under tight corporate deadlines.",
      tech: ["Laravel", "Vue.js", "MySQL", "Redis", "Barcode Tracking", "Tailwind CSS"],
      images: ["/photos/ims-1.png", "/photos/ims-2.png"],
      links: [
        { label: "Proprietary Enterprise System", url: "#" }
      ],
      featured: true
    },
    {
      id: "tealinuxos",
      title: "TeaLinux OS Distribution",
      subtitle: "Open-Source Operating System for Developers & Academia",
      role: "Project Manager & Core Team",
      category: "Systems & Linux Engineering",
      context: "Dinus Open Source Community (DOSC)",
      summary: "An open-source Linux operating system engineered specifically for developers and students. Led the architectural rebasing to Arch Linux for rolling release flexibility and modern packaging.",
      impact: "Rebased core distribution from Xubuntu to Arch Linux. Coordinated contributors and directed official spin-offs featuring Cosmic and KDE Plasma desktop environments.",
      learnings: "Managing contributor pipelines, maintaining packaging build systems (PKGBUILD), and executing automated OS release cycles.",
      tech: ["Arch Linux", "Linux Kernel", "Bash", "PKGBUILD", "Cosmic Desktop", "KDE Plasma"],
      links: [
        { label: "GitHub Organization", url: "https://github.com/tealinuxos" }
      ],
      featured: true
    },
    {
      id: "undip-virtualization",
      title: "Enterprise Virtualization & Storage Architecture",
      subtitle: "High-Availability Nextcloud on Proxmox VE & ZFS",
      role: "Infrastructure Engineer",
      category: "Cloud & Bare-Metal Infrastructure",
      context: "Universitas Diponegoro (UNDIP)",
      summary: "Deployment of an enterprise-grade, 60-user Nextcloud server architecture utilizing Proxmox VE hypervisor virtualization, mirrored ZFS storage pools, and hardware PCIe GPU passthrough for local AI workloads.",
      impact: "Established a resilient infrastructure with automated ZFS snapshot schedules for disaster recovery, data redundancy, and GPU acceleration for local LLM inference.",
      learnings: "Bare-metal hypervisor tuning, ZFS storage pool architecture (scrubbing, snapshots, replication), and VFIO/IOMMU hardware passthrough.",
      tech: ["Proxmox VE", "ZFS Mirroring", "Nextcloud", "IOMMU / VFIO", "Debian Linux"],
      images: ["/photos/undip.png"],
      links: [
        { label: "Institutional Deployment", url: "#" }
      ],
      featured: true
    },
    {
      id: "laravel-base-image",
      title: "Container Infrastructure: Laravel Base Image (PHP 8.4)",
      subtitle: "Optimized Alpine Docker Base Image for Production Pipelines",
      role: "Creator & Maintainer",
      category: "DevOps & CI/CD",
      context: "Open-Source Infrastructure",
      summary: "Engineered a highly optimized, production-ready Docker base image for Laravel built on Alpine Linux and PHP 8.4 to eliminate repetitive dependency configuration and shrink container footprints.",
      impact: "Drastically reduced container deployment times and image sizes compared to standard Debian images. Built-in dynamic PHP-FPM process management and OPCache JIT compilation.",
      learnings: "Bridged DevOps with application-layer constraints while solving binary compatibility differences (musl libc vs glibc) for high-performance containerized execution.",
      tech: ["Docker", "Alpine Linux", "PHP 8.4", "OPCache JIT", "PHP-FPM", "CI/CD"],
      links: [
        { label: "GitHub Repository", url: "https://github.com/khoirulanammyid/laravel-base-image" }
      ],
      featured: true
    },
    {
      id: "libreboot-hardware",
      title: "Libreboot & Open Hardware Firmware Modification",
      subtitle: "Neutralizing Intel ME & Open-Source BIOS Initialization",
      role: "Hardware & Low-Level Systems Hacker",
      category: "Firmware & Low-Level Security",
      context: "Self-Initiated Security Research",
      summary: "Replaced proprietary BIOS with Libreboot / Coreboot open-source firmware on legacy ThinkPad hardware (X200, X220, T60) to achieve libre system initialization and neutralize the Intel Management Engine (ME).",
      impact: "Completely eliminated proprietary binary blobs, neutralized Intel ME backdoor vectors, extended machine longevity, and established verifiable hardware security.",
      learnings: "Mastered hardware SPI flashing with SOIC test clips, flashrom debugging, and low-level x86 hardware initialization.",
      tech: ["Libreboot", "Coreboot", "SeaBIOS", "Flashrom", "SPI Programmer", "Hardware Modding"],
      featured: true
    },
    {
      id: "majt-portal",
      title: "Masjid Agung Jawa Tengah (MAJT) Web Portal",
      subtitle: "Modern Web Platform & Automated WhatsApp Gateway",
      role: "Project Manager & Backend Programmer",
      category: "Web Platforms",
      context: "Masjid Agung Jawa Tengah",
      summary: "Full modernization of the official MAJT web portal featuring custom content management and automated WhatsApp messaging gateway for real-time notifications.",
      impact: "200% increase in web traffic, autonomous publication workflows for editorial staff, and reliable event broadcasting.",
      tech: ["Laravel", "MySQL", "WhatsApp Gateway", "Tailwind CSS", "Nginx"],
      featured: false
    },
    {
      id: "bintang-jus-pos",
      title: "Bintang Jus Point of Sales (POS)",
      subtitle: "Fullstack Merchant Sales & Inventory Management",
      role: "Fullstack Programmer",
      category: "Web Applications",
      context: "Bintang Jus",
      summary: "Tailored Point of Sales web application built with Laravel and FilamentPHP to replace paper receipts, manual sales tracking, and fragmented inventory logs.",
      impact: "Eliminated transaction record errors, expedited checkout times, and supplied actionable real-time profit and sales analytics.",
      tech: ["Laravel", "FilamentPHP", "Tailwind CSS", "MySQL", "Livewire"],
      featured: false
    }
  ]
};
