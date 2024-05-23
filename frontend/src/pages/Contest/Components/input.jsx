import React, { useEffect } from 'react'
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import styles from '../styles.module.scss'


export function ContestInput({
  label,
  setFunc = () => { },
  style = {},
  fieldName,
  type,
}) {
  const handleOnChange = (e) => {
    setFunc((prev) => ({ ...prev, [fieldName]: e.target.value }))
  }

  return (
    <div style={{ ...style, }}>
      <label style={{ fontSize: '1.7rem', color: '#000' }}>
        {label}
      </label>
      <br />
      <input
        type={type}
        onChange={handleOnChange}
        style={{
          outline: 'none',
          background: 'transparent',
          border: '1px solid #000',
          fontSize: '1.7rem',
          marginTop: 10,
          marginBottom: 40,
          padding: '10px 12px',
          color: '#000',
          fontFamily: 'inherit',
          width: '100%'
        }}
      />
    </div>
  )
}

export function ContestStartAndEndDateInput({
  label,
  setFunc = () => { },
  style = {},
  fieldName
}) {
  const handleOnChangeStart = (e) => {
    setFunc((prev) => ({
      ...prev, [fieldName]: {
        start: e.target.value,
        end: prev[fieldName]?.end
      }
    }))
  }

  const handleOnChangeEnd = (e) => {
    setFunc((prev) => ({
      ...prev, [fieldName]: {
        start: prev[fieldName]?.start,
        end: e.target.value
      } }))
  }

  // useEffect(() => {
  //   console.log(setFunc(prev => {
  //     console.log(prev)
  //     return prev
  //   }))
  // })

  return (
    <div style={{ ...style, }}>
      <label style={{ fontSize: '1.7rem', color: '#000' }}>
        {label}
      </label>
      <br />
      <div>
        <input
          type={'date'}
          onChange={handleOnChangeStart}
          style={{
            outline: 'none',
            background: 'transparent',
            border: '1px solid #000',
            fontSize: '1.7rem',
            marginTop: 10,
            marginBottom: 40,
            padding: '10px 12px',
            color: '#000',
            fontFamily: 'inherit',
            width: '48%',
            marginRight: '4%'
          }}
        />
        <input
          type={'date'}
          onChange={handleOnChangeEnd}
          style={{
            outline: 'none',
            background: 'transparent',
            border: '1px solid #000',
            fontSize: '1.7rem',
            marginTop: 10,
            marginBottom: 40,
            padding: '10px 12px',
            color: '#000',
            fontFamily: 'inherit',
            width: '48%'
          }}
        />
      </div>
    </div>
  )
}


const QuillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] }
    ],
    [{
      'color': [
        '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc',
        '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66',
        '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2',
        '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color']
    }],
  ]
}
const QuillFormats = [
  'header', 'height', 'bold', 'italic',
  'underline', 'strike', 'blockquote',
  'list', 'color', 'bullet', 'indent',
  'link', 'image', 'align', 'size',
]

export function ContestTextarea({
  label,
  setFunc = () => { },
  style = {},
  fieldName
}) {

  const handleChange = (value) => {
    // console.log(value)
    setFunc((prev) => {
      return { ...prev, [fieldName]: value }
    })
  }

  return (
    <div style={{ ...style, }}>
      <label style={{ fontSize: '1.7rem', color: '#000' }}>
        {label}
      </label>
      <br />
      <ReactQuill
        className={styles.textEditor}
        theme="snow"
        modules={QuillModules}
        formats={QuillFormats}
        onChange={handleChange}
      />
    </div>
  )
}
