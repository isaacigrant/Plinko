/* Actual game code goes here */
(async function() {
    var board;
    var numPegRows = 8;
    var maxPegsPerRow = 8;
    var pegsArray = [];
    var chipCurrentRow = 0;
    var chipCurrentCol = 0;
    //var targetCol = window.gameSession.gameSetup.options.targetColumn;
    var targetCol = Math.floor(Math.random() * maxPegsPerRow);
    var pegXSpacing;
    var pegYSpacing;
    var pegNChipSize = 30;
    var timeScale = 3;

    try {
        const statePublic = await api.initialize();
        window.gameSession.statePublic = statePublic;
        // resizes the game first before anything else
        await api.resizeGameContainer();
        
        window.addEventListener('resize', api.resizeGameContainer);

        if (!statePublic) {
            return api.showError('Undefined state found so Game cannot be played.');
        }

        await api.setGameContainerClasses();
        await api.toggleSound();
        
        const toggleSound = document.getElementById('toggle-sound');
        toggleSound.addEventListener('click', async () => {
            const data1 = await api.processState({ sound: 'toggle' });
            window.gameSession.statePublic = data1.statePublic;
            await api.toggleSound();
        });

        const gameContainer = document.getElementById('game-container');
        const introContainer = document.getElementById('intro-container');
        const rulesContainer = document.getElementById('rules-container');
        const boardContainer = document.getElementById('board-container');

        if (statePublic.secured.prize) {
            await api.addRemoveDisplay(introContainer, 'hide');
            await api.addRemoveDisplay(rulesContainer, 'hide');
            await api.addRemoveDisplay(boardContainer, 'hide');
            await api.showPrize(statePublic.secured.prize);
        } else if (statePublic.secured.status === 'InProgress') {
            await api.addRemoveDisplay(introContainer, 'hide');
            await api.addRemoveDisplay(rulesContainer, 'hide');
            await api.addRemoveDisplay(boardContainer, 'show');
            await loadBoardProgress();
        } else {
            const playButton = document.getElementById('play-button');
            playButton.addEventListener('click', async () => {
                const data3 = await api.processState({ game: 'start' });
                window.gameSession.statePublic = data3.statePublic;
                await setupGameBoard();
            });
        }
    } catch (e) {
        console.error(e);
        await api.showError(e);
    }

    async function setupGameBoard() {
        gsap.registerPlugin(CustomEase,CustomBounce);

        board = document.getElementById('board-container');

        pegXSpacing = board.offsetWidth / maxPegsPerRow;
        pegYSpacing = ((board.offsetHeight / 3) * 2) / numPegRows;
        let pegStartX = pegXSpacing / 2 - (pegNChipSize / 2);
        let pegStartY = board.offsetHeight / 6;

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

        SpawnBucket();
    }

    function addClickEventForCanvasBoardPieces() {
        // Add events for Canvas board pieces
    }

    function loadBoardProgress() {
        // Add mid state loading functionality
    }

    function SpawnBucket() {
        const bucket = document.createElement('div');
        bucket.classList.add('bucket');

        let bucketX = (targetCol * pegXSpacing + pegXSpacing / 2) - (pegNChipSize / 2); 
        let bucketY = (board.offsetHeight / 4) + numPegRows * pegYSpacing;

        bucket.style.left = `${bucketX}px`;
        bucket.style.top  = `${bucketY}px`;

        board.appendChild(bucket);

        SpawnChip();
    }

    function SpawnChip() {
        const chip = document.createElement('div');
        chip.classList.add('chip');

        board.appendChild(chip);

        chipCurrentCol = Math.floor(Math.random() * maxPegsPerRow);
        
        gsap.set('.chip',  {
            x: pegsArray[chipCurrentCol].style.left,
            y: `${board.offsetHeight / 10 + (pegNChipSize / 2)}px`
        });

        AnimateChip();
    }

    function AnimateChip() {
        const nextPegIndex = NextPeg();
        let pegX = parseFloat(pegsArray[nextPegIndex].style.left);
        let pegY = parseFloat(pegsArray[nextPegIndex].style.top) - pegNChipSize;

        gsap.to('.chip', {
            duration: 0.6 / timeScale,
            x: pegX,
            y: pegY,
            ease: "power1.in",
            onComplete: () => {
                gsap.to('.chip', {
                    duration: 0.2 / timeScale,
                    y: pegY - pegNChipSize,
                    ease: "power1.out",
                    onComplete: () => {
                        FinalDrop();

                        chipCurrentRow++;
                        AnimateChip();
                    }
                });
            }
        });
    }

    function NextPeg() {
        let pastPegs = 0;

        for (let i = 0; i < chipCurrentRow; i++) {
            pastPegs += (i % 2 === 0) ? 8 : 7;
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

    function FinalDrop() {
        if (chipCurrentRow === numPegRows - 1) {
            let finalX = (targetCol * pegXSpacing + pegXSpacing / 2) - (pegNChipSize / 2); 
            let finalY = (board.offsetHeight / 4) + (chipCurrentRow + 1) * pegYSpacing;

            gsap.to('.chip', {
                duration: 0.4 / timeScale,
                x: finalX,
                y: finalY,
                ease: "bounce.out",
                onComplete: () => {
                    alert(`The chip has landed in column ${targetCol}`);
                }
            });
        }
    }
})();