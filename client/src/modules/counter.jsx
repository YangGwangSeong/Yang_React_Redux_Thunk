//액션 타입, 액션 생성함수, 리듀서  Ducks 패턴

// 액션타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
export const increase = () => ({ type : INCREASE});
export const decrease = () => ({ type : DECREASE});