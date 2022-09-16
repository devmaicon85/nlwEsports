import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type Props = {
    className?: string;
};

export function ThemeButton({ className }: Props) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const onAlterTheme = () =>
        theme === "dark" ? setTheme("light") : setTheme("dark");

    // metodo anterior apenas cliente
    // const [theme, setTheme] = useState<"dark" | "light">(themeDefault);

    // useEffect(() => {
    //     setTheme(localStorage.theme ?? themeDefault);
    //     onSetDark();
    // }, []);

    // function onSetDark() {
    //     if (
    //         localStorage.theme === "dark" ||
    //         (!("theme" in localStorage) &&
    //             window.matchMedia("(prefers-color-scheme: dark)").matches)
    //     ) {
    //         document.documentElement.classList.add("dark");
    //         localStorage.theme = "dark";
    //         setTheme("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.theme = "light";
    //         setTheme("dark");
    //     }
    // }

    // function onAlterTheme() {
    //     if (theme === "dark") {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.theme = "light";
    //         setTheme("light");
    //     } else {
    //         document.documentElement.classList.add("dark");
    //         localStorage.theme = "dark";
    //         setTheme("dark");
    //     }
    // }

    return (
        <div
            title={`${
                theme == "dark"
                    ? "mudar para tema light"
                    : "mudar para tema dark"
            } `}
            onClick={onAlterTheme}
            className={`
                    w-6
                    h-6
                    cursor-pointer 
                    text-2xl 
                    flex
                    opacity-70
                    hover:opacity-100
                    justify-center
                    items-center
                    ${theme == "dark" && "rotate-180"}
                    ease-in-out
                    duration-1000
                    ${className}
        
            `}
        >
            {theme == "dark" ? (
                <FaMoon />
            ) : (
                <FaSun className="text-yellow-300" />
            )}
        </div>
    );
}
