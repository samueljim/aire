import './App.css';
import { useEffect } from 'react';
import { Route, Link, useLocation } from "wouter";
import Login from "./pages/login.js";
import Question from "./pages/question.js";
import QuestionsList from "./pages/QuestionsList.js";
import { themeChange } from "theme-change";

function App() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    themeChange(false);
  }, []);
  const removeName = () => {
    window.localStorage.removeItem("name");
    setLocation("/");
  };
  return (
    <div className="min-h-screen ">
      <div className="navbar bg-base-100 bg-neutral text-neutral-content flex-wrap justify-between">
        <div className="">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl">Euler questions</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <select
              data-choose-theme
              className="select select-ghost w-40 max-w-xs"
            >
              <option value="lofi">Theme</option>
              <option value="synthwave">Synthwave</option>
              <option value="forest">Forest</option>
              <option value="lemonade">Lemonade</option>
              <option value="valentine">Valentine</option>
              <option value="wireframe">Wireframe</option>
              <option value="cupcake">Cupcake</option>
              <option value="bumblebee">Bumblebee</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="luxury">Luxury</option>
              <option value="pastel">Pastel</option>
              <option value="coffee">Coffee</option>
              <option value="retro">Retro</option>
            </select>
            <li className="pl-3" onClick={removeName}>
              <div>Logout</div>
            </li>
          </ul>
        </div>
      </div>
      <Route path="/" component={Login} />
      <Route path="/questions" component={QuestionsList} />
      <Route path="/question/:number">
        {(params) => <Question number={params.number} />}
      </Route>
    </div>
  );
}

export default App;
