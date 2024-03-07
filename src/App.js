import React, { useEffect, useState,useRef } from "react";

const Words=["thunder","earth","sky","blue","electron","dark","light","bird","water","fish","ball","system"]
function App() {
  const [inputText,setInputText]=useState("");
  const [increment,setIncrement]=useState(1);
  const [randomArray,setRandomArray]=useState([]);
  const [clickFlag,setClickFlag]=useState(false)
  const [randomFlag,setRandomFlag]=useState(false);
  const [stage,setStage]=useState("");

  const [greetingText,setGreetingText]=useState("");

  const inputRef=useRef(null);
  const displayRef=useRef(null);
  const resetRef=useRef(null);


useEffect(()=>{
  if(randomFlag){
    setTimeout(()=>{
      displayRef.current.style.display="none";
      inputRef.current.disabled=false;
      if(!clickFlag) inputRef.current.focus();
    },5000)

    if(!clickFlag && increment<21){
      setTimeout(()=>{
        displayRef.current.style.display="flex";
      },3000);
      //displayRef.current.style.display="inline-block";
      inputRef.current.disabled=true;
      setRandomArray(Array(increment).fill(0).map((item,index)=>{
        return Words[Math.floor(Math.random()*Words.length)]
      }))
      
    }
    if(increment===21){
      resetRef.current.style.display="block";
      inputRef.current.disabled="true";
    }
   
}
},[increment,randomFlag,clickFlag])

 //${InputArr.find((item,index)=>item!==randomArray[index])
 //${randomArray.find((item,index)=>item!==InputArr[index])}

function check(){
  setClickFlag(true)
}
function getRandomArr(){
  setRandomFlag(true)
}
function handleReset(){
  window.location.reload();
}

useEffect(()=>{
  let regex=/\s+/g;
  let InputArr=inputText.trim().split(regex);
  let equal=JSON.stringify(InputArr)===JSON.stringify(randomArray);

  if(clickFlag){
    //let equal=JSON.stringify(InputArr)===JSON.stringify(randomArray)

    
    if(equal){

      //setGreetingText("correct");
      
      console.log("correct")
      setIncrement(p=>p+1);
      inputRef.current.value=null;
      setInputText("");
      inputRef.current.style.border="2px solid lightgreen";
      inputRef.current.style.boxShadow="0 0 10px lightgreen"
      setTimeout(()=>{
        inputRef.current.style.border="2px solid black";
        inputRef.current.style.boxShadow="none";
      },1000)
      setClickFlag(false);
    }
    else{
      inputRef.current.style.border="2px solid red";
      setGreetingText(`Incorrect! you have written word${InputArr.length===1?"":"s"}: ${InputArr},
      but word${randomArray.length===1?"":"s"} on current stage was: ${randomArray}`);
      setStage(`you can remember ${increment-1} word${increment<=2?"":"s"} in 5 seconds`)
      resetRef.current.style.display="block";
    
    console.log("incorrect")
    }
    
    
  }
},[inputText,randomArray,clickFlag,increment])

  return (
    <div className="container">
      <h1>Memory app</h1>

      
      <div ref={displayRef} className="randomWords">
        {randomArray.map((item,index)=>{
          return(<span style={{fontSize:"20px"}} key={index}>{item} </span>)
        })}

      </div>

      <div>
      <input name="myInput" className="inputStyle" type="text" ref={inputRef} onChange={e=>setInputText(e.target.value)} disabled={true} />
      </div>
      <div className="buttonContainer">
      <button onClick={check}>Check</button>
      <button onClick={getRandomArr}>Start</button>
      </div>

      <h1 className="finishText">{greetingText}</h1>
      <h2 className="finishText">{stage} <button className="resetBut" ref={resetRef} onClick={handleReset} style={{display:"none"}}>Try again</button></h2>

      {increment===21 && <h1>Congretulations! you are done! you have super memory! <button className="resetBut" ref={resetRef} onClick={handleReset} style={{display:"none"}}>Try again</button></h1>}
      
    </div>

  );
}

export default App;
