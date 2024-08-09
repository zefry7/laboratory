interface State {
    grid: Number[]
    stopMove: boolean,
    winner: String,
    round: Number,
    stepMe: Number,
    stepBot: Number
}

const init = {
    grid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    stopMove: false,
    winner: "",
    round: 1,
    stepMe: 0,
    stepBot: 0
}

interface editGrid {
    type: "EDIT_GRID",
    index: Number,
    move: Number
}

interface clearGrid {
    type: "CLEAR_GRID",
}

interface editWinner {
    type: "EDIT_WINNER",
    winner: String
}

interface stopMove {
    type: "STOP_MOVE"
    value
}

interface addRound {
    type: "ADD_ROUND",
    value
}

interface addStepMe {
    type: "ADD_STEP_ME",
    value
}

interface addStepBot {
    type: "ADD_STEP_BOT",
    value
}

type Actions = editGrid | editWinner | stopMove | clearGrid | addRound | addStepMe | addStepBot

export enum ActionsTictac {
    EDIT_GRID = "EDIT_GRID",
    STOP_MOVE = "STOP_MOVE",
    EDIT_WINNER = "EDIT_WINNER",
    CLEAR_GRID = "CLEAR_GRID",
    ADD_ROUND = "ADD_ROUND",
    ADD_STEP_ME = "ADD_STEP_ME",
    ADD_STEP_BOT = "ADD_STEP_BOT"
}

const reducerTictac = (state: State = init, action: Actions): State => {
    switch (action.type) {
        case ActionsTictac.EDIT_GRID:
            return {
                ...state, grid: state.grid.map((v, i) => {
                    if (i == action.index) {
                        return action.move
                    } else {
                        return v
                    }
                })
            }
        case ActionsTictac.STOP_MOVE:
            return { ...state, stopMove: action.value }
        case ActionsTictac.EDIT_WINNER:
            return { ...state, winner: action.winner }
        case ActionsTictac.CLEAR_GRID:
            return { ...state, grid: [0, 0, 0, 0, 0, 0, 0, 0, 0] }
        case ActionsTictac.ADD_ROUND:
            return { ...state, round: action.value + 1 }
        case ActionsTictac.ADD_STEP_ME:
            return { ...state, stepMe: action.value + 1 }
        case ActionsTictac.ADD_STEP_BOT:
            return { ...state, stepBot: action.value + 1 }
        default:
            return state
    }
}

export default reducerTictac