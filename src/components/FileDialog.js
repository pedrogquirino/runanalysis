import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';

const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};


const FileDialog = () =>{

    return (
        // Disable click and keydown behavior on the <Dropzone>
<Dropzone ref={dropzoneRef} noClick noKeyboard>
  {({getRootProps, getInputProps, acceptedFiles}) => {
    return (
      <div className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <button
            type="button"
            onClick={openDialog}
          >
            Open File Dialog
          </button>
        </div>
        <aside>
          <h4>Arquivo</h4>
          <ul>
            {acceptedFiles.map(file => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }}
</Dropzone>);

}

export default FileDialog;
