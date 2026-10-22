/**
 * Authoritative Technical Skills Data
 * Organized into logical engineering categories.
 * Strictly no arbitrary proficiency percentages, years of experience, or expert claims.
 */
export const SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Programming Languages",
    description: "Core algorithmic languages used in system design, computational problems, and application logic.",
    skills: [
      {
        name: "Python",
        description: "General-purpose programming, scripting, and data-driven problem solving.",
        category: "languages",
        verified: true
      },
      {
        name: "Java",
        description: "Object-oriented programming, data structures, and foundational software design.",
        category: "languages",
        verified: true
      },
      {
        name: "C++",
        description: "High-performance programming, object-oriented concepts, and algorithmic challenges.",
        category: "languages",
        verified: true
      },
      {
        name: "C",
        description: "Foundational structured programming, memory concepts, and low-level mechanics.",
        category: "languages",
        verified: true
      }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Web development technologies used for user interfaces, component structures, and interactivity.",
    skills: [
      {
        name: "JavaScript",
        description: "Core scripting language for dynamic client-side logic and interactive web applications.",
        category: "frontend",
        verified: true
      },
      {
        name: "React",
        description: "Modern component-based user interface library for building single-page applications.",
        category: "frontend",
        verified: true
      },
      {
        name: "HTML",
        description: "Semantic markup standard for structured, accessible web documents.",
        category: "frontend",
        verified: true
      },
      {
        name: "CSS",
        description: "Cascading style sheets for layout structuring and visual styling (verified web styling skill).",
        category: "frontend",
        verified: true,
        note: "Included as confirmed complementary web technology alongside HTML"
      }
    ]
  },
  {
    id: "database",
    name: "Databases & Data Management",
    description: "Relational database querying and structured data organization.",
    skills: [
      {
        name: "SQL",
        description: "Relational database querying, table schema design, and structured data retrieval.",
        category: "database",
        verified: true
      }
    ]
  }
];

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap(category => category.skills);
