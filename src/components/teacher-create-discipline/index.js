// @ts-nocheck
import React, { useEffect, useState, useCallback} from 'react';
import "./style.css";
import { useNavigate } from "react-router-dom";

function TeacherCreateDiscipline(props) {
    
    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const [senddata, setSend] = useState({fon: null});
    
    useEffect(()=>{
        (()=>{
            let send = {
                "ButtonClickaddNewDiscipline":{
                    "token":sessionStorage.getItem("token"),
                    "id_user":sessionStorage.getItem("id_user"),
                    "id_teacher":sessionStorage.getItem("id_teacher")
                }
            }
            fetch('http://ServerWebsite:3030/view/',{
                method: "POST",
                body: JSON.stringify(send)
            })
                .then(response => response.json())
                .then(databack => {
                    if(databack?.error)
                    {
                        alert(databack.error)
                    }
                    else
                    {
                        setData(databack[0]);
                    }
                });
        })()
    }, []);

    useEffect(()=>{
        console.log(data)
        setSend({
            ...senddata,
            "id_institute":data?.listinstitute[0].id_institute, 
            "id_faculty":data?.listfaculty[0].id_faculty, 
            "id_department":data?.listdepartment[0].id_department, 
        });
    }, [data]);


    const onChange = useCallback((e, nameval)=>{
        setSend({...senddata, [nameval]: e.target.value});
    },[senddata]);

    const addDiscipline = useCallback(()=>{
        let send = {
            "ButtonClicksaveNewDiscipline":{
                "token":sessionStorage.getItem("token"),
                "id_user":sessionStorage.getItem("id_user"), 
                "id_teacher":sessionStorage.getItem("id_teacher"), 
                "name":senddata.name, 
                "id_institute":senddata.id_institute, 
                "id_faculty":senddata.id_faculty, 
                "id_department":senddata.id_department, 
                "fon":senddata.fon}
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
                    alert(isok.info)
                    navigate("../")
                }
            });
    },[senddata]);

    return (  
        <div className='teacher-create-discipline'>
            {data && <>
            <div className='title'>
                <span>???????????????? ????????????????????</span>
            </div>
            <div className='disclaimer'>
                <span>?????????????? ???????????????? ?????????? ???????????????????? ?? ???????????? ???????????????????? ?? ??????</span>
            </div>
            <div className='input-element'>
                <span className='name'>????????????????*</span>
                <input onChange={(e)=>onChange(e, "name")} type="text" />
            </div>
            <div className='input-element'>
                <span className='name'>????????????????</span>
                <select onChange={(e)=>onChange(e, "id_institute")}>
                    {data.listinstitute.map((institute)=>
                        <option value={institute.id_unstitute}>{institute.name}</option>
                    )}
                </select>
            </div>
            <div className='input-element'>
                <span className='name'>??????????????????</span>
                <select onChange={(e)=>onChange(e, "id_faculty")}>
                    {data.listfaculty.map((faculty)=>
                        <option value={faculty.id_faculty}>{faculty.name}</option>
                    )}
                </select>
            </div>
            <div className='input-element'>
                <span className='name'>??????????????</span>
                <select onChange={(e)=>onChange(e, "id_department")}>
                    {data.listdepartment.map((department)=>
                        <option value={department.id_department}>{department.name}</option>
                    )}
                </select>
            </div>
            <div className='input-file'>
                <button>???????????????????? ??????</button>
                <span className='file-name'>???????? ???? ????????????</span>
            </div>
            <div className='owner'>
                <span>????????????????</span>
                <span>{sessionStorage.getItem("FIO")} (????)</span>
            </div>  
            <div className='menu'>
                <button onClick={addDiscipline} className='create'>
                    ??????????????
                </button>
                <button onClick={()=>{navigate("../")}} className='exit'>
                    ????????????
                </button>
            </div></>}
        </div>
    );
}

export default TeacherCreateDiscipline;