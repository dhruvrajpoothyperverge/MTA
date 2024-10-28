import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-b from-[#000000ea] via-[#000000ea] to-[#211741] min-h-screen">
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;
