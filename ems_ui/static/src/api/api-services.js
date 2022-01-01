import axios from "axios";

async function ApiGetService(link) {
    let res;
    let url = "http://127.0.0.1:8000" + link;
    let token;
    if (link.startsWith("/api/faculty/")) {
        token = localStorage.getItem("Fac_token");
    } else {
        token = localStorage.getItem("token");
    }

    try {
        res = await axios.get(url, {
            headers: {
                Authorization: "Token " + token,
            },
        });
        if (res.data.success) {
            // console.log(res.data);
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
    let token = localStorage.getItem("token");
    console.log("Link to be sent: ", link);

    try {
        if (link === "/api/auth/" || link === "/api/auth/faculty/") {
            res = await axios.post(url, data);
        } else {
            res = await axios.post(url, data, {
                headers: {
                    Authorization: "Token " + token,
                },
            });
        }

        // console.log("Full response: ", res.data);

        if (res.data.success) {
            // console.log("Data Posted!");
            return res.data.data;
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
