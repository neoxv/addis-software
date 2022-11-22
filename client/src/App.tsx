import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import styled,{ThemeProvider} from "styled-components"
import Header from './components/Header';
import EmployeePage from './features/employee/EmployeePage';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Router>
      <GlobalStyle />
        <Header title={"Employee Management App"} to={"/"} />
        <Container>
          <Routes>
            <Route path='/' element={<EmployeePage/>} />
            <Route path='/employee/add' element={<>Add employee</>}/>
            <Route path='/employee/edit' element={<>Edit employee</>} />
          </Routes>
        </Container>
    </Router>
  );
}

export default App;

export const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    color: white;
`

