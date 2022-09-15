import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:3000";

//
// Loads a file to a data URL.
//
function loadFile(file) { 
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('error', () => {
            reject(new Error(`Error reading file ${file.name}.`));
        });

        reader.addEventListener('load', evt => {
            resolve(evt.target.result)
        });            
        
        reader.readAsDataURL(file);
    });
}

//
// Loads URL or source data to an image element.
//
function loadImage(imageSrc) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.src = imageSrc;
    });
}

//
// Gets the size of an image element.
//
async function getImageResolution(imageSrc) {
    const image = await loadImage(imageSrc);
    return {
        width: image.width,
        height: image.height,
    };
}

export class UploadPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    onFilesChanged = files => {
        this.setState({
            files: Array.from(files),
        });
    };

    onUploadFiles = async () => {
        for (const file of this.state.files) {

            const imageData = await loadFile(file);
            const imageResolution = await getImageResolution(imageData);

            console.log(`Upload file ${file.name} (${imageResolution.width}x${imageResolution.height})`);

            await axios.post(`${BASE_URL}/asset`, file, {
                headers: {
                    "file-name": file.name,
                    "content-type": file.type,
                    "width": imageResolution.width,
                    "height": imageResolution.height,
                },
            });
            
            console.log(`...uploaded file ${file.name}.`);
        }
    };

    render() {
        return (
            <div>
                <p>Click the button and choose files to upload</p>
                <input
                    type="file"
                    multiple={true}
                    onChange={evt => this.onFilesChanged(evt.target.files)}
                    />

                {this.state.files !== undefined
                    && <div>
                        <h2>File to upload:</h2>
                        {this.state.files.map(file => {
                            return (
                                <div key={file.name}>
                                    {file.name}
                                </div>
                            )
                        })}

                        <button onClick={this.onUploadFiles}>Upload</button>
                    </div>
                }
            </div>
        );
    }
}