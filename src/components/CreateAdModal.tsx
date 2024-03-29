import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Select } from "@radix-ui/react-select";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "@/lib/axios";
import { Game } from "../pages/home";
import { Router, useRouter } from "next/router";
import { Label } from "./Form/Label";
import { useSession } from "next-auth/react";
import { ToggleGroupItem } from "./Form/ToggleGroupItem";
import { toast } from "react-toastify";

interface Props {
    game: Game;
    handleClose: () => void;
}
export function CreateAdModal({ game, handleClose }: Props) {
    // const [games, setGames] = useState<Game[]>([]);
    const { data: session, status } = useSession();
    const [weekDays, SetWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [userName, setUserName] = useState<string>(session?.user.name || "");
    const [userDiscord, setUserDiscord] = useState<string>(
        session?.user.username || ""
    );

    const router = useRouter();
    // useEffect(() => {
    //     axios("/games").then((response) => {
    //         setGames(response.data);
    //     });
    // }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const data = Object.fromEntries(formData);

        // console.log("enviando....", data);
        // console.log("weekDays....", weekDays);
        // console.log("useVoiceChannel....", useVoiceChannel);

        if (!data.name) {
            return toast.error("Informe seu Nome");
        }

        if (!data.discord) {
            return toast.error("Informe seu Discord");
        }
        if (weekDays.length === 0) {
            return toast.error("Selecione pelo menos um dia");
        }

        if (data.hourStart === "" || data.hourEnd === "") {
            return toast.error("Informe um horário disponível");
        }

        try {
            await axios.post(`/games/${game.id}/ads`, {
                name: data.name,
                discord: data.discord,
                weekDays: weekDays.map(String),
                useVoiceChannel: useVoiceChannel,
                yearsPlaying: Number(data.yearsPlaying),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
            });

            toast.success("Anúncio criado com sucesso");
            router.push("/home");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Erro ao criar anúncio. Tente novamente mais tarde");
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60" />
            <Dialog.Content className="bg-[#2a2634] shadow-2xl shadow-black/50   fixed py-8 max-w-[480px] w-full rounded-lg px-4 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={handleCreateAd} className="flex flex-col gap-4">
                    <main className="flex flex-col max-h-[60vh] gap-4 overflow-auto">
                        <Dialog.Title className="text-sm font-black text-white sm:text-base ">
                            Publique seu anúncio
                            <div className="text-3xl font-black text-transparent bg-nlw-gradient bg-clip-text">
                                {game.title}
                            </div>
                        </Dialog.Title>

                        <div className="mr-4">
                            <div className="flex flex-col gap-2 my-3">
                                <Label htmlFor="name">
                                    Seu nome (ou nickname)?
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Como te chamam dentro do game?"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 my-3 lg:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="yearsPlaying">
                                        <span className="truncate">
                                            Joga há quantos anos?
                                        </span>
                                    </Label>
                                    <Input
                                        name="yearsPlaying"
                                        id="yearsPlaying"
                                        type="number"
                                        placeholder="Tudo bem ser Zero"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="discord">
                                        Qual seu Discord?
                                    </Label>
                                    <Input
                                        id="discord"
                                        name="discord"
                                        type="text"
                                        placeholder="Usuario#0000"
                                        value={userDiscord}
                                        onChange={(e) =>
                                            setUserDiscord(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2 my-3">
                                    <Label htmlFor="weekDays">
                                        Disponibilidade para jogar?
                                    </Label>
                                    <ToggleGroup.Root
                                        onValueChange={SetWeekDays}
                                        value={weekDays}
                                        type="multiple"
                                        className={`grid grid-cols-7 text-xs`}
                                    >
                                        <ToggleGroupItem
                                            name="Dom"
                                            value="Dom"
                                            title="Domingo"
                                            selected={
                                                weekDays.includes("Dom") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Seg"
                                            value="Seg"
                                            title="Segunda"
                                            selected={
                                                weekDays.includes("Seg") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Ter"
                                            value="Ter"
                                            title="Terça"
                                            selected={
                                                weekDays.includes("Ter") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Qua"
                                            value="Qua"
                                            title="Quarta"
                                            selected={
                                                weekDays.includes("Qua") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Qui"
                                            value="Qui"
                                            title="Quinta"
                                            selected={
                                                weekDays.includes("Qui") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Sex"
                                            value="Sex"
                                            title="Sexta"
                                            selected={
                                                weekDays.includes("Sex") && true
                                            }
                                        />

                                        <ToggleGroupItem
                                            name="Sáb"
                                            value="Sab"
                                            title="Sábado"
                                            selected={
                                                weekDays.includes("Sab") && true
                                            }
                                        />
                                    </ToggleGroup.Root>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 gap-2 my-3">
                                <Label htmlFor="hourStart">
                                    Qual horário do dia?
                                </Label>

                                <div className="grid grid-cols-2 gap-2 ">
                                    <Input
                                        id="hourStart"
                                        name="hourStart"
                                        type="time"
                                        placeholder="De"
                                    />
                                    <Input
                                        id="hourEnd"
                                        name="hourEnd"
                                        type="time"
                                        placeholder="Até"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 mx-2 my-5 mt-6 text-xs text-white md:text-sm">
                                <Checkbox.Root
                                    checked={useVoiceChannel}
                                    onCheckedChange={(checked) => {
                                        if (checked === true) {
                                            setUseVoiceChannel(true);
                                        } else {
                                            setUseVoiceChannel(false);
                                        }
                                    }}
                                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                                >
                                    <Checkbox.Indicator>
                                        <Check className="w-4 h-4 text-emerald-300" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>{" "}
                                Costumo me conectar ao chat de voz
                            </label>
                        </div>
                    </main>
                    <footer className="grid grid-cols-1 gap-2 mt-4 sm:gap-4 sm:grid-cols-2">
                        <Dialog.Close
                            type="button"
                            className="h-8 px-5 font-semibold rounded-md sm:h-12 bg-zinc-500 hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>

                        <button
                            type="submit"
                            className="flex items-center justify-center h-8 gap-4 px-5 font-semibold rounded-md sm:h-12 bg-violet-500 hover:bg-violet-600"
                        >
                            <GameController size={24} /> Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
