import React from "react";
import { GalleryPage } from "./gallery-page";
import { UploadPage } from "./upload-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GalleryPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}