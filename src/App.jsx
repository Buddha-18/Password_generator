import { useState ,useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setlength]=useState(7)
  const [numberAllowed,setnumberAllowed]=useState(false);
  const[characterAllowed,setcharacterAllowed]=useState(false);
  const[password,setPassword]=useState("");

  const passwordRef=useRef(null);

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+="0123456789";
    if(characterAllowed) str+="~!@#$%^&*()_+=-[]\{}|;':,./<>?`";

    for (let i = 0; i <length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      
      pass+=str.charAt(char);
      
    }
setPassword(pass);

  },[length,numberAllowed,characterAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>

        <h1 className=' text-center text-white mb-5 text-2xl'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 placeholder:text-gray-400'
          placeholder='Password'
          readOnly 
          ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:opacity-90'
          onClick={copyPassword}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={7} max={100} value={length} className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="numberInput"
            className='cursor-pointer'
            checked={numberAllowed} 
            onChange={()=>{
              setnumberAllowed((prev)=>!prev)
            }}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="charInput"
            className='cursor-pointer'
            checked={characterAllowed} 
            onChange={()=>{
              setcharacterAllowed((prev)=>!prev)
            }}/>
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

      </div>
      
    </>
  )
}

export default App
