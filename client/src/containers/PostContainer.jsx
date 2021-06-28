import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux"; //리덕스 함수
import { getPost, goToHome } from "../modules/posts"; //api 에서 데이터 가져오는 함수
import Post from "../components/Post"; 

function PostContainer( { postId }) {
    const { data, loading, error }  = useSelector(
        state => state.posts.post[postId]
        ) || {
            loading: false,
            data:null,
            error : null
        }; // 아예 데이터가 존재 하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록
    const dispatch = useDispatch();

    useEffect( () => {
        //if (data) return; // 포스트가 존재하면 아예 요청을 하지 않음
        dispatch(getPost(postId)); //Didmount
        /*
        return () => {
            dispatch(clearPost()); //Unmout 가아닐까?
        };
        */
    }, [postId, dispatch ]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러발생</div>;
    if (!data) return null;

    
    return (
        
        <>
            <button onClick={ () => dispatch(goToHome())}>홈으로 이동</button>
            <Post post={data} />
        </>
    );
}

export default PostContainer;