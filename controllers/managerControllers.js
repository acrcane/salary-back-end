import HttpError from "../helpers/HttpError.js";
import { getAllManagerService } from "../services/managerService.js";

export const getAllUsesTable = async (req, res, next) => {
    try {
        const user = req.user
        if(user.role !== 'manager'){
            throw HttpError(401, 'No access')
        }
        const tables = await getAllManagerService()
        console.log(tables);
        
        res.status(200).json(tables)
    } catch (error) {
        next(error)
    }
}