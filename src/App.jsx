import './App.css'
import Header from '../components/Header'
import Form from '../components/Form'
import { FormProvider } from '../context/FormContext';
import SearchResults from '../components/Searchresults';

function App() {
 
  return (
    <>
    <div className="main">
     <Header />
      
     <FormProvider>
     <div class="row">
       <Form />
     </div>
       <SearchResults />
    </FormProvider>
    </div>
  
    </>
   
  )
}

export default App
