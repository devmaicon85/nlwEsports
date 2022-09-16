import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { MagnifyingGlassPlus, X } from "phosphor-react";
import { LabelValue } from "./LabelValue";
import { CreateAdBanner } from "./CreateAdBannerl";
import { CreateAdModal } from "./CreateAdModal";
import Image from "next/image";
import { Game } from "pages/home";
import axios from '@/lib/axios';

interface Props {
    gameSelected: Game | undefined;
}

interface Ads {
    id: string;
    name: string;
    weekDays: string[];
    useVoiceChannel: boolean;
    yearsPlaying: number;
    hourStart: string;
    hourEnd: string;
}

export function GameAdsModal({ gameSelected }: Props) {
    const [ads, setAds] = useState<Ads[]>([]);

    useEffect(() => {
        if (!gameSelected) return;

        axios(`/games/${gameSelected.id}/ads`).then(
            (response) => {
                setAds(response.data);
            }
        );
    }, [gameSelected]);

    if (!gameSelected) return <></>;

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 " />
            <Dialog.Content className="w-full h-full md:w-[80%] max-w-5xl md:max-h-[500px]  md:h-[80%] grid md:rounded-md grid-rows-[80px_minmax(100px,_1fr)] m-auto  bg-[#2a2634] shadow-2xl shadow-black/50 fixed py-6 rounded-lg px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-start justify-between ">
                    <div>
                        <Dialog.Title className="text-3xl font-black text-white">
                            {gameSelected.title}
                        </Dialog.Title>
                        <Dialog.Description className="mb-8 text-sm">
                            Conecte-se e comece a jogar!
                        </Dialog.Description>
                    </div>
                    <Dialog.Close>
                        <X />
                    </Dialog.Close>
                </div>

                <main className="min-h-[100px] grid grid-cols-[1fr]  px-0  md:grid-cols-[1fr_1fr] overflow-auto">
                    <div className="flex items-center justify-center mb-3 rounded-xl md:overflow-hidden">
                        <div className="flex justify-center w-full h-full p-4 m-4">
                            <Image src={gameSelected.bannerUrl} alt="" width={300} height={400} objectFit="contain" />
                        </div>
                    </div>
                    <div className="md:overflow-auto">
                        {ads.length === 0 && (
                            <LabelValue label="Nenhum anúncio encontrado">
                                Nenhum jogador interessado messe jogo no momento
                            </LabelValue>
                        )}

                        {ads.map((ad) => {
                            return (
                                <div
                                    key={ad.id}
                                    className={
                                        "bg-zinc-900 rounded-2xl p-4 m-4"
                                    }
                                >
                                    <LabelValue label="Name">
                                        {ad.name}
                                    </LabelValue>
                                    <LabelValue label="Tempo de Jogo">
                                        {ad.yearsPlaying} ano(s)
                                    </LabelValue>
                                    <LabelValue label="Disponibilizade">
                                        {ad.weekDays.length} dia(s) -{" "}
                                        {ad.hourStart} - {ad.hourEnd}
                                    </LabelValue>
                                    <LabelValue label="Chamada de áudio">
                                        <span
                                            className={`${
                                                ad.useVoiceChannel
                                                    ? "text-green-700"
                                                    : "text-red-700"
                                            }`}
                                        >
                                            {ad.useVoiceChannel ? "Sim" : "Não"}
                                        </span>
                                    </LabelValue>
                                </div>
                            );
                        })}
                    </div>
                </main>

                <footer className="flex flex-col items-end justify-between gap-4 mt-2 ">
                    <Dialog.Root>
                        <div className="self-stretch w-full h-1 mt-4 bg-nlw-gradient"></div>

                        <div className="bg-[#2A2634] px-2 sm:px-4 grid  w-full gap-2 sm:grid-cols-2  ">
                            <div className="flex flex-col flex-1">
                                <strong className="block text-xl font-black text-white sm:text-xl">
                                    Não encontrou seu duo?
                                </strong>
                                <span className="font-normal text-[#A1A1AA] text-sm">
                                    Publique um anúncio para encontrar novos
                                    players!
                                </span>
                            </div>
                            <div className="flex justify-end flex-auto ">
                                <Dialog.Trigger className="flex items-center justify-center h-10 gap-3 px-2 text-white rounded-md w-36 hover:bg-violet-600 bg-violet-500">
                                    <MagnifyingGlassPlus size={20} /> Anunciar
                                </Dialog.Trigger>
                            </div>
                        </div>

                        <CreateAdModal gameId={gameSelected.id} />
                    </Dialog.Root>
                </footer>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
