let loadingQuestions = false
let questions = []

getQuestionsFromBackend()

function getQuestionsFromBackend() {
    loadingQuestions = true
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "https://run.mocky.io/v3/c01005aa-be7f-4def-886a-61314aa72d14", true);
    xhttp.send();
    xhttp.addEventListener('load', () => {
        questions = JSON.parse(xhttp.response)
        loadingQuestions = false
        constructQuestionsHtml()
    })
    
}



let score = 0
let step = 0
let userAnswers = []

function getVisibleQuestion() {
    return questions[step]
}

function nextStep() {
    if(step < questions.length) {
        step++
    }
}

function previousStep() {
    if(step > 0) {
        step--
    }
}

function saveUserAnswer(questionId, answerId) {
    userAnswers[questionId] = answerId
}












