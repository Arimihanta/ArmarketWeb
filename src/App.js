import './App.css';
import 'materialize-css/dist/css/materialize.css'
import './styles/native-windows.css'
import {
  RecoilRoot
} from 'recoil';
import {HomePage} from './screens/HomePage'
import {generate as generateHash, verify as verifyPassword} from 'password-hash'

const App=() =>{
  console.log('Hav : '+generateHash('xoxo'))
  console.log('Hav : '+verifyPassword('xoxo',generateHash('xoxo')))
  console.log('Hents : '+generateHash('henintsoa'))
  console.log('Hasina : '+generateHash('Giligily'))
  return (
    <RecoilRoot>
      <HomePage/>
    </RecoilRoot>
    
  );
}
export default App;
