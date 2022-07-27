import GalleryListItems from "./GalleryListItems";
import GalleryNewItem from "./GalleryNewItem";
import { useGallContext } from "../contexts/gallery";

import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function Gallery({}) {
    const {gallery, gallModal, setGallModal, success} = useGallContext();
    //gallery page renders items for user to add to their bucket lists
    return (
        <div className='flex flex-col items-center mt-6'>
            <div className="w-full px-12 sm:flex sm:flex-row items-end justify-between">
                <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-semibold">Gallery</h3>
                    <p>Gain items to put on your own list and gain inspiration!</p>
                </div>
                <p className="text-lime-500 font-semibold text-center sm:text-left">{success}</p>
            </div>
            <div className="sm:w-3/4 mt-4">
                {
                    gallery.map((item) => {
                    return <GalleryListItems key={item.id} item={item} />
                    })
                }
            </div>
            {gallModal.open ? <GalleryNewItem/> : null}
           
            
        </div>
    );
}