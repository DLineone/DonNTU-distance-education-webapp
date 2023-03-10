// @ts-nocheck
import React, { useEffect, useState, useCallback} from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";


function TeacherEditDiscipline(props) {

    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const [senddata, setSend] = useState({fon: null});

    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem("resavedata")));

    }, []);

    useEffect(()=>{
        console.log(data)
        setSend({
            ...senddata,
            "name":data?.name, 
            "id_institute":data?.id_institute, 
            "id_faculty":data?.id_faculty, 
            "id_department":data?.id_department, 
        });
    }, [data]);

    const editDiscipline = useCallback(()=>{
        let send = {
            "ButtonClicksaveEditDiscipline":{
                "token":sessionStorage.getItem("token"),
                "id_user":sessionStorage.getItem("id_user"), 
                "id_teacher":sessionStorage.getItem("id_teacher"), 
                "name":senddata.name, 
                "id_institute":senddata.id_institute, 
                "id_faculty":senddata.id_faculty, 
                "id_department":senddata.id_department, 
                "fon":senddata.fon,
                "id_discipline":localStorage.getItem("resavedatadist")}
        };
        fetch('http://ServerWebsite:3030/view/',{
            method: "POST",
            body: JSON.stringify(send)
        })
            .then(response => response.json())
            .then(isok => {
                if(isok.error)
                {
                    alert(isok.error)
                }
                else
                {
                    localStorage.removeItem("resavedatadist");
                    localStorage.removeItem("resavedata");
                    alert(isok.info)
                    navigate("../")
                }
            });
    },[senddata]);

    const onChange = useCallback((e, nameval)=>{
        setSend({...senddata, [nameval]: e.target.value});
    },[senddata]);

    return ( 
        
        <div className='teacher-edit-discipline'>
        {data && <>
            <div className='title'>
                <span>?????????????????????????? ??????????????????e "{data.name}"</span>
            </div>
            <div className='disclaimer'>
                <span>?????????????? ?????????? ???????????????? ???????????????????? ?? ???????????????????????????? ???????????? ???????????????????? ?? ??????</span>
            </div>
            <div className='input-element'>
                <span className='name'>?????????? ????????????????</span>
                <input type="text" onChange={(e)=>onChange(e, "name")} defaultValue={data.name}/>
            </div>
            <div className='input-element'>
                <span className='name'>????????????????</span>
                <select onChange={(e)=>onChange(e, "id_institute")}>
                    {data[0].listinstitute.map((institute)=>
                        <option value={institute.id_unstitute}>{institute.name}</option>
                    )}
                </select>
            </div>
            <div className='input-element'>
                <span className='name'>??????????????????</span>
                <select onChange={(e)=>onChange(e, "id_faculty")}>
                    {data[0].listfaculty.map((faculty)=>
                        <option value={faculty.id_faculty}>{faculty.name}</option>
                    )}
                </select>
            </div>
            <div className='input-element'>
                <span className='name'>??????????????</span>
                <select onChange={(e)=>onChange(e, "id_department")}>
                    {data[0].listdepartment.map((department)=>
                        <option value={department.id_department}>{department.name}</option>
                    )}
                </select>
            </div>
            <div className='input-file'>
                <button>???????????????????? ?????????? ??????</button>
                <span className='file-name'>???????? ???? ????????????</span>
            </div>
            <div className='owner'>
                <span>????????????????</span>
                <span>{sessionStorage.getItem("FIO")} (????)</span>
            </div>
            <div className='input-element'>
                <span className='name'>?????????? ????????????????</span>
                <select>
                </select>
            </div>  
            <div className='menu'>
                <button onClick={editDiscipline} className='create'>
                    ??????????????????
                </button>
                <button onClick={
                    ()=>{navigate("../"); 
                    localStorage.removeItem("resavedata");
                    localStorage.removeItem("resavedatadist");
                    localStorage.removeItem("resavedatadistname");}} className='exit'
                >
                    ????????????
                </button>
            </div></>}
        </div>
    );
}

export default TeacherEditDiscipline;