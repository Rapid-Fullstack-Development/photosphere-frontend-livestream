import React from "react";
import { GalleryPage } from "./gallery-page";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <GalleryPage />
        );
    }
}