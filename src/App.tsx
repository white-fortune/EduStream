import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Groups from "./components/Groups";
import NavBar from "./components/NavBar";
import Stream from "./components/Stream";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<h1>This is home page</h1>}></Route>
          <Route path="/groups" element={<Groups />}></Route>
          <Route path="/stream/:name" element={<Stream />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
