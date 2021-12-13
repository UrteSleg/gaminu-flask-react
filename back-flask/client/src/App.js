import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { ShowCategory } from "./pages/ShowCategory";
import { AuthPage } from "./pages/AuthPage";
import { AboutPage } from "./pages/AboutPage";
import { ShowRecipe } from "./pages/ShowRecipe";
import { EditRecipe } from "./edit/editRecipe";
import { Login } from "./pages/Login";
import UserHoc from "./components/auth/auth";
import { GlobalProvider } from "./globalContext";
import { Navbar } from "./components/navbar";
import { EditComment } from "./edit/editComment";
import { EditCategory } from "./edit/editCategory";
import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";

export const BACKEND_URI = "http://localhost:5000";

function App() {

  return (
    <div className="App">
    <GlobalProvider>
      <UserHoc>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<MainPage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/auth" element={<AuthPage/>}/>
              <Route path="/categories" element={<CategoriesPage/>}/>
              <Route path="/category/:uid" element={<ShowCategory/>}/>
              <Route path="/recipe/:uid" element={<ShowRecipe/>}/>
              <Route path="/recipe/edit/:category_id/:recipe_id" element={<EditRecipe/>}/>
              <Route path="/comment/edit/:recipe_id/:uid" element={<EditComment/>}/>
              <Route path="/category/edit/:uid" element={<EditCategory/>}/>
            </Routes>
          </div>
        </Router>
      </UserHoc>
    </GlobalProvider>
    </div>
  );
}

export default App;
