/**
 * Authoritative Projects Data
 * Strictly preserves verified titles and descriptions.
 * Unverified links and technologies are transparently marked as placeholders.
 */
export const PROJECTS = [
  {
    id: "hackace-2-o",
    title: "HackAce 2.O",
    badge: "Winner — HackACE International Hackathon 2026",
    badgeType: "winner",
    tagline: "Smart team finder for students and hackathons with integrated resume builder",
    capabilities: [
      "Smart team finder for students and hackathons",
      "Integrated resume builder"
    ],
    description: "Developed to address collaboration challenges in student hackathons, HackAce 2.O functions as a smart team finder for students while providing an integrated resume builder module. Recognized as the winning project at the HackACE International Hackathon 2026.",
    status: {
      repo: "Repository link to be added",
      isRepoAvailable: false
    },
    technologies: [
      { name: "Tech stack unverified", isVerified: false, note: "Specific framework/API details will be documented once repository is released" }
    ],
    visualType: "team-finder-matrix"
  },
  {
    id: "hacknima-2",
    title: "Hacknima 2.",
    badge: "Finalist — Hacknima 2026",
    badgeType: "finalist",
    tagline: "User-friendly filtering application for students",
    capabilities: [
      "User-friendly filtering application for students"
    ],
    description: "Designed with an emphasis on student usability, Hacknima 2. provides a streamlined filtering application created to help students organize and access essential information efficiently. Recognized as a finalist project in Hacknima 2026.",
    status: {
      repo: "Repository link to be added",
      isRepoAvailable: false
    },
    technologies: [
      { name: "Tech stack unverified", isVerified: false, note: "Implementation details to be updated upon repository verification" }
    ],
    visualType: "filter-pipeline-matrix"
  }
];
