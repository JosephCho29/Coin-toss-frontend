const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/profile`;

const profile = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return res.json();
    } catch (error) {
        return res(error);
    }
};

export { profile };