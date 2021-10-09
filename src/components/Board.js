import React from 'react';
import Square from '../components/Square';

export class Board extends React.Component {    
    render() {
        const squares = this.props.squares;
        const rows = [0, 1, 2];
        const cols = [0, 1, 2];

        return (            
            <div>
                { rows.map( i =>
                    <div className="board-row">
                        { cols.map( j =>
                            <Square
                                value = {squares[i*3 + j]}
                                onClick = {() => this.props.onClick(i*3 + j)}
                            />
                        ) }
                    </div>
                ) }
            </div>
        );
    }
}

export default Board;