import { useGallContext } from "../contexts/gallery";;

export default function Gallery({}) {
    const {gallery} = useGallContext();

    return (
        <div className=''>
            Gallery!
        </div>
    );
}