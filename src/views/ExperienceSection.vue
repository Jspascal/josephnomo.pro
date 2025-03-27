<template>
    <section class="experience">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="title-prefix">~/</span>experience
                </h2>
                <p class="section-description">
                    My professional journey and work history
                </p>
            </div>

            <div class="timeline">
                <div class="timeline-item" v-for="(job, index) in workExperience" :key="index">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="terminal-card">
                            <div class="card-header">
                                <span class="command">$ cat {{ job.id }}.json</span>
                            </div>
                            <div class="card-content">
                                <div class="job-header">
                                    <h3 class="job-title">{{ job.title }}</h3>
                                    <div class="job-company">
                                        <span class="company-name">{{ job.company }}</span>
                                        <span class="job-period">{{ job.period }}</span>
                                    </div>
                                    <div class="job-location">{{ job.location }}</div>
                                </div>

                                <div class="job-description">
                                    <p>{{ job.description }}</p>

                                    <div v-if="job.responsibilities && job.responsibilities.length"
                                        class="responsibilities-section">
                                        <h4 class="section-label">Key Responsibilities:</h4>
                                        <ul class="responsibility-list">
                                            <li v-for="(item, itemIndex) in job.responsibilities" :key="itemIndex">
                                                <span class="list-marker">➤</span> {{ item }}
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="job.achievements && job.achievements.length"
                                        class="achievements-section">
                                        <h4 class="section-label">Achievements:</h4>
                                        <ul class="achievements-list">
                                            <li v-for="(achievement, achievementIndex) in job.achievements"
                                                :key="achievementIndex">
                                                <span class="list-marker">►</span> {{ achievement }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="job-tech" v-if="job.skills && job.skills.length">
                                    <span class="tech-tag" v-for="(tech, techIndex) in job.skills" :key="techIndex">
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="education-section">
                <h3 class="section-subtitle">Education</h3>

                <div class="education-grid">
                    <div class="education-card" v-for="(edu, index) in education" :key="index">
                        <div class="edu-period">{{ edu.period }}</div>
                        <div class="edu-content">
                            <h4 class="edu-degree">{{ edu.degree }}</h4>
                            <div class="edu-school">{{ edu.school }}</div>
                            <p class="edu-description">{{ edu.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const workExperience = ref([
    {
        id: 'lead_backend_lab2view',
        title: 'Lead Backend',
        company: 'Lab2View Sarl',
        period: 'Jan 2025 - Present',
        location: 'Douala V, Littoral, Cameroon · On-site',
        description: 'As the Lead Backend at Lab2View Sarl, I lead a talented team of developers focused on building innovative fintech solutions, bulk messaging applications, and comprehensive ERP systems. My role involves overseeing the entire development lifecycle, from initial concept through to final deployment, ensuring our technology aligns with business goals and delivers exceptional user experiences. I am committed to fostering a collaborative and dynamic environment where creativity and technical excellence thrive.',
        responsibilities: [
            'Leading the development and implementation of cutting-edge fintech solutions',
            'Managing and mentoring a diverse team of software developers',
            'Overseeing the design and deployment of bulk messaging applications',
            'Developing and integrating advanced ERP systems to streamline business operations',
            'Collaborating with cross-functional teams to align technology initiatives with business objectives',
            'Ensuring adherence to best practices in software development and cybersecurity',
            'Driving innovation and staying ahead of industry trends to maintain a competitive edge'
        ],
        skills: ['Jira', 'Bitbucket', 'Software Architecture', 'Team Leadership', 'Project Management', 'Fintech']
    },
    {
        id: 'it_consultant_buht',
        title: 'IT Consultant',
        company: 'BUHT SARL',
        period: 'Apr 2021 - Present',
        location: 'Douala',
        description: 'Developed a comprehensive vehicle management application to optimise fleet operations and improve decision making.',
        responsibilities: [
            'Worked with stakeholders to identify critical business needs and define application requirements',
            'Designed and developed a Laravel-based application to track vehicle parameters, including maintenance schedules, mileage, legal document validity and fuel consumption',
            'Implemented a user-friendly interface with data analysis and reporting features',
            'Integrated SMS and email notification systems to alert users to upcoming maintenance, document expiry and other relevant events',
            'Deployed the application on a Linux server using Nginx for optimal performance and scalability'
        ],
        achievements: [
            'Successfully delivered a solution that improved fleet efficiency and reduced operational costs',
            'Improved user experience through intuitive interface design and timely notifications'
        ],
        skills: ['Docker', 'Nginx', 'Laravel', 'Linux', 'SMS Integration', 'MySQL', 'PHP', 'API Development']
    },
    {
        id: 'backend_developer_lab2view',
        title: 'Backend Developer',
        company: 'Lab2View',
        period: 'May 2023 - Jan 2025',
        location: 'Douala V, Littoral, Cameroon · Hybrid',
        description: 'Contributed to the migration of a monolithic mobile wallet application to a microservices architecture within a cross-functional team.',
        responsibilities: [
            'Developed and maintained multiple microservices using Laravel, Octane and Swoole to improve application performance and scalability',
            'Implemented job queues and task schedulers to offload time-consuming tasks and improve system responsiveness and reliability',
            'Implemented Redis as a caching solution and event stream, and conducted research to validate its suitability for real-time data synchronisation',
            'Used Laravel Reverb to establish real-time communication channels between clients and services via WebSocket connections',
            'Contributed to the design and implementation of several API gateways using Express to manage external interactions',
            'Contributed to the creation of a Dockerised development environment to streamline local development and testing',
            'Supported the CI/CD pipeline using AWS CodePipeline to automate deployment to AWS EC2 and ECS',
            'Developed internal tools and libraries including "lab2view/laravel-generator" to improve development efficiency'
        ],
        achievements: [
            'Successfully transitioned major components of the application to a microservices architecture',
            'Improved application performance and responsiveness through optimisation efforts and strategic use of caching, real-time communication technologies and asynchronous task processing',
            'Improve development efficiency by automating repetitive tasks and creating reusable code',
            'Contributed to the selection of optimal technologies for event streaming and real-time communication based on thorough research and experimentation'
        ],
        skills: ['Docker', 'MySQL', 'Laravel', 'Redis', 'WebSockets', 'Microservices', 'AWS', 'CI/CD', 'Express', 'Node.js', 'API Gateway', 'Swoole', 'Octane', 'Event Streaming', 'Task Scheduling', 'EC2', 'ECS', 'CodePipeline']
    },
    {
        id: 'web_developer_insbi',
        title: 'Web Developer',
        company: 'INSBI',
        period: 'Apr 2017 - May 2023',
        location: 'Douala, Cameroun',
        description: 'Worked as a freelance web developer providing comprehensive development services.',
        responsibilities: [
            'Needs analysis',
            'Planification',
            'Team management',
            'Agile Framework implementation',
            'Client/Server Application development',
            'Software Design (UML)',
            'Definition of user-stories',
            'Linux System Administration',
            'Technical redaction'
        ],
        skills: ['Web Development', 'Agile', 'UML', 'Linux', 'System Administration', 'Client/Server Architecture', 'Technical Writing']
    },
    {
        id: 'trainee_chickdev',
        title: 'Traineeship Developer',
        company: 'ChickDev',
        period: 'May 2016 - Aug 2016',
        location: 'Douala',
        description: 'I worked on secure payment software within startup ChickDev as SCRUM Developer.',
        responsibilities: [
            'Analyse of needs',
            'Study of the design file',
            'Implementation of android views',
            'Implementation of a resource-oriented NodeJs web server (REST) with Express',
            'Implementation of a security module with Token control',
            'NoSQL database administration (MongoDB)',
            'Generation of QrCode',
            '3G USB Modem Handling with NodeJs Technology',
            'Definition of a security strategy with JSON Web Token and QrCode'
        ],
        skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Android', 'JWT', 'QR Code', 'SCRUM', 'NoSQL']
    }
]);

const education = ref([
    {
        degree: 'DEC - Diplome d\'Etudes Collegiales Programming and Mobile Applications',
        school: 'IUC - Institut Universitaire de la Côte (CCNB - Canada)',
        period: '2014 - 2016',
        description: 'Completed with a focus on programming languages and software development, including Java, C, .NET, and Android.'
    },
    {
        degree: 'Bachelor of Science in Software Engineering',
        school: 'IUC - Institut Universitaire de la Côte',
        period: '2016 - 2017',
        description: 'Graduated with honors. Focused on algorithms, data structures, and software architecture.'
    },
]);
</script>

<style scoped>
.experience {
    padding: 2rem 0;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-title {
    font-family: 'Fira Code', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    display: inline-block;
}

.title-prefix {
    color: var(--accent-primary);
}

.section-description {
    color: var(--text-secondary);
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
}

.timeline {
    position: relative;
    margin-left: 2rem;
    margin-bottom: 4rem;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: var(--border-color);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-marker {
    position: absolute;
    left: -2.5rem;
    top: 1.5rem;
    width: 1rem;
    height: 1rem;
    background-color: var(--accent-primary);
    border-radius: 50%;
    border: 3px solid var(--bg-primary);
    z-index: 1;
}

.timeline-content {
    padding-left: 2rem;
}

.terminal-card {
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.terminal-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: var(--bg-secondary);
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.command {
    font-family: 'Fira Code', monospace;
    color: var(--accent-primary);
    font-size: 0.875rem;
}

.card-content {
    padding: 1.5rem;
}

.job-header {
    margin-bottom: 1.5rem;
}

.job-title {
    font-family: 'Fira Code', monospace;
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.job-company {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.company-name {
    font-weight: 500;
    color: var(--text-secondary);
}

.job-period {
    font-family: 'Fira Code', monospace;
    color: var(--accent-primary);
    font-size: 0.875rem;
}

.job-location {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.job-description {
    margin-bottom: 1.5rem;
}

.job-description p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.section-label {
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.responsibilities-section,
.achievements-section {
    margin-bottom: 1.5rem;
}

.responsibility-list,
.achievements-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.responsibility-list li,
.achievements-list li {
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
}

.list-marker {
    color: var(--accent-primary);
    margin-right: 0.75rem;
    flex-shrink: 0;
}

.job-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed var(--border-color);
}

.tech-tag {
    background-color: var(--bg-secondary);
    color: var(--accent-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.75rem;
}

.education-section {
    margin-top: 4rem;
}

.section-subtitle {
    font-family: 'Fira Code', monospace;
    font-size: 1.75rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
    text-align: center;
}

.education-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.education-card {
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    gap: 1.5rem;
    transition: transform 0.3s, box-shadow 0.3s;
}

.education-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.edu-period {
    font-family: 'Fira Code', monospace;
    color: var(--accent-primary);
    font-size: 0.875rem;
    white-space: nowrap;
}

.edu-content {
    flex-grow: 1;
}

.edu-degree {
    font-family: 'Fira Code', monospace;
    font-size: 1.125rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.edu-school {
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}

.edu-description {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.6;
}

@media (max-width: 992px) {
    .education-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .timeline {
        margin-left: 1rem;
    }

    .timeline-marker {
        left: -1.5rem;
    }

    .timeline-content {
        padding-left: 1rem;
    }

    .education-card {
        flex-direction: column;
        gap: 0.75rem;
    }
}
</style>