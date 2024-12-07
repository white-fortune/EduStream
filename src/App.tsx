import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Streams from "./components/Streams";
import NavBar from "./components/NavBar";
import Stream from "./components/Stream";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import { createContext, useState } from "react";

type NavContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const NavContext = createContext<NavContextType | undefined>(undefined);

function App() {
  let [regloginShow, setRegLoginShow] = useState<boolean>(false);

  return (
    <div className="container">
      <NavContext.Provider value={[regloginShow, setRegLoginShow]}>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<h1>This is home page</h1>}></Route>
            <Route path="/streams" element={<Streams />}></Route>
            <Route path="/stream/:stream_id" element={<Stream />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
      </NavContext.Provider>
    </div>
  );
}

export default App;
