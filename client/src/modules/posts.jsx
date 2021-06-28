import * as postsAPI from "../api/posts"; // api/posts 안의 함수 모두 불러오기
import { createPromiseThunk, 
    reducerUtils, 
    handleAsyncActions,
    createPromiseThunkById,
    handleAsyncActionsById
 } from '../lib/asyncUtils';
/* 
    프로미스를 다루는 리덕스 모듈을 다룰때 주의사항

    1. 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
    2. 각 프로미스마다 thunk 함수를 만들어주어야 합니다.
    3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다.
*/
/* 액션 타입 */


/* 초기값 설정 */
/*
const initialState = {
    posts: {
        loading : false,
        data : null,
        error : null
    },
    post : {
        loading : false,
        data : null,
        error : null
    }
};
*/
// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링
const initialState = {
    
    posts : reducerUtils.initial(),
    post : {}
}

// 포스트 여러개 조회하기
const GET_POSTS = "GET_POSTS"; //  요청 시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; // 요청 성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; // 요청 실패

//포스트 하나 조회하기
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// 포스트 비우기
const CLEAR_POST = "CLEAR_POST";

/*
// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
export const getPosts = () => async dispatch => {
    dispatch({ type : GET_POSTS });
    try{
        const posts = await postsAPI.getPosts(); // API 호출
        dispatch({ type : GET_POSTS_SUCCESS, posts }); // 성공
    } catch (e){
        dispatch({ type : GET_POSTS_ERROR, error : e});
    }
};

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
export const getPost = (id) => async dispatch => {
    dispatch({ type : GET_POST});
    try{
        const post = await postsAPI.getPost(id);
        dispatch ({ type : GET_POST_SUCCESS, post}); // 성공
    } catch (e){
        dispatch({ type : GET_POST_ERROR, error : e});
    }
}
*/

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

//export const clearPost = () => ({ type : CLEAR_POST });

// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
export const goToHome = () => (dispatch, getState, { history }) => {
    history.push('/');
};

export default function posts(state = initialState, action){
    switch (action.type){
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            const postsReducer = handleAsyncActions(GET_POSTS, "posts", true);
            return postsReducer(state,action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            const postReducer = handleAsyncActionsById(GET_POST, "post", true);
            return postReducer(state,action);
        case CLEAR_POST:
            return {
                ...state,
                post: reducerUtils.initial()
            };
        default : 
            return state;
    };
    // switch (action.type){
    //     case GET_POSTS:
    //         return {
    //             ...state,
    //             /*
    //             posts: {
    //                 loading : true,
    //                 data : null,
    //                 error : null
    //             }
    //             */
    //             posts : reducerUtils.loading(),
    //         };
    //     case GET_POSTS_SUCCESS :
    //         return {
    //             ...state,
    //             /*
    //             posts : {
    //                 loading : true,
    //                 data : action.posts,
    //                 error : null
    //             }
    //             */
    //             posts : reducerUtils.success(action.payload) // action.posts -> action.payload로 변경
    //         };
    //     case GET_POSTS_ERROR : 
    //         return {
    //             ...state,
    //             /*
    //             posts : {
    //                 loading : true,
    //                 data : null,
    //                 error : action.error
    //             }
    //             */
    //             posts : reducerUtils.error(action.error)
    //         };
    //     /* post 파라미터로 가져올때 */
    //     case GET_POST : 
    //         return {
    //             ...state,
    //             /*
    //             post : {
    //                 loading : true,
    //                 data : null,
    //                 error : null
    //             }
    //             */
    //            post : reducerUtils.loading()
    //         };
    //     case GET_POST_SUCCESS : 
    //         return {
    //             ...state,
    //             /*
    //             post : {
    //                 loading : true,
    //                 data : action.data,
    //                 error : null
    //             }
    //             */
    //             post : reducerUtils.success(action.payload) // action.post -> action.payload 로 변경
    //         };
    //     case GET_POST_ERROR : 
    //         return {
    //             ...state,
    //             /*
    //             post : {
    //                 loading : true,
    //                 data : null,
    //                 error : action.error
    //             }
    //             */
    //            post : reducerUtils.error(action.error)
    //         };
    //     default :
    //         return state;
            
    // }
}




