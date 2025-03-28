export const skillCategoriesData = [
  {
    name: "Backend Development",
    icon: "ServerIcon",
    groups: [
      {
        level: "Advanced",
        skills: ["PHP", "Laravel", "Node.js", "Express", "REST APIs"],
      },
      {
        level: "Intermediate",
        skills: ["Python", "Microservices", "WebSockets"],
      },
      {
        level: "Familiar",
        skills: ["Java", "Spring Boot", "Symfony"],
      },
    ],
  },
  {
    name: "Databases",
    icon: "DatabaseIcon",
    groups: [
      {
        level: "Advanced",
        skills: ["MySQL", "PostgreSQL", "Redis"],
      },
      {
        level: "Intermediate",
        skills: ["MongoDB", "SQLite"],
      },
      {
        level: "Familiar",
        skills: ["Oracle", "Elasticsearch"],
      },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    icon: "GitBranchIcon",
    groups: [
      {
        level: "Advanced",
        skills: ["Docker", "Linux", "Nginx"],
      },
      {
        level: "Intermediate",
        skills: [
          "AWS (EC2, ECS)",
          "CI/CD Pipelines",
          "GitLab CI",
          "Bitbucket Pipelines",
        ],
      },
      {
        level: "Familiar",
        skills: ["Terraform", "Kubernetes"],
      },
    ],
  },
  {
    name: "API Development",
    icon: "CodeIcon",
    groups: [
      {
        level: "Advanced",
        skills: ["RESTful Design", "API Gateway", "Authentication/JWT"],
      },
      {
        level: "Intermediate",
        skills: ["Swagger/OpenAPI", "API Versioning", "Rate Limiting"],
      },
      {
        level: "Familiar",
        skills: ["GraphQL", "OAuth2"],
      },
    ],
  },
  {
    name: "Web Technologies",
    icon: "GlobeIcon",
    groups: [
      {
        level: "Advanced",
        skills: ["JavaScript", "TypeScript"],
      },
      {
        level: "Intermediate",
        skills: ["Vue.js", "HTML/CSS"],
      },
    ],
  },
];

export const toolsData = [
  "Git",
  "GitHub",
  "Bitbucket",
  "Jira",
  "Jenkins",
  "Travis CI",
  "Nginx",
  "Apache",
  "RabbitMQ",
  "Postman",
  "Insomnia",
  "VS Code",
  "PHPStorm",
  "Docker Compose",
  "AWS CodePipeline",
  "Bash Scripting",
];

export const workflowData = [
  {
    title: "Requirements Analysis",
    description:
      "Thoroughly understand project requirements and business needs through stakeholder interviews and documentation review.",
  },
  {
    title: "System Design",
    description:
      "Create architecture diagrams, database schemas, and API specifications before implementation.",
  },
  {
    title: "Development Environment Setup",
    description:
      "Configure containerized development environments with Docker to ensure consistency across the team.",
  },
  {
    title: "Iterative Development",
    description:
      "Build features incrementally using test-driven development practices and regular code reviews.",
  },
  {
    title: "Continuous Integration",
    description:
      "Implement automated testing and deployment pipelines to ensure code quality and reliability.",
  },
  {
    title: "Documentation",
    description:
      "Create comprehensive technical documentation, API references, and usage examples.",
  },
  {
    title: "Monitoring & Optimization",
    description:
      "Set up monitoring tools and performance metrics to identify and resolve bottlenecks.",
  },
];
