import prismaClient from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function getDiscord(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const data = await prismaClient.ad.findUnique({
            where: {
                id: String(id),
            },
            select: {
                discord: true,
            },
        });

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).end(error);
    }
}
