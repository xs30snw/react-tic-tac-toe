import React from 'react'
import Board from '../components/Board';
import calculateWinner from '../components/calculateWinner';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                movePos: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            isReversed: false,
        }
    }
      
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                movePos: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
    
        const moves = history.map((step, move) => {
            let desc;
            if (move) {
                let col = step.movePos % 3 + 1;
                let row = Math.floor(step.movePos/3) + 1;
                desc = 'Move #' + move + ' ( col-' + col + ', row-' + row + ')';
            } else {
                desc = 'Game start';
            };

            let inputStyle = {}
            if (move == this.state.stepNumber) {
                inputStyle = {
                    fontWeight:'bold'
                };
            }

            return (
                <li key={move}>
                <button
                    onClick={() => this.jumpTo(move)}
                    style={inputStyle}
                >
                    {desc}
                </button>
                </li>
            );
        });
    
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{ this.state.isReversed ? moves.reverse() : moves }</ol>
                    <button
                        onClick={() => this.setState({ isReversed: !this.state.isReversed })}
                    >Reverse moves order</button>
                </div>
            </div>
        );
    }
}

export default Game