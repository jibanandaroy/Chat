import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home } from "./App/home/Home";
import Login from "./App/auth/Login";
import Register from "./App/auth/Register";
import { UserList } from "./App/user/UserList";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user" element={<UserList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
