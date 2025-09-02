import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import Result from './components/Result/index'
import { StatusHeader } from './components/StatusHeader/index'
import { useExchangeRates } from './hooks/useExchangeRates';

function App() {

  const { refreshRates, loading } = useExchangeRates();

  return (
    <>
      <Header />
      <StatusHeader onRefresh={refreshRates} />
      <Form />
    </>
  )
}

export default App
