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
import InfiniteScroll from "react-infinite-scroll-component";

export default function Main() {
    const [displayedPosts, setDisplayedPosts] = useState<PostDetails[]>([]);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { data: allPosts, isLoading } = useGetPostsQuery({});

    useEffect(() => {
        if (allPosts && allPosts.length > 0) {
            const initialPosts = allPosts.slice(0, CARD_SIZE);
            setDisplayedPosts(initialPosts);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [allPosts]);

    const loadNextPosts = () => {
        setTimeout(() => {
            const startIndex = displayedPosts.length;
            const endIndex = startIndex + CARD_SIZE;

            if (startIndex >= allPosts.length) {
                return;
            }

            const nextPosts = allPosts.slice(startIndex, endIndex);
            setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
        }, 1000)
    }

    const handleScroll = () => {
        const { scrollTop} = document.documentElement;
        setShowScrollButton(scrollTop > SCROLL_THRESHOLD);
    };

    if(isLoading) {
        return(<LoadingSpinner/>)
    }

    return(
        <>
            <Header></Header>
            <InfiniteScroll
                dataLength={displayedPosts.length}
                next={loadNextPosts}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <PostList posts={displayedPosts}></PostList>
            </InfiniteScroll>
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
