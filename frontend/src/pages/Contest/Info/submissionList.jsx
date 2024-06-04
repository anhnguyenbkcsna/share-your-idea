import React, { useState, useEffect } from "react"
import { getIdeaById } from "../../../api/idea"
import { useNavigate } from "react-router-dom"

const SubmissionList = ({ bg, submissionId }) => {
  const navigate = useNavigate()
  const [submission, setSubmission] = useState()
  useEffect(() => {
    getIdeaById(submissionId).then((res) => {
      console.log(res)
      setSubmission(res)
    }).then((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div style={{
      // backgroundImage: background,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      backgroundColor: 'white',
      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
      width: 350,
      height: 300,
      borderRadius: 10,
      margin: 10,
      cursor: 'pointer',
    }}
      onClick={() => navigate(`ideas/${submissionId}`)}
    >
      <img src={bg ? bg : 
        "https://www.binus.edu/wp-content/uploads/2017/03/Web-Banner-Innovation-Award-2017_2-01.jpg"}
        alt='Banner' 
        style={{
          width: '100%',
          height: '50%',
          objectFit: 'cover',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
      }}/>
      <div style={{ padding: 10 }}>
        {submission && <h3 style={{ color: '#ff7510', fontWeight: 'bold'}}>{submission.name}</h3>}
      </div>
    </div>
  )
}

export default SubmissionList