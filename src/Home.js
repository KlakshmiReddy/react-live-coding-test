import "./App.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const [text, setText] = useState({
    name: '',
    error: ''
  });
  const { name, error } = text
  const [isReady, setIsReady] = useState(false);
  const handleInput = (e) => {
    setText({ ...text, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (text.name === 'Ready!') {
      setIsReady(true)
      setText({ ...text, error: '' })
    } else {
      setIsReady(false)
      setText({ ...text, error: 'I am not ready yet!' })
    }
  }, [text.name])

  console.log(text.name);
  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/pokedex">
          <img
            hidden={!isReady}
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            className="App-logo"
            alt="logo"
            style={{ padding: "10px" }}
          />
        </NavLink>


        <b>
          Requirement: Try to show the hidden image and make it clickable that
          goes to /pokedex when the input below is "Ready!" remember to hide the
          red text away when "Ready!" is in the textbox.
        </b>
        <p>Are you ready to be a pokemon master?</p>
        <input type="text" name="name" value={text.name} onChange={handleInput} />
        {
          text.name === 'Ready!' ? null :
            <span style={{ color: "red" }}>{text.error}</span>
        }
      </header>
    </div>
  );
}

export default Home;
