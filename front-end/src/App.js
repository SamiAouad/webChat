import './App.css';
import io from "socket.io-client"
import Chat from "./Chat";
import Login from "./Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

const socket = io.connect("http://localhost:5000");

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} exact/>
                <Route path="/chat/:room" element={<Chat/>} socket={socket} exact/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
