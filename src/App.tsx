import { toast } from "sonner";
import "./App.css";

function App() {
  return (
    <>
      <button onClick={() => toast("Toast")}>Render Toast</button>
    </>
  );
}

export default App;
