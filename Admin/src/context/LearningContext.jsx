import React, {createContext,useContext,useState} from 'react'

const LearningContext =createContext(null);
 export const ContextProvider=({children})=>{
    const[course, setCourse]=useState([]);
    const[teacher, setTeacher]=useState([]);
    return(
        <LearningContext.Provider value={{course,setCourse,teacher,setTeacher}}>
            {children}
        </LearningContext.Provider>
    )
 }
 export const useLearning = () => useContext(LearningContext);