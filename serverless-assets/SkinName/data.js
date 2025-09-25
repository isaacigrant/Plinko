window.isServerLess = true;
window.gameSession = {
    gameSetup: {
        name: {
            EN: "Serverless Demo Game",
            FR: "fr_Serverless Demo Game"
        },
        phrases: {
            EN: {
                TITLE_TEXT: "Chip Drop Demo",
                INTRO_DESCRIPTION: "Congratulations! <br/> You've earned a chance play and win up to <br/><b> 100 Points!<b/>",
                INTRO_BUTTON: "Learn how to play!",
                RULES_HEADER: "<b>How to play</b>",
                RULES_DESCRIPTION: "Rules for the game goes here.",
                PLAY_BUTTON: "Start playing!",
                NO_POINTS_PRIZE_HEADING: "",
                POINTS_PRIZE_HEADING: "Congratulations!",
                POINTS_WINNER_DESC: "You've won",
                POINTS_TAIL: "Points",
                POINTS_DESCRIPTION: "Points will be added to your account within 24 hrs.",
                NO_PRIZE_AVAILABLE: "",
                REAL_PRIZE_DESCRIPTION: "",
                DRAW_DESCRIPTION: "",
                INSTRUCTIONS: ""
            }
        },
        options: {
            skinCode: "SkinName",
            assetsPath: "serverless-assets/",
            targetColumn: 4,
        },
        prizes: [
            {
                minScore: 0,
                maxScore: 0,
                prizeID:1,
                code: "0",
                name: {
                    EN: "So close!"
                },
                description: {
                    EN: "Thanks for playing!"
                },
                points: 0,
                totalAvailable: 20,
                limitedQuantity: 50,
                isAddressNeeded: 0,
                isEmailNeeded: 0,
                isPhoneNeeded: 0
            },
            {
                minScore: 0,
                maxScore: 1,
                prizeID:3,
                code: "100",
                points: 100,
                totalAvailable: 20,
                limitedQuantity: 20,
                isAddressNeeded: 0,
                isEmailNeeded: 0,
                isPhoneNeeded: 0
            }
        ]
    }
};
