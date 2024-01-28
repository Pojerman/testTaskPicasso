import React, {useEffect, useState} from 'react';
import PostList from "../../features/post-list/post-list";
import Header from "../../features/header/header";
import {useGetPostsQuery} from "../../shared/store/api/api";
import LoadingSpinner from "../../features/loading-spinner/loading-spinner";
import {PostDetails} from "../../shared/types/card";
import scrollToTop from "../../features/scroll-to-top/scroll-to-top";
import {IconButton} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {CARD_SIZE, SCROLL_THRESHOLD} from "../../shared/const/const";

export default function Main() {
    const [displayedPosts, setDisplayedPosts] = useState<PostDetails[]>([]);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const { data: allPosts, isLoading } = useGetPostsQuery({});

    useEffect(() => {
        const loadInitialPosts = () => {
            if (allPosts && allPosts.length > 0) {
                const initialPosts = allPosts.slice(0, CARD_SIZE);
                setDisplayedPosts(initialPosts);
            }
        };

        loadInitialPosts();
    }, [allPosts]);

    useEffect(() => {
        const loadNextPosts = () => {
            if (allPosts && allPosts.length > 0) {
                const startIndex = displayedPosts.length % allPosts.length;
                const nextPosts = allPosts.slice(startIndex, startIndex + CARD_SIZE);
                setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
            }
        };

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            setShowScrollButton(scrollTop > SCROLL_THRESHOLD);
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                loadNextPosts();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [allPosts, displayedPosts]);

    if(isLoading) {
        return(<LoadingSpinner/>)
    }

    return(
        <>
            <Header></Header>
            <PostList posts={displayedPosts}></PostList>
            {showScrollButton && (
                <IconButton
                    style={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}
                    onClick={scrollToTop}
                >
                    <KeyboardArrowUpIcon />
                </IconButton>
            )}
        </>
    )
}
