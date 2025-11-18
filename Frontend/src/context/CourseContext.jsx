import React, {createContext,useContext,useState} from 'react'

const CourseContext =createContext(null);
 export const ContextProvider=({children})=>{
    const[course, setCourse]=useState([]);
    // const[teacher, setTeacher]=useState([]);
    return(
        <CourseContext.Provider value={{course,setCourse}}>
            {children}
        </CourseContext.Provider>
    )
 }
 export const useCourse = () => useContext(CourseContext);