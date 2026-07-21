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
      activeCategory: 'tokoh',
      tokoh: `Create a polished vertical character design reference sheet for an original mascot named “LITTLE ROBOT”, presented in a clean professional animation model-sheet layout.

CHARACTER IDENTITY

Name: Little Robot
Role: Friendly AI learning companion and creative assistant
Target audience: Elementary school students aged 9–12
Personality: Curious, helpful, patient, intelligent, cheerful, encouraging, and safe
Visual style: Premium stylized 3D animation character design with subtle anime influence, child-friendly, cinematic, clean, modern, and highly consistent across every pose

CHARACTER DESIGN

Little Robot is a small, adorable humanoid robot with a compact childlike proportion, approximately three heads tall.

Head:
- Large rounded-square head with smooth curved corners
- Glossy white outer shell
- Dark navy glass-like digital face screen
- Two simple glowing cyan oval eyes
- No human facial features
- No nose
- No mouth
- No eyebrows
- No ears
- Expressions are communicated only through eye shape, head angle, body posture, and hand gestures
- Small cyan illuminated accents around the sides of the head

Body:
- Small rounded torso
- White outer armor with soft navy joint sections
- Circular cyan glowing core at the center of the chest
- Subtle purple accent around the chest core
- Flexible dark navy neck joint
- Rounded shoulders
- Short mechanical arms
- Three rounded fingers and one thumb on each hand
- No sharp claws or dangerous mechanical details
- Small rounded hips and short legs
- Rounded white boots with dark navy soles
- No exposed wires
- No weapons
- No logos
- No brand marks

MATERIALS

- Smooth white ceramic-polymer shell
- Soft matte navy joints
- Slightly reflective dark face screen
- Cyan and violet LED accents
- Soft cinematic highlights
- Clean premium toy-like finish
- Friendly and safe appearance
- Avoid excessive metallic reflections

COLOR PALETTE

- Pearl White
- Deep Navy
- Electric Cyan
- Soft Violet
- Warm Golden Light for idea-related effects

MODEL-SHEET COMPOSITION

Use a warm off-white studio background with subtle floor shadows. Arrange the character clearly with generous spacing. Every version must have exactly the same proportions, head shape, screen shape, chest core, colors, hands, feet, and body details.

TOP SECTION — CHARACTER TURNAROUND

1. Large front-facing neutral pose
   - Standing upright
   - Hands relaxed near the torso
   - Calm cyan eyes
   - Full body clearly visible

2. Three-quarter front view
   - Slightly turned body
   - One hand gently raised
   - Curious and attentive posture

3. Full side profile
   - Arms relaxed
   - Clear silhouette
   - Show the depth of the head, torso, and backpack-like rear shell

MIDDLE SECTION — DESIGN INFORMATION

Show a clean horizontal color palette consisting of:
- Pearl White
- Deep Navy
- Electric Cyan
- Soft Violet
- Warm Golden Glow

Include small isolated detail studies:
- Digital eye states: neutral, curious, excited, thinking
- Rounded three-finger hand
- Cyan chest core
- Side head light
- Rounded robot foot

BOTTOM SECTION — ACTION POSES

4. Seated learning pose
   - Sitting naturally on a small modern chair
   - Looking at an open laptop
   - One hand near the keyboard
   - Focused and curious body language

5. Teaching pose
   - Standing confidently
   - One index finger pointing upward
   - A small glowing golden lightbulb hologram floating above the finger
   - Friendly instructor posture
   - Eyes slightly curved upward with enthusiasm

6. Explaining pose
   - One arm extended with an open palm
   - Other hand resting near the chest
   - Presenting an imaginary lesson or visual
   - Calm, helpful body language

7. Creative drawing pose
   - Holding a digital stylus
   - Drawing a glowing image hologram in the air
   - Energetic but controlled stance

8. Storytelling pose
   - Holding an open digital storybook
   - Small holographic stars, image frames, and story cards floating above it
   - Wonder-filled posture

9. Video creation pose
   - Standing beside a floating video-editing timeline
   - Moving one visual clip with one hand
   - Small play icon and scene thumbnails visible
   - Focused creative body language

10. Celebration pose
   - Both arms raised slightly
   - Small golden star floating above one hand
   - Proud but gentle pose after completing a project

IMPORTANT CONSISTENCY RULES

- The robot must remain identical across all poses
- Do not change the robot’s proportions
- Do not change the eye screen shape
- Do not add a mouth
- Do not add human facial features
- Do not add clothing
- Do not add hair
- Do not add antennas unless they are part of every pose
- Keep the same number and shape of fingers
- Keep the chest light in exactly the same position
- Keep all cyan and violet accents consistent
- Preserve a friendly elementary-school educational appearance
- No aggressive poses
- No weapons
- No combat armor
- No damaged robot parts
- No visible text errors
- No duplicated limbs
- No missing fingers
- No cropped feet
- No overlapping characters

Presentation quality:
high-resolution professional animation character sheet, clean visual hierarchy, accurate anatomy, consistent model design, polished cinematic 3D illustration, soft studio lighting, subtle contact shadows, highly readable silhouettes, vertical 9:16 composition.`,
      tempat: `Create a highly polished vertical environment design reference sheet for an original location named:

“SCHOOL GARDEN”

This environment will be used repeatedly in an educational cinematic animation featuring a small friendly robot. The purpose of this sheet is to establish one clear, reusable, and visually consistent school garden from multiple angles, conditions, and production details.

ENVIRONMENT IDENTITY

Location name:
School Garden

Context:
A garden inside a modern elementary school campus.

Narrative function:
The garden is initially dry and neglected because its automatic watering system is damaged. A small friendly robot discovers the problem, repairs the system, and helps the garden become green and healthy again.

Target audience:
Elementary school students aged 9–12.

Visual style:
Premium stylized 3D animation environment design, child-friendly, cinematic, colorful, clean, slightly futuristic, warm and inviting, with subtle anime-inspired composition.

The environment must feel:
- Safe
- Cheerful
- Educational
- Creative
- Modern
- Natural
- Easy to understand visually
- Suitable for an elementary school
- Consistent enough to be reused across multiple scenes

Do not make the garden look like:
- A large botanical park
- A wild forest
- A luxury mansion garden
- A fantasy jungle
- An abandoned place
- A dangerous industrial area

==================================================
CORE ENVIRONMENT LAYOUT
==================================================

Design one compact school garden located beside a modern elementary school building.

The garden should include:

1. Central Garden Path
- A gently curved walking path
- Made from light beige stone or soft brick
- Wide enough for two children or one small robot
- Clearly connects every garden area
- Smooth and safe surface
- No sharp or broken stones

2. Main Flower Beds
- Several rounded rectangular planting beds
- Arranged neatly on both sides of the path
- Contain colorful child-friendly flowers
- Include small leafy plants and low shrubs
- Plant beds should have warm wooden or light stone borders

3. Small Vegetable Learning Area
- A compact educational vegetable patch
- Contains tomatoes, carrots, lettuce, or herbs
- Small plant labels may exist as blank sign shapes
- No readable text inside the image
- Organized and easy for children to reach

4. Central Feature Tree
- One medium-sized shade tree
- Rounded, healthy canopy
- Not too tall
- Positioned as a major visual landmark
- A small circular seating border may surround the tree
- Tree position must remain consistent in every view

5. Watering System
- A small automatic irrigation system
- Visible pipes near the garden beds
- Several simple sprinkler heads
- One compact control box
- One clearly identifiable damaged pipe section
- The system should look understandable to a child
- No complex industrial machinery
- No dangerous exposed electrical wires

6. Repair Area
- A small maintenance point near the broken pipe
- Room for the Little Robot to kneel and work
- Include a simple removable panel or pipe connector
- This area must remain in the same location across all views

7. Garden Tool Station
- A small wooden or metal rack
- Contains a watering can, child-safe shovel, rake, gloves, and small bucket
- Tools are rounded and friendly
- No sharp dangerous equipment
- Keep tool placement visually organized

8. School Building Background
- A modern two-story elementary school building
- Warm cream, white, and light blue exterior
- Large classroom windows
- Friendly architecture
- Visible behind the garden, but not dominating the composition
- The same facade and window arrangement must remain consistent

9. Garden Bench
- One simple rounded wooden bench
- Located under or near the central tree
- Used as a secondary visual landmark
- Safe, clean, and child-friendly

10. Fence and Boundary
- Low decorative fence or hedge
- Clearly separates the garden from the rest of the schoolyard
- Must not feel restrictive or prison-like
- Include one small entrance gate or garden arch

==================================================
MASTER LAYOUT CONSISTENCY
==================================================

Use one fixed spatial arrangement throughout the entire sheet:

- School building located at the rear.
- Central tree located slightly left of the garden center.
- Main curved path begins at the bottom foreground.
- Vegetable patch located on the left side.
- Main colorful flower beds located on the right side.
- Garden bench located near the central tree.
- Tool station located near the rear-right area.
- Irrigation control box located near the right flower beds.
- Broken pipe located close to the front-right garden bed.
- Low garden fence surrounding the location.
- Small entrance gate located at the front-left or center foreground.

Do not randomly move these objects between views.

==================================================
DESIGN-SHEET COMPOSITION
==================================================

Use a vertical 9:16 professional environment design-sheet layout with a warm off-white or very light cream studio background.

Arrange the environment studies clearly with generous spacing.

TOP SECTION — MASTER ENVIRONMENT VIEWS

1. Hero Establishing View
- Large cinematic three-quarter wide shot
- Shows the complete school garden
- Camera placed near the garden entrance
- School building visible in the background
- Central tree, path, flower beds, vegetable patch, bench, tool station, and watering system clearly readable
- Bright morning atmosphere
- Garden shown in its healthy final condition
- This should be the largest image on the sheet

2. Opposite-Angle Establishing View
- Camera facing back toward the garden entrance
- Shows the reverse side of the same layout
- Preserve all landmark positions
- Clearly demonstrate environment consistency

3. Side View
- Show the garden from the right side
- Broken pipe and irrigation area clearly visible
- School facade remains consistent

==================================================
MIDDLE SECTION — TOP-DOWN MAP AND ZONE BREAKDOWN
==================================================

4. Top-Down Environment Map
- Clean elevated orthographic view
- Show the full shape of the garden
- Clearly define the path and major zones
- Preserve the exact spatial arrangement
- Add simple colored zone blocks without readable text

Show the following visual zones:

- Garden entrance
- Main path
- Central tree area
- Vegetable learning area
- Flower beds
- Bench area
- Tool station
- Irrigation system
- Broken pipe repair point
- School building boundary

5. Environment Landmark Studies
Show separate close-up panels for:

- Main tree and circular seating edge
- Broken water pipe
- Irrigation control box
- Sprinkler head
- Garden tool station
- Wooden bench
- School garden entrance arch
- Vegetable patch
- Flower bed border

Every prop must match the master view.

==================================================
BOTTOM SECTION — STORY CONDITION STATES
==================================================

Show the exact same camera composition in three environmental states.

STATE 1 — DRY GARDEN

- Some plants are wilted
- Soil appears dry and slightly cracked
- Flower colors are muted
- Sprinklers are inactive
- Broken pipe visible
- Lighting slightly softer and less saturated
- The garden must still look safe and child-friendly
- Do not make it dark, frightening, dead, or abandoned

STATE 2 — REPAIR IN PROGRESS

- Little Robot may appear only as a small scale-reference figure
- Robot kneels near the damaged pipe
- Repair tools placed neatly nearby
- A small amount of water begins flowing
- Some plants remain wilted
- Lighting gradually becomes brighter
- Show visual transition from problem to solution

STATE 3 — HEALTHY GREEN GARDEN

- Irrigation system works properly
- Sprinklers release gentle water arcs
- Plants are fresh and upright
- Flowers are colorful
- Vegetable patch looks healthy
- Soil appears moist
- Tree canopy looks vibrant
- Warm sunlight
- Cheerful but natural atmosphere
- Do not overfill the scene with excessive flowers

The garden layout, camera position, building, tree, path, bench, and irrigation system must remain exactly consistent across all three states.

==================================================
CAMERA REFERENCE VIEWS
==================================================

Include several small cinematic framing studies:

1. Wide Establishing Shot
- Shows full garden and school building

2. Medium Repair Shot
- Focuses on Little Robot repairing the pipe

3. Low-Angle Plant View
- Camera near flower level
- Robot and school building visible in the background

4. Over-the-Shoulder Robot View
- Looking toward the damaged garden bed

5. Final Hero Wide Shot
- Healthy garden
- Sprinklers active
- Robot admiring the result

6. Top-Down Storyboard View
- Clear visibility of robot movement from entrance to repair point

Use consistent camera language:
- Cinematic but easy for children to understand
- No extreme fisheye distortion
- No confusing Dutch angles
- No overly dramatic horror lighting

==================================================
MATERIAL AND TEXTURE STUDIES
==================================================

Show a clean material palette:

- Warm cream school walls
- Light blue window accents
- Beige stone path
- Natural medium-brown wood
- Soft green foliage
- Bright but controlled flower colors
- Dark teal irrigation pipes
- Light grey irrigation control box
- Moist dark brown soil
- Soft cyan water highlights

Texture style:
- Stylized 3D
- Clean and slightly simplified
- Soft rounded edges
- Moderate surface detail
- No photorealistic dirt
- No excessive grunge
- No sharp or hazardous objects

==================================================
COLOR PALETTE
==================================================

Use a harmonious child-friendly palette:

- Warm Cream
- Soft Sky Blue
- Fresh Leaf Green
- Deep Garden Green
- Natural Wood Brown
- Light Stone Beige
- Electric Cyan for subtle technology accents
- Flower Yellow
- Coral Orange
- Soft Purple
- Clean Water Blue

The garden should remain colorful but not chaotic.

==================================================
LIGHTING STUDIES
==================================================

Include three small lighting examples:

1. Morning Preview
- Soft golden morning sunlight
- Long subtle shadows
- Clear, welcoming atmosphere

2. Midday Activity
- Bright neutral daylight
- Good visibility for learning and repair activities

3. Final Golden Light
- Warm afternoon sunlight
- Healthy garden
- Cinematic but still natural

Main story lighting should use bright morning or soft midday lighting.

==================================================
SCALE REFERENCE
==================================================

Include one simple scale-comparison study showing:

- Little Robot
- Elementary-school child silhouette
- Garden bench
- Central tree
- Flower-bed height
- Irrigation control box

Little Robot must appear small enough to feel cute but large enough to interact with the pipe and garden tools.

Do not include detailed human faces.

==================================================
ENVIRONMENT CONSISTENCY RULES
==================================================

- Use exactly one garden layout throughout the sheet.
- Do not move the tree between panels.
- Do not change the school building facade.
- Do not move the bench.
- Do not change the path shape.
- Keep the irrigation box in the same location.
- Keep the damaged pipe in the same location.
- Keep flower-bed shapes consistent.
- Keep the entrance gate consistent.
- Keep tool-station design consistent.
- Keep material colors consistent.
- Keep environment scale consistent.
- Do not add random playground equipment in later views.
- Do not add a fountain.
- Do not add a pond.
- Do not add a greenhouse.
- Do not add animals unless specifically requested later.
- Do not add crowds of children.
- Do not add readable text.
- Do not add school logos.
- Do not add brand logos.
- Do not add watermarks.

==================================================
TECHNICAL QUALITY
==================================================

Professional animation environment concept sheet, high-resolution, clean visual hierarchy, consistent architectural proportions, reusable production design, clear environmental storytelling, polished stylized 3D rendering, cinematic composition, child-friendly educational atmosphere, soft global illumination, accurate shadows, detailed but uncluttered, vertical 9:16 composition.

IMPORTANT:
The design sheet must look like one environment documented from several production angles, not several different school gardens.`,
      suasana: `Create a polished cinematic mood key illustration for the environment mood:

“BRIGHT MORNING”

Use the provided reference images as the main visual foundation:

- Reference Image A: the School Garden environment design sheet
- Reference Image B: the Little Robot character design sheet

IMPORTANT REFERENCE USAGE

Use Reference Image A to preserve the exact School Garden identity:
- modern elementary school building in the background
- central rounded tree slightly left of center
- curved beige stone pathway
- colorful flower beds
- small vegetable learning patch
- wooden bench
- garden tool station
- irrigation system and pipe area
- low decorative fence and entrance gate
- child-friendly, clean, safe educational setting

Use Reference Image B to preserve the exact Little Robot character identity:
- small friendly humanoid robot
- white rounded shell
- dark navy face screen
- two glowing cyan oval eyes
- cyan chest core
- navy joints
- compact childlike proportions
- cute, safe, helpful, and curious appearance
- do not redesign the robot

GOAL

Create a dedicated lighting-and-atmosphere mood image that captures the School Garden in a bright morning mood.

The image should feel:
- cheerful
- fresh
- hopeful
- energetic
- clean
- welcoming
- child-friendly
- educational
- peaceful but alive

SCENE CONTENT

Show the School Garden in its healthy and beautiful state during a bright morning.

The scene should include:
- the school garden fully visible and visually readable
- the school building softly lit in the background
- the central tree with fresh green leaves
- vibrant flower beds with healthy colors
- the vegetable learning area looking neat and alive
- the curved garden path clearly visible
- the bench and tool station in their consistent locations
- the irrigation system working properly
- soft gentle sprinkler water arcs catching sunlight
- Little Robot present in the scene as a friendly helper or observer

Little Robot can be:
- standing near the path
- admiring the healthy garden
- gently gesturing toward the flowers
- walking through the garden with a happy, helpful posture

LIGHTING DIRECTION

The main focus is the “Bright Morning” mood.

Lighting characteristics:
- clear bright morning sky
- soft golden sunlight from a low-to-medium morning sun angle
- fresh blue skylight fill
- bright but gentle illumination
- soft, clean shadows
- slightly glowing sunlit edges on leaves, flowers, and robot shell
- subtle atmospheric freshness
- morning clarity, not hazy
- light should feel crisp, healthy, and uplifting

ATMOSPHERIC DETAILS

Include subtle bright morning mood cues:
- fresh morning air
- soft sunlight touching the tops of flowers and leaves
- tiny dew-like highlights or fresh moisture sparkle
- light breeze suggested through leaves and plants
- clean blue sky or pale warm sky gradient
- fresh reflective highlights on sprinkler water
- natural shadows that feel soft and inviting

COLOR MOOD

Use a bright and harmonious morning palette:
- warm cream sunlight
- soft sky blue
- fresh greens
- healthy flower colors
- clean water blue
- light beige path
- natural wood brown
- subtle cyan accents from the robot and technology elements

The color balance should feel:
- luminous
- fresh
- optimistic
- not oversaturated
- not washed out
- not dramatic

COMPOSITION

Create a beautiful cinematic composition.
Preferred shot:
- wide three-quarter establishing shot
- camera near the garden entrance or slightly elevated
- the viewer can clearly understand the garden layout
- the robot should be visible but not dominate the environment
- use clear visual hierarchy with the garden and light mood as the main focus

VISUAL STYLE

- premium stylized 3D animation look
- child-friendly cinematic illustration
- clean shapes
- soft rounded forms
- subtle anime-inspired composition
- high-end educational animation visual language
- polished rendering
- gentle global illumination
- soft contact shadows
- clean readable silhouettes

MOOD RULES

This must feel specifically like:
- a bright school morning
- the beginning of a hopeful day
- a healthy, encouraging learning environment
- an emotionally positive atmosphere for creativity and exploration

AVOID

Do not make it:
- sunset
- golden hour evening
- cloudy
- rainy
- overcast
- dramatic
- dark
- gloomy
- foggy
- abandoned
- overgrown
- dull
- moody in a sad way
- too futuristic
- too photorealistic

Do not add:
- text
- labels
- logos
- watermarks
- extra random buildings
- crowds of children
- unrelated props
- redesigns of the garden or robot

QUALITY

High-resolution cinematic mood illustration, environment-focused, lighting-focused, consistent with the provided School Garden and Little Robot references, polished, beautiful, fresh, hopeful, and visually production-ready.`
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
            <div class="info-card story-scene-card" style="padding:0; overflow:hidden;">
              <div class="visual-placeholder story-scene-visual" style="aspect-ratio:16/9; border:none; border-radius:0; border-bottom:1px solid rgba(255,255,255,0.1);">
                <img class="story-scene-image" src="${s.image}" alt="${s.title}" />
                <div class="scene-prompt-overlay">
                  <span>Detailed prompt for Scene ${i + 1}</span>
                  <button
                    type="button"
                    class="scene-prompt-copy"
                    data-scene-index="${i}"
                    aria-label="Copy detailed prompt for ${s.title}"
                  >
                    <i data-lucide="copy" class="icon" aria-hidden="true"></i>
                    Copy Prompt
                  </button>
                </div>
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
    const activeCat = this.promptState.activeCategory;
    const current = this.getPromptCategoryData(activeCat);

    return `
      <div style="display:flex; flex-direction:column; height:100%; min-height:0;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle" style="margin-bottom:24px;">${slide.supportingCopy}</p>
        
        <div style="display:grid; grid-template-columns: 200px 1fr 300px; gap:32px; flex:1; min-height:0; align-items:stretch;">
          <!-- Left: Categories -->
          <div style="display:flex; flex-direction:column; gap: 24px;">
            <div>
              <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:12px;">1. CHARACTER</div>
              <div class="prompt-chips">
                <button class="prompt-chip ${activeCat === 'tokoh' ? 'is-active' : ''}" data-type="activeCategory" data-value="tokoh" aria-pressed="${activeCat === 'tokoh'}">Little robot</button>
              </div>
            </div>
            
            <div>
              <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:12px;">2. SETTING</div>
              <div class="prompt-chips">
                <button class="prompt-chip ${activeCat === 'tempat' ? 'is-active' : ''}" data-type="activeCategory" data-value="tempat" aria-pressed="${activeCat === 'tempat'}">School garden</button>
              </div>
            </div>
            
            <div>
              <div style="font-size:14px; font-weight:600; color:var(--accent-teal); margin-bottom:12px;">3. MOOD</div>
              <div class="prompt-chips">
                <button class="prompt-chip ${activeCat === 'suasana' ? 'is-active' : ''}" data-type="activeCategory" data-value="suasana" aria-pressed="${activeCat === 'suasana'}">Bright morning</button>
              </div>
            </div>
          </div>
          
          <!-- Middle: Prompt -->
          <div style="display:flex; flex-direction:column; min-height:0; overflow:hidden;">
            <p style="font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">AI Prompt Result</p>
            <div class="prompt-preview" id="prompt-preview-box" style="flex:1 1 auto; min-height:0; margin-bottom:12px; max-height:none; overflow-y:auto; white-space:pre-wrap;">
              ${current.prompt}
            </div>
            <button class="btn-secondary" id="btn-copy-prompt" style="align-self:flex-start; flex:0 0 auto;">
              <i data-lucide="copy" class="icon"></i> Copy Prompt
            </button>
          </div>
          
          <!-- Right: Image -->
          <div style="display:flex; flex-direction:column; align-items:center;">
            <p style="font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">Visual Result</p>
            <img id="prompt-result-image" src="${current.image}" alt="${current.label}" style="width:100%; border-radius:12px; object-fit:contain; max-height:420px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);" />
          </div>
        </div>
      </div>
    `;
  }

  getPromptCategoryData(category) {
    const activeData = {
      tokoh: {
        title: "CHARACTER",
        label: "Little robot",
        image: "../assets/characters/Robot.jpeg",
        prompt: this.promptState.tokoh
      },
      tempat: {
        title: "SETTING",
        label: "School garden",
        image: "../assets/Tempat/school garden.jpeg",
        prompt: this.promptState.tempat
      },
      suasana: {
        title: "MOOD",
        label: "Bright morning",
        image: "../assets/Mood/bright morning.jpeg",
        prompt: this.promptState.suasana
      }
    };

    return activeData[category] || activeData.tokoh;
  }

  renderContohVisual(slide) {
    const storyboard = slide.storyboard;

    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle storyboard-subtitle">${slide.supportingCopy}</p>

        <div class="storyboard-layout">
          <div class="info-card story-scene-card storyboard-result-card">
            <div class="story-scene-visual storyboard-result-visual">
              <img class="story-scene-image storyboard-result-image" src="${storyboard.image}" alt="${storyboard.label}" />
              <div class="scene-prompt-overlay">
                <span>Prompt used to create this storyboard</span>
                <button
                  type="button"
                  class="scene-prompt-copy storyboard-prompt-copy"
                  aria-label="Copy storyboard prompt"
                >
                  <i data-lucide="copy" class="icon" aria-hidden="true"></i>
                  Copy Prompt
                </button>
              </div>
            </div>
            <div class="storyboard-result-caption">
              <div>
                <span>FINAL PLANNING OUTPUT</span>
                <strong>${storyboard.label}</strong>
              </div>
              <p>${storyboard.description}</p>
            </div>
          </div>

          <aside class="info-card storyboard-prompt-panel">
            <span class="storyboard-panel-eyebrow">ACTUAL AI WORKFLOW</span>
            <img src="${storyboard.promptScreenshot}" alt="ChatGPT storyboard prompt and result" />
            <div class="storyboard-prompt-quote">
              <span>PROMPT</span>
              <p>“${storyboard.prompt}”</p>
            </div>
            <div class="storyboard-panel-takeaway">
              <strong>${slide.callout}</strong>
              <span>${slide.subCallout}</span>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  renderGambarKeVideo(slide) {
    const video = slide.video;

    return `
      <div style="display:flex; flex-direction:column; height:100%;">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle video-slide-subtitle">${slide.supportingCopy}</p>

        <div class="video-slide-layout">
          <div class="info-card video-preview-card">
            ${video.source ? `
              <video
                class="video-player"
                controls
                playsinline
                preload="metadata"
                poster="${video.poster}"
                aria-label="10-second school garden animation"
              >
                <source src="${video.source}" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            ` : video.youtubeUrl ? `
              <iframe
                src="${video.youtubeUrl}"
                title="10-second school garden animation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            ` : `
              <img class="video-preview-poster" src="${video.poster}" alt="Storyboard used for the video generation" />
              <div class="video-generation-overlay">
                <span class="video-loader-icon" aria-hidden="true"></span>
                <span>GENERATION IN PROGRESS</span>
                <strong>10-Second Cinematic Animation</strong>
                <p>The YouTube preview will appear here when the final render is ready.</p>
              </div>
            `}
          </div>

          <aside class="info-card video-prompt-panel">
            <span class="video-panel-eyebrow">LONG-FORM VIDEO PROMPT</span>
            <h3>Cinematic production instructions</h3>

            <div class="video-specs">
              <span><strong>${video.duration}</strong>Duration</span>
              <span><strong>${video.format}</strong>Format</span>
              <span><strong>${video.audio}</strong>Audio</span>
            </div>

            <ul class="video-aspects">
              ${slide.aspects.map(a => `
                <li>
                  <i data-lucide="check-circle-2" class="icon" aria-hidden="true"></i>
                  ${a}
                </li>
              `).join('')}
            </ul>

            <button type="button" class="video-prompt-copy" aria-label="Copy long video prompt">
              <i data-lucide="copy" class="icon" aria-hidden="true"></i>
              Copy Long Prompt
            </button>

            <div class="video-status-callout">
              <strong>${slide.callout}</strong>
              <span>${slide.note}</span>
            </div>
          </aside>
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
    
    // Prompt interactions are bound via delegation for the story and prompt slides.
    document.addEventListener('click', (e) => {
      const videoPromptButton = e.target.closest('.video-prompt-copy');
      const storyboardPromptButton = e.target.closest('.storyboard-prompt-copy');
      const scenePromptButton = e.target.closest('.scene-prompt-copy');

      if (videoPromptButton) {
        this.copyVideoPrompt();
      } else if (storyboardPromptButton) {
        this.copyStoryboardPrompt();
      } else if (scenePromptButton) {
        this.copyScenePrompt(scenePromptButton);
      } else if (e.target.classList.contains('prompt-chip')) {
        this.handlePromptChipClick(e.target);
      } else if (e.target.closest('#btn-copy-prompt')) {
        this.copyPrompt();
      }
    });
  }

  handlePromptChipClick(btn) {
    const type = btn.getAttribute('data-type');
    const value = btn.getAttribute('data-value');

    if (type !== 'activeCategory' || !['tokoh', 'tempat', 'suasana'].includes(value)) {
      return;
    }

    // Update state
    this.promptState.activeCategory = value;
    
    // Update UI for chips
    document.querySelectorAll(`.prompt-chip[data-type="${type}"]`).forEach(el => {
      el.classList.remove('is-active');
      el.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');

    // Keep the prompt and its matching visual in sync with the selected category.
    const current = this.getPromptCategoryData(value);
    const box = document.getElementById('prompt-preview-box');
    const image = document.getElementById('prompt-result-image');

    if (box) {
      box.textContent = current.prompt;
      box.scrollTop = 0;
    }

    if (image) {
      image.src = current.image;
      image.alt = current.label;
    }
  }

  copyPrompt() {
    const box = document.getElementById('prompt-preview-box');
    if (!box) return;

    this.copyText(box.textContent.trim(), 'Prompt copied successfully');
  }

  copyScenePrompt(btn) {
    const sceneIndex = Number.parseInt(btn.getAttribute('data-scene-index'), 10);
    const storySlide = this.slides.find(slide => slide.id === 'alur-cerita-3-scene');
    const prompt = storySlide?.scenes?.[sceneIndex]?.prompt;

    if (!prompt) return;

    this.copyText(prompt.trim(), `Scene ${sceneIndex + 1} prompt copied successfully`);
  }

  copyStoryboardPrompt() {
    const storyboardSlide = this.slides.find(slide => slide.id === 'contoh-visual-ai');
    const prompt = storyboardSlide?.storyboard?.prompt;

    if (!prompt) return;

    this.copyText(prompt.trim(), 'Storyboard prompt copied successfully');
  }

  copyVideoPrompt() {
    const videoSlide = this.slides.find(slide => slide.id === 'dari-gambar-ke-video');
    const prompt = videoSlide?.video?.prompt;

    if (!prompt) return;

    this.copyText(prompt.trim(), 'Long video prompt copied successfully');
  }

  copyText(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('toast-message');
      toast.textContent = successMessage;
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
