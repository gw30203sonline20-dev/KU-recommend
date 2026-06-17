document.addEventListener('DOMContentLoaded', () => {
  
  // 1. DOM Elements
  const screens = {
    login: document.getElementById('login-screen'),
    keywords: document.getElementById('keywords-screen'),
    fields: document.getElementById('fields-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen')
  };

  // Forms & Inputs
  const loginForm = document.getElementById('login-form');
  const studentIdInput = document.getElementById('student-id');
  const passwordInput = document.getElementById('password');
  
  // Error Messages
  const studentIdError = document.getElementById('student-id-error');
  const passwordError = document.getElementById('password-error');

  // Interactive Buttons
  const btnSubmitKeywords = document.getElementById('btn-submit-keywords');
  const btnSubmitFields = document.getElementById('btn-submit-fields');
  const btnRestart = document.getElementById('btn-restart');
  
  // Containers
  const keywordsContainer = document.getElementById('keywords-container');
  const fieldsContainer = document.getElementById('fields-container');
  const tagsSummaryContainer = document.getElementById('tags-summary');
  const recommendationList = document.getElementById('recommendation-list');

  // State
  let selectedKeywords = new Set();
  let selectedFields = new Set();

  // Helper: Screen Transition
  function showScreen(screenKey) {
    Object.keys(screens).forEach(key => {
      screens[key].classList.remove('active');
    });
    screens[screenKey].classList.add('active');
  }

  // Helper: Input Validation
  function validateStudentId(val) {
    const numRegex = /^\d{10}$/; // 10-digit numeric validation
    if (!val) return '학번을 입력해 주세요.';
    if (!numRegex.test(val)) return '올바른 10자리 학번을 입력해 주세요. (예: 2026123456)';
    return '';
  }

  function validatePassword(val) {
    if (!val) return '비밀번호를 입력해 주세요.';
    if (val.length < 4) return '비밀번호는 최소 4자리 이상이어야 합니다.';
    return '';
  }

  // Clear errors on input change
  studentIdInput.addEventListener('input', () => {
    studentIdError.textContent = '';
    studentIdError.classList.remove('visible');
  });

  passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
    passwordError.classList.remove('visible');
  });

  // 2. Login Flow
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentIdVal = studentIdInput.value.trim();
    const passwordVal = passwordInput.value;

    const idErr = validateStudentId(studentIdVal);
    const pwErr = validatePassword(passwordVal);

    let hasError = false;

    if (idErr) {
      studentIdError.textContent = idErr;
      studentIdError.classList.add('visible');
      hasError = true;
    }

    if (pwErr) {
      passwordError.textContent = pwErr;
      passwordError.classList.add('visible');
      hasError = true;
    }

    if (hasError) return;

    // Successful login transition -> Move to Keywords Screen (2nd Stage)
    showScreen('keywords');
  });

  // 3. Keyword Selection Flow
  keywordsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.keyword-chip');
    if (!chip) return;

    const tag = chip.dataset.tag;
    
    if (selectedKeywords.has(tag)) {
      selectedKeywords.delete(tag);
      chip.classList.remove('active');
    } else {
      selectedKeywords.add(tag);
      chip.classList.add('active');
    }

    // Toggle button active state based on selection count (Minimum 1 select required)
    if (selectedKeywords.size >= 1) {
      btnSubmitKeywords.classList.remove('disabled');
    } else {
      btnSubmitKeywords.classList.add('disabled');
    }
  });

  // Transition to Interest Fields Screen (3rd Stage)
  btnSubmitKeywords.addEventListener('click', () => {
    if (selectedKeywords.size < 1) return;
    showScreen('fields');
  });

  // 4. Interest Fields Checkbox Selection Flow
  fieldsContainer.addEventListener('change', (e) => {
    const checkbox = e.target.closest('.field-checkbox-input');
    if (!checkbox) return;

    const value = checkbox.value;

    if (checkbox.checked) {
      selectedFields.add(value);
    } else {
      selectedFields.delete(value);
    }

    // Toggle button active state based on fields selection count (Minimum 1 select required)
    if (selectedFields.size >= 1) {
      btnSubmitFields.classList.remove('disabled');
    } else {
      btnSubmitFields.classList.add('disabled');
    }
  });

  // Submit Fields -> Run Recommendation Engine
  btnSubmitFields.addEventListener('click', () => {
    if (selectedFields.size < 1) return;

    // Transition to loading screen
    showScreen('loading');

    // Simulate loading/analyzing state
    setTimeout(() => {
      renderRecommendations();
      showScreen('result');
    }, 2000);
  });

  // 5. Render Recommendations Logic
  function renderRecommendations() {
    // Clear previous results
    tagsSummaryContainer.innerHTML = '<span>선택 정보:</span>';
    recommendationList.innerHTML = '';

    // Render category fields summary
    selectedFields.forEach(field => {
      const span = document.createElement('span');
      span.className = 'summary-tag';
      span.style.background = 'rgba(217, 119, 6, 0.1)';
      span.style.borderColor = 'rgba(217, 119, 6, 0.2)';
      span.style.color = '#fbbf24';
      span.textContent = `[분야] ${field}`;
      tagsSummaryContainer.appendChild(span);
    });

    // Render keyword chips summary
    selectedKeywords.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'summary-tag';
      span.textContent = `#${tag}`;
      tagsSummaryContainer.appendChild(span);
    });

    // Score courses based on selected tags AND category fields
    const scoredCourses = window.courses.map(course => {
      // 1. Category Field Check (Boolean match)
      const hasFieldMatch = selectedFields.has(course.category);

      // 2. Keyword Match count
      const matchedTags = course.tags.filter(tag => selectedKeywords.has(tag));
      const keywordMatchScore = matchedTags.length;
      
      // 3. Dual-Weighted Percentage Calculation
      const keywordRatio = selectedKeywords.size > 0 ? (keywordMatchScore / selectedKeywords.size) : 0;
      let matchPercentage = 0;

      if (hasFieldMatch) {
        matchPercentage = Math.round(60 + (keywordRatio * 40));
      } else {
        matchPercentage = Math.round(keywordRatio * 40);
      }
      
      const compositeScore = (hasFieldMatch ? 100 : 0) + (keywordMatchScore * 5);

      return {
        ...course,
        matchedTags,
        hasFieldMatch,
        matchPercentage,
        compositeScore
      };
    });

    // Sort by composite score descending, then by course rating descending
    scoredCourses.sort((a, b) => {
      if (b.compositeScore !== a.compositeScore) {
        return b.compositeScore - a.compositeScore;
      }
      return b.rating - a.rating;
    });

    // Filter out courses that have 0 matches (neither category field nor keywords match)
    let finalCourses = scoredCourses.filter(c => c.hasFieldMatch || c.matchedTags.length > 0);
    const hasMatches = finalCourses.length > 0;

    if (!hasMatches) {
      finalCourses = scoredCourses.slice(0, 5);
    }

    // Render cards
    finalCourses.forEach((course, index) => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.style.animationDelay = `${index * 0.1}s`;

      const ratingStars = '★'.repeat(Math.round(course.rating)) + '☆'.repeat(5 - Math.round(course.rating));

      const tagsHtml = course.tags.map(tag => {
        const isMatched = selectedKeywords.has(tag);
        return `<span class="course-tag ${isMatched ? 'matched' : ''}">#${tag}</span>`;
      }).join('');

      card.innerHTML = `
        <div class="course-badge-area">
          <span class="match-percentage" style="${!course.hasFieldMatch ? 'color: var(--text-muted); background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1);' : ''}">${course.matchPercentage}% 매칭</span>
          <span class="course-category">${course.category} | ${course.credit}학점</span>
        </div>
        <h3 class="course-title">${course.name}</h3>
        <div class="course-meta">
          <span>담당: ${course.professor}</span>
          <span class="course-rating">${ratingStars} ${course.rating.toFixed(1)}</span>
        </div>
        <p class="course-desc">${course.description}</p>
        <div class="course-tags">
          ${tagsHtml}
        </div>
        <a href="${course.link}" target="_blank" rel="noopener noreferrer" class="btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          강의계획서 조회 (${course.code})
        </a>
      `;

      recommendationList.appendChild(card);
    });
  }

  // 6. Restart Flow
  btnRestart.addEventListener('click', () => {
    // Clear selections
    selectedKeywords.clear();
    selectedFields.clear();
    
    // Clear active keyword UI classes
    const chips = keywordsContainer.querySelectorAll('.keyword-chip');
    chips.forEach(chip => chip.classList.remove('active'));

    // Reset check boxes UI
    const checkboxes = fieldsContainer.querySelectorAll('.field-checkbox-input');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Reset buttons
    btnSubmitKeywords.classList.add('disabled');
    btnSubmitFields.classList.add('disabled');
    
    // Return to keywords screen
    showScreen('keywords');
  });

});
