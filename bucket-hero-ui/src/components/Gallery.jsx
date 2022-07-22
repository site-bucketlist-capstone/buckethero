import GalleryListItems from "./GalleryListItems";
import { useGallContext } from "../contexts/gallery";

export default function Gallery({}) {
    const {gallery} = useGallContext();

    return (
        <div className=''>
            <h3>Gallery</h3>
            <p>Gain items to put on your own list and gain inspiration!</p>
            {
                gallery.map((item) => {
                   return <GalleryListItems item={item} />
                })
            }
        </div>
    );
}