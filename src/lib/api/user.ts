import prismaClient from "@/lib/prismaClient";
import { hash } from "bcryptjs";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

export async function updateUser(
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
) {
    const { password } = req.body;

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

    try {
        // ALTERA O PASSWORD SE FOI INFORMADO
        if (password.trim() !== "") {
            await prismaClient.user.update({
                data: {
                    password: await hash(password, 12),
                },
                where: { id: session.user.id },
            });
        }

        return res.status(200).json("usuário atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
