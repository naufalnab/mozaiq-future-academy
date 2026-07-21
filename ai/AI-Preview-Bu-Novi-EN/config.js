/**
 * Configuration and Data for AI Creative Media Private Preview
 */
export const previewConfig = {
  participantGrade: "5th Grade",
  participantCount: 1,
  duration: "45–60 minutes",
  locationType: "Private Home Preview",
  deviceAvailable: true,
  wifiAvailable: true,
  interests: ["Drawing", "Storytelling", "Making videos"],
  complimentary: true,
  projectTheme: "A Little Robot Saves the School Garden",
  noIndex: true,
};

export const slidesData = [
  {
    id: "cover",
    title: "PRIVATE PREVIEW",
    eyebrow: "MOZAIQ FUTURE ACADEMY",
    badge: "AI CREATIVE MEDIA",
    headline: "From a Single Idea to Image, Story, and Video",
    supportingSentence: "A creative experience to discover how an idea can be developed into an artwork with the help of AI.",
    quickFacts: [
      { label: "Grade", value: "5th Grade" },
      { label: "Participant", value: "1 Participant" },
      { label: "Duration", value: "45–60 Minutes" },
      { label: "Format", value: "Private Home Preview" }
    ],
    presenterNote: "Today we will see how a simple idea can evolve into an image, story, and video."
  },
  {
    id: "apa-yang-akan-dilakukan",
    title: "What Will We Do?",
    supportingCopy: "In this preview session, the child will create a mini project from a simple idea and see how it can be developed into a video.",
    steps: [
      { title: "Idea", description: "Determining characters, settings, problems, and solutions." },
      { title: "Story", description: "Structuring the initial plot, action, and resolution." },
      { title: "Visual AI", description: "Generating images with AI based on the child's idea." },
      { title: "Short Video", description: "Seeing how images can be animated or compiled into a video." }
    ],
    callout: "The child remains the owner of the idea.",
    subCallout: "AI is used as a tool to bring their creativity to life.",
    presenterNote: "The child isn't just trying out tools. They are following the process from idea to final artwork."
  },
  {
    id: "ai-sebagai-alat-bantu",
    title: "AI is a Tool, Not a Replacement for the Child's Ideas",
    columns: {
      left: {
        title: "The Child Decides",
        items: ["story ideas;", "character choices;", "colors and moods;", "storyline;", "the final result to use;", "changes to be made."]
      },
      right: {
        title: "AI Assists By",
        items: ["generating visual alternatives;", "offering variations;", "speeding up exploration;", "helping to visualize instructions;", "revealing new possibilities."]
      }
    },
    flow: ["Child Thinks", "Child Gives Instructions", "AI Assists", "Child Chooses", "Child Refines", "Child Presents"],
    quote: "Technology helps the process. The child still directs the artwork.",
    presenterNote: "AI assists with the process, but the ideas and decisions still come from the child."
  },
  {
    id: "contoh-proyek-mini",
    title: "Mini Project Example",
    projectName: "A Little Robot Saves the School Garden",
    premise: "A little robot finds the school garden withering. It searches for the cause, fixes the sprinkler system, and helps the garden turn green again.",
    stages: ["Finding the problem", "Searching and fixing", "Helping the garden turn green again"],
    callout: "The child may change the characters, colors, setting, or storyline.",
    presenterNote: "We use a simple project so the child can understand the workflow without feeling overwhelmed."
  },
  {
    id: "alur-cerita-3-scene",
    title: "3-Scene Story Structure",
    scenes: [
      {
        label: "DISCOVERY",
        title: "The Garden Withers",
        image: "../assets/Discovery.jpeg",
        description: "A little robot discovers the plants in the school garden are drying up and withering.",
        direction: "wide shot; morning time; slightly dry plants; robot observing the garden.",
        prompt: `Create a polished cinematic 3D animation story frame for:

SCENE 1 — DISCOVERY: THE GARDEN WITHERS

Use the three provided reference images as mandatory visual references. Identify them by their content, regardless of upload order:
- CHARACTER REFERENCE: the Little Robot character design sheet
- ENVIRONMENT REFERENCE: the School Garden environment design sheet
- MOOD REFERENCE: the Bright Morning lighting and atmosphere image

REFERENCE PRIORITY AND CONTINUITY

Preserve the exact Little Robot identity from the character reference:
- the same rounded-square white head
- the same dark navy digital face screen
- the same simple glowing cyan eyes
- the same compact childlike body proportions
- the same white shell, navy joints, cyan chest core, violet details, hands, feet, and materials
- no redesign, no clothing, no mouth, no hair, no extra accessories, and no change in proportions

Preserve the exact School Garden architecture and layout from the environment reference:
- the same elementary school building
- the same garden entrance, paths, raised planting beds, planters, pipe and sprinkler locations
- the same fences, trees, gardening area, landmarks, colors, scale, and spatial relationships
- do not invent a different garden or move major landmarks

Use the Bright Morning reference as the lighting foundation, but reduce the warmth and saturation slightly to support the discovery of a problem. It must still feel like the same morning, location, and visual world used in the later scenes.

STORY PURPOSE

This is the opening discovery frame. The audience must immediately understand that the school garden is normally cared for, but something is wrong: several plants are drying up because the sprinkler system is not working. The mood should feel concerned and curious, never frightening, tragic, or hopeless.

COMPOSITION AND CAMERA

- single cinematic illustration, not a concept sheet, collage, storyboard grid, or multi-panel layout
- landscape 16:9 composition designed to fit an educational presentation card
- wide establishing shot showing the School Garden clearly
- camera at a child-friendly eye level with a gentle three-quarter view into the garden
- use a natural 28–35 mm cinematic lens feeling
- keep the main paths and planting beds readable
- place Little Robot in the foreground or middle ground, slightly off-center, with enough negative space to reveal the withering plants
- create clear depth with foreground leaves, the robot and affected planting bed in the middle ground, and the school building in the background
- use strong but simple visual hierarchy: Little Robot first, withering plants second, garden context third

CHARACTER ACTION AND EMOTION

Show Little Robot standing beside a raised planting bed and noticing the problem for the first time.
- body leaning forward slightly in careful observation
- head tilted with curious concern
- cyan eyes shaped subtly to communicate attention and empathy
- one hand near the chest or chin in a thinking gesture
- the other hand gently indicating or reaching toward one wilted leaf
- friendly, calm, intelligent, and ready to help
- full character silhouette must remain readable
- no exaggerated panic, sadness, or theatrical pose

ENVIRONMENTAL STORY DETAILS

- show several visibly wilted flowers and vegetables with drooping leaves
- include patches of dry, slightly cracked soil, but do not turn the garden into a desert
- healthy structural elements of the garden must remain intact
- sprinkler heads are inactive with no water spraying
- include a subtle visual clue leading toward the cause, such as a dry pipe connection, loose sprinkler fitting, or small damp mark near the maintenance area
- keep some surrounding plants only mildly affected so the garden still feels recoverable
- gardening tools may appear only if they already belong naturally in the established environment
- no children, crowds, gardeners, animals, or unrelated characters

LIGHTING, COLOR, AND ATMOSPHERE

- early bright morning base with soft directional sunlight
- slightly cooler and less saturated than the final resolution scene
- gentle shadows and soft global illumination
- pale blue sky with clean morning air
- subtle warm rim light on Little Robot so the white shell remains separated from the background
- preserve cyan and violet robot lights without overpowering the scene
- use restrained greens, warm soil colors, and muted flower colors around the affected plants
- maintain a hopeful educational tone

VISUAL STYLE

- premium stylized 3D animated feature-film still
- child-friendly educational cinematic storytelling
- clean shapes, polished materials, soft global illumination, accurate contact shadows
- detailed environment without clutter
- expressive staging through posture and eye shape rather than human facial features
- consistent production design suitable for a three-scene animated sequence
- high resolution, sharp focal subject, subtle depth of field, clean edge quality

CONTINUITY REQUIREMENTS FOR THE NEXT SCENES

This image is Scene 1 of a continuous sequence. Preserve the exact robot model, garden layout, time of day, weather, and major prop positions so Scene 2 and Scene 3 can feel like the same event occurring minutes apart. The affected planting bed, broken sprinkler area, and main path must remain easy to identify later.

DO NOT INCLUDE

- text, captions, labels, speech bubbles, logos, watermarks, borders, or UI
- multiple versions of the robot
- duplicated limbs, missing fingers, distorted hands, cropped feet, or changed robot anatomy
- a different school building or redesigned garden
- heavy destruction, dead trees, dramatic storm clouds, darkness, fire, flooding, or dangerous machinery
- photorealistic humans or a live-action look
- excessive cinematic blur that hides the story information

FINAL OUTPUT

A single production-ready landscape 16:9 cinematic frame that clearly communicates: Little Robot has just discovered that the familiar School Garden is withering because the water system is not working. The image must feel like the first frame of one coherent, warm, educational animated story.`
      },
      {
        label: "ACTION",
        title: "The Robot Finds a Solution",
        image: "../assets/Action.jpeg",
        description: "The robot inspects the water pipes and tries to fix the sprinkler system.",
        direction: "medium shot; robot actively working; a few simple tools; light starts to get brighter.",
        prompt: `Create a polished cinematic 3D animation story frame for:

SCENE 2 — ACTION: THE ROBOT FINDS A SOLUTION

Use the three provided reference images as mandatory visual references. Identify them by their content, regardless of upload order:
- CHARACTER REFERENCE: the Little Robot character design sheet
- ENVIRONMENT REFERENCE: the School Garden environment design sheet
- MOOD REFERENCE: the Bright Morning lighting and atmosphere image

REFERENCE PRIORITY AND CONTINUITY

Preserve the exact Little Robot identity from the character reference:
- the same rounded-square white head and dark navy face screen
- the same glowing cyan eyes, compact childlike proportions, cyan chest core, violet accents, hands, feet, and materials
- the same number and shape of fingers
- no redesign, clothing, mouth, hair, weapons, antenna changes, extra equipment attached to the body, or altered proportions

Preserve the exact School Garden design from the environment reference:
- the same school building, entrance, paths, raised planting beds, fences, planters, trees, pipe network, sprinkler heads, and maintenance area
- retain the same spatial relationships and recognizable landmarks shown in Scene 1
- the affected planting bed and damaged sprinkler connection must be the same story location discovered in Scene 1

Use the Bright Morning reference as the lighting foundation. The light may be slightly brighter and warmer than Scene 1 to suggest progress, but the scene must clearly occur only a few minutes later on the same morning.

STORY PURPOSE

This is the central action frame. The audience must immediately understand that Little Robot has found the likely cause of the problem and is carefully repairing the sprinkler pipe. The scene should celebrate observation, problem-solving, patience, and safe hands-on learning. The repair must look understandable and achievable, not like dangerous industrial engineering.

COMPOSITION AND CAMERA

- single cinematic illustration, not a character sheet, environment sheet, collage, storyboard grid, or multi-panel image
- landscape 16:9 composition designed for an educational presentation card
- medium-wide action shot at a child-friendly eye level
- gentle three-quarter camera angle looking toward the repair area
- natural 35–50 mm cinematic lens feeling
- frame Little Robot large enough for the hand action and facial-screen expression to be readable
- keep enough background visible to confirm this is the same School Garden
- place the damaged pipe and robot hands near a rule-of-thirds focal point
- use garden paths, hose lines, or planting-bed edges as subtle leading lines toward the repair
- show clear foreground, middle-ground action, and recognizable school background without clutter

CHARACTER ACTION AND PERFORMANCE

Show Little Robot kneeling safely beside a low sprinkler pipe connection.
- stable balanced kneeling pose with both feet and body mechanics believable
- focused cyan eyes with a calm, intelligent expression
- head angled toward the repair
- one hand carefully stabilizing the pipe or sprinkler fitting
- the other hand using one simple child-safe tool, such as a small rounded wrench
- hands must be anatomically consistent with the reference and visibly connected to the correct arms
- posture communicates concentration, patience, and confidence
- no superhero pose, combat stance, panic, or exaggerated speed

REPAIR AND STORY DETAILS

- clearly show one simple, readable cause: a loosened coupling, disconnected sprinkler fitting, or small cracked connector
- keep the repair mechanism visually understandable and not overly technical
- include only two or three neatly arranged tools, such as a rounded wrench, small screwdriver, and compact repair kit
- no sharp dangerous tools, exposed electrical wires, sparks, welding, heavy machinery, or complex industrial equipment
- show a small test droplet or faint trickle near the repaired joint to suggest the solution is beginning to work
- do not show the entire garden fully restored yet
- the nearby plants should still be wilted, with perhaps one or two leaves beginning to lift slightly
- inactive sprinkler heads may be visible farther back
- preserve the dry soil and affected bed from Scene 1

LIGHTING, COLOR, AND ATMOSPHERE

- bright morning light becoming warmer and more optimistic
- soft sunlight catches the edge of the robot shell and tool
- gentle cyan reflection from the robot chest core near the repair area
- balanced contrast so white robot materials keep their detail
- slightly richer greens than Scene 1, but clearly less lush than Scene 3
- soft blue sky, clean air, natural shadows, subtle global illumination
- the mood is focused, constructive, hopeful, and safe

VISUAL STYLE

- premium stylized 3D animated feature-film still
- child-friendly educational cinematic storytelling
- polished ceramic-polymer robot materials, soft navy joints, subtle reflective face screen
- consistent architectural proportions and garden production design
- clean composition, high visual readability, accurate contact shadows, subtle depth of field
- detailed enough to reward observation while remaining uncluttered
- high-resolution production-ready frame from one coherent animated sequence

CONTINUITY REQUIREMENTS

This image is Scene 2 of the same continuous event as Scene 1 and Scene 3. Keep the exact robot model, garden layout, affected planting bed, repair location, weather, and time of day. Scene 1 showed discovery; this frame shows the repair in progress; Scene 3 will show the successful result. Do not introduce major new props or move established landmarks.

DO NOT INCLUDE

- text, captions, labels, arrows, diagrams, speech bubbles, logos, watermarks, borders, or UI
- multiple robots, children, adults, crowds, or unrelated characters
- duplicated limbs, extra fingers, missing fingers, deformed hands, disconnected tools, or floating objects
- a redesigned robot, different garden, altered school building, or different time of day
- dangerous machinery, sparks, fire, exposed electricity, dramatic flooding, or explosive water pressure
- a fully restored garden before the repair is complete
- a photorealistic live-action look or excessive blur

FINAL OUTPUT

A single production-ready landscape 16:9 cinematic frame that clearly communicates: Little Robot has found the broken sprinkler connection and is carefully fixing it. The frame must bridge the concern of Scene 1 and the joyful recovery of Scene 3 while maintaining exact visual continuity with all three provided references.`
      },
      {
        label: "RESOLUTION",
        title: "The Garden is Green Again",
        image: "../assets/Resolution.jpeg",
        description: "Water flows again and the plants become fresh and colorful.",
        direction: "cinematic wide shot; green garden; water spraying gently; robot looking at its work.",
        prompt: `Create a polished cinematic 3D animation story frame for:

SCENE 3 — RESOLUTION: THE GARDEN IS GREEN AGAIN

Use the three provided reference images as mandatory visual references. Identify them by their content, regardless of upload order:
- CHARACTER REFERENCE: the Little Robot character design sheet
- ENVIRONMENT REFERENCE: the School Garden environment design sheet
- MOOD REFERENCE: the Bright Morning lighting and atmosphere image

REFERENCE PRIORITY AND CONTINUITY

Preserve the exact Little Robot identity from the character reference:
- the same rounded-square white head
- the same dark navy digital face screen and glowing cyan eyes
- the same compact childlike body, cyan chest core, violet accents, navy joints, hands, feet, and premium toy-like materials
- no redesign, clothing, mouth, hair, new accessories, or changed proportions

Preserve the exact School Garden architecture and layout from the environment reference and the previous story scenes:
- the same school building, garden entrance, paths, planting beds, fences, planters, trees, pipes, sprinklers, and landmarks
- the repair area remains in the same location
- major props and spatial relationships must remain unchanged

Use the Bright Morning mood reference strongly for the final lighting, color harmony, atmosphere, and emotional finish. This is the most luminous and colorful scene, but it must still feel natural, polished, and consistent with the two earlier frames.

STORY PURPOSE

This is the satisfying resolution frame. The audience must instantly understand that Little Robot's repair worked: water flows through the sprinkler system, the School Garden is healthy and colorful again, and the robot quietly appreciates the positive result. The emotion should be fresh, joyful, hopeful, and earned—celebrating care, creativity, and problem-solving without becoming overly dramatic.

COMPOSITION AND CAMERA

- single cinematic illustration, not a concept sheet, collage, storyboard grid, before-and-after split, or multi-panel layout
- landscape 16:9 composition designed for an educational presentation card
- cinematic wide hero shot revealing the restored School Garden
- camera at a child-friendly eye level from a recognizable three-quarter garden view
- natural 28–35 mm cinematic lens feeling
- echo the establishing geography of Scene 1 so viewers can immediately compare the transformation
- place Little Robot off-center in the foreground or middle ground, looking across the thriving garden
- use paths, planting beds, and gentle arcs of sprinkler water to guide the eye through the frame
- keep the school building visible as a stable background landmark
- create layered depth with fresh leaves in the foreground, robot and sprinklers in the middle ground, and school architecture behind
- strong visual hierarchy: thriving garden and water first, Little Robot second, school setting third

CHARACTER ACTION AND EMOTION

Show Little Robot standing near the repaired sprinkler area and admiring the result.
- relaxed proud posture without arrogance
- shoulders open and body facing the restored garden
- head tilted slightly upward
- cyan eyes gently curved to communicate happiness and relief
- one hand may rest near the glowing chest core
- the other hand may be open toward the garden in a calm presenting gesture
- alternatively, both hands may rest naturally at the sides while the robot observes the water
- maintain a clear full-body silhouette and exact anatomy
- no jumping, exaggerated celebration, trophy pose, or confetti

RESTORED GARDEN AND STORY DETAILS

- the previously wilted planting bed is now visibly fresh, upright, and healthy
- show lush but believable green leaves, colorful flowers, healthy vegetables, and moist rich soil
- the repaired pipe connection is secure and tidy
- several sprinkler heads release gentle controlled arcs of sparkling water
- water must look refreshing and safe, never like a flood or powerful jet
- include tiny water droplets catching the morning light
- retain the same garden structures and plant placement rather than inventing a fantasy garden
- the repair tools from Scene 2 may be neatly packed into a small kit near the robot, or removed entirely
- no magical transformation effects are required; the recovery should feel like a beautiful cinematic story moment grounded in care and problem-solving

LIGHTING, COLOR, AND ATMOSPHERE

- match the provided Bright Morning reference closely
- warm golden-white sunlight with a fresh clear blue sky
- soft volumetric rays only where natural
- clean soft shadows, realistic global illumination, and subtle reflections on the robot shell
- vibrant greens, cheerful flower colors, warm earth, cyan robot accents, and gentle violet details
- luminous water droplets and restrained sun highlights
- bright and optimistic without overexposure, neon saturation, fantasy glow, or washed-out whites
- fresh air, calm weather, and a polished hopeful atmosphere

VISUAL STYLE

- premium stylized 3D animated feature-film still
- high-end child-friendly educational visual language
- cinematic environmental storytelling with clear readable staging
- polished character and garden materials, accurate shadows, subtle depth of field, high-resolution detail
- beautiful but uncluttered composition
- consistent with the exact production design established by all three reference images
- suitable as the final shot of a coherent three-scene animated sequence

CONTINUITY REQUIREMENTS

This is Scene 3 of the same event shown in Scene 1 and Scene 2. Preserve the exact robot model, garden layout, repaired sprinkler location, school architecture, weather, and morning timeline. The transformation must come from restored water flow and healthier plants—not from redesigning the location. Viewers should recognize the affected planting bed and understand that the robot's repair created this result.

DO NOT INCLUDE

- text, captions, labels, speech bubbles, logos, watermarks, borders, or UI
- multiple robots, crowds, unrelated children or adults, fantasy creatures, or random props
- duplicated limbs, extra fingers, distorted anatomy, changed robot design, or cropped feet
- a different garden, moved landmarks, redesigned school building, or different season
- flooding, extreme water jets, storm effects, nighttime lighting, fireworks, confetti, or excessive rainbow effects
- impossible plant growth, giant flowers, magical sparkles covering the scene, or an amusement-park look
- photorealistic live action or excessive background blur

FINAL OUTPUT

A single production-ready landscape 16:9 cinematic frame that clearly communicates: the sprinkler works again, the familiar School Garden is fresh and green, and Little Robot calmly enjoys the successful result. It must feel like the warm, visually satisfying final frame of the same educational animated story established in Scene 1 and Scene 2.`
      }
    ],
    presenterNote: "A long story can be divided into several scenes that are easier to create."
  },
  {
    id: "dari-ide-ke-prompt",
    title: "From Idea to Prompt",
    supportingCopy: "We help AI understand the idea by providing clear instructions.",
    formula: "CHARACTER + ACTION + SETTING + MOOD",
    questions: ["Who is the character?", "What are they doing?", "Where are they?", "What is the mood like?"],
    exampleAnswers: ["A friendly little robot", "Checking on withered plants", "In a school garden", "Bright, colorful, and cheerful"],
    basePromptPattern: "{tokoh} checking wilted plants in {tempat}, colorful cinematic 3D animation style, {suasana}, child-friendly environment, detailed background, no text, no logos.",
    chips: {
      tokoh: [
        { label: "Little robot", value: `Create a polished vertical character design reference sheet for an original mascot named “LITTLE ROBOT”, presented in a clean professional animation model-sheet layout.

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
high-resolution professional animation character sheet, clean visual hierarchy, accurate anatomy, consistent model design, polished cinematic 3D illustration, soft studio lighting, subtle contact shadows, highly readable silhouettes, vertical 9:16 composition.` },
      ],
      tempat: [
        { label: "School garden", value: `Create a highly polished vertical environment design reference sheet for an original location named:

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
The design sheet must look like one environment documented from several production angles, not several different school gardens.` },
        { label: "Futuristic city", value: "a futuristic city" },
        { label: "Colorful forest", value: "a colorful forest" }
      ],
      suasana: [
        { label: "Bright morning", value: `Create a polished cinematic mood key illustration for the environment mood:

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

High-resolution cinematic mood illustration, environment-focused, lighting-focused, consistent with the provided School Garden and Little Robot references, polished, beautiful, fresh, hopeful, and visually production-ready.` },
        { label: "Adventurous", value: "adventurous mood" },
        { label: "Futuristic", value: "neon glowing lights" },
        { label: "Calm", value: "calm and peaceful lighting" }
      ]
    },
    presenterNote: "A prompt is our way of explaining our idea to AI more clearly."
  },
  {
    id: "contoh-visual-ai",
    title: "AI Visual Examples",
    supportingCopy: "One idea can generate several visuals. The child learns to choose the best result.",
    visuals: ["Discovery Version", "Action Version", "Resolution Version"],
    evaluationQuestions: ["Which one fits the story best?", "What needs to be improved?", "Are the colors right?", "Is the character's position correct?"],
    callout: "The first result doesn't have to be accepted immediately.",
    subCallout: "The child learns to evaluate, select, and refine.",
    presenterNote: "The child doesn't just accept the AI's result, but learns to evaluate and refine it."
  },
  {
    id: "dari-gambar-ke-video",
    title: "From Image to Video",
    supportingCopy: "Visuals can be developed into short videos through motion, camera movement, and mood changes.",
    aspects: ["Character motion", "Camera movement", "Smooth transitions", "Mood changes"],
    callout: "In this preview, the result might be a short animation or a sample video scene.",
    note: "Processing speed may vary depending on the generator and internet connection.",
    presenterNote: "Visuals can then be developed into a video with motion and camera direction."
  },
  {
    id: "yang-dilatih-anak",
    title: "What the Child Learns",
    skills: [
      { title: "Creativity and Imagination", description: "Developing a single idea into a story." },
      { title: "Storytelling", description: "Structuring a clear and meaningful plot." },
      { title: "Visual Thinking", description: "Illustrating ideas in a visual format." },
      { title: "Prompt Communication", description: "Providing clearer instructions." },
      { title: "Decision Making", description: "Choosing the best result and determining the direction." },
      { title: "Presentation", description: "Explaining their idea and final artwork." }
    ],
    responsibleAI: {
      title: "Responsible AI Usage",
      items: ["no personal data inputted;", "verifying results;", "choosing safe content;", "using AI for beneficial artworks."]
    },
    quote: "This preview is not a test. Focus on the process, curiosity, and the courage to try.",
    presenterNote: "Our classes focus not only on the final result, but the thinking skills applied during the process."
  },
  {
    id: "program-lengkap-16-pertemuan",
    title: "Complete 16-Session Program",
    supportingCopy: "Today's preview is a brief introduction. In the complete program, the child will develop a full video project from the initial idea to the final presentation.",
    phases: [
      { title: "Story Foundations", description: "Ideas, themes, characters, and messages." },
      { title: "Storyboard Development", description: "Creating the storyline and complete storyboard." },
      { title: "Visual Production", description: "Creating visuals with consistent styles and characters." },
      { title: "Video Generation & Editing", description: "Turning visuals into video and applying editing." },
      { title: "Responsible AI Practice", description: "Using AI safely, politely, and responsibly." },
      { title: "Final Presentation & Showcase", description: "Presenting the final results and reflecting on the learning process." }
    ],
    finalOutput: "One creative video project made entirely by the child.",
    endingMessage: "One Project. Many Skills. A Memorable Learning Experience.",
    presenterNote: "In the 16-session program, this process is developed into a complete project."
  }
];
