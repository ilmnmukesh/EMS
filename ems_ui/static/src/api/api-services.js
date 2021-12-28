import axios from "axios";

async function ApiGetService(link, token) {
    let res;
    let url = "http://127.0.0.1:8000" + link;

    try {
        res = await axios.get(url, {
            headers: {
                Authorization: "Token " + token,
            },
        });
        if (res.data.success) {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function ApiPostService(link, data) {
    let res;
    let url = "http://127.0.0.1:8000" + link;

    console.log("Link to be sent: ", link);

    try {
        res = await axios.post(url, data);

        console.log("Full response: ", res.data);

        if (res.data.success) {
            console.log("Data Posted!");
            return res.data;
        } else {
            console.log("Req is not completed. ", res.data.err);
            return res.data;
        }
    } catch (error) {
        console.log("Catch error: ", error);
        return null;
    }
}

export { ApiGetService, ApiPostService };
