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

const deleteUser = async (userId) => {
  try {
    await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

const updateToken = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem("token", json.newToken);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

export { index, addFriend, getUserName, deleteUser, updateToken };
