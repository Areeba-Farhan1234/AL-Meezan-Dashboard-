import vatclients from "../models/vatclient.js";

export const create = async(req,res) => {
    try {
 const VAT = new vatclients(req.body);
    }
    catch (error){

        res.status(500).json({errorMessage:error,Message})
    }
}
