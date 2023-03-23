const containerParticipantes = document.querySelector(".container-participantes");
const containerPodio = document.querySelector(".container-podio");

const buttonAdd = document.querySelector('.button-add');

const toastLive = document.getElementById('liveToast');

const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");

const formSorteo = document.querySelector('.form-sorteo');
var widthFormFrom = formSorteo.clientWidth;
var heightFormFrom = formSorteo.clientHeight;

var nParticipant = 2;

// document.addEventListener('keydown', (event) => {
//     if (event.key == 'Tab') {
//         addParticipante();
//     }
// })

function verificarInputs() {
    const formInput = document.querySelectorAll(".form-input");
    var inputNull = false
    for (let i = 0; i < formInput.length; i++) {
        if (formInput[i].value.trim() == '') {
            inputNull = true;
        }
        formInput[i].removeAttribute('autofocus');
    }
    return inputNull;
    // inputNull >= 1 ? console.log('no ha completado todos los participantess') : sortear();
}

function sortear() {

    if (verificarInputs() == false) {
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
        btnSortear.setAttribute('onclick', 'location.reload();')

        // podio de ganadores
        const win1 = document.querySelector('.win1');
        const win2 = document.querySelector('.win2');

        win1.innerHTML = ganador[0];
        win2.innerHTML = ganador[1];

        if (ganador.length >= 3) {
            const podioThree = document.querySelector('.podio-three')
            const win3 = document.querySelector('.win3');

            podioThree.removeAttribute('hidden')
            win3.innerHTML = ganador[2];
        }

        containerPodio.removeAttribute('hidden');

    } else {
        const toast = new bootstrap.Toast(toastLive);
        toast.show();
    }
}


function addParticipante() {

    if (verificarInputs() == false) {
        nParticipant++;
        const participante = document.createElement('div');
        participante.id = 'p' + nParticipant;
        participante.className = 'participante';

        const input = document.createElement('input');
        input.id = 'i'+nParticipant;
        input.type = 'text';
        input.className = 'form-input';
        input.placeholder = 'Participante';
        input.autocomplete = 'off'

        const btnRemove = document.createElement('div');
        btnRemove.className = 'button button-remove';
        btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        btnRemove.setAttribute("onclick", "removeParticipante(" + nParticipant + ");");

        participante.appendChild(input);
        participante.appendChild(btnRemove);

        containerParticipantes.appendChild(participante);

        btnRemoveVisible(true);
        animation();
        
        document.getElementById('i'+nParticipant).focus();

    } else {
        const toast = new bootstrap.Toast(toastLive);
        toast.show();
    }
}
function btnRemoveVisible(flag) {
    const btnRemoveAll = document.querySelectorAll(".button-remove")

    if (flag) {
        for (let i = 0; i < btnRemoveAll.length; i++) {
            btnRemoveAll[i].style.display = 'flex';
        }
    } else {
        for (let i = 0; i < btnRemoveAll.length; i++) {
            btnRemoveAll[i].style.display = 'none';
        }
    }
}

function animation() {
    const widthFormTo = formSorteo.clientWidth;
    const heightFormTo = formSorteo.clientHeight;

    formSorteo.animate([
        { width: widthFormFrom + 'px', height: heightFormFrom + 'px' },
        { width: widthFormTo + 'px', height: heightFormTo + 'px' }
    ], {
        duration: 250,
        // timingFunction: 'ease-in-out',
    });

    widthFormFrom = widthFormTo;
    heightFormFrom = heightFormTo;
}

function removeParticipante(x) {
    var participante = document.querySelector('#p' + x);

    participante.animate([
        { opacity: 100 },
        { opacity: 0 }
    ], {
        duration: 200,
    });

    setTimeout(() => {
        var padre = participante.parentNode;
        padre.removeChild(participante);
        nParticipant--;

        if (nParticipant == 2) {
            btnRemoveVisible(false);
        }
        animation();

    }, 200);


}