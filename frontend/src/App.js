import './App.css';
import { useState } from "react";
// import TestBackend from './TestBackend';
// import SignIn from './Components/SignIn';
import PopUp from './Components/PopUp';

function App() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="App">
      {/* <TestBackend/> */}
      {/* <SignIn /> */}
      {/* <h1>Hey, my name is Pathomporn.♥</h1> */}
      <button
        className='stupidbtn'
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        button
      </button>
      {openPopup && <PopUp closePopUp={setOpenPopup} />}
    </div>
  );
}

export default App;
