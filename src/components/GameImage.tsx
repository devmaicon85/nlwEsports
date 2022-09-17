import Image from "next/image";

interface Props {
    bannerUrl: string;
    title: string;
    adsCount: number;
    handleClick: () => void;
}
export function GameImage({ bannerUrl, title, adsCount, handleClick }: Props) {

    if(!bannerUrl) return <></>
    return (
        <div
            className="relative overflow-hidden rounded-lg hover:cursor-pointer"
            onClick={handleClick}
        >
            <Image src={bannerUrl} alt="" width={300} height={400} objectFit="contain"  />
            <div className="absolute bottom-0 left-0 right-0 w-full px-2 py-2 pt-16 md:pb-4 md:px-4 bg-game-gradient ">
                <strong className="block h-4 overflow-hidden text-sm font-bold text-white truncate md:text-base md:h-6">
                    {title}
                </strong>
                <span className="mt-1 overflow-hidden text-xs truncate text-zinc-300 md:text-sm">
                    {adsCount} anúncios
                </span>
            </div>
        </div>
    );
}
