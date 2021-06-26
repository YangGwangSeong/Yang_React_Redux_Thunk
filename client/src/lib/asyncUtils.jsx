// Promise에 기반한 Thunk를 만들어주는 함수입니다.
export const createPromiseThunk = (type, promiseCreator) => { // GET_POSTS, postsAPI.getPosts 이렇게 인자값이 넘어오겠지
    const [SUCCESS, ERROR ] = [`${type}_SUCCESS`, `${type}_ERROR`];

    // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
    // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
    // 예 : writeComment({ postId : 1, text : "댓글 내용"});
    return param => async dispatch => {
        // 요청 시작
        dispatch({ type, param }); // dispatch({ type : GET_POSTS }); 이거랑 같은거인듯?
        try {
            // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
            const payload = await promiseCreator(param); //GET_POSTS에는 param값이 없겠쥬?
            dispatch({ type : SUCCESS, payload }); //성공!
        } catch (e) {
            dispatch({ type : ERROR, payload : e, error : true}); //  dispatch({ type : GET_POST_ERROR, error : e});
        }
    }
}