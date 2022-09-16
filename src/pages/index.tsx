import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/home",
                permanent: false,
            },
        };
    }

    // if (session) {
    //     return {
    //         redirect: {
    //             destination: "/admin",
    //             permanent: false,
    //         },
    //     };
    // }

    return {
        props: {},
    };
};

export default function Index() {}
