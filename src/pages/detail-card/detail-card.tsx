import Header from "../../features/header/header";
import {PostCard} from "../../features/post-card/post-card";
import {useGetPostByIdQuery} from "../../shared/store/api/api";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../features/loading-spinner/loading-spinner";
import "./detail-card.css";

export default function DetailCard() {
    const { postId } = useParams();
    const { data: post, isLoading } = useGetPostByIdQuery(postId);

    if(isLoading) {
        return (<LoadingSpinner/>);
    }

    return(
        <>
            <Header></Header>
            <div className="card-about">
                <PostCard post={post}/>
            </div>
        </>
    )
}
