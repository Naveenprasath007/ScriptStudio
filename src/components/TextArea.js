import React, { useState, useEffect, useRef } from 'react';
import "./Hidebar.css"
import TextEditor from './TextEditor'


const TextAreaComponent = ({ initialTexts,Text }) => {
  const [textAreas, setTextAreas] = useState(
    initialTexts.map((text, index) => ({
      id: index + 1,
      value: text,
      isChecked: false,
      isEditable: false
    }))
  );



  const scrollContainer = useRef(null);

  useEffect(() => {
    setTextAreas(
      initialTexts.map((text, index) => ({
        id: index + 1,
        value: text,
        isChecked: false,
        isEditable: false
      }))
    );
  }, [initialTexts]);

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollLeft += scrollOffset;
  };
  const toggleEditable = (id) => {
    setTextAreas(textAreas.map(ta => 
    ta.id === id ? { ...ta, isEditable: !ta.isEditable } : ta
    ));
};

const handleCheckboxChange = (id) => {
    setTextAreas(textAreas.map(ta => 
    ta.id === id ? { ...ta, isChecked: !ta.isChecked } : ta
    ));
};

const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
};

const handleChange = (id, value) => {
    setTextAreas(textAreas.map(ta => 
    ta.id === id ? { ...ta, value: value } : ta
    ));
};

const handleSubmit = () => {
    const isAnyChecked = textAreas.some(ta => ta.isChecked);
    if (!isAnyChecked) {
    alert("At least one checkbox must be selected.");
    return;
    }
};
if (Text) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <button onClick={() => scroll(-150)} className="text-lg bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow">
          &#11164;
        </button>
        <div className="flex overflow-x-auto space-x-4 hide-scrollbar" ref={scrollContainer}>
          {textAreas.map(textArea => (
            <div key={textArea.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-80 h-auto">
              <div className="flex justify-between items-center px-5 py-3 bg-indigo-500 text-white">
                <h3 className="text-xl font-semibold">Content {textArea.id}</h3>
                <input 
                  type="checkbox" 
                  checked={textArea.isChecked}
                  onChange={() => handleCheckboxChange(textArea.id)}
                  className="form-checkbox h-5 w-5 text-yellow-400"
                />
              </div>
              <textarea
                className={`w-full resize-none p-4 border-dotted border-2 text-justify focus:outline-none ${textArea.isEditable ? '' : 'bg-gray-100'}`}
                value={textArea.value}
                onChange={(e) => handleChange(textArea.id, e.target.value)}
                readOnly={!textArea.isEditable}
                rows={8}                
              />
              <div className="flex justify-end space-x-2 px-4 py-3 bg-gray-100">

                <button
                  className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 rounded"
                  onClick={() => toggleEditable(textArea.id)}
                >
                  {textArea.isEditable ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                  </svg> }
                </button>

                <TextEditor
                initialValue={textArea.value}
                />

                <button
                  className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-2 rounded"
                  onClick={() => handleCopy(textArea.value)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>
                </button>

              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll(150)} className="text-lg bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow">
          &#11166;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-semibold py-2 px-6 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
};

export default TextAreaComponent;
