import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

import { updateUser } from "@/lib/api/user";
import { authOptions } from "./auth/[...nextauth]";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession({ req, res }, authOptions);
    if (!session) return res.status(401).end();

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

    const token = await getToken({ req, secret });
    if (!token) return res.status(401).end();

    switch (req.method) {
        case HttpMethod.PUT:
            return await updateUser(req, res, session);

        default:
            res.setHeader("Allow", [HttpMethod.PUT]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
