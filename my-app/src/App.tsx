import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, ToggleTheme } from "./hooksExercise";
import { ThemeContext, themes } from "./themeContext";
import { useState, useEffect, useContext } from 'react';

function App() {

  const [favorites, setFavorites] = useState<string[]>([]);
  function handleLike(note: Note){
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(note.title)) {
        return prevFavorites.filter(title => title !== note.title); 
      } else {
        return [...prevFavorites, note.title];
      } 
    });
  }

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [notes, setNotes] = useState(dummyNotesList); 
const initialNote = {
   id: -1,
   title: "",
   content: "",
   label: Label.other,
 };

const [createNote, setCreateNote] = useState(initialNote);

const createNoteHandler = (event: React.FormEvent) => {
   event.preventDefault();
   console.log("title: ", createNote.title);
   console.log("content: ", createNote.content);
   createNote.id = notes.length + 1;
   setNotes([createNote, ...notes]);
   setCreateNote(initialNote);
 };

 return (

  <ThemeContext.Provider value={currentTheme}>
   <div className='app-container' style={{background: currentTheme.background,
       color: currentTheme.foreground }}>
    
    <form style={{margin: '10px'}} className="note-form"  onSubmit={createNoteHandler}>
       <div><input style={{width: '210px'}} placeholder="Note Title" onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required></input></div>

       <div><textarea onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required></textarea></div>

    <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

       <div><button type="submit">Create Note</button></div>
    </form>

    <div className="notes-grid" style={{margin: '30px'}}>
       {notes.map((note) => (
         <div 
           key={note.id}
           className="note-item"> 
           <div className="notes-header">
           <button onClick={() => handleLike(note)}>
            {favorites.includes(note.title) ? '❤️' : '♡'}</button>
             <button>x</button>
           </div>
           <div style={{color: 'black'}}>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
           </div>
         </div>
       ))}
     </div>
     <div style={{margin: '20px'}}>
      <p style={{ fontWeight: 'bold', fontSize: '20px' }}>List of Favorites </p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {favorites.map((title) => (
          <li style = {{marginBottom: '10px'}}>{title}</li>
        ))}
      </ul>
    </div>
    <button style = {{height: '50px', margin: '10px'}}onClick={toggleTheme}> Toggle Theme </button>
   </div>
   </ThemeContext.Provider>

 );
}

export default App;