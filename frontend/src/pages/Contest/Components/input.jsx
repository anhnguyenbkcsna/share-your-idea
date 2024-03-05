import React from 'react'
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import styles from '../styles.module.scss'


export function ContestInput({
  label,
  setFunc = () => { },
  style = {},
  fieldName,
  type = 'text',
}) {
  const handleOnChange = (e) => {
    setFunc((prev) => ({ ...prev, [fieldName]: e.target.value }))
  }

  return (
    <div style={{ ...style, }}>
      <label style={{ fontSize: '1.7rem', }}>
        {label}
      </label>
      <br />
      <input
        type={type}
        onChange={handleOnChange}
        style={{
          outline: 'none',
          background: 'transparent',
          border: '1px solid #fff',
          fontSize: '1.7rem',
          marginTop: 10,
          marginBottom: 40,
          padding: '10px 12px',
          color: '#fff',
          fontFamily: 'inherit',
          width: '100%',
        }}
      />
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
  fieldName,
  type = 'text',
}) {
  const ref = React.createRef()
  const [isInputList, setIsInputList] = React.useState(false)

  // const handleKeyDown = (e) => {
  //   // console.log(e)
  //   if (e.key === 'b' && e.ctrlKey)
  //   {
  //     e.preventDefault()
  //     console.log(window.getSelection().toString())
  //     console.log(e)
  //   }
  //   else if (e.key === 'i' && e.ctrlKey)
  //   {

  //   }


  //   if (e.key === 'Tab')
  //   {
  //     e.preventDefault()
  //     ref.current.value += '\t'
  //   }
  //   else if (e.key === ' ')
  //   {
  //     try
  //     {
  //       if (ref.current.value[ref.current.value.length - 1] === '-')
  //       {
  //         e.preventDefault()
  //         ref.current.value += '\t'
  //         setIsInputList(true)
  //       }
  //     }
  //     catch (exception) { }
  //   }
  //   else if (e.key === 'Enter' && isInputList)
  //   {
  //     e.preventDefault()
  //     ref.current.value += '\n-\t'
  //   }
  //   else if (e.key === 'Backspace')
  //   {
  //     if (isInputList)
  //     {
  //       try
  //       {
  //         if (ref.current.value.slice(-2) === '-\t')
  //         {
  //           e.preventDefault()
  //           ref.current.value = ref.current.value.slice(0, -2)
  //           setIsInputList(false)
  //         }
  //       }
  //       catch (exception) { }
  //     }
  //   }

  //   setFunc((prev) => {
  //     console.log(prev[fieldName])
  //     return { ...prev, [fieldName]: ref.current.value }
  //   })
  // }
  const handleChange = (value) => {
    setFunc((prev) => {
      return { ...prev, [fieldName]: value }
    })
  }

  return (
    <div style={{ ...style, }}>
      <label style={{ fontSize: '1.7rem', }}>
        {label}
      </label>
      <br />
      {/* <textarea
        ref={ref}
        type={type}
        onKeyDown={handleKeyDown}
        style={{
          outline: 'none',
          background: 'transparent',
          border: '1px solid #fff',
          fontSize: '1.7rem',
          marginTop: 10,
          marginBottom: 40,
          padding: '10px 12px',
          color: '#fff',
          fontFamily: 'inherit',
          width: '100%',
          height: 300,
          'resize': 'none'
        }}
      /> */}
      <ReactQuill
        className={styles.textEditor}
        theme="snow"
        modules={QuillModules}
        formats={QuillFormats}
        placeholder="write your content ...."
        onChange={handleChange}
      />
    </div>
  )
}
