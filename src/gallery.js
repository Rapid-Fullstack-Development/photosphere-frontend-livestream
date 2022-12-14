import { createLayout } from "./layout";

const BASE_URL = process.env.BASE_URL;

//
// A photo gallery component.
//
export function Gallery({ items, galleryWidth, targetRowHeight }) {

    const rows = createLayout(items, galleryWidth, targetRowHeight);

    return (
        <div
            style={{
                width: `${galleryWidth}px`,
                border: "solid green 1px",
            }}
            >
            {rows.map((row, rowIndex) => {
                return (
                    <div
                        key={rowIndex}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: `${row.height}px`,
                        }}
                        >
                        {row.items.map(item => {
                            return (
                                <img 
                                    key={item.thumb}
                                    src={`${BASE_URL}${item.thumb}`} 
                                    />
                            );
                        })}
                    </div>
                );
            })}

        </div>
    );
}

