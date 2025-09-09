(function(exports) {
    exports.code = 'boiler-plate';
    exports.path = typeof __dirname !== 'undefined' ? __dirname : undefined;
    exports.getInitialState = getInitialState;
    exports.processState = processState;

    function getInitialState(gameSetup, state) {
        if (!state) {
            return {
                secret: {},
                public: {
                    languageCode: 'EN',
                    secured: {
                        score: 0,
                        step: 0,
                        status: 'begin'
                    },
                    unsecured: {
                        isSoundAvailable: 1
                    }
                }
            };
        } else {
            return state;
        }
    }

    function processState(gameSetup, state, customInput) {
        var newScore = 0;
        var isRequestPrize;
        var isGameFinished;
        var customOutput = {};
        
        console.log(customInput);
        if (customInput.sound === 'toggle') {
            if (state.public.unsecured.isSoundAvailable === 1) {
                state.public.unsecured.isSoundAvailable = 0;
            } else {
                state.public.unsecured.isSoundAvailable = 1;
            }
            customOutput.stateSecurity = 'unsecured';
        } else if (customInput.game === 'start') {
            console.log('starting game');
            state.public.secured.status = 'InProgress';
            customOutput.stateSecurity = 'secured';
        } else if (customInput.game === 'in-progress') {
            console.log('in-progress');
        }
        return {
            nextState: state,
            newScore: newScore,
            isRequestPrize: isRequestPrize,
            isGameFinished: isGameFinished,
            customOutput: customOutput
        };
    }
}(typeof exports === 'undefined' ? this.secure = {} : exports));
