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

                <div className="justify-end flex-1 hidden text-white w-44 sm:flex ">
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
                            <div className="flex border-4 min-w-[80px] min-h-[80px] border-transparent rounded-full select-none hover:border-dark-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                {session?.user?.image ? (
                                    <Image
                                        className="border-2 rounded-full hover:border-dark-brand-primary"
                                        src={session?.user?.image}
                                        alt="Usuário"
                                        width={80}
                                        height={80}
                                    />
                                ) : (
                                    // <FaUserCircle className="w-8 h-8 opacity-40" />
                                    <div className="flex items-center justify-center w-8 h-8 m-1 font-serif font-semibold text-white rounded-full bg-dark-brand-primary">
                                        {session.user.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>
                            {/* <div>{session?.user.name}</div> */}
                            <div className="flex justify-center">
                                <button onClick={Logoff}>Sair</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
