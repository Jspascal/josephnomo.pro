<template>
    <section class="about">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="title-prefix">~/</span>about
                </h2>
                <p class="section-description">
                    A bit about me and my background
                </p>
            </div>

            <div class="about-content">
                <div class="about-image">
                    <div class="image-container">
                        <img src="/my-pic.jpg" alt="Joseph Nomo" />
                    </div>
                    <div class="terminal-decoration">
                        <div class="terminal-header">
                            <div class="terminal-buttons">
                                <span class="terminal-button"></span>
                                <span class="terminal-button"></span>
                                <span class="terminal-button"></span>
                            </div>
                            <div class="terminal-title">profile.jpg</div>
                        </div>
                    </div>
                </div>

                <div class="about-text">
                    <div class="terminal-card">
                        <div class="card-header">
                            <span class="command">$ cat about_me.md</span>
                        </div>
                        <div class="card-content">
                            <h3 class="content-title">Backend Developer & System Engineer</h3>

                            <p>
                                I'm a passionate backend developer with expertise in building robust, scalable
                                server-side
                                applications and system architecture. With a strong foundation in software engineering
                                principles,
                                I focus on creating efficient and maintainable backend solutions.
                            </p>

                            <p>
                                My journey in technology began with a deep curiosity about how systems work behind the
                                scenes.
                                This led me to specialize in backend development, where I've had the opportunity to work
                                on
                                various challenging projects that have strengthened my problem-solving abilities and
                                technical skills.
                            </p>

                            <p>
                                I'm particularly interested in distributed systems, database optimization, and cloud
                                infrastructure.
                                I enjoy tackling complex technical challenges and continuously learning about new
                                technologies and
                                methodologies in the ever-evolving tech landscape.
                            </p>

                            <div class="personal-info">
                                <div class="info-item">
                                    <span class="info-label">Location:</span>
                                    <span class="info-value">Douala - Cameroon </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email:</span>
                                    <span class="info-value">contact@josephnomo.pro</span>
                                </div>
                                <!-- <div class="info-item">
                                    <span class="info-label">Availability:</span>
                                    <span class="info-value">Open to opportunities</span>
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <div class="about-cta">
                        <router-link to="/experience" class="btn btn-primary">
                            View My Experience
                        </router-link>
                        <router-link to="/contact" class="btn btn-secondary">
                            Get In Touch
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.about {
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

.about-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: start;
}

.about-image {
    position: relative;
}

.image-container {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.image-container img {
    width: 100%;
    height: auto;
    display: block;
}

.terminal-decoration {
    position: absolute;
    top: -1rem;
    left: -1rem;
    right: 1rem;
    height: 2.5rem;
    background-color: var(--bg-secondary);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid var(--border-color);
    border-bottom: none;
    z-index: -1;
}

.terminal-header {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
}

.terminal-buttons {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
}

.terminal-button {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: var(--text-secondary);
    opacity: 0.5;
}

.terminal-title {
    font-family: 'Fira Code', monospace;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.about-text {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.terminal-card {
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.5rem;
    overflow: hidden;
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

.content-title {
    font-family: 'Fira Code', monospace;
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
}

p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.25rem;
}

.personal-info {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px dashed var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.info-item {
    display: flex;
    align-items: center;
}

.info-label {
    font-family: 'Fira Code', monospace;
    color: var(--accent-primary);
    width: 120px;
}

.info-value {
    color: var(--text-primary);
}

.about-cta {
    display: flex;
    gap: 1rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-family: 'Fira Code', monospace;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
}

.btn-primary {
    background-color: var(--accent-primary);
    color: white;
}

.btn-primary:hover {
    background-color: var(--accent-secondary);
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--bg-secondary);
}

@media (max-width: 992px) {
    .about-content {
        grid-template-columns: 1fr;
    }

    .about-image {
        max-width: 400px;
        margin: 0 auto 2rem;
    }
}
</style>