import { Check, CheckCircle, MagnifyingGlassPlus, Plus } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

export function CreateAdBanner() {
    return (
        <div className="self-stretch pt-1 mt-8 rounded-t-lg bg-nlw-gradient ">
            <div className="bg-[#2A2634] px-4 sm:px-8 py-6 flex ">
                <div className="flex-col w-full flex-2">
                    <strong className="block text-xl font-black text-white sm:text-2xl">
                        Não encontrou seu duo?
                    </strong>
                    <span className="font-normal text-[#A1A1AA] text-sm sm:text-base">
                        Selecione um jogo, e publique seu anúncio de interesse
                        para encontrar novos players!
                    </span>
                </div>

                <div className="justify-end flex-1 hidden w-44 sm:flex ">
                    <Image
                        src="/assets/logo.png"
                        alt=""
                        width={200}
                        height={100}
                        className="w-auto h-auto   sm:max-w-[150px]"
                    />
                </div>
            </div>
        </div>
    );
}
