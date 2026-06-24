// ===== JOKE GENERATOR APP =====

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.jokeCount = 0;
        this.currentFilter = 'all';
        this.isLoading = false;
        this.apiUrl = 'https://official-joke-api.appspot.com';
        
        this.elements = {
            jokeContent: document.getElementById('jokeContent'),
            jokeType: document.getElementById('jokeType'),
            getJokeBtn: document.getElementById('getJokeBtn'),
            copyJokeBtn: document.getElementById('copyJokeBtn'),
            shareJokeBtn: document.getElementById('shareJokeBtn'),
            jokeCount: document.getElementById('jokeCount'),
            notification: document.getElementById('notification'),
            filterBtns: document.querySelectorAll('.filter-btn')
        };
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.getJoke();
    }
    
    attachEventListeners() {
        this.elements.getJokeBtn.addEventListener('click', () => this.getJoke());
        this.elements.copyJokeBtn.addEventListener('click', () => this.copyJoke());
        this.elements.shareJokeBtn.addEventListener('click', () => this.shareJoke());
        
        this.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }
    
    // Fetch joke from API
    async getJoke() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.elements.getJokeBtn.disabled = true;
        this.elements.jokeContent.innerHTML = '<p class="loading">Loading a joke...</p>';
        
        try {
            let url;
            
            if (this.currentFilter === 'all') {
                url = `${this.apiUrl}/random_joke`;
            } else if (this.currentFilter === 'programming') {
                url = `${this.apiUrl}/jokes/programming/random`;
            } else if (this.currentFilter === 'knock-knock') {
                url = `${this.apiUrl}/jokes/knock-knock/random`;
            } else {
                url = `${this.apiUrl}/random_joke`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle different API response formats
            if (Array.isArray(data)) {
                this.currentJoke = data[0];
            } else {
                this.currentJoke = data;
            }
            
            this.displayJoke();
            this.jokeCount++;
            this.elements.jokeCount.textContent = this.jokeCount;
            
        } catch (error) {
            console.error('Error fetching joke:', error);
            this.showNotification('Failed to load joke. Please try again!', 'error');
            this.elements.jokeContent.innerHTML = '<p>😅 Oops! Could not load a joke. Please try again.</p>';
        } finally {
            this.isLoading = false;
            this.elements.getJokeBtn.disabled = false;
        }
    }
    
    // Display joke on the screen
    displayJoke() {
        if (!this.currentJoke) return;
        
        const { setup, delivery, type } = this.currentJoke;
        
        let jokeHTML = '';
        
        if (setup && delivery) {
            jokeHTML = `
                <p class="joke-setup">${this.escapeHtml(setup)}</p>
                <p class="joke-delivery">${this.escapeHtml(delivery)}</p>
            `;
        } else if (this.currentJoke.joke) {
            jokeHTML = `<p>${this.escapeHtml(this.currentJoke.joke)}</p>`;
        }
        
        this.elements.jokeContent.innerHTML = jokeHTML;
        
        // Display joke type badge
        const typeDisplay = type || this.currentFilter;
        const badgeClass = typeDisplay.toLowerCase().replace('-', '-');
        this.elements.jokeType.innerHTML = `
            <span class="badge ${badgeClass}">${typeDisplay}</span>
        `;
        
        // Add entrance animation
        this.elements.jokeContent.style.animation = 'fadeIn 0.6s ease-out';
    }
    
    // Copy joke to clipboard
    copyJoke() {
        if (!this.currentJoke) {
            this.showNotification('No joke to copy!', 'warning');
            return;
        }
        
        let jokeText = '';
        const { setup, delivery, joke } = this.currentJoke;
        
        if (setup && delivery) {
            jokeText = `${setup}\n${delivery}`;
        } else if (joke) {
            jokeText = joke;
        }
        
        navigator.clipboard.writeText(jokeText).then(() => {
            this.showNotification('✓ Joke copied to clipboard!', 'success');
        }).catch(err => {
            this.showNotification('Failed to copy joke', 'error');
            console.error('Copy error:', err);
        });
    }
    
    // Share joke
    shareJoke() {
        if (!this.currentJoke) {
            this.showNotification('No joke to share!', 'warning');
            return;
        }
        
        let jokeText = '';
        const { setup, delivery, joke } = this.currentJoke;
        
        if (setup && delivery) {
            jokeText = `${setup}\n${delivery}`;
        } else if (joke) {
            jokeText = joke;
        }
        
        if (navigator.share) {
            navigator.share({
                title: 'Check out this joke!',
                text: jokeText,
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(jokeText);
            this.showNotification('✓ Joke ready to share (copied to clipboard)!', 'success');
        }
    }
    
    // Handle filter button clicks
    handleFilter(e) {
        const filterBtn = e.target;
        const filterType = filterBtn.getAttribute('data-type');
        
        // Update active state
        this.elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active');
        
        // Update current filter and fetch new joke
        this.currentFilter = filterType;
        this.getJoke();
    }
    
    // Show notification
    showNotification(message, type = 'success') {
        const notification = this.elements.notification;
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.4s ease-out';
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 400);
        }, 4000);
    }
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    new JokeGenerator();
    console.log('🎭 Joke Generator initialized!');
});
