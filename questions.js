
// 1- get questions from mock server OK
// 2- construct questions html 


let loadingQuestions = false
let questions = []
let score = 0
let step = 0
let userAnswers = []

getQuestionsFromBackend()

function getQuestionsFromBackend() {
    loadingQuestions = true
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "https://run.mocky.io/v3/2e0017ff-f5e5-4ec5-a847-89aa8b9efeea", true);
    xhttp.send();
    xhttp.addEventListener('load', () => {
        questions = JSON.parse(xhttp.response)
        loadingQuestions = false
        constructQuestionsHtml()
    })
    
}

function constructQuestionsHtml() {
    insertQuestion()
    insertAnswers()
    updateNavigation()
}

function insertQuestion() {
    const question = getVisibleQuestion()
    const elementStep = document.getElementsByClassName('question-step')[0]
    elementStep.textContent = `Question ${step + 1} :`
    const element = document.getElementsByClassName('question-text')[0]
    element.textContent = question.text
}

function insertAnswers() {
    const question = getVisibleQuestion()
    const element = document.getElementsByClassName('answers-holder')[0]
    const answers = question.answers

    const answersHtml = answers.map(answer => {
        const checked = userAnswers[step] == answer.id ? 'checked' : ''
        return `
            <input ${checked} 
                value="${answer.id}" 
                type="radio" id="${answer.id}" 
                name="answer" >
            <label for="answer">${answer.text}</label><br>
        `
    });

    element.innerHTML = ''
    element.innerHTML = answersHtml.join('')
}

function updateNavigation() {
    const isPreviousVisible = step > 0
    const isNextVisible = step < questions.length - 1
    const isScoreVisible = step == questions.length - 1
    const perviousBtn = document.getElementsByClassName('previous-button')[0]
    const nextBtn = document.getElementsByClassName('next-button')[0]
    const scoreBtn = document.getElementsByClassName('score-button')[0]

    if(isPreviousVisible) {
        perviousBtn.classList.remove('button-disabled')
        
    } else {
        perviousBtn.classList.add('button-disabled')
    }

    if(isNextVisible) {
        nextBtn.classList.remove('button-disabled')
    } else {
        nextBtn.classList.add('button-disabled')
    }

    if(isScoreVisible) {
        scoreBtn.classList.remove('button-disabled')
    } else {
        scoreBtn.classList.add('button-disabled')
    }
}

function getVisibleQuestion() {
    return questions[step]
}

function nextStep() {
    saveUserAnswer()
    if(step < questions.length - 1) {
        step++
        constructQuestionsHtml()
    }
}

function previousStep() {
    saveUserAnswer()
    if(step > 0) {
        step--
        constructQuestionsHtml()
    }
}

function saveUserAnswer() {
    userAnswers[step] = getUserAnswer()
}

function getUserAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked')
    if(answer) {
        return document.querySelector('input[name="answer"]:checked').value
    }
    return false
    
}

function getScore() {
    saveUserAnswer()
    console.log('get my score please!', userAnswers);
    //const correctAnswer = question.answers.find(answer => answer.correct)
}










