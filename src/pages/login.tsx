import { ThemeButton } from "@/components/ThemeButton";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
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
                destination: "/admin",
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

    async function handleSignInCredentials(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setIsLogging(true);
        setLoginError("");

        const status: any = await signIn("credentials", {
            email,
            password,
            callbackUrl:
                router?.query?.callbackUrl &&
                String(router?.query?.callbackUrl),
            redirect: true,
        });

        if (status?.error) {
            setLoginError(status.error);
            setIsLogging(false);
        }
        if (status?.url) {
            router.push(status.url);
        }
    }

    const { data: session, status } = useSession();

    function SignInGitHub() {
        signIn("github");
    }

    function SignInGoogle() {
        signIn("google");
    }

    return (
        <div className="flex items-center justify-center h-screen px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="flex justify-center w-full mb-4">
                    <Image
                        src={imageLogoUrl}
                        width={70}
                        height={70}
                        alt="logo"
                    ></Image>
                </div>
                <div className="flex self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Efetue o Login <ThemeButton className="ml-2" />
                </div>
                {status === "authenticated" && (
                    <p className="text-sm">você está autenticado</p>
                )}

                <div className="mt-2">
                    <form
                        action="#"
                        autoComplete="off"
                        onSubmit={handleSignInCredentials}
                    >
                        <div className="flex flex-col mb-2">
                            <div className="relative flex ">
                                <span className="icon-input">
                                    <MdOutlineAlternateEmail />
                                </span>
                                <input
                                    className="input input-primary "
                                    type="email"
                                    autoComplete=""
                                    required
                                    placeholder="E-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="relative flex ">
                                <span className="icon-input">
                                    <FaLock />
                                </span>
                                <input
                                    className="input input-primary"
                                    type="password"
                                    required
                                    autoComplete=""
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            {loginError && (
                                <div className="my-3 text-sm text-red-400">
                                    {loginError}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <a
                                    href="#"
                                    className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button
                                type="submit"
                                disabled={isLogging}
                                className="btn btn-primary"
                            >
                                <HiLogout className="text-xl" />{" "}
                                {isLogging ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 item-center">
                    <button
                        onClick={SignInGitHub}
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                        <FaGithub className="mx-2 text-2xl" />
                        GitHub
                    </button>

                    <button
                        onClick={SignInGoogle}
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                        <FcGoogle className="mx-2 text-2xl" />
                        Google
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
    );
}
