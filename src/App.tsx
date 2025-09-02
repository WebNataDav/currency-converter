import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import Result from './components/Result/index'

function App() {

  return (
    <>
      <Header />
      <div className="wrapper">
        <Form />
        <Result />
      </div>
    </>
  )
}

export default App
