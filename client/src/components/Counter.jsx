import React from "react";

function Counter({ number, onIncrease, onDecrease }){
    return(
        <div>
            <h1>{number}</h1>
            <button onClick = { ()=> onIncrease() }>+1</button>
            <button onClick = { ()=> onDecrease() }>-1</button>
        </div>
    );
}
export default Counter;

// components는 일종의 페이지라고 생각하면 될듯
// containers는 이 components들의 모음 그리고 redux로 상태 가져오는곳정도?