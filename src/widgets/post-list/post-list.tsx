import {PostCard} from "../../features/post-card/post-card";
import {PostDetails} from "../../shared/types/card";
import "./post-list.css";

type postsCard = {
    posts: PostDetails[]
}

export default function PostList({posts}: postsCard) {
    return(
        <div className="post-list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
            ))}
        </div>
    )
}
