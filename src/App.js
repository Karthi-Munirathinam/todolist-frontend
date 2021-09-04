import './App.css';
import Footer from './components/footer';
import Header from './components/Header';
import Todocard from './components/Todocard';

function App() {
  return (
    <div className="App">
      <Header />
      <Todocard />
      <Footer />
    </div>
  );
}

export default App;
