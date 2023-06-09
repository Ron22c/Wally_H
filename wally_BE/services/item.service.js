
const data = require('../data/item.json');
class ItemService {
    static async getAll(req, res) {
    
        let itemNames = req.body.items;
        if(!(itemNames && Array.isArray(itemNames) && itemNames.length>0)) {
            res.json({status: 400, msg:"items should be an array of strings"})
            return;
        }

        let resp = []
        itemNames.forEach(element => {
            if(data[element]) resp = [...resp, ...data[element]]
        });

        resp = new Set(resp);

        res.json(Array.from(resp));
    }
}


module.exports = ItemService;