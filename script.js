var mov = 0;

/** help */
function log(message) {
    console.log('> ' + message)
}

/** app */
const dropzones = document.querySelectorAll('.dropzone')

disableGame()

document.getElementById('newGame').addEventListener('click', function(){
    let playerName = document.getElementById('playerName').value;

    if(!playerName){
        alert("Preencha o nome do jogador")
        return
    }

    let disables = document.querySelectorAll('.disabled')
    
    disables.forEach(disabled => {
        disabled.classList.remove('disabled')
    })

    newGame()

    document.getElementById('playerName').classList.add('disabled')
    this.classList.add('disabled')
})

document.getElementById('restartGame').addEventListener('click', function(e){
    location.reload()
})

function disableGame(){
    let disables = document.querySelectorAll('.disabled')
    
    disables.forEach(disabled => {
        disabled.addEventListener('click', function(e){
            e.preventDefault
        })
    })
}

function newGame() {
    enableFirstRings()
    
    /** dropzone */
    dropzones.forEach( dropzone => {
        dropzone.addEventListener('dragenter',dragenter)
        dropzone.addEventListener('dragover', dragover)
        dropzone.addEventListener('dragleave', dragleave)
        dropzone.addEventListener('drop', drop)
    } )
}

function endGame() {
   disableRings()
    
    /** dropzone */
    dropzones.forEach( dropzone => {
        dropzone.removeEventListener('dragenter',dragenter)
        dropzone.removeEventListener('dragover', dragover)
        dropzone.removeEventListener('dragleave', dragleave)
        dropzone.removeEventListener('drop', drop)
    } )
}

function enableFirstRings() {
    let dpzs = document.querySelectorAll('.dropzone')

    dpzs.forEach(dropzone => {
        if(dropzone.querySelector('.ring')){
            dropzone.querySelector('.ring').setAttribute('draggable', 'true')
            dropzone.querySelector('.ring').addEventListener('dragstart', dragstart)
            dropzone.querySelector('.ring').addEventListener('drag', drag)
            dropzone.querySelector('.ring').addEventListener('dragend', dragend)
        }
    })
}

function disableRings() {
    let rings = document.querySelectorAll('.ring')

    rings.forEach(ring => {
        ring.setAttribute('draggable', 'false')
        ring.removeEventListener('dragstart', dragstart)
        ring.removeEventListener('drag', drag)
        ring.removeEventListener('dragend', dragend)
    })
}

function dragstart () {
    dropzones.forEach( dropzone => dropzone.classList.add('highlight') )

    this.classList.add('is-dragging')
}

function drag () {
    
}

function dragend () {
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight') )

    this.classList.remove('is-dragging')

    disableRings()
    enableFirstRings()

    mov++

    document.querySelector('.counter').innerHTML = mov

    let firstCount = document.getElementById('first').querySelectorAll('.ring');
    let middleCount = document.getElementById('middle').querySelectorAll('.ring');

    if(firstCount.length == 0 && middleCount.length == 0){
        let playerName = document.getElementById('playerName').value;

        alert("Parabéns "+playerName+" você ganhou após "+mov+" movimentos!")

        document.querySelector('.boards').classList.add('disabled')

        disableGame()
        endGame()
    }
}

function dragenter () {
    
}

function dragover () {
    this.classList.add('over')

    let thisRingSize = document.querySelector('.is-dragging').getAttribute('data-size')
    let lastRingSize = 0
    let lastRingInDz = this.querySelector('.ring')

    if(lastRingInDz)
        lastRingSize = lastRingInDz.getAttribute('data-size')
    
    if(thisRingSize < lastRingSize || lastRingSize == 0){
        const cardBeingDragged = document.querySelector('.is-dragging')

        if (cardBeingDragged)
            this.prepend(cardBeingDragged)
    }
}

function dragleave () {
    this.classList.remove('over')
}

function drop () {
    this.classList.remove('over')
}