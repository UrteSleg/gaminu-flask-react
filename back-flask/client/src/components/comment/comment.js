import React from 'react';
import { DeleteComment } from '../../delete/deleteComment';
import { Link } from "react-router-dom";
import { useGlobalState } from '../../globalContext';
import styled from "styled-components";

const Button = styled(Link)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #A8AD28;
  color: #A8AD28;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 10em
`

export const Comment = ({ listOfComments, recipe_id })=> {
    const { user } = useGlobalState()
    
    return(
        <>
            {listOfComments.map(comment => { 
                return(
                    <ul key={comment.uid}>
                            <strong>{comment.username}: </strong> {comment.body}
                            { user && ((comment.user_id == user.auth_id) || user.is_admin) ? <DeleteComment uid={comment.uid}/> : null}
                            { user && ((comment.user_id == user.auth_id) || user.is_admin) ? <Button to={`/comment/edit/${recipe_id}/${comment.uid}`}> Koreguoti</Button> : null}
                    </ul>
                )
            })}
        </>
    )
}