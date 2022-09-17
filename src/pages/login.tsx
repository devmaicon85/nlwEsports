import { Input } from "@/components/Form/Input";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { DiscordLogo } from "phosphor-react";
import { useState } from "react";
import { FaGithub, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiLogout } from "react-icons/hi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import imageLogoUrl from "../../public/assets/logo.png";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (session) {
        return {
            // se tiver entra no app antes de aparecer tela pro usuario
            redirect: {
                destination: "/home",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLogging, setIsLogging] = useState(false);

    const router = useRouter();

    // useEffect(() => {
    //     if (router.query.error) {
    //         setLoginError(String(router.query.error));
    //         setEmail(String(router.query.email));
    //     }
    // }, [router]);

   
    const { data: session, status } = useSession();

  
    function SignInDiscord() {
        signIn("discord");
    }

    return (
        <div className="bg-[#121214] bg-galaxy bg-[100%] md:bg-cover bg-no-repeat bg-top w-full min-h-screen">
            <div className="flex items-center justify-center h-screen px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow bg-gray-800/50 dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className="flex justify-center w-full mb-4">
                        <Image
                            src={imageLogoUrl}
                            width={200}
                            height={100}
                            objectFit="contain"
                            alt="logo"
                        ></Image>
                    </div>
                    <div className="flex self-center text-xl font-light text-gray-300 sm:text-2xl dark:text-white">
                        Efetue o Login 
                    </div>
                    {status === "authenticated" && (
                        <p className="text-sm">você está autenticado</p>
                    )}

                   
                    <div className="flex gap-4 mt-6 item-center">
                       
                        <button
                            onClick={SignInDiscord}
                            type="button"
                            className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                            <DiscordLogo className="mx-2 text-2xl" />
                            Discord
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <a
                            href="#"
                            target="_blank"
                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                        >
                            {/* <span className="ml-2">Criar uma nova conta agora</span> */}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
