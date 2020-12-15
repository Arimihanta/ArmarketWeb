import './App.css';
import 'materialize-css/dist/css/materialize.css'
import './styles/native-windows.css'
import {
  RecoilRoot
} from 'recoil';
import {HomePage} from './screens/HomePage'

const App=() =>{
  return (
    <RecoilRoot>
      <HomePage/>
    </RecoilRoot>
    
  );
}
export default App;
