import './App.css';
import { useEffect } from 'react';
import { Route, Link } from "wouter";
import Login from "./pages/login.js";
import Question from "./pages/question.js";
import QuestionsList from "./pages/QuestionsList.js";
import { themeChange } from "theme-change";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div class="navbar bg-base-100 bg-neutral l text-neutral-content">
        <div class="flex-1">
          <Link href="/">
            <a class="btn btn-ghost normal-case text-xl">Euler questions</a>
          </Link>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li className="pr-3">
              <Link href="/questions">Questions</Link>
            </li>
            <select data-choose-theme class="select select-ghost w-40 max-w-xs">
              <option value="lofi">Default</option>
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
