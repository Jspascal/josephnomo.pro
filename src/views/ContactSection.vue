<template>
  <section class="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-prefix">~/</span>contact
        </h2>
        <p class="section-description">
          Get in touch with me
        </p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="terminal-card">
            <div class="card-header">
              <span class="command">$ cat contact_info.json</span>
            </div>
            <div class="card-content">
              <div class="info-item">
                <mail-icon class="info-icon" />
                <div class="info-details">
                  <h3 class="info-title">Email</h3>
                  <a href="mailto:contact@josephnomo.pro" class="info-value">contact@josephnomo.pro</a>
                </div>
              </div>
              
              <div class="info-item">
                <phone-icon class="info-icon" />
                <div class="info-details">
                  <h3 class="info-title">Phone</h3>
                  <a href="tel:237691167177" class="info-value">237691167177</a>
                </div>
              </div>
              
              <div class="info-item">
                <map-pin-icon class="info-icon" />
                <div class="info-details">
                  <h3 class="info-title">Location</h3>
                  <span class="info-value">Douala - Cameroon</span>
                </div>
              </div>
              
              <div class="social-links">
                <h3 class="social-title">Connect with me</h3>
                <div class="social-grid">
                  <a href="https://github.com/Jspascal" target="_blank" class="social-link">
                    <github-icon class="social-icon" />
                    <span class="social-name">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/nomojoseph/" target="_blank" class="social-link">
                    <linkedin-icon class="social-icon" />
                    <span class="social-name">LinkedIn</span>
                  </a>
                  <a href="https://x.com/CodeHacker237" target="_blank" class="social-link">
                    <twitter-icon class="social-icon" />
                    <span class="social-name">Twitter</span>
                  </a>
                  <a href="https://web.facebook.com/josephnomo.0" target="_blank" class="social-link">
                    <facebook-icon class="social-icon" />
                    <span class="social-name">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <div class="terminal-card">
            <div class="card-header">
              <span class="command">$ vim message.txt</span>
            </div>
            <div class="card-content">
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    class="form-input" 
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    class="form-input" 
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="form.subject" 
                    class="form-input" 
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message</label>
                  <textarea 
                    id="message" 
                    v-model="form.message" 
                    class="form-textarea" 
                    placeholder="Enter your message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <loader-icon v-if="isSubmitting" class="btn-icon animate-spin" />
                  <send-icon v-else class="btn-icon" />
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Popup -->
    <transition name="popup">
      <div v-if="showPopup" class="popup-overlay" @click="closePopup">
        <div class="popup-container" @click.stop>
          <div class="popup-terminal">
            <div class="popup-header">
              <div class="terminal-buttons">
                <span class="terminal-button"></span>
                <span class="terminal-button"></span>
                <span class="terminal-button"></span>
              </div>
              <div class="popup-title">message_status.log</div>
              <x-icon class="close-icon" @click="closePopup" />
            </div>
            <div class="popup-content">
              <check-circle-icon class="success-icon" />
              <h3 class="popup-message-title">Message Sent Successfully!</h3>
              <p class="popup-message">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <div class="popup-terminal-line">
                <span class="popup-prompt">$</span> 
                <span class="popup-command">echo "Message from {{ form.name }} received."</span>
              </div>
              <div class="popup-output">Message from {{ form.name }} received.</div>
              <button class="popup-btn" @click="closePopup">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { 
  MailIcon, 
  MapPinIcon, 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon,
  PhoneIcon,
  FacebookIcon,
  SendIcon,
  CheckCircleIcon,
  XIcon,
  LoaderIcon
} from 'lucide-vue-next';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showPopup = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // TODO: Add api call here to a function I will make on digitalocean
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', form.value);
    
    showPopup.value = true;
    
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<style scoped>
.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}

.terminal-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  overflow: hidden;
  height: 100%;
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

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.info-icon {
  color: var(--accent-primary);
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.info-details {
  flex-grow: 1;
}

.info-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.info-value {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.info-value:hover {
  color: var(--accent-primary);
}

.social-links {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px dashed var(--border-color);
}

.social-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.social-link:hover {
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.social-name {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-family: 'Fira Code', monospace;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.popup-container {
  width: 100%;
  max-width: 500px;
}

.popup-terminal {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--card-border);
}

.popup-header {
  background-color: var(--bg-secondary);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  position: relative;
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

.popup-title {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  flex-grow: 1;
  text-align: center;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.close-icon:hover {
  color: var(--text-primary);
}

.popup-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  color: #10b981; /* Green color */
  margin-bottom: 1rem;
}

.popup-message-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.popup-message {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.popup-terminal-line {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
}

.popup-prompt {
  color: var(--accent-primary);
  margin-right: 0.5rem;
}

.popup-command {
  color: var(--text-primary);
}

.popup-output {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #10b981; /* Green color */
  text-align: left;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.popup-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-family: 'Fira Code', monospace;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popup-btn:hover {
  background-color: var(--accent-secondary);
}

/* Popup Animation */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Loading Animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    margin-bottom: 2rem;
  }
}
</style>

