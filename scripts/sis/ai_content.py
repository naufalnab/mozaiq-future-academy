"""Author the AI Creative Media Academy SIS syllabus (no .docx was provided for it).

Adapted from silabus/AI.txt (16 sessions x 60 min, Elyon) into the 10 x 55 min SIS format.
Writes data/sis/ai.json, which build.py merges with data/sis/syllabi.json.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
p = lambda t: {"t": "p", "text": t}
lbl = lambda t: {"t": "label", "text": t}
ul = lambda *i: {"t": "ul", "items": list(i)}
def tbl(*rows):
    return {"t": "table", "rows": [[[c] for c in r] for r in rows]}

TIMES = ["15:15–15:20", "15:20–15:30", "15:30–15:40", "15:40–16:05", "16:05–16:10"]
def session(n, title, outcome, opening, demo, guided, produce, reflect, output):
    flow = tbl(["Time", "Activity"], *[[t, a] for t, a in zip(TIMES, [
        "Opening: " + opening, "Teacher demo: " + demo, "Guided practice: " + guided,
        "Creative production: " + produce, "Reflection & saving files: " + reflect])])
    return {"n": n, "title": title, "blocks": [p("Learning outcome: " + outcome), lbl("Session flow"), flow, lbl("Output"), p(output)]}

sessions = [
    session(1, "What Is AI? & Responsible Use",
        "Students explain what AI can and cannot do, and agree on rules for using it honestly and safely.",
        "AI Detective Quiz warm-up (Kahoot).", "How AI works in simple terms, with examples of good and wrong AI answers.",
        "Sort examples into human idea, human decision, and AI help.", "Write a personal AI Promise: safe, honest, responsible.",
        "Share one rule; create a personal project folder.", "AI Promise card and project folder."),
    session(2, "Story Idea & Script with AI",
        "Students choose a useful story idea and write a short script with a hook, middle, and closing.",
        "Spark ideas from safe themes: kindness, environment, school life, local culture.", "Turn one broad topic into a short video idea and a 5–7 sentence script.",
        "Co-write a sample script with an AI assistant and edit it together.", "Write and improve a personal script for a 20–40 second video.",
        "Read the script aloud; mark parts that are too long or unclear.", "Final script for the student's own video."),
    session(3, "Voice Direction & AI Voice-over",
        "Students direct a voice through character, emotion, and pacing, and compare two voice-over takes.",
        "Listen to two voices reading the same line; discuss the difference.", "Voice Card: character, emotion, speed, pauses.",
        "Write a Voice Card for the sample script.", "Create a Voice Card for the own script; teacher generates two takes to compare.",
        "Choose the best take and save the audio file.", "Voice Card and selected voice-over."),
    session(4, "Scene Breakdown & Storyboard",
        "Students split a script into 4–6 scenes, each with a visual world and an emotional meaning.",
        "Watch a short clip and count its scenes.", "How a storyboard plans scenes before any visuals are made.",
        "Break the sample script into scenes together.", "Build a storyboard: dialogue, visual world, and feeling for every scene.",
        "Check that the story is simple enough to produce.", "Completed storyboard."),
    session(5, "Visual Prompt Formula & Style Bible",
        "Students write clear image prompts and keep characters and style consistent across scenes.",
        "Guess what prompt created a shown image.", "Prompt formula: subject, setting, lighting, composition, style.",
        "Improve a weak prompt step by step.", "Create a Style Bible and prompts for every scene.",
        "Peer check: are the prompts clear and consistent?", "Style Bible and scene prompts."),
    session(6, "AI Image Generation (Teacher-Guided)",
        "Students generate scene visuals, choose the best results, and revise prompts when output is off.",
        "Recap the Style Bible; safety check on topics and content.", "Teacher generates one scene live and explains choosing and rejecting results.",
        "Revise one prompt together after a poor result.", "Generate and select the main image for each scene with teacher help.",
        "Rename and organise image files.", "One selected visual for every scene."),
    session(7, "Image to Video & Transitions (Teacher-Guided)",
        "Students bring still images to life with motion, camera movement, and transitions between scenes.",
        "Compare a still image with the same image animated.", "Motion prompts, camera moves, and transition styles.",
        "Animate one sample scene together.", "Create motion clips for the scenes with teacher help; check characters, text, and symbols first.",
        "Save clips and note which ones need revision.", "Animated clip for every scene."),
    session(8, "Sound, Music & Editing in Canva",
        "Students edit a vertical 9:16 video with the voice-over as the backbone, plus sound effects and subtitles.",
        "Watch a silent video, then the same video with sound.", "Canva basics: timeline, voice-over backbone, subtitles, ambience.",
        "Import scenes and place the voice-over together.", "Edit the full video with subtitles and sound effects.",
        "Export a draft and save the project.", "Draft edited video."),
    session(9, "Thumbnail, Caption & Peer Review",
        "Students give and use feedback with a simple rubric, and plan safe, honest sharing of their work.",
        "Quick review of rules from the AI Promise.", "Feedback rubric; how to write a thumbnail and caption; crediting AI help.",
        "Review a sample video with the rubric.", "Revise the video from peer feedback; make a thumbnail and caption.",
        "Teacher checkpoint: subtitles, audio, AI credit, file name.", "Final video, thumbnail, and caption."),
    session(10, "AI Expo Showcase & Graduation",
        "Students present their video, explain their workflow and creative decisions, and reflect on responsible AI use.",
        "Set up the exhibition and rehearse the presentation.", "Presentation tips: workflow, tools, decisions, and ethics.",
        "Practise a 1-minute explanation with a partner.", "Showcase videos to classmates, with parents where invited; explain the process.",
        "Reflection and certificate ceremony.", "Presented final video and certificate."),
]

sections = [
    {"title": "Program Overview", "blocks": [
        p("AI Creative Media Academy teaches students to direct AI instead of being replaced by it. Students turn their own idea into a short vertical video, learning how to write prompts, direct voice, create visuals, animate images, and edit, while thinking carefully about honesty, privacy, and responsible use."),
        tbl(["Program Detail", "Description"], ["Program", "AI Creative Media Academy"], ["Provider", "Mozaiq Future Academy"],
            ["School", "Surabaya Intercultural School (SIS)"], ["Sessions", "10"], ["Session time", "15:15–16:10 (55 minutes)"],
            ["Level", "Beginner, no prior AI experience needed"], ["Final output", "A short AI-assisted vertical video (9:16)"]),
        p("Main learning flow: IDEA → STORY → VOICE → SCENE → IMAGE → VIDEO → EDIT → SHARE.")]},
    {"title": "Program Objectives", "blocks": [
        ul("Explain what AI is, what it can do, and its limits, including that AI can be wrong or biased.",
           "Write clear prompts with context, goal, and instructions.",
           "Write a short story script with a beginning, middle, and ending.",
           "Direct a voice-over through character, emotion, and pacing.",
           "Plan scenes with a storyboard and keep visuals consistent.",
           "Turn images into short videos with motion and transitions.",
           "Edit audio, subtitles, and thumbnail, and present the work.",
           "Use AI honestly, safely, and with credit.")]},
    {"title": "Standard Session Structure", "blocks": [
        tbl(["Time", "Duration", "Activity"], ["15:15–15:20", "5 min", "Opening and connection"], ["15:20–15:30", "10 min", "Teacher demonstration"],
            ["15:30–15:40", "10 min", "Guided practice"], ["15:40–16:05", "25 min", "Creative production"],
            ["16:05–16:10", "5 min", "Reflection and file saving"])]},
    {"title": "Tools & Digital Safety", "blocks": [
        lbl("Tools"),
        ul("ChatGPT, Claude, or Gemini: ideas, scripts, prompts, and feedback.", "Google AI Studio: voice-over (teacher-guided).",
           "Image generator and image-to-video tools such as Dola and Dreamina (teacher-guided).", "Canva: editing, subtitles, thumbnail, and presentation."),
        lbl("Digital safety"),
        ul("Generating is done with school or teacher accounts, following each platform's age rules; students do not need personal AI accounts.",
           "No personal data, face photos, full names, voices, or family information goes into public AI tools.",
           "Student work is shared only after teacher and, when needed, parent approval.",
           "Students always check AI answers and credit AI help.")]},
    {"title": "Student Assessment", "blocks": [
        tbl(["Area", "Weight"], ["Ethical and responsible AI use", "20%"], ["Storytelling, script, and prompts", "20%"],
            ["Creative visuals and audio", "20%"], ["Production process and craft", "20%"], ["Teamwork, reflection, and presentation", "20%"])]},
    {"title": "Final Project", "blocks": [
        ul("One vertical 9:16 video of about 20–40 seconds with 4–6 short scenes.",
           "A narrator or two characters, consistent visuals, simple transitions, and subtitles.",
           "A thumbnail, a caption, and the statement: “Made with AI assistance and the student's creative decisions.”")]},
]

out = {"slug": "ai", "name": "AI Creative Media", "cover": [], "source": "authored (adapted from silabus/AI.txt)", "sections": sections, "sessions": sessions}
with open(os.path.join(ROOT, "data/sis/ai.json"), "w", encoding="utf-8") as f:
    json.dump({"ai": out}, f, ensure_ascii=False, indent=1)
print("ok")
