import { previewConfig, slidesData } from './config.js';

class PresentationEngine {
  constructor() {
    this.slides = slidesData;
    this.totalSlides = this.slides.length;
    this.currentSlideIndex = 0;
    this.container = document.getElementById('slide-scaler');
    this.slideArea = document.getElementById('slide-area');
    this.indicator = document.getElementById('slide-indicator');
    this.noteContent = document.getElementById('presenter-note-content');
    this.nextPreview = document.getElementById('next-slide-preview');
    
    // Configs
    this.baseWidth = 1280;
    this.baseHeight = 720;
    
    // Prompt Builder State
    this.promptState = {
      tokoh: "A small friendly robot",
      tempat: "a school garden",
      suasana: "bright morning light"
    };

    this.init();
  }

  init() {
    this.renderAllSlides();
    this.setupEventListeners();
    this.checkPresenterMode();
    this.handleRouting();
    this.handleResize();
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderAllSlides() {
    this.container.innerHTML = '';
    this.slides.forEach((slide, index) => {
      const slideEl = document.createElement('section');
      slideEl.className = 'slide';
      slideEl.id = `slide-${index + 1}`;
      slideEl.setAttribute('aria-label', `Slide ${index + 1}: ${slide.title}`);
      
      // Select appropriate renderer based on slide id
      let innerHTML = '';
      switch (slide.id) {
        case 'cover':
          innerHTML = this.renderCover(slide);
          break;
        case 'apa-yang-akan-dilakukan':
          innerHTML = this.renderApaYangDilakukan(slide);
          break;
        case 'ai-sebagai-alat-bantu':
          innerHTML = this.renderAIAlatBantu(slide);
          break;
        case 'contoh-proyek-mini':
          innerHTML = this.renderProyekMini(slide);
          break;
        case 'alur-cerita-3-scene':
          innerHTML = this.renderAlurCerita(slide);
          break;
        case 'dari-ide-ke-prompt':
          innerHTML = this.renderIdeKePrompt(slide);
          break;
        case 'contoh-visual-ai':
          innerHTML = this.renderContohVisual(slide);
          break;
        case 'dari-gambar-ke-video':
          innerHTML = this.renderGambarKeVideo(slide);
          break;
        case 'yang-dilatih-anak':
          innerHTML = this.renderYangDilatih(slide);
          break;
        case 'program-lengkap-16-pertemuan':
          innerHTML = this.renderProgramLengkap(slide);
          break;
        default:
          innerHTML = `<h2>${slide.title}</h2>`;
      }
      
      slideEl.innerHTML = innerHTML;
      this.container.appendChild(slideEl);
    });
  }

  /* --- SLIDE RENDERERS --- */
  
  renderCover(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%; justify-content:center; align-items:center; text-align:center;">
        <p class="slide-eyebrow">${slide.eyebrow} · ${slide.badge}</p>
        <h1 class="slide-title" style="font-size:64px; max-width:900px; margin: 0 auto 24px;">${slide.headline}</h1>
        <p class="slide-subtitle" style="margin-left:auto; margin-right:auto;">${slide.supportingSentence}</p>
        
        <div style="display:flex; gap: 32px; margin-bottom: 48px;">
          ${slide.quickFacts.map(f => `
            <div style="text-align:center;">
              <span style="display:block; font-size:12px; color:var(--accent-teal); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">${f.label}</span>
              <strong style="font-size:20px; font-weight:600;">${f.value}</strong>
            </div>
          `).join('')}
        </div>
        
        <div style="display:flex; gap:16px;">
          <button class="btn-primary" onclick="window.location.hash='slide-2'">
            <i data-lucide="play" class="icon"></i> Start Presentation
          </button>
          <a href="../" class="btn-secondary">View Full Program</a>
        </div>
      </div>
    `;
  }

  renderApaYangDilakukan(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${slide.supportingCopy}</p>
        
        <div class="grid-4" style="margin-top:auto; margin-bottom:auto;">
          ${slide.steps.map((s, i) => `
            <div class="info-card">
              <span style="font-size:32px; font-weight:700; color:rgba(255,255,255,0.1); margin-bottom:16px; line-height:1;">0${i+1}</span>
              <h3 class="info-card-title" style="margin-bottom:8px;">${s.title}</h3>
              <p style="font-size:15px; margin:0;">${s.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="callout">
          <strong>${slide.callout}</strong>
          <span>${slide.subCallout}</span>
        </div>
      </div>
    `;
  }

  renderAIAlatBantu(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        
        <div class="grid-2" style="margin-bottom:40px;">
          <div class="info-card" style="border-top: 4px solid var(--accent-teal);">
            <h3 class="info-card-title">${slide.columns.left.title}</h3>
            <ul style="padding-left:20px; margin:0; color:rgba(255,255,255,0.8); line-height:1.8;">
              ${slide.columns.left.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="info-card" style="border-top: 4px solid var(--purple-soft);">
            <h3 class="info-card-title">${slide.columns.right.title}</h3>
            <ul style="padding-left:20px; margin:0; color:rgba(255,255,255,0.8); line-height:1.8;">
              ${slide.columns.right.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.05); padding:16px 24px; border-radius:100px; font-size:14px; margin-bottom: 24px;">
          ${slide.flow.map((step, idx) => `
            <span style="${idx === 2 ? 'color:var(--accent-teal); font-weight:600;' : 'opacity:0.8;'}">${step}</span>
            ${idx < slide.flow.length - 1 ? '<i data-lucide="arrow-right" class="icon" style="opacity:0.3;"></i>' : ''}
          `).join('')}
        </div>
        
        <p style="text-align:center; font-size:24px; font-style:italic; font-weight:300; margin-top:auto;">"${slide.quote}"</p>
      </div>
    `;
  }

  renderProyekMini(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        
        <div class="info-card" style="margin-bottom:32px;">
          <h3 style="color:#fff; font-size:24px; margin-bottom:16px;">${slide.projectName}</h3>
          <p style="font-size:18px; line-height:1.6; margin:0;">${slide.premise}</p>
        </div>
        
        <div class="grid-3" style="margin-bottom:auto;">
          ${slide.stages.map((stage, i) => `
            <div style="display:flex; align-items:center; gap:16px;">
              <div style="width:40px; height:40px; border-radius:50%; background:var(--purple); display:flex; align-items:center; justify-content:center; font-weight:700;">${i+1}</div>
              <span style="font-size:18px;">${stage}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="callout">
          <strong>${slide.callout}</strong>
        </div>
      </div>
    `;
  }

  renderAlurCerita(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        
        <div class="grid-3" style="margin-top:auto; margin-bottom:auto;">
          ${slide.scenes.map((s, i) => `
            <div class="info-card" style="padding:0; overflow:hidden;">
              <div class="visual-placeholder" style="aspect-ratio:4/3; border:none; border-radius:0; border-bottom:1px solid rgba(255,255,255,0.1);">
                <i data-lucide="image" class="icon"></i>
                <span style="font-size:12px;">Sample Demonstration</span>
              </div>
              <div style="padding:24px;">
                <span style="display:inline-block; font-size:11px; padding:4px 8px; background:rgba(255,255,255,0.1); border-radius:4px; margin-bottom:12px; font-weight:600; letter-spacing:0.05em;">SCENE ${i+1} · ${s.label}</span>
                <h3 style="margin:0 0 8px; font-size:20px; color:#fff;">${s.title}</h3>
                <p style="margin:0; font-size:14px; opacity:0.7;">${s.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderIdeKePrompt(slide) {
    // Generate initial prompt
    const initialPrompt = slide.basePromptPattern
      .replace('{tokoh}', this.promptState.tokoh)
      .replace('{tempat}', this.promptState.tempat)
      .replace('{suasana}', this.promptState.suasana);

    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${slide.supportingCopy}</p>
        
        <div class="grid-2">
          <div>
            <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:16px;">1. TOKOH</div>
            <div class="prompt-chips" id="chips-tokoh">
              ${slide.chips.tokoh.map((c,i) => `<button class="prompt-chip ${i===0?'is-active':''}" data-type="tokoh" data-value="${c.value}">${c.label}</button>`).join('')}
            </div>
            
            <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:16px;">2. TEMPAT</div>
            <div class="prompt-chips" id="chips-tempat">
              ${slide.chips.tempat.map((c,i) => `<button class="prompt-chip ${i===0?'is-active':''}" data-type="tempat" data-value="${c.value}">${c.label}</button>`).join('')}
            </div>
            
            <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:16px;">3. SUASANA</div>
            <div class="prompt-chips" id="chips-suasana">
              ${slide.chips.suasana.map((c,i) => `<button class="prompt-chip ${i===0?'is-active':''}" data-type="suasana" data-value="${c.value}">${c.label}</button>`).join('')}
            </div>
          </div>
          
          <div style="display:flex; flex-direction:column; justify-content:center;">
            <p style="font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">AI Prompt Result</p>
            <div class="prompt-preview" id="prompt-preview-box">
              ${initialPrompt}
            </div>
            <button class="btn-secondary" id="btn-copy-prompt" style="align-self:flex-start;">
              <i data-lucide="copy" class="icon"></i> Copy Prompt
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderContohVisual(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle" style="margin-bottom:24px;">${slide.supportingCopy}</p>
        
        <div class="grid-3" style="margin-bottom:32px;">
          ${slide.visuals.map(v => `
            <div>
              <div class="visual-placeholder" style="margin-bottom:16px;">
                <i data-lucide="aperture" class="icon"></i>
                <span style="font-size:12px;">Sample Demonstration</span>
              </div>
              <strong style="display:block; text-align:center; font-size:16px;">${v}</strong>
            </div>
          `).join('')}
        </div>
        
        <div class="callout" style="margin-top:auto;">
          <strong>${slide.callout}</strong>
          <span>${slide.subCallout}</span>
        </div>
      </div>
    `;
  }

  renderGambarKeVideo(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle" style="margin-bottom:32px;">${slide.supportingCopy}</p>
        
        <div class="grid-2" style="flex:1;">
          <div class="visual-placeholder" style="height:100%; aspect-ratio:unset;">
            <i data-lucide="play-circle" class="icon" style="width:64px; height:64px;"></i>
            <span style="font-size:16px;">Sample Video Demonstration</span>
          </div>
          <div style="display:flex; flex-direction:column; justify-content:center; padding-left:24px;">
            <h3 style="color:var(--accent-teal); font-size:20px; margin-bottom:24px;">Added to the Video:</h3>
            <ul style="list-style:none; padding:0; margin:0 0 40px; font-size:18px; line-height:2.2;">
              ${slide.aspects.map(a => `
                <li style="display:flex; align-items:center; gap:12px;">
                  <i data-lucide="check-circle-2" class="icon" style="color:var(--purple-soft);"></i> ${a}
                </li>
              `).join('')}
            </ul>
            <div class="callout" style="margin:0;">
              <strong>${slide.callout}</strong>
              <span style="font-size:14px; display:block; margin-top:8px; opacity:0.6;">* ${slide.note}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderYangDilatih(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        
        <div class="grid-3" style="margin-bottom:32px;">
          ${slide.skills.map(s => `
            <div class="info-card" style="padding:24px;">
              <h3 class="info-card-title" style="margin-bottom:8px; font-size:18px;">${s.title}</h3>
              <p style="margin:0; font-size:14px;">${s.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="info-card" style="background:rgba(109,40,217,0.1); border-color:var(--purple-soft); padding:24px 32px; display:flex; gap:24px; align-items:center;">
          <div style="flex:1;">
            <h3 style="color:#fff; margin:0 0 8px; font-size:20px;">${slide.responsibleAI.title}</h3>
            <p style="margin:0; font-size:15px; opacity:0.8;">Practices applied during the class.</p>
          </div>
          <div style="flex:2;">
            <ul style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:0; padding:0; list-style:none; font-size:14px;">
              ${slide.responsibleAI.items.map(i => `<li><span style="color:var(--accent-teal); margin-right:8px;">✔</span>${i}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <p style="text-align:center; font-size:20px; font-style:italic; margin-top:auto; color:rgba(255,255,255,0.7);">"${slide.quote}"</p>
      </div>
    `;
  }

  renderProgramLengkap(slide) {
    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle" style="margin-bottom:32px;">${slide.supportingCopy}</p>
        
        <div class="grid-3" style="margin-bottom:32px;">
          ${slide.phases.map((p,i) => `
            <div style="display:flex; gap:16px;">
              <div style="font-size:24px; font-weight:700; color:var(--purple-soft); opacity:0.5;">0${i+1}</div>
              <div>
                <h3 style="color:#fff; font-size:16px; margin:0 0 4px;">${p.title}</h3>
                <p style="margin:0; font-size:13px; opacity:0.7;">${p.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align:center; padding:32px; background:rgba(255,255,255,0.03); border-radius:12px; margin-bottom:auto;">
          <span style="display:block; font-size:14px; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">Final Student Output</span>
          <strong style="font-size:24px; color:#fff;">${slide.finalOutput}</strong>
        </div>
        
        <div style="display:flex; align-items:center; justify-content:space-between; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1);">
          <div style="font-weight:600; color:rgba(255,255,255,0.8);">${slide.endingMessage}</div>
          <div style="display:flex; gap:16px;">
            <button class="btn-secondary" onclick="window.location.hash='slide-1'">Back to Beginning</button>
            <a href="../#curriculum" class="btn-primary">View Full Curriculum</a>
          </div>
        </div>
      </div>
    `;
  }

  /* --- LOGIC & EVENTS --- */

  setupEventListeners() {
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
      }
    });

    // Hash change for routing
    window.addEventListener('hashchange', () => {
      this.handleRouting();
    });

    // Window resize for scaling
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Controls
    document.getElementById('btn-prev').addEventListener('click', () => this.prevSlide());
    document.getElementById('btn-next').addEventListener('click', () => this.nextSlide());
    document.getElementById('btn-fullscreen').addEventListener('click', () => this.toggleFullscreen());
    
    // Prompt Builder Interactivity (only runs on slide 6, bound via delegation)
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('prompt-chip')) {
        this.handlePromptChipClick(e.target);
      } else if (e.target.closest('#btn-copy-prompt')) {
        this.copyPrompt();
      }
    });
  }

  handlePromptChipClick(btn) {
    const type = btn.getAttribute('data-type');
    const value = btn.getAttribute('data-value');
    
    // Update state
    this.promptState[type] = value;
    
    // Update UI for chips
    document.querySelectorAll(`.prompt-chip[data-type="${type}"]`).forEach(el => {
      el.classList.remove('is-active');
    });
    btn.classList.add('is-active');
    
    // Re-render preview box
    const slideData = this.slides.find(s => s.id === 'dari-ide-ke-prompt');
    if (slideData) {
      const newPrompt = slideData.basePromptPattern
        .replace('{tokoh}', this.promptState.tokoh)
        .replace('{tempat}', this.promptState.tempat)
        .replace('{suasana}', this.promptState.suasana);
        
      const box = document.getElementById('prompt-preview-box');
      if (box) box.textContent = newPrompt;
    }
  }

  copyPrompt() {
    const box = document.getElementById('prompt-preview-box');
    if (!box) return;
    
    navigator.clipboard.writeText(box.textContent.trim()).then(() => {
      const toast = document.getElementById('toast-message');
      toast.classList.add('is-visible');
      setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 3000);
    });
  }

  handleRouting() {
    const hash = window.location.hash;
    let targetIndex = 0;
    
    if (hash.startsWith('#slide-')) {
      const parsed = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= this.totalSlides) {
        targetIndex = parsed - 1;
      }
    }
    
    this.goToSlide(targetIndex, false);
  }

  goToSlide(index, updateHash = true) {
    if (index < 0 || index >= this.totalSlides) return;
    
    // Update DOM classes
    document.querySelectorAll('.slide').forEach((el, i) => {
      if (i === index) {
        el.classList.add('is-active');
      } else {
        el.classList.remove('is-active');
      }
    });
    
    this.currentSlideIndex = index;
    
    // Update Indicator
    this.indicator.textContent = `${index + 1} / ${this.totalSlides}`;
    
    // Update Controls state
    document.getElementById('btn-prev').disabled = index === 0;
    document.getElementById('btn-next').disabled = index === this.totalSlides - 1;
    
    // Update Presenter Notes
    this.noteContent.textContent = this.slides[index].presenterNote || "No notes for this slide.";
    this.nextPreview.textContent = index < this.totalSlides - 1 ? `Slide ${index + 2}: ${this.slides[index+1].title}` : "End of presentation.";
    
    // Update Hash if needed
    if (updateHash) {
      window.history.pushState(null, null, `#slide-${index + 1}`);
    }
  }

  nextSlide() {
    this.goToSlide(this.currentSlideIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlideIndex - 1);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  handleResize() {
    // Only scale if not in print mode (print uses native sizing)
    if (window.matchMedia('print').matches) return;
    
    const containerWidth = this.slideArea.clientWidth;
    const containerHeight = this.slideArea.clientHeight;
    
    // Calculate scale to fit container while maintaining 16:9 ratio
    const scaleX = containerWidth / this.baseWidth;
    const scaleY = containerHeight / this.baseHeight;
    
    // Use the smaller scale to ensure it fits entirely, but add a 2% safe margin
    const scale = Math.min(scaleX, scaleY) * 0.96;
    
    this.container.style.transform = `scale(${scale})`;
  }

  checkPresenterMode() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('presenter') === 'true') {
      document.body.classList.add('is-presenter');
      // Trigger resize after layout changes
      setTimeout(() => this.handleResize(), 50);
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationEngine();
});
