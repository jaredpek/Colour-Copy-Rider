import { Textarea } from "flowbite-react"
import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
import axios from 'axios'
import { ClipLoader } from "react-spinners";

const HomePage = () =>{
    const [prompt,setPrompt] = useState('')
    const [result,setResult] = useState('')
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null)

    const queryBackend = ()=>{
        setLoading(true);
        axios.post('https://techfest-backend.onrender.com/text', {
            product: prompt
          })
          .then(function (response) {
            console.log(response)
            if(response.data){
                setResult(response.data.choices[0].message.content)
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => setLoading(false));
    }

    useEffect(()=>{
        console.log(result)
        if(resultRef.current){
            resultRef.current.value = result
        }
    },[result])

    return <div className="w-full  bg-stone-800 flex flex-1 justify-center items-center">
        <div className="pt-10 pb-24">
        {/* <div className="grid grid-rows-2 gap-1 p-5"> */}
            <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-amber-200 text-7xl font-bold w-full text-center">Welcome To ColorCopyRider</h1>
        <p className=" w-full text-center">Assistive Living App for Copywriters with visual impairment</p>
        {/* <Webcam/> */}
        <div className="text-center">
            Display any product, then hover your mouse cursor over it!
        </div>
        <div id="webcam-section" className="w-fit m-auto"></div>
        </div>
        <div className="w-full">
        {/* <button type="button" className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Scanning</button> */}
        <p className="text-center">Enter the description of your product and we will do the copywriting for you</p>
        <div className="mb-5 mt-5">
        <Textarea onChange={(e)=>setPrompt(e.target.value)}/>
        </div>
        <button onClick={queryBackend} type="button" className="flex gap-2 items-center justify-center w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Generate
            {loading && <ClipLoader size={12} color="white" />}
        </button>
        {!loading && result.length>0 && <div>
            <h1>Here is the description for you</h1>
            <Textarea className="h-96" value={result} readOnly/>
        </div>}
        </div>
        
        </div>
        
    </div>
}



export default HomePage