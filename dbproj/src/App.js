import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const submitTest = () => {
    Axios.get('http://localhost:4000/', {}).then(() => {
        alert('success');
    });
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn
                </a>
                <button onClick={submitTest}>Submit</button>
            </header>
        </div>
    );
}

export default App;
