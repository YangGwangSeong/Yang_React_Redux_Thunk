import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux"; //리덕스 함수
import { getPost } from "../modules/posts"; //api 에서 데이터 가져오는 함수
import Post from "../components/Post"; 

function PostContainer( { postId }) {
    const { data, loading, error }  = useSelector(state => state.posts.post);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getPost(postId));
    }, [postId, dispatch]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러발생</div>;
    if (!data) return null;

    return (
        <Post post={data} />
    );
}

export default PostContainer;