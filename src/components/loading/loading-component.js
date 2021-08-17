import ContentLoader from "react-content-loader"
import React from 'react'

export const TableLoading = () => {

    return (<ContentLoader
        speed={2}
        width={"100%"}
        height={400}
        viewBox="0 0 100% 400"
        backgroundColor="#c2c2c2"
        foregroundColor="#ecebeb"

    >
        {/* {console.log(arr.map((_,i) => ( <rect x="-33" y={i*35} rx="3" ry="3" width="634" height="20" /> )))} */}
        {Array.apply(null, Array(20)).map((val, idx) => (<rect x="-33" y={idx * 40} rx="3" ry="3" width="100%" height="30" />))}



    </ContentLoader>
    )
};

export const GalleryLoading = () => {
    return (
        <ContentLoader viewBox="0 0 1360 175"
            backgroundColor="#c2c2c2"
            foregroundColor="#ecebeb"
            height={175} width={1360} >
            <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />

        </ContentLoader>
    )
}
export const InfoPurchaseOrderLoader = () => (
    <ContentLoader
        speed={2}
        width={"100%"}
        height={400}
        viewBox="0 0 100% 400"
        backgroundColor="#c2c2c2"
        foregroundColor="#ecebeb"

    >
        {Array.apply(null, Array(15)).map((val, idx) => (<rect x="-33" y={idx * 20} rx="3" ry="3" width="100%" height="18" />))}



    </ContentLoader>
)
export const InfoOrderLoader = (props) => (
    <ContentLoader
        speed={2}
        width={"100%"}
        height={400}
        viewBox="0 0 100% 400"
        backgroundColor="#c2c2c2"
        foregroundColor="#ecebeb"

    >
        {Array.apply(null, Array(props.row)).map((val, idx) => (<rect x="-33" y={idx * 20} rx="3" ry="3" width="100%" height="18" />))}



    </ContentLoader>
)