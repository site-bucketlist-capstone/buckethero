import Logo from "../assets/BH.png";

export default function Footer() {
    return (
        <div className="w-full mt-24 py-4 sm:py-0 sm:flex sm:flex-row sm:justify-around bg-orange-500 sm:h-36">
            <div className=" sm:w-1/3  flex flex-col my-auto">
                <p className="text-center text-white">@ 2022 BucketHero, Inc.</p>
                <p className="text-center text-white">All Rights Reserved</p>
            </div>
            {/* <img
                alt="Workflow"
                className="w-full h-full"
                src={Logo}
            /> */}
            <div className="mt-4 sm:mt-0 flex flex-col justify-center">
                <h1 className="text-center text-white font-extrabold mb-3">Created By</h1>
                <div className="flex flex-row justify-around">
                    <div className="sm:ml-10 sm:mr-10 text-white">
                        <p>Amantina</p>
                        <p className="text-center">Rossi</p>
                    </div>
                    <div className="sm:ml-10 sm:mr-10 text-white">
                        <p>Hawo</p>
                        <p className="text-center">Issa</p>
                    </div>
                    <div className="sm:ml-10 sm:mr-10 text-white">
                        <p>Abdullah</p>
                        <p className="text-center">Saleh</p>
                    </div>
                </div> 
            </div> 
            <div className="mt-4 sm:mt-0 sm:w-1/3 text-center flex flex-col justify-center"> 
                <h1 className="text-center text-white font-extrabold mb-5">Check us out on GitHub!</h1>
                <a href="https://github.com/site-bucketlist-capstone/buckethero" target="_blank" className="text-2xl ">
                    <ion-icon className="" size="large" name="logo-github" style={{color:"white"}}></ion-icon>
                </a>
            </div>
        </div>
    )
}