/* =====================================================
   KHUSHIYAA.EXE
   Interactive Friendship Website
===================================================== */


/* =====================================================
   INTRO
===================================================== */

const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");
const enterBtn = document.getElementById("enterBtn");

const loadingMessages = [
    "Checking friendship compatibility...",
    "Scanning school memories...",
    "Calculating emotional attachment...",
    "Detecting BL obsession...",
    "Measuring carbon-copy levels...",
    "Checking stupidity levels...",
    "Friendship dangerously strong...",
    "Khushiyaa.exe ready 💗"
];

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 12) + 5;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loadingInterval);

        loadingBar.style.width = "100%";

        loadingText.innerText =
            "Friendship compatibility: 1000000% 💗";

        enterBtn.classList.remove("hidden");

        confetti();

        return;
    }

    loadingBar.style.width = progress + "%";

    const index = Math.min(
        Math.floor(progress / 14),
        loadingMessages.length - 1
    );

    loadingText.innerText = loadingMessages[index];

}, 350);


/* =====================================================
   ENTER WEBSITE
===================================================== */

enterBtn.addEventListener("click", () => {

    document.getElementById("intro").classList.add("hidden");

    document.getElementById("mainSite").classList.remove("hidden");

    showToast("Welcome, Khushiyaa ♡");

    createParticles();

});


/* =====================================================
   NAVIGATION
===================================================== */

function showSection(id) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active-page");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


document.querySelectorAll("[data-section]").forEach(button => {

    button.addEventListener("click", () => {

        const section = button.dataset.section;

        showSection(section);

    });

});


/* =====================================================
   CARBON COPY QUIZ
===================================================== */

let carbonScore = 0;

const carbonQuestions = [

    "Who is more likely to overthink a completely normal message?",

    "Who can turn a 5 minute conversation into a 3 hour conversation?",

    "Who is more likely to randomly send something completely unhinged?",

    "Who gets emotionally attached to fictional characters?",

    "Who is more likely to say 'I'm fine' while absolutely NOT being fine?"

];

let carbonIndex = 0;

function carbonAnswer(answer) {

    carbonScore++;

    const result =
        document.getElementById("carbonResult");

    const responses = [
        "Correct answer: BOTH. You two are suspiciously identical. 🧬",

        "Scientists are concerned. The similarity is increasing. 😭",

        "Carbon-copy percentage rising...",

        "At this point you're basically the same person.",

        "DNA test cancelled. Results are too obvious. 😂"
    ];

    result.innerText =
        responses[Math.min(carbonScore - 1, responses.length - 1)];

    carbonIndex++;

    if (carbonIndex < carbonQuestions.length) {

        setTimeout(() => {

            document.getElementById("carbonQuestion")
                .innerText = carbonQuestions[carbonIndex];

            result.innerText = "";

        }, 1000);

    } else {

        setTimeout(() => {

            document.getElementById("carbonQuestion")
                .innerText =
                "FINAL RESULT: 99.9% CARBON COPY 🧬";

            result.innerText =
                "The remaining 0.1% is probably just different levels of chaos.";

            confetti();

        }, 1000);

    }

}


/* =====================================================
   GAME TABS
===================================================== */

function openGame(gameId, button) {

    document.querySelectorAll(".game-panel")
        .forEach(panel => {
            panel.classList.remove("active-game");
        });

    document.querySelectorAll(".game-tab")
        .forEach(tab => {
            tab.classList.remove("active");
        });

    document.getElementById(gameId)
        .classList.add("active-game");

    button.classList.add("active");

    if (gameId === "memoryGame") {
        startMemoryGame();
    }

}


/* =====================================================
   QUIZ GAME
===================================================== */

const quizQuestions = [

    {
        question: "Who understands me better than almost anyone?",
        options: [
            "Google",
            "Khushiyaa",
            "My cat",
            "Nobody"
        ],
        answer: 1
    },

    {
        question: "What are we dangerously obsessed with?",
        options: [
            "BL couples",
            "Calculus",
            "Gardening",
            "Taxes"
        ],
        answer: 0
    },

    {
        question: "What is Khushiyaa basically?",
        options: [
            "A stranger",
            "My carbon copy",
            "My enemy",
            "A government official"
        ],
        answer: 1
    },

    {
        question: "What does Khushiyaa do to me?",
        options: [
            "Treats me like a child",
            "Ignores me",
            "Sends invoices",
            "Nothing"
        ],
        answer: 0
    },

    {
        question: "How long is our friendship supposed to last?",
        options: [
            "One week",
            "Until Friday",
            "Forever",
            "Until the next BL episode"
        ],
        answer: 2
    }

];

let quizIndex = 0;
let quizScore = 0;

