const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer(){
        const answer=prompt("What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)")
        answer<4 && answer>=0 ? console.log(this.answers[answer]+=1):console.log("entrada invalida")
        this.displayResults.call(poll,'string')
    },
    displayResults(type){
        type=="string"?console.log('Poll results are '+this.answers.join(', ')):console.log(this.answers)
    },
}
document.querySelector(".poll").addEventListener('click',poll.registerNewAnswer.bind(poll))

//bonus
const v1=[5, 2, 3]
const v2=[1, 5, 3, 9, 6, 1]
const drv1=poll.displayResults.bind({ answers: [5, 2, 3] })
drv1('string')
drv1('array')

const drv2=poll.displayResults.bind({ answers: [1, 5, 3, 9, 6, 1] })
drv2('string')
drv2('array')