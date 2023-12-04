import React, { useState, useRef, useEffect } from "react"
import { Input, Button, Avatar } from "antd"
import styles from "./styles.module.scss"
import axios from "axios"
import { deployedAPI } from "../../utils/form.constants"
import { createFormData } from "../../utils/utils"
import { localStorageConstant } from "../../utils/global.constants"

const { TextArea } = Input
const CommentInput = () => {
  const [inputValue, setInputValue] = useState('')
  const previousInputValue = useRef('')

  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    let data = {
      id: localStorage.getItem(localStorageConstant.ID),
      date: (new Date().toLocaleDateString('en-GB').split('/').join('-')),
      content: inputValue,
      like: 0,
      dislike: 0,
    }
    console.log(data)

    // console.log(newFormData)
    // axios
    //   .put(`${deployedAPI}/ideas/`, newFormData)
    //   .then((res) => {
    //     console.log('Update comment', res)
    //   })
    //   .catch((e) => {
    //     console.log('Cannot comment', e)
    //   })
  }

  useEffect(() => {
    previousInputValue.current = inputValue
  }, [inputValue])

  return (
    <div className={styles.commentInput}>
      <Avatar size='large' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <div className={styles.inputContent}>
        <TextArea rows={4} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <Button type='primary' onClick={handleSubmit}>Comment</Button>
      </div>
    </div>
  )
}

export default CommentInput
