import React from 'react';
import { DeleteComment } from '../../delete/deleteComment';
import { Link } from "react-router-dom";
import { useGlobalState } from '../../globalContext';


export const Comment = ({ listOfComments, recipe_id })=> {
    const { user } = useGlobalState()
    
    return(
        <>
            {listOfComments.map(comment => { 
                return(
                    <ul key={comment.uid}>
                            <strong>{comment.username}: </strong> {comment.body}
                            { user && ((comment.user_id == user.auth_id) || user.is_admin) ? <DeleteComment uid={comment.uid}/> : null}
                            { user && ((comment.user_id == user.auth_id) || user.is_admin) ? <Link to={`/comment/edit/${recipe_id}/${comment.uid}`}> Koreguoti</Link> : null}
                    </ul>
                )
            })}
        </>
    )
}