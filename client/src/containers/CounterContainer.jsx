import React from "react";
import Counter from "../components/Counter"; //사용할 컴포넌트 불러오기.
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, increaseAsync, decreaseAsync } from "../modules/counter";

function CounterContainer(){
    const number = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const onIncrease = () => {
      dispatch(increaseAsync()); //thunk 함수 사용
    };
    const onDecrease = () => {
        dispatch(decreaseAsync()); //thunk 함수 사용
    };

    return (
        <Counter number={number} onIncrease = {onIncrease} onDecrease = {onDecrease} />
    );
}

export default CounterContainer;
