import React, { useRef, useState } from 'react'
import './Quiz.css'
import  {data} from '../../assets/data';



const Quiz = () => {
  
  async function ApiData(){
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const Data = await response.json();
    console.log(Data);
  };
  
  ApiData();
  
  let [index,setIndex]=useState(0);
  let [question,setQuestion]=useState(data[index]);
  let[lock,setLock]=useState(false);
  let[score,setScore]=useState(0);



  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);

  let option_arraY=[Option1,Option2,Option3,Option4]

  const checkAns=(e,ans)=>{
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add("correct");
        setScore(prev=>prev+1);
      }
      else{
        e.target.classList.add("wrong");
        option_arraY[question.ans-1].classList.add("correct")
      }
      setLock(true);
    }
  }

  const next=(e)=>{
    if(lock===false){
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_arraY.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }


  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        <h2>{index+1}. {question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>  
          <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>  
          <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>  
          <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>  
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} of {data.length} Questions</div>
    </div>
  )
}

export default Quiz