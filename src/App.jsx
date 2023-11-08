import { useCallback, useState, useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])



  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="flex flex-col bg-white text-black rounded-lg px-3 py-3">
        <h1>Password Generator</h1>
        <div className="flex justify-center mb-3">
          <input type="text" className='outline-none w-full py-1 px-3 rounded-md mr-3 text-white' value={password} readOnly  ref={passwordRef} />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg"onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex gap-x-2'>
          <div className='py-2 m-3'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>

          <div className='py-2 m-3'>
            <input type="checkbox" className='cursor-pointer' onClick={() => { setNumber((prev) => !prev) }} />
            <label>Number</label>
          </div>

          <div className='py-2 m-3'>
            <input type="checkbox" className='cursor-pointer' onClick={() => { setCharacter((prev) => !prev) }} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
