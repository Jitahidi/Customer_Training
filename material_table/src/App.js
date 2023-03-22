import "./App.css";
import { RequestForm } from "./request/RequestForm";
import { RequestTable } from "./request/RequestTable";

function App() {
  return (
    <div className="App">
      <RequestForm />
      <RequestTable />
    </div>
  );
}

export default App;
