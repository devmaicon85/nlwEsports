import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function games(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { search } = req.query;

        if (Array.isArray(search)) {
            return res.status(400).end("Busca inválida");
        }

        const data = await prismaClient.game.findMany({
            include: {
                _count: {
                    select: {
                        ads: true,
                    },
                },
            },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
