'use client'

import { useState, useRef } from "react";
import * as XLSX from 'xlsx';
import classes from './dragDropInput.module.css'

const fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];

export default function DragDropInput({setUserStoryData}){

    const [file, setExcelFile] = useState(null);
    const [excelFileName, setExcelFileName] = useState('');
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [excelRowData, setExcelRowData] = useState([]);

    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null);

    // Show event
    const handleFileShow=(file)=>{
        if(file!==null){
            const workbook = XLSX.read(file,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0,10));
            setExcelRowData(data)
        }
    }

    // On Submit Event
    const handleFileSubmit= () => {
        setUserStoryData((pv) => {
            let allData = [...excelData, ...pv];
            const uniqueData = allData.filter((item, index) => {
                return allData.findIndex((obj) => obj.id === item.id) === index;
            });
            return uniqueData
        });
    }

    // On file select
    const handleFile = (selectedFile) => {
        if(selectedFile&&fileTypes.includes(selectedFile.type)){
            setTypeError(null);
            setExcelFileName(selectedFile.name)
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
              setExcelFile(e.target.result);
              handleFileShow(e.target.result)
            }
        } else{
            setTypeError('Please select only excel file types');
            setExcelFile(null);
        }
    }

    function selectFiles() {
        fileInputRef.current.click()
    }
    function onFileSelect(event) {
        const selectedFile = event.target.files[0];
        if(selectedFile){
            handleFile(selectedFile)
        }
        else{
          console.log('Please select your file');
          return;
        }
    }
    function onDragOverHandle(e){
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = "copy";
    }
    function onDragLeaveHandle(e){
        e.preventDefault();
        setIsDragging(false);
    }
    function onDropHandle(e){
        e.preventDefault();
        setIsDragging(false);
        const selectedFile = e.dataTransfer.files[0];
        if(selectedFile){
            handleFile(selectedFile)
        }
        else{
          console.log('Please select your file');
          return;
        }
    }

    function handleReset(){
        setExcelFile(null)
        setExcelData(null)
        setExcelFileName('')
    }

    return(
        <div className={classes.container}>           
            <h4> Upload Excel </h4>
            {!file ?
                <div className={classes.card}>
                    <div className={classes.drag_area} onDragOver={onDragOverHandle}
                        onDragLeave={onDragLeaveHandle}  onDrop={onDropHandle}>
                        { isDragging ? 
                        (<span className={classes.select}> Drop files here </span>)
                        : 
                        (
                            <>
                            <div className={classes.drag_button_text}>
                                <button  onClick={selectFiles} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                        viewBox="0 0 24 24" fill="none" stroke="#3179BE" strokeWidth="2.5" 
                                        strokeLinecap="butt" strokeLinejoin="bevel">
                                        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/>
                                    </svg>
                                    &nbsp; Upload FSD / Template
                                </button>
                            </div>
                            <p className={classes.drag_text}>or drag & drop them in this box. </p>                   
                            </>
                        )
                        }
                        <input name='file' type='file' className='file' ref={fileInputRef}
                        onChange={onFileSelect} />
                    </div>


                </div>
                :
                <div className={classes.card+' '+classes.cp_card_after_upload}>
                    <div className={classes.cp_after_file_upload}>
                        <div className={classes.cp_image_after_upload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                                <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M30.334 47.6693H21.6673C13.4968 47.6693 9.41048 47.6693 6.87332 45.1299C4.33398 42.5928 4.33398 38.5064 4.33398 30.3359V21.6693C4.33398 13.4988 4.33398 9.41244 6.87332 6.87527C9.41048 4.33594 13.5185 4.33594 21.7323 4.33594C23.0453 4.33594 24.0961 4.33594 24.9823 4.37277C24.9541 4.5461 24.939 4.7216 24.939 4.90144L24.9173 11.0418C24.9173 13.4186 24.9173 15.5203 25.1448 17.2124C25.3918 19.0476 25.9573 20.8828 27.4566 22.3821C28.9516 23.8771 30.789 24.4448 32.6241 24.6918C34.3163 24.9193 36.418 24.9193 38.7948 24.9193H47.5742C47.6673 26.0763 47.6673 27.4976 47.6673 29.3891V30.3359C47.6673 38.5064 47.6673 42.5928 45.128 45.1299C42.5908 47.6693 38.5045 47.6693 30.334 47.6693Z" fill="#099D58"/>
                                <path d="M24.9396 4.89625L24.918 11.0387C24.918 13.4156 24.918 15.5151 25.1455 17.2094C25.3925 19.0446 25.958 20.8797 27.4573 22.3769C28.9523 23.8741 30.7896 24.4417 32.6248 24.6887C34.317 24.9162 36.4186 24.9162 38.7955 24.9162H47.5748C47.603 25.2521 47.6225 25.6117 47.6355 25.9996H47.668C47.668 25.4189 47.668 25.1286 47.6463 24.7862C47.4794 22.7274 46.7626 20.7511 45.5706 19.0641C45.367 18.7867 45.2283 18.6221 44.9531 18.2906C43.235 16.2366 40.973 13.6756 39.0013 11.9162C37.2463 10.3476 34.8391 8.63375 32.7396 7.23192C30.937 6.02942 30.0356 5.42708 28.7985 4.97858C28.4386 4.85054 28.0727 4.73991 27.7021 4.64708C26.8701 4.44125 26.0598 4.36975 24.918 4.34375L24.9396 4.89625Z" fill="#099D58"/>
                            </svg>
                        </div>
                        <div className={classes.cp_filename_after_upload}> 
                            <span> {excelFileName} </span>
                            <button onClick={handleReset} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.55912 3.56498C3.64702 3.4771 3.76623 3.42774 3.89052 3.42774C4.01482 3.42774 4.13403 3.4771 4.22193 3.56498L5.9999 5.34295L7.77787 3.56498C7.82111 3.52021 7.87283 3.4845 7.93002 3.45993C7.98721 3.43536 8.04872 3.42243 8.11096 3.42189C8.1732 3.42135 8.23493 3.43321 8.29253 3.45678C8.35014 3.48035 8.40248 3.51516 8.44649 3.55917C8.4905 3.60318 8.52531 3.65552 8.54888 3.71313C8.57245 3.77073 8.58431 3.83246 8.58377 3.8947C8.58323 3.95694 8.57029 4.01845 8.54573 4.07564C8.52116 4.13283 8.48545 4.18455 8.44068 4.22779L6.66271 6.00576L8.44068 7.78373C8.52607 7.87214 8.57332 7.99054 8.57225 8.11345C8.57118 8.23635 8.52188 8.35392 8.43497 8.44083C8.34806 8.52774 8.23049 8.57704 8.10759 8.57811C7.98468 8.57918 7.86628 8.53193 7.77787 8.44654L5.9999 6.66857L4.22193 8.44654C4.13352 8.53193 4.01512 8.57918 3.89221 8.57811C3.76931 8.57704 3.65174 8.52774 3.56483 8.44083C3.47792 8.35392 3.42862 8.23635 3.42755 8.11345C3.42648 7.99054 3.47373 7.87214 3.55912 7.78373L5.33709 6.00576L3.55912 4.22779C3.47124 4.13989 3.42188 4.02068 3.42188 3.89639C3.42188 3.77209 3.47124 3.65288 3.55912 3.56498Z" fill="#FFEDEB"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            }
            
            <br />

            {typeError && <p className={classes.error_msg}>{typeError}</p>}
        </div>
    )
}