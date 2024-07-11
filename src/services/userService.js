const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateToken = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/updateToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem("token", json.token);
    return json;
  } catch (err) {
    console.log(err);
  }
};

const addFriend = async (friendId) => {
  try {
    const res = await fetch(`${BASE_URL}/${friendId}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserName = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, addFriend, getUserName, updateToken };
