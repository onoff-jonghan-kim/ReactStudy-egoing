import './css/App.css';

// component
function Header(props){
  return (
    <header>
      <h1><a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}
function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>);
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

// View App
function App() {
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'javascript is ...'}
  ];
  return (
    <div className="App">
      <Header title="REACT" onChangeMode={function(){
        alert('I am Header');
      }}></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello~!"></Article>
    </div>
  );
}

export default App;
