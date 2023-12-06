import mongoose from "mongoose";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: "Id inválido " + id });
	}

	switch (req.method) {
		case "GET":
			return getEntry(req, res);

		case "PUT":
			return updateEntry(req, res);

		case "DELETE":
			return deleteEntry(req, res);

		default:
			return res.status(400).json({ message: "Endpoint no existe" });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();
	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		return res.status(404).json({ message: "Entrada no encontrada" });
	}

	const {
		description = entryToUpdate.description,
		status: status = entryToUpdate.status,
	} = req.body;

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		);

		// entryToUpdate.description = description;
		// entryToUpdate.status = status;
		// await entryToUpdate.save();

		await db.disconnect();

		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		console.log({ error });
		await db.disconnect();
		res.status(400).json({ message: error.errors.status.message });
	}
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();
	const entry = await Entry.findById(id);
	await db.disconnect();

	if (!entry) {
		return res.status(404).json({ message: "Entrada no encontrada" });
	}

	res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();
	const entry = await Entry.findOneAndDelete({ _id: id });

	if (!entry) {
		await db.disconnect();
		return res.status(404).json({ message: "Entrada no encontrada" });
	}
	await db.disconnect();
	res.status(200).json({ message: "Entrada eliminada" });
};
