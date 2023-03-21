const containerParticipantes = document.querySelector(".container-participantes");
const containerPodio = document.querySelector(".container-podio");

const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");

var nParticipant = 2;

document.addEventListener('keydown', (event) => {
    if(event.key == 'Tab'){
    
        if(input1.value != '' & input2.value != ''){
            console.log('1: ' + input1.value + ', 2: ' + input2.value)
            addParticipante();
        }
    }
})

function sortear(){
    const formInput = document.querySelectorAll(".form-input");
    let sorteo = []

    // se añaden los nParticipant al array sorteo
    for (let i = 0; i < formInput.length; i++) {
        sorteo.push(formInput[i].value) 
    }

    // se determina el ganador
    let ganador = []
    let sorteoLength = sorteo.length;
    
    for (let i = 0; i < sorteoLength; i++) {
        ganador[i] = sorteo[Math.floor(Math.random() * sorteo.length)];
        sorteo.splice(sorteo.indexOf(ganador[i]), 1);
    }

    // eliminar inputs de nParticipant
    containerParticipantes.remove();

    txtPodio = document.querySelector('.form-sorteo h1').innerHTML = 'Podio';

    btnAdd = document.querySelector('.button-add').remove();
    btnSortear = document.querySelector('.button-sortear')
    btnSortear.innerHTML = 'Volver a sortear';
    btnSortear.setAttribute('onclick', 'location.reload();' )
    
    // podio de ganadores
    const win1 = document.querySelector('.win1');
    const win2 = document.querySelector('.win2');

    win1.innerHTML = ganador[0];
    win2.innerHTML = ganador[1];

    if(ganador.length >= 3){
        const podioThree = document.querySelector('.podio-three')
        const win3 = document.querySelector('.win3');

        podioThree.removeAttribute('hidden')
        win3.innerHTML = ganador[2];
    }

    containerPodio.removeAttribute('hidden');

}

function addParticipante(){
    nParticipant++;
    const participante = document.createElement('div');
    participante.id = 'p'+nParticipant;
    participante.className = 'participante';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-input';
    input.placeholder = 'Participante';

    const btnRemove = document.createElement('div');
    btnRemove.className = 'button btnRemove';
    btnRemove.innerHTML = 'x'
    btnRemove.setAttribute("onclick","removeParticipante("+nParticipant+");");

    participante.appendChild(input);
    participante.appendChild(btnRemove);


    // input.autofocus = true;
    containerParticipantes.appendChild(participante);
    // addBtnRemove();
    // containerParticipantes.lastChild.removeAttribute('autofocus')
}

function addBtnRemove(){
    const formInput = document.querySelectorAll(".form-input");

    for (let i = 0; i < formInput.length; i++) {
        const btnRemove = document.createElement('div');
        btnRemove.className = 'btnRemove';
        btnRemove.innerHTML = 'x'
        containerParticipantes.appendChild(btnRemove);
        
    }
}

function removeParticipante(x){
    var participante = document.querySelector('#p'+x);
    var padre = participante.parentNode;
    padre.removeChild(participante);
    nParticipant--;
}