import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import axios from "../lib/axios";
import Image from "next/image";
import { GameBanner } from "@/components/GameBanner";
import { BannerHome } from "@/components/BannerHome";
import { GameModal } from "@/components/GameModal";

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}
function Home() {
    const [games, setGames] = useState<Game[]>([]);
    const [gameSelected, setGameSelected] = useState<Game>();

    useEffect(() => {
        axios("/games").then((response) => {
            setGames(response.data);
        });
    }, []);

    return (
        <div className="bg-[#121214] bg-galaxy bg-[100%] md:bg-cover bg-no-repeat bg-top w-full min-h-screen">
            <div className="max-w-[1344px] mx-auto px-4 sm:px-8 md:px-10 flex items-center flex-col my-10 mb-20">
                <Image
                    src="/assets/logo.png"
                    width={300}
                    height={200}
                    objectFit="contain"
                    alt=""
                />

                <h1 className="mt-10 text-3xl font-black text-white md:text-5xl lg:text-6xl ">
                    Seu{" "}
                    <span className="text-transparent bg-nlw-gradient bg-clip-text">
                        duo
                    </span>{" "}
                    está aqui.
                </h1>

                <div className="grid grid-cols-2 gap-6 mt-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {games.map((game) => (
                        <GameBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads}
                            handleClick={() => setGameSelected(game)}
                        />
                    ))}
                </div>
                <BannerHome />

                <Dialog.Root
                    open={!!gameSelected?.id}
                    onOpenChange={() => setGameSelected(undefined)}
                >
                    <GameModal gameSelected={gameSelected} />
                </Dialog.Root>
            </div>
        </div>
    );
}

export default Home;
