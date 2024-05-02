
import TravelQuestionnaire from './TravelQuestion';
import Landing from './landing'
import {BrowserRouter as BrowserRouter,Routes,Route} from "react-router-dom"


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}>
      </Route>
      <Route path="/TravelQuestion" element={<TravelQuestionnaire />}>
      </Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App
