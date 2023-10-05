import Items from './views/items';
import ItemDetail from './views/items/ItemDetail';
import Marketplace from './views/marketplace';
import Nav from './Nav';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import ItemsProvider from './contexts/ItemsContext';
import ItemDetailProvider from './contexts/ItemDetailContext';
import MarketplaceProvider from './contexts/MarketplaceContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/items/:itemId' element={<ItemDetailProvider><ItemDetail /></ItemDetailProvider>} />
          <Route path='/items' element={<ItemsProvider><Items /></ItemsProvider>} />
          <Route path='/actions' element={<h1>Critical Actions</h1>} />
          <Route path='/marketplace' element={<MarketplaceProvider><Marketplace /></MarketplaceProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
