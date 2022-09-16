import { Gallery } from "./gallery";
import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

const BASE_URL = process.env.BASE_URL;

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

export class GalleryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            hasMore: true,
        };

        this.containerRef = React.createRef();
    }

    async componentDidMount() {
        this.onResize();

        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);        
    }

    onResize = () => {
        this.setState({
            galleryWidth: this.containerRef.current.clientWidth,
        });
    }

    onLoadMore = async () => {
        const pageSize = 20;
        const response = await axios.get(`${BASE_URL}/assets?skip=${this.state.items.length}&limit=${pageSize}`);
        const items = this.state.items.concat(response.data.assets);

        this.setState({
            items: items,
            loadMore: response.data.assets.length === pageSize,
        });

        console.log(`Loaded ${response.data.assets.length} more assets, now have ${items.length} assets.`);
    };

    render() {
        return (
            <div ref={this.containerRef}>
                <InfiniteScroll
                    hasMore={this.state.hasMore}
                    loadMore={this.onLoadMore}
                    >
                    <Gallery 
                        galleryWidth={this.state.galleryWidth}
                        targetRowHeight={200}
                        items={this.state.items}
                        />
                </InfiniteScroll>
            </div>
        );
    }
}