function loadQuiz() {

    const question =
        quizQuestions[quizIndex];

    document.getElementById("quizQuestion")
        .innerText = question.question;

    const options =
        document.getElementById("quizOptions");

    options.innerHTML = "";

    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.innerText = option;

        button.onclick = () => answerQuiz(index);

        options.appendChild(button);

    });

}

function answerQuiz(index) {

    const question =
        quizQuestions[quizIndex];

    const feedback =
        document.getElementById("quizFeedback");

    if (index === question.answer) {

        quizScore++;

        feedback.innerText =
            "CORRECT 😭💗 Khushiyaa knows you too well.";

        confetti();

    } else {

        feedback.innerText =
            "Wrong. Friendship authorities have been notified. 🚨";

    }

    document.getElementById("quizScore")
        .innerText = quizScore;

    quizIndex++;

    if (quizIndex >= quizQuestions.length) {

        setTimeout(() => {

            feedback.innerText =
                `Quiz complete! Score: ${quizScore}/${quizQuestions.length} 💗`;

            if (quizScore >= 4) {
                confetti();
            }

            quizIndex = 0;
            quizScore = 0;

        }, 1000);

    } else {

        setTimeout(loadQuiz, 1000);

    }

}

loadQuiz();


/* =====================================================
   HEART CATCHING GAME
===================================================== */

let heartGameRunning = false;
let heartScore = 0;
let heartTimer = 20;
let heartInterval;
let spawnInterval;

function startHeartGame() {

    if (heartGameRunning) return;

    heartGameRunning = true;

    heartScore = 0;
    heartTimer = 20;

    document.getElementById("heartScore")
        .innerText = heartScore;

    document.getElementById("heartTime")
        .innerText = heartTimer;

    document.getElementById("heartResult")
        .innerText = "";

    const arena =
        document.getElementById("heartArena");

    arena.innerHTML = "";

    spawnInterval = setInterval(spawnHeart, 500);

    heartInterval = setInterval(() => {

        heartTimer--;

        document.getElementById("heartTime")
            .innerText = heartTimer;

        if (heartTimer <= 0) {
            endHeartGame();
        }

    }, 1000);

}


function spawnHeart() {

    if (!heartGameRunning) return;

    const arena =
        document.getElementById("heartArena");

    const heart =
        document.createElement("div");

    heart.className = "game-heart";

    heart.innerText =
        Math.random() > 0.2 ? "♥" : "♡";

    heart.style.left =
        Math.random() * 90 + "%";

    heart.style.top =
        Math.random() * 85 + "%";

    heart.style.color =
        Math.random() > 0.5
            ? "#ff4d91"
            : "#9d72ff";

    heart.onclick = () => {

        heartScore++;

        document.getElementById("heartScore")
            .innerText = heartScore;

        heart.remove();

        if (heartScore % 5 === 0) {
            showToast("STOP STEALING ALL THE LOVE 😭");
        }

    };

    arena.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1800);

}


function endHeartGame() {

    heartGameRunning = false;

    clearInterval(heartInterval);
    clearInterval(spawnInterval);

    const result =
        document.getElementById("heartResult");

    if (heartScore >= 15) {

        result.innerText =
            `INSANE. You caught ${heartScore} hearts. 💗`;

        confetti();

    } else if (heartScore >= 8) {

        result.innerText =
            `Not bad! ${heartScore} hearts. 🫶`;

    } else {

        result.innerText =
            `Only ${heartScore}? We need to discuss this. 😭`;

    }

}


/* =====================================================
   MEMORY GAME
===================================================== */

const memorySymbols = [
    "💗",
    "🌸",
    "🧸",
    "🫶",
    "🌙",
    "✨",
    "🏳️‍🌈",
    "🎀"
];

let memoryFirst = null;
let memorySecond = null;
let memoryLocked = false;
let matchedPairs = 0;

function startMemoryGame() {

    const board =
        document.getElementById("memoryBoard");

    board.innerHTML = "";

    memoryFirst = null;
    memorySecond = null;
    memoryLocked = false;
    matchedPairs = 0;

    const cards = [
        ...memorySymbols,
        ...memorySymbols
    ];

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(symbol => {

        const card =
            document.createElement("div");

        card.className = "memory-card";

        card.dataset.symbol = symbol;

        card.innerText = symbol;

        card.onclick = () => flipMemoryCard(card);

        board.appendChild(card);

    });

    document.getElementById("memoryResult")
        .innerText = "";

}


