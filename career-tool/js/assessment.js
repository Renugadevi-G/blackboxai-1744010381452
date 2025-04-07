// CareerPath Assessment Logic

// Personality types mapping
const PERSONALITY_TYPES = {
    'EI': ['Extrovert', 'Introvert'],
    'TF': ['Thinking', 'Feeling'],
    'JP': ['Judging', 'Perceiving']
};

// Career matching algorithm
function calculateCareerMatches() {
    // Get user responses from localStorage
    const personalityQ1 = localStorage.getItem('personality_q1') || '';
    const personalityQ2 = localStorage.getItem('personality_q2') || '';
    const interests = JSON.parse(localStorage.getItem('selected_interests') || '[]');
    
    // Load career data
    const careers = loadCareerData();
    
    // Calculate match scores for each career
    const scoredCareers = careers.map(career => {
        let score = 0;
        
        // Personality match (40% weight)
        if (career.personality.includes(personalityQ1)) score += 10;
        if (career.personality.includes(personalityQ2)) score += 10;
        if (career.personality.includes(personalityQ3)) score += 10;
        if (career.personality.includes(personalityQ4)) score += 10;
        
        // Interest match (60% weight)
        const matchedInterests = career.interests.filter(interest => 
            interests.includes(interest)
        ).length;
        
        const interestScore = (matchedInterests / career.interests.length) * 50;
        score += interestScore;
        
        return {
            ...career,
            matchScore: Math.min(100, Math.round(score))
        };
    });
    
    // Sort by highest match first
    return scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
}

// Load career data from JSON
function loadCareerData() {
    try {
        // In a real app, this would fetch from careers.json
        // For demo, we'll use the sample data
        return [
            {
                name: "Software Developer",
                description: "Design and build computer programs and applications.",
                image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
                personality: ["T", "J"],
                interests: ["coding", "math"]
            },
            {
                name: "Graphic Designer",
                description: "Create visual concepts to communicate ideas.",
                image: "https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg",
                personality: ["F", "P"],
                interests: ["drawing", "creative"]
            },
            {
                name: "Science Teacher",
                description: "Educate students about scientific concepts.",
                image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
                personality: ["E", "F"],
                interests: ["science", "teaching"]
            }
        ];
    } catch (error) {
        console.error("Error loading career data:", error);
        return [];
    }
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredInputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    if (!isValid) {
        alert('Please complete all required fields');
    }
    
    return isValid;
}

// Export functions for use in HTML files
window.CareerPath = {
    calculateCareerMatches,
    validateForm
};