import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import axios from "../lib/axios";
import Image from "next/image";
import { GameImage } from "@/components/GameImage";
import { BannerHome } from "@/components/BannerHome";
import { GameModal } from "@/components/GameModal";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import { games } from "@/lib/api/public/games";
import { GetServerSideProps } from "next";

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}

interface Props {
    games: Game[];
}

function Home({ games }: Props) {
    // const [games, setGames] = useState<Game[]>([]);
    const [gameSelected, setGameSelected] = useState<Game>();

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            breakpoints: {
                "(min-width: 200px)": {
                    slides: { perView: 2.2, spacing: 5 },
                },
                "(min-width: 400px)": {
                    slides: { perView: 2.5, spacing: 5 },
                },
                "(min-width: 600px)": {
                    slides: { perView: 3.5, spacing: 5 },
                },
                "(min-width: 800px)": {
                    slides: { perView: 4.5, spacing: 5 },
                },
                "(min-width: 1000px)": {
                    slides: { perView: 5.5, spacing: 10 },
                },
                "(min-width: 1200px)": {
                    slides: { perView: 6.5, spacing: 10 },
                },
            },
            mode: "free",
            slides: { origin: "center", perView: 5.5, spacing: 10 },
            // range: {
            //     min: 1,
            //     max: 100,
            //     align: true,
            // },
        },
        [
            // add plugins here
        ]
    );

    // useEffect(() => {
    //     axios("/games").then((response) => {
    //         setGames(response.data);
    //     });
    // }, []);

    if (!games) return <></>;
    return (
        <div className="bg-[#121214] bg-galaxy bg-[length:100%] md:bg-cover bg-no-repeat bg-top w-full min-h-screen">
            <div className="max-w-[1344px] mx-auto px-4 sm:px-8 md:px-10 flex items-center flex-col my-10 mb-20">
                <Image
                    src="/assets/logo.png"
                    width={300}
                    height={200}
                    objectFit="contain"
                    alt=""
                />

                <h1 className="my-5 text-3xl font-black text-white md:text-5xl lg:text-6xl ">
                    Seu{" "}
                    <span className="text-transparent bg-nlw-gradient bg-clip-text">
                        duo
                    </span>{" "}
                    está aqui.
                </h1>

                <div ref={sliderRef} className="keen-slider">
                    {games.map((game) => (
                        <div key={game.id} className="keen-slider__slide">
                            <GameImage
                                bannerUrl={game.bannerUrl}
                                title={game.title}
                                adsCount={game._count.ads}
                                handleClick={() => setGameSelected(game)}
                            />
                        </div>
                    ))}
                </div>
                <BannerHome />

                <Dialog.Root
                    open={!!gameSelected?.id}
                    onOpenChange={() => setGameSelected(undefined)}
                >
                    <GameModal gameSelected={gameSelected}  />
                </Dialog.Root>
            </div>
        </div>
    );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const host = `http://${ctx.req.headers.host}/api/games`;
        const games = (await axios.get(`${host}`)).data;

        return {
            props: {
                games: JSON.parse(JSON.stringify(games)),
            },
        };
    } catch (error) {
        console.log(
            "🚀 ~ file: home.tsx ~ line 126 ~ constgetServerSideProps:GetServerSideProps= ~ error",
            error
        );
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};
