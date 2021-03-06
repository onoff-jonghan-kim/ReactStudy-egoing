import './css/App.css';
import {useState} from 'react';

// component
function Header(props){
  return (
    <header>
      <h1><a href='/' onClick={(event)=>{ 
        event.preventDefault(); 
        props.onChangeMode(event.target.id);
      }}>{props.title}</a></h1>
    </header>
  );
}
function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={i.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(t.id);
    }}>{t.title}</a></li>);
  }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}
function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={event => {
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}

// View App
function App() {
  const [mode, setMode] = useState('WELCOME');//????????? ?????????, 0??? ???????????? ????????? ??????, 1??????????????? 0??? ????????? ?????? ????????? ??????
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'javascript is ...'}
  ]);
  const [nextId, setNextId] = useState(4);
  let content, title, body = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <><li>
      <a href={"/update/"+id} onClick={event =>{
        event.preventDefault();
        setMode("UPDATE");
      }}>Update</a>
    </li>
    <li>
      <input type='button' value="Delete" onClick={() =>{
        const newTopics = [];
        for(let i = 0; i<topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} />
    </li>
    </>
  }else if(mode === 'CREATE'){
    content =<Create onCreate={(_title, _body)=>{
      const newTopics = [...topics];
      const newTopic = {id:nextId, title:_title, body:_body};
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if(mode === "UPDATE"){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body)=>{
      const newTopics = [...topics];
      const updatedTopic = {id:id ,title:_title, body:_body};
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id)
      }}></Nav>
      <ul>
      <li>
      <a href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      {contextControl}
      </ul>
      {content}
    </div>
  );
}

export default App;
