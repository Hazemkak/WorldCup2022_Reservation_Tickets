import AlertContextProvider from "./context/AlertContext";
import AlertMessage from "./shared/Alerts/Alert";
import RouterContainer from "./routes/RouterContainer";
import 'aos/dist/aos.css';
import "./App.css";

function App() {
  return (
    <AlertContextProvider>
      <AlertMessage />
      <RouterContainer />
    </AlertContextProvider>
  );
}

export default App;
