export const CONFIG = {
  // GitHub
  GITHUB_USERNAME: 'MrTanuk',

  // Personal Info
  PERSONAL: {
    NAME: 'Luis Ramírez',
    ALIAS: 'MrTanuk',
    ROLE: 'Backend Developer',
    EMAIL: 'louismario.rr@gmail.com',
    GITHUB_URL: 'https://github.com/MrTanuk',
  },

  // About
  ABOUT: {
    PARAGRAPH1:
      "I enjoy coding all kinds of projects—learning by trial and error—from tiny scripts to fully scalable systems.",
    PARAGRAPH2:
      "I spend quite a bit of time customizing my Linux and environment setup, but the results are well worth it.",
  },

  // Skills
  SKILLS: [
      { name: 'PHP', color: 'ctp-blue', icon: '\ue73d' },
      { name: 'TypeScript', color: 'ctp-blue', icon: '\ue628' },
      { name: 'Astro', color: 'ctp-peach', icon: '\ue735' },
      { name: 'React', color: 'ctp-sky', icon: '\ue7ba' },
      { name: 'C++', color: 'ctp-blue', icon: '\ue61d' },
      { name: 'Python', color: 'ctp-yellow', icon: '\ue73c' },
      { name: 'MySQL', color: 'ctp-blue', icon: '\ue704' },
      { name: 'PostgreSQL', color: 'ctp-blue', icon: '\ue76e' },
      { name: 'Docker', color: 'ctp-blue', icon: '\ue7b0' },
      { name: 'Git', color: 'ctp-peach', icon: '\uf1d3' },
      { name: 'Linux', color: 'ctp-yellow', icon: '\uf17c' },
      { name: 'Neovim', color: 'ctp-green', icon: '\ue6ae' },
      { name: 'Bash', color: 'ctp-green', icon: '\ue795' },
      { name: 'Tailwind', color: 'ctp-teal', icon: '\u{f13ff}' },
   ],

  // Experience - NEW SECTION
  EXPERIENCE: [
    {
      id: 1,
      company: 'Tech Company',
      role: 'Backend Developer',
      location: 'Remote',
      startDate: '2024-08',
      endDate: '2025-08',
      description: [
          'I worked at a Spanish company building WordPress sites, creating custom themes and hand‑crafting plugins for each client.',
          'Using Elementor and various plugins to build a complete page.'
      ],
      technologies: ['WordPress', 'PHP', 'MySQL', 'Elementor'],
    },
    {
      id: 2,
      company: 'Trinity Launcher',
      role: 'Core Developer',
      location: 'Remote',
      startDate: '2025-12',
      endDate: false,
      description: [
          'I collaborate on a Minecraft Bedrock launcher project for GNU/Linux, handling the technical and graphical aspects.',
      ],
      technologies: ['C++', 'Qt6', 'Bash',],
      url: 'https://github.com/Trinity-LA/Trinity-Launcher',
    },
  ],

  // Contact
  CONTACT: {
    EMAIL: 'louismario.rr@gmail.com',
    GITHUB: 'github.com/MrTanuk',
  },

  // Settings
  FEATURED_REPOS_COUNT: 8,
  SHOW_FORKS: false,
} as const;

export type Config = typeof CONFIG;
