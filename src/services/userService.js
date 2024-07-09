const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // console.log(res)
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export { index };