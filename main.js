var board;
var numPegRows = 12;
var maxPegsPerRow = 12;
var pegsArray = [];
var chipCurrentRow = 0;
var chipCurrentCol = 0;

window.addEventListener('load', function() {
    gsap.registerPlugin(CustomEase,CustomBounce);

    SetUpBoard();
})

function SetUpBoard() {
    board = this.document.getElementById("board");

    var pegXSpacing = board.offsetWidth / maxPegsPerRow;
    var pegYSpacing = ((board.offsetHeight / 3) * 2) / numPegRows
    var pegStartX = pegXSpacing / 2 - 10;
    var pegStartY = board.offsetHeight / 4;

    for (let row = 0; row < numPegRows; row++) {
        for (let col = 0; col < maxPegsPerRow; col++) {
            if (row % 2 && col == 0) {
                continue;
            }
            if (row % 2) {
                var xOffset = (pegXSpacing / 2) * -1;
            }
            else{
                xOffset = 0;
            }

            const peg = this.document.createElement('div');
            peg.classList.add('peg');
            peg.style.left = `${pegStartX + xOffset + col * pegXSpacing}px`;
            peg.style.top = `${pegStartY + row * pegYSpacing}px`;
            board.appendChild(peg);
            pegsArray.push(peg);
        }
    }

    SpawnChip();
}

function SpawnChip() {
    const chip = this.document.createElement('div');
    chip.classList.add('chip');

    board.appendChild(chip);
    
    gsap.set('.chip',  {
        x: `${board.offsetWidth / 2 - 10}px`,
        y: `${board.offsetHeight / 10 + 10}px`
    });

    AnimateChip();
}

function AnimateChip() {
    if (chipCurrentRow >= numPegRows) {
        //alert(`Chip has landed in slot ${chipCurrentCol}`);
        return;
    }

    gsap.to('.chip', {
        duration: 1,
        x: pegsArray[NextPeg()].style.left,
        y: pegsArray[NextPeg()].style.top,
        ease: "power1.in",
        onComplete: () => {
            chipCurrentRow++;
            AnimateChip();
        }
    });
}

function NextPeg() {
    let pastPegs = 0;

    for (let i = 0; i < chipCurrentRow; i++) {
        if (i % 2 == 0) {
            pastPegs += 12;
        }
        else {
            pastPegs += 11;
        }
    }

    if (chipCurrentRow % 2) {
        let num = Math.floor(Math.random() * 11);
        return num + pastPegs;
    }
    else {
        let num = Math.floor(Math.random() * 12);
        return num + pastPegs;
    }
}