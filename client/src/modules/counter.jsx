//액션 타입, 액션 생성함수, 리듀서  Ducks 패턴

// 액션타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
export const increase = () => ({ type : INCREASE});
export const decrease = () => ({ type : DECREASE});

// getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 없습니다. thunk함수 생성!!!!!!
export const increaseAsync = () => (dispatch,getState) => {
    setTimeout( () => dispatch(increase()), 1000);
};
export const decreaseAsync = () => (dispatch, getState) => {
    setTimeout ( ()=> dispatch(decrease()), 1000);
}

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = 0;

export default function counter(state = initialState, action){
    switch (action.type){
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state -1;
        default:
            return state;
    }
}