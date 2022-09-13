import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:3000";

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
            console.log(`Upload file ${file.name}...`);
            await axios.post(`${BASE_URL}/asset`, file, {
                headers: {
                    "file-name": file.name,
                    "content-type": file.type,
                    "width": 255,
                    "height": 255,
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