import { Table } from "../db/models/Tabel.js";

export const getAllManagerService = async () => {
    const tables = await Table.find({status: 'open'}).populate('owner')
    return tables
}