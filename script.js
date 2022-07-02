let questions = [
    {
        "question": "Wie viele Bücher gibt es im Neuen Testament?",
        "ans_1": "15",
        "ans_2": "32",
        "ans_3": "27",
        "ans_4": "25",
        "ans_right": 3
    },
    {
        "question": "Welcher Apostel hatte Jesus nach seiner Verhaftung dreimal verleugnet?",
        "ans_1": " Judas",
        "ans_2": "Philippus",
        "ans_3": "Petrus",
        "ans_4": "Matthäus",
        "ans_right": 3
    },
    {
        "question": "Wer bat Pilatus um den Leichnam Jesu, nachdem er gekreuzigt wurde?",
        "ans_1": "Josef von Arimathäa",
        "ans_2": "Maria, die Mutter von Jesus",
        "ans_3": "Maria Magdalena",
        "ans_4": "Maria von Klopas",
        "ans_right": 1
    },
    {
        "question": "Wie viele Tage und Nächte hat es geregnet, während Noah auf der Arche war?",
        "ans_1": "3",
        "ans_2": "25",
        "ans_3": "15",
        "ans_4": "40",
        "ans_right": 4
    },
    {
        "question": "Wie viele Plagen schickte Gott nach Ägypten?",
        "ans_1": "2",
        "ans_2": "10",
        "ans_3": "5",
        "ans_4": "13",
        "ans_right": 2
    },
    {
        "question": "Wie wurde Mose von seiner Mutter gerettet, als er noch ein Baby war?",
        "ans_1": "Sie opferte sich für ihn",
        "ans_2": "Sie legte ihn in einen Korb und ließ ihn den Fluss entlang fahren",
        "ans_3": "Sie versteckte ihn irgendwo weit weg",
        "ans_4": "Sie gab ihn zur Adoption frei",
        "ans_right": 2
    },
    {
        "question": "Welche der folgenden Ereignisse geschahen zuerst, als Jesus starb?",
        "ans_1": "Der Schleier zerriss in zwei Teile",
        "ans_2": "Erdbeben",
        "ans_3": "Das Grab brach auf",
        "ans_4": "Die Babys weinten",
        "ans_right": 1
    },
    {
        "question": "Wo ist Jesus nach seiner Rückkehr aus Ägypten aufgewachsen?",
        "ans_1": "Bethlehem",
        "ans_2": "Jerusalem",
        "ans_3": "Nazareth",
        "ans_4": "Galiläa",
        "ans_right": 3
    },
    {
        "question": "Welches ist das kürzeste Buch im Neuen Testament?",
        "ans_1": "2 Johannes",
        "ans_2": "Philemon",
        "ans_3": "3 Johannes",
        "ans_4": "Judas",
        "ans_right": 1
    },
    {
        "question": "Wie hat Judas die römischen Soldaten auf die Identität Jesu hingewiesen?",
        "ans_1": "Judas zeigte auf Jesus",
        "ans_2": "Judas hob die Hand von Jesus",
        "ans_3": "Judas küsste Jesus",
        "ans_4": "Judas brachte die Römer physisch zu Jesus",
        "ans_right": 3
    }
];
let currentQuestion = 0;
let score = 0;
let AUDIO_SUCCES = new Audio('/audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('questionsTotal').innerHTML = `${questions.length}`;
    showQuestion();
    document.getElementById('btn-next').disabled = true;
}

function showQuestion() {
    if (isGameOver()) {
        showGameOver();
    } else {
        updateProgressBar();
        updateNextQuestion();
    }
}

function isGameOver() {
    return currentQuestion >= questions.length
}

function updateProgressBar() {
    let percent = Math.round((currentQuestion + 1) / questions.length * 100);
    document.getElementById('progressbar').innerHTML = `${percent} %`;
    document.getElementById('progressbar').style.width = `${percent}` + '%';
}

function updateNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionsCurrent').innerHTML = `${currentQuestion + 1}`;
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('ans_1').innerHTML = question['ans_1'];
    document.getElementById('ans_2').innerHTML = question['ans_2'];
    document.getElementById('ans_3').innerHTML = question['ans_3'];
    document.getElementById('ans_4').innerHTML = question['ans_4'];
}

function showGameOver() {
    document.getElementById('head-pic').src = 'img/brain result.png';
    document.getElementById('card').classList.add('text-center');
    document.getElementById('card').innerHTML = `
    <h2><b>Quiz beendet</></h2>
    <div>Dein Punktestand: <b>${score}</b> von <b>${questions.length}</b> Fragen richtig beantwortet!</div>
    <div class="button-row"><button onclick="reset()" class="btn btn-primary">Erneut Spielen?</button></div>`;
}

function answer(answer) {
    if (isAnswerRight(answer)) {
        showRightAnswer(answer);
    } else {
        showWrongAnswer(answer);
    }
    document.getElementById('btn-next').disabled = false;

}

function isAnswerRight(answer) {
    return answer == questions[currentQuestion].ans_right
}

function showRightAnswer(answer) {
    document.getElementById('ans_' + answer).parentNode.classList.add('bg-success');
    score += document.getElementById('btn-next').disabled ? 1 : 0;
    AUDIO_SUCCES.play();
}

function showWrongAnswer(answer) {
    document.getElementById('ans_' + answer).parentNode.classList.add('bg-danger');
    document.getElementById('ans_' + questions[currentQuestion].ans_right).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetButtons();
    document.getElementById('btn-next').disabled = true;
}

function resetButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('ans_' + i).parentNode.classList.remove('bg-success');
        document.getElementById('ans_' + i).parentNode.classList.remove('bg-danger');
    }
}

function reset() {
    document.getElementById('card').innerHTML = `
    <h5 class="card-title" id="question">Frage</h5>
    <div class="card quiz-ans mb-2"onclick="answer(1)">
        <div class="card-body" id="ans_1">Antwort</div>
    </div>
    <div class="card quiz-ans mb-2" onclick="answer(2)">
        <div class="card-body" id="ans_2">Antwort</div>
    </div>
    <div class="card quiz-ans mb-2" onclick="answer(3)">
        <div class="card-body" id="ans_3">Antwort</div>
    </div>
    <div class="card quiz-ans mb-2" onclick="answer(4)">
        <div class="card-body" id="ans_4">Antwort</div>
    </div>
    <div class="question-footer">
        <div><b id="questionsCurrent">1</b> von <b id="questionsTotal">5</b> Fragen</div>
        <button onclick="nextQuestion()" class="btn btn-primary" id="btn-next">Nächste Frage</button>
    </div>`;
    document.getElementById('head-pic').src = 'img/pencil.jpg';
    currentQuestion = 0;
    score = 0;
    init();
}