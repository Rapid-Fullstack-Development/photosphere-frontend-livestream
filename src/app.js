import { Gallery } from "./gallery";
import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:3000";

//
// Uncomment this for the full gallery test data.
//
// let gallery = require("./gallery.json");

// gallery = gallery.map(item => {
//     return {
//         thumb: item.urls.thumb,
//         width: item.width,
//         height: item.height,
//     };
// });

//
// Uncomment this for a single item in the gallery.
//
// const gallery = [
//     {
//         thumb: "https://via.placeholder.com/140x100",
//         width: 140,
//         height: 100,
//     },
// ];

//
// Uncomment this for three items in the gallery.
//
// const gallery = [
//     {
//         thumb: "https://via.placeholder.com/240x200",
//         width: 240,
//         height: 200,
//     },
//     {
//         thumb: "https://via.placeholder.com/220x200",
//         width: 220,
//         height: 200,
//     },
//     {
//         thumb: "https://via.placeholder.com/230x200",
//         width: 230,
//         height: 200,
//     },
// ];

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {

        const response = await axios.get(`${BASE_URL}/assets`);

        this.setState({
            items: response.data.assets,
        });
    }

    render() {
        return (
            <Gallery 
                galleryWidth={600}
                targetRowHeight={200}
                items={this.state.items}
                />
        );
    }
}