import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setPokemons(res.data.results)
      setIsLoading(false);
      console.log('res', res);
    }
    fetchData();
  }, [])
  console.log(pokemons);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };
  const onModel = (each) => {
    console.log('onModel');
    setPokemonDetail(each)
    const id = pokemons.indexOf(each);
    setId(id + 1)
  }
  console.log("pokemonDetail", pokemonDetail);
  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex, and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>when hover on the list item , change the item color to yellow.</li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>If you do more than expected (E.g redesign the page / create a chat feature at the bottom right). it would be good.</li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Loading....</b>
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>

            {
              pokemons.map((each, index) => {
                return (
                  <b key={index} className="list_item" onClick={() => onModel(each)}>{each.name}</b>
                )
              })
            }

          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="image" />
              <table style={{ border: '1px solid white' }}>
                <thead>
                  <th >Name</th>
                  <th>Url</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{pokemonDetail.name}</td>
                    <td>{pokemonDetail.url}</td>
                  </tr>
                </tbody>
              </table>

              <BarChart width={500} height={200} data={pokemons}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
              </BarChart>

              <a href='#' download='pokemon-info'>download</a>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
