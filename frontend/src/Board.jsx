import './index.css';

const Board = ({ userBoard, onChange }) => {
  return (
    <div className="board-container">
      <table>
        <tbody>
          {userBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                    maxLength="1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;

