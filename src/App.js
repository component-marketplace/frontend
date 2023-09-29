import Items from './views/items';
import ItemDetail from './views/items/ItemDetail';
import Nav from './Nav';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import ItemsProvider from './contexts/ItemsContext';
import ItemDetailProvider from './contexts/ItemDetailContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/items/:itemId' element={<ItemDetailProvider><ItemDetail /></ItemDetailProvider>} />
          <Route path='/items' element={<ItemsProvider><Items /></ItemsProvider>} />
          <Route path='/actions' element={<h1>Critical Actions</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
