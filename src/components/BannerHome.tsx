import {
    Check,
    CheckCircle,
    DiscordLogo,
    MagnifyingGlassPlus,
    Plus,
} from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export function BannerHome() {
    const { data: session, status } = useSession();

    function Logoff() {
        signOut({ redirect: true });
    }

    function SignInDiscord() {
        signIn("discord");
    }

    return (
        <div className="self-stretch pt-1 mt-8 rounded-t-lg bg-nlw-gradient ">
            <div className="bg-[#2A2634] px-4 sm:px-8 py-6 grid grid-cols-1 gap-4 ">
                <div className="flex-col w-full flex-2">
                    <strong className="block text-xl font-black text-white sm:text-2xl">
                        Não encontrou seu duo?
                    </strong>
                    <span className="font-normal text-[#A1A1AA] text-sm sm:text-base">
                        Selecione um jogo, e publique seu anúncio de interesse
                        para encontrar novos players!
                    </span>
                </div>

                <div className="justify-end flex-1 text-white w-44 sm:flex ">
                    {!session && (
                        <button
                            onClick={SignInDiscord}
                            type="button"
                            className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                            <DiscordLogo className="mx-2 text-2xl" />
                            Login
                        </button>
                    )}
                    {session && (
                        <div>
                            <div className="flex items-center gap-3 border-4 min-w-[50px] min-h-[50px] border-transparent rounded-full select-none  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                {session?.user?.image ? (
                                    <Image
                                        className="border-2 rounded-full "
                                        src={session?.user?.image}
                                        alt="Usuário"
                                        title={session.user.username}
                                        width={50}
                                        height={50}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center p-2 font-serif text-sm font-semibold text-center text-white text-opacity-50 rounded-full bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                                        {session.user.name}
                                    </div>
                                )}
                                <div>
                                    <button onClick={Logoff}>Sair</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
