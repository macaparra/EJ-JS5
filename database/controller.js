
import Users from '../model/user'

//get: http://localhost:3000/api/users
export async function getUsers(req, res){
    try {
        const users = await Users.find({})

        // if(!user)return res.status(404).json({error:"Data not Found"})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({error: "Error While Fetching Data"})
    }
}

//get: http://localhost:3000/api/users/1
export async function getUser(req, res){
    try {
        const{userId} = req.query;

        if(userId){
            const user = await Users.findById(userId);
            return res.status(200).json(user)
        }else{

        return res.status(404).json({error:"User not selected"})
    }} catch (error) {
        return res.status(404).json({error:"Cannot get the user"})
    }
}

//post: http://localhost:3000/api/users
export async function postUser(req, res) {
    try {
       const formData = req.body;
       if (!formData) return res.status(404).json({ error: "Form data not provided!" });
       const data = await Users.create(formData);
       return res.status(200).json(data);
    } catch (error) {
       return res.status(404).json({ error });
    }
}

//put: http://localhost:3000/api/users/1
export async function putUser(req, res){
    try {
        const {userId} = req.query;
        const formData = req.body;

        if(userId && formData){
            const user = await Users.findByIdAndUpdate(userId, formData);
            return res.status(200).json(user)
        }else
        res.status(404).json({error:"User not selected"})
    } catch (error) {
        return res.status(404).json({error:"Error while updating the data...!"})
    }
}

//delete: http://localhost:3000/api/users/1
export async function deleteUser(req, res){
    try {
        const {userId} = req.query;

       if(userId){
        const user = await Users.findByIdAndDelete(userId)
        return res.status(200).json(user)
       } {

       return res.status(404).json({error:"User not selected"})
    }} catch (error) {
        return res.status(404).json({error:"Error while deleting the data...!"})
    }
}