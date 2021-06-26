import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { getPosts } from "../modules/posts";

function PostListContainer(){

    const dispatch = useDispatch();
    
    // 컴포넌트 마운트 후 포스트 목록 요청
    useEffect( () => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div></div>
    );
}

export default PostListContainer;