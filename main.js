var board;
var numPegRows = 12;
var maxPegsPerRow = 12;
var pegsArray = [];
var chipCurrentRow = 0;
var chipCurrentCol = 0;
var pegNumInArray = -1;
var targetCol = 10;

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

    chipCurrentCol = Math.floor(Math.random() * maxPegsPerRow);
    
    gsap.set('.chip',  {
        x: pegsArray[chipCurrentCol].style.left,
        y: `${board.offsetHeight / 10 + 10}px`
    });

    AnimateChip();
}

function AnimateChip() {
    if (chipCurrentRow >= numPegRows) {
        console.log(`Chip has landed in slot ${chipCurrentCol}`);
        return;
    }

    const nextPegIndex = NextPeg();

    gsap.to('.chip', {
        duration: 0.6,
        x: pegsArray[nextPegIndex].style.left,
        y: pegsArray[nextPegIndex].style.top,
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
        pastPegs += (i % 2 === 0) ? 12 : 11;
    }

    if (chipCurrentRow > 0) {
        if (chipCurrentCol < targetCol) {
            chipCurrentCol++;
        } 
        else if (chipCurrentCol > targetCol) {
            chipCurrentCol--;
        }
    }

    let maxColsThisRow = (chipCurrentRow % 2 === 0) ? maxPegsPerRow : maxPegsPerRow - 1;

    if (chipCurrentCol < 0)
        chipCurrentCol = 0;

    if (chipCurrentCol >= maxColsThisRow) 
        chipCurrentCol = maxColsThisRow - 1;

    return pastPegs + chipCurrentCol;
}