function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card === memoryFirst ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.classList.add("flipped");

    if (!memoryFirst) {

        memoryFirst = card;

        return;

    }

    memorySecond = card;

    memoryLocked = true;

    if (
        memoryFirst.dataset.symbol ===
        memorySecond.dataset.symbol
    ) {

        memoryFirst.classList.add("matched");
        memorySecond.classList.add("matched");

        matchedPairs++;

        memoryFirst = null;
        memorySecond = null;
        memoryLocked = false;

        if (matchedPairs === memorySymbols.length) {

            document.getElementById("memoryResult")
                .innerText =
                "YOU FOUND EVERYTHING! Just like you found your way into my life. 🥹💗";

            confetti();

        }

    } else {

        setTimeout(() => {

            memoryFirst.classList.remove("flipped");
            memorySecond.classList.remove("flipped");

            memoryFirst = null;
            memorySecond = null;
            memoryLocked = false;

        }, 800);

    }

}

startMemoryGame();


/* =====================================================
   CARE SYSTEM
===================================================== */

const careMessages = {

    "food":
        "Good. Khushiyaa Care Department approves. 🍪",

    "food-no":
        "EXCUSE ME? GO EAT SOMETHING. NOW. 🫵😭",

    "sleep":
        "Excellent. Responsible human detected. 🥹",

    "sleep-no":
        "I knew it. GO TO SLEEP. This is an official warning. 🛌",

    "stupid":
        "At least you're honest. Khushiyaa has been informed. 🚨",

    "stupid-no":
        "Liar. We both know you did something stupid. 😭"

};

function careResponse(type) {

    document.getElementById("careResult")
        .innerText = careMessages[type];

}


/* =====================================================
   FLIRT GENERATOR
===================================================== */

const flirtLines = [

    "You're lucky you're my best friend because otherwise I'd have to flirt with you properly. 😏",

    "Imagine being this cute and still expecting me to behave normally around you.",

    "You are dangerously close to becoming my favorite person. Oh wait. You already are.",

    "If being adorable was illegal, you'd have a very long criminal record.",

    "You're my carbon copy, so technically flirting with you is just flirting with myself. This is confusing. 😭",

    "I blame you for my inability to act normal.",

    "You're annoyingly lovable. It's actually a problem.",

    "I would make a joke about how cute you are, but you'd probably bully me for it.",

    "Best friend? Yes. Favorite human? Also yes. Emotional support menace? Absolutely.",

    "You really decided to be kind, caring AND cute? Greedy."
];

function generateFlirt() {

    const text =
        flirtLines[
            Math.floor(Math.random() * flirtLines.length)
        ];

    const box =
        document.getElementById("flirtText");

    box.style.transform = "scale(.8)";
    box.style.opacity = "0";

    setTimeout(() => {

        box.innerText = text;

        box.style.transform = "scale(1)";
        box.style.opacity = "1";

    }, 200);

}


/* =====================================================
   BL SCREAM
===================================================== */

function blScream() {

    const messages = [

        "AAAAAAAAAAAAAAAAAAAA 😭",

        "THE CHEMISTRY?????",

        "NO BECAUSE LOOK AT THEM",

        "I AM NOT OKAY",

        "THE EYE CONTACT WAS ILLEGAL",

        "WE NEED TO DISCUSS THIS FOR 4 HOURS"

    ];

    showToast(
        messages[
            Math.floor(Math.random() * messages.length)
        ]
    );

    confetti();

}


/* =====================================================
   FINAL MAGIC
===================================================== */

function finalMagic() {

    const element =
        document.getElementById("finalMagic");

    element.classList.remove("hidden");

    confetti();

    setTimeout(() => {

        showToast(
            "Khushiyaa is officially stuck with you forever. 🫂"
        );

    }, 500);

}


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   CONFETTI
===================================================== */

function confetti() {

    const container =
        document.getElementById("confetti");

    const colors = [
        "#ff5c9b",
        "#ffb2d0",
        "#a777ff",
        "#ffd166",
        "#ffffff"
    ];

    for (let i = 0; i < 60; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            Math.random() * 20 + "vh";

        piece.style.background =
            colors[
                Math.floor(Math.random() * colors.length)
            ];

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        piece.style.animationDuration =
            (1 + Math.random() * 2) + "s";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 3000);

    }

}


/* =====================================================
   BACKGROUND PARTICLES
===================================================== */

function createParticles() {

    const container =
        document.getElementById("particles");

    for (let i = 0; i < 40; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "fixed";
        particle.style.width = "3px";
        particle.style.height = "3px";
        particle.style.borderRadius = "50%";
        particle.style.background = "#ff8db9";
        particle.style.opacity = Math.random();
        particle.style.left =
            Math.random() * 100 + "vw";
        particle.style.top =
            Math.random() * 100 + "vh";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "-1";

        container.appendChild(particle);

    }

}
