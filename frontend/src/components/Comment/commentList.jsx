import React from 'react'
import Comment from './comment'
import CommentInput from './commentInput'
import { Divider } from 'antd'

const CommentList = ({comments}) => {
  return (
    <>
      <h1>Comment</h1>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      <Divider />
      <CommentInput />
    </>
  )
}

export default CommentList
