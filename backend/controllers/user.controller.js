
import users from "../db/temp-user-data.js";

export const getUserUsingId = (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({
            success: false, error: "Require param: 'id'"
        });

    }

    const data = users.find(x => x['id'] === Number(id));
    if (!data) {
        return res.status(404).json({ success: false, error: "Can't find the user" });
    }
    res.status(200).json({ success: true, data: data });
}

export const addNewUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username) {
        return res.status(400).send({ success: false, error: "Missing Required Param: 'username'" })
    } if (!email) {
        return res.status(400).send({ success: false, error: "Missing Required Param: 'email'" })
    } if (!password) {
        return res.status(400).send({ success: false, error: "Missing Required Param: 'password'" })
    }

    const isEmailExist = users.find(x => x['email'] === email);
    const isUserNameExist = users.find(x => x['username'] === username);

    if (isUserNameExist) {
        return res.status(409).json({ success: false, error: "Username already exist" });
    }
    else if (isEmailExist) {
        return res.status(409).json({ success: false, error: "Email already exist" });
    }

    const id = users.length === 0 ? 1 : users.length + 1;
    users.push({ id: id, username: username, email: email, password: password });
    return res.status(201).json({ success: true, msg: "User Successfully Created" });
}


export const editUserData = (req, res) => {
    const { id, edit } = req.query;
    const { value } = req.body;
    if (!id) {
        return res.status(400).json({ success: false, error: "Missing query: 'id'" });
    }
    if (!edit) {
        return res.status(400).json({ success: false, error: "Missing query: 'edit'" });
    }
    if (!value) {
        return res.status(400).json({ success: false, error: "Missing param: 'value'" });
    }

    const user = users.find(x => x['id'] === Number(id));

    if (!user) {
        return res.status(404).json({ success: false, error: "User Not Found" });
    }

    if (edit === 'email') {
        user['email'] = value;
        return res.status(200).json({ success: true, msg: "Email Successfully Updated" });
    }
    if (edit === 'password') {
        user['password'] = value;
        return res.status(200).json({ success: true, msg: "Password Successfully Updated" });
    }

    return res.status(404).json({ success: false, msg: "Edit var not found" });

}  