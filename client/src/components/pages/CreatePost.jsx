import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');
    async function createNewPost(event) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0])
        event.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        console.log(await response.json());
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect.ok) {
        return <Navigate to={'/'} />
    }


    return (
        <form onSubmit={createNewPost}>
            <input type="title" placeholder={'title'} value={title} onChange={event => setTitle(event.target.value)}/>
            <input type="summary" placeholder={'summary'} value={summary} onChange={event => setSummary(event.target.value)} />
            <input type="file" onChange={event => setFiles(event.target.files)} />
            <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} />
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    );
};
