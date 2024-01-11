import {useEffect, useState } from "react";
import axios from 'axios';
// import TextEditor from "./Texteditor";
function Script()
{

  const [id, setId] = useState('');
  const [prompt, setPrompt] = useState("");
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [para3, setPara3] = useState("");
  const [para4, setPara4] = useState("");
  const [para5, setPara5] = useState("");
  const [scripts, setScripts] = useState([]);


useEffect(() => {
  (async () => await Load())();
  }, []);
  
  
  async function  Load()
  {
     const result = await axios.get(
         "http://127.0.0.1:8000/script");
         setScripts(result.data);
         console.log(result.data);
  }
    
  
 async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://127.0.0.1:8000/script",
        {
        
          prompt: prompt,
          paragraph1: para1,
          paragraph2: para2,
          paragraph3: para3,
          paragraph4: para4,
          paragraph5: para5,
        
        });
          alert("Script Save Successfully");
          setPrompt("");
          setPara1("");
          setPara2("");
          setPara3("");
          setPara4("");
          setPara5("");
          Load();

      
        
        }
    catch(err)
        {
          alert("Script Save Failed");
        }
   }



   async function editStudent(scripts)
   {
    setPrompt(scripts.prompt);
    setPara1(scripts.paragraph1);
    setPara2(scripts.paragraph2);
    setPara3(scripts.paragraph3);
    setPara4(scripts.paragraph4);
    setPara5(scripts.paragraph5);
    setId(scripts.id)
   }
   async function DeleteScript(id)
   {
      
        await axios.delete("http://127.0.0.1:8000/script/" + id);
        alert("Script deleted Successfully");
        setId("");
        setPara1("");
        setPara2("");
        setPara3("");
        setPara4("");
        setPara5("");
        Load();
  
  
   }
   async function update(event)
   {
    event.preventDefault();
   try
       {
        // console.log(scripts.find(u => u.id === id).id || id)
        await axios.put("http://127.0.0.1:8000/script/"+ scripts.find(u => u.id === id).id || id,
       {
        prompt: prompt,
        paragraph1: para1,
        paragraph2: para2,
        paragraph3: para3,
        paragraph4: para4,
        paragraph5: para5,
       });
         alert("Script Updated");
         setId("");
         setPara1("");
         setPara2("");
         setPara3("");
         setPara4("");
         setPara5("");
         Load();
      
       }
   catch(err)
       {
         alert(" Script updated Failed");
         console.log(err)
       }
  }
  return (
    <div>
       <h1>Script Details</h1>
       {/* <TextEditor /> */}
       <div>
          {/* <InputWithButton /> */}
       </div>
       <div class="container" >
          <form>
              <div class="form-group">

               <label>Script prompt</label>
                <input  type="text" class="form-control" id="prompt"
                value={prompt}
                onChange={(event) =>
                  {
                    setPrompt(event.target.value);      
                  }}
                />
              </div>

              <div class="form-group">
                <label>para1</label>
                <input  type="text" class="form-control" id="para1"
                 value={para1}
                  onChange={(event) =>
                    {
                     setPara1(event.target.value);      
                    }}
                />
              </div>
              <div class="form-group">
                <label>para2</label>
                <input type="text" class="form-control" id="para2"
                  value={para2}
                onChange={(event) =>
                  {
                    setPara2(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>para3</label>
                <input type="text" class="form-control" id="para3"
                  value={para3}
                onChange={(event) =>
                  {
                    setPara3(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>para4</label>
                <input type="text" class="form-control" id="para4"
                  value={para4}
                onChange={(event) =>
                  {
                    setPara4(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>para5</label>
                <input type="text" class="form-control" id="para5"
                  value={para5}
                onChange={(event) =>
                  {
                    setPara5(event.target.value);      
                  }}
                />
              </div>
                 <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Save</button> 
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>  

              
            </form>
          </div>




<div className="container" style={{ marginTop: "0%"}}>
<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Script Id</th>
      <th scope="col">Script Prompt</th>
      <th scope="col">Para1</th>
      <th scope="col">Para2</th>
      <th scope="col">Para3</th>
      <th scope="col">Para4</th>
      <th scope="col">Para5</th>


      <th scope="col">Option</th>
    </tr>
  </thead>
       {scripts.map(function fn(script)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{script.id} </th>
                <td>{script.prompt}</td>
                <td>{script.paragraph1}</td>
                <td>{script.paragraph2}</td> 
                <td>{script.paragraph3}</td>  
                <td>{script.paragraph4}</td>     
                <td>{script.paragraph5}</td>        
   
      
       
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(script)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteScript(script.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
            </div>
       </div>
            );
        }
export default Script;