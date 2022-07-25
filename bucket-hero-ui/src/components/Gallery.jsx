import GalleryListItems from "./GalleryListItems";
import { useGallContext } from "../contexts/gallery";

export default function Gallery({}) {
    const {gallery} = useGallContext();

    return (
        <div className='flex flex-col items-center'>
            <div className="w-full px-12">
                <h3 className="text-2xl font-semibold">Gallery</h3>
                <p>Gain items to put on your own list and gain inspiration!</p>
            </div>
            <div className="w-3/4 mt-4">
                {
                    gallery.map((item) => {
                    return <GalleryListItems item={item} />
                    })
                }
            </div>
            
        </div>
    );
}