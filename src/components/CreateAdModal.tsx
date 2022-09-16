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

interface Props {
    gameId?: string;
}
export function CreateAdModal({ gameId }: Props) {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, SetWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
        axios("/games").then((response) => {
            setGames(response.data);
        });
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const data = Object.fromEntries(formData);

        // console.log("enviando....", data);
        // console.log("weekDays....", weekDays);
        // console.log("useVoiceChannel....", useVoiceChannel);

        if (!data.game) {
            return alert("game é obrigatório");
        }

        if (!data.name) {
            return alert("name é obrigatório");
        }

        if (!data.discord) {
            return alert("discord é obrigatório");
        }
        if (weekDays.length === 0) {
            return alert("selecione pelo menos um dia");
        }

        try {
            await axios.post(`/games/${data.game}/ads`, {
                name: data.name,
                discord: data.discord,
                weekDays: weekDays.map(Number),
                useVoiceChannel: useVoiceChannel,
                yearsPlaying: Number(data.yearsPlaying),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
            });

            alert("Anúncio criado com sucesso");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar anúncio");
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60" />
            <Dialog.Content className="bg-[#2a2634] shadow-2xl shadow-black/50 fixed py-8 max-w-[480px] w-full rounded-lg px-4 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="text-xl font-black text-white md:text-2xl">
                    Publique um anúncio
                </Dialog.Title>
                <form
                    onSubmit={handleCreateAd}
                    className="flex flex-col gap-4 mt-4"
                >
                    <div className="flex flex-col gap-2">
                        <select
                            defaultValue={gameId}
                            id="game"
                            name="game"
                            hidden
                            className="px-4 py-3 text-base text-white rounded appearance-none bg-zinc-900"
                        >
                            <option value="">
                                Selecione o game que deseja jogar
                            </option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs md:text-base" htmlFor="name">
                            Seu nome (ou nickname)?
                        </label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Como te chamam dentro do game?"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-xs md:text-base"
                                htmlFor="yearsPlaying"
                            >
                                Joga há quantos anos?
                            </label>
                            <Input
                                name="yearsPlaying"
                                id="yearsPlaying"
                                type="number"
                                placeholder="Tudo bem ser Zero"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-xs md:text-base"
                                htmlFor="discord"
                            >
                                Qual seu Discord?
                            </label>
                            <Input
                                id="discord"
                                name="discord"
                                type="text"
                                placeholder="Usuario#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-xs md:text-base"
                                htmlFor="weekDays"
                            >
                                Quando costuma jogar?
                            </label>
                            <ToggleGroup.Root
                                onValueChange={SetWeekDays}
                                value={weekDays}
                                type="multiple"
                                className={`grid grid-cols-7 gap-1 `}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("0")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Domingo"
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("1")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Segunda"
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("2")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Terça"
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("3")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Quarta"
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("4")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Quinta"
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("5")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Sexta"
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    className={`h-8 w-8 rounded-lg  ${
                                        weekDays.includes("6")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                    title="Sabádo"
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                        <label
                            className="text-xs md:text-base"
                            htmlFor="hourStart"
                        >
                            Qual horário do dia?
                        </label>

                        <div className="grid grid-cols-2 gap-2">
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

                    <label className="flex items-center gap-2 mt-2 text-xs text-white md:text-sm">
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

                    <footer className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                        <Dialog.Close
                            type="button"
                            className="h-12 px-5 font-semibold rounded-md bg-zinc-500 hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>

                        <button
                            type="submit"
                            className="flex items-center justify-center h-12 gap-3 px-5 font-semibold rounded-md bg-violet-500 hover:bg-violet-600"
                        >
                            <GameController size={24} /> Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
