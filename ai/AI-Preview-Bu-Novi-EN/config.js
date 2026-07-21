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
      { label: "DISCOVERY", title: "The Garden Withers", description: "A little robot discovers the plants in the school garden are drying up and withering.", direction: "wide shot; morning time; slightly dry plants; robot observing the garden." },
      { label: "ACTION", title: "The Robot Finds a Solution", description: "The robot inspects the water pipes and tries to fix the sprinkler system.", direction: "medium shot; robot actively working; a few simple tools; light starts to get brighter." },
      { label: "RESOLUTION", title: "The Garden is Green Again", description: "Water flows again and the plants become fresh and colorful.", direction: "cinematic wide shot; green garden; water spraying gently; robot looking at its work." }
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
        { label: "Little robot", value: "A small friendly robot" },
        { label: "Helpful animal", value: "A helpful animal" },
        { label: "Futuristic vehicle", value: "A futuristic vehicle" }
      ],
      tempat: [
        { label: "School garden", value: "a school garden" },
        { label: "Futuristic city", value: "a futuristic city" },
        { label: "Colorful forest", value: "a colorful forest" }
      ],
      suasana: [
        { label: "Bright morning", value: "bright morning light" },
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
