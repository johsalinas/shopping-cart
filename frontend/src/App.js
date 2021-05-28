import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Container>
        <Route path="/" component={HomeScreen} exact></Route>
      </Container>
      <Footer></Footer>
    </Router>
  );
};

export default App;
