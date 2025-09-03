import './App.css'
import Header from './components/Header';
import Form from './components/Form';
import { StatusHeader } from './components/StatusHeader/index';
import { useExchangeRates } from './hooks/useExchangeRates';

function App() {

  const { refreshRates } = useExchangeRates();

  return (
    <>
      <Header />
      <StatusHeader onRefresh={refreshRates} />
      <Form />
    </>
  )
}

export default App
