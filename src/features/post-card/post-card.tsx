import React from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {PostDetails} from "../../shared/types/card";
import {useLocation, useNavigate} from "react-router-dom";
import {AppRoutes} from "../../shared/types/route";
import "./post-card.css"
import { MAX_DESCRIPTION_LENGTH } from "../../shared/const/const";
import {validateAndTrimText} from "../../shared/utils/utils";

type PostListProps = {
    post: PostDetails;
}

const CardComponent = ({post}: PostListProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = () => {
        if(location.pathname === AppRoutes.Main) {
            navigate(AppRoutes.POST_DETAILS.replace(":postId", post.id.toString()));
        } else {
            navigate(AppRoutes.Main);
        }
    }

    return (
        <Card className="card" sx={{maxWidth: 680}} variant="outlined">
            <CardHeader className="card-header" title={post.id + " " + post.title} />
            <CardContent className="card-description">
                <Typography sx={{fontSize: 14}} color="text.secondary">
                    {validateAndTrimText(post.body, location.pathname)}
                </Typography>
            </CardContent>
            <CardActions>
                {
                    post.body.length > MAX_DESCRIPTION_LENGTH ? (<Button size="small" onClick={handleButtonClick}>{location.pathname === AppRoutes.Main ? "Подробнее" : "Назад"}</Button>) : null
                }
            </CardActions>
        </Card>
    )
}

export const PostCard = React.memo(CardComponent);
