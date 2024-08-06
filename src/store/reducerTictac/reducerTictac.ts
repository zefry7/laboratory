interface State {
    grid: Number[]
    stopMove: boolean,
    winner: String
}

const init = {
    grid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    stopMove: false,
    winner: ""
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

type Actions = editGrid | editWinner | stopMove | clearGrid

export enum ActionsTictac {
    EDIT_GRID = "EDIT_GRID",
    STOP_MOVE = "STOP_MOVE",
    EDIT_WINNER = "EDIT_WINNER",
    CLEAR_GRID = "CLEAR_GRID"
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
            return { ...state, grid: [0, 0, 0, 0, 0, 0, 0, 0, 0]}
        default:
            return state
    }
}

export default reducerTictac