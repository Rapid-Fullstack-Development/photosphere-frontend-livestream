import React from "react";
import { GalleryPage } from "./gallery-page";
import { UploadPage } from "./upload-page";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Link to="/">Home</Link>
                    &nbsp;|&nbsp;
                    <Link to="/upload">Upload</Link>
                </div>
                <Routes>
                    <Route path="/" element={<GalleryPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}