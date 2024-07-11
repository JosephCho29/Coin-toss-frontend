const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/events`;

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

const show = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (eventFormData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const update = async function update(eventId, eventFormData) {
    try {
        console.log(`${BASE_URL}/${eventId}`)
        const res = await fetch(`${BASE_URL}/${eventId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventFormData),
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

//   try {
//     const res = await fetch(`${BASE_URL}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(eventFormData),
//     });
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const bet = async (eventId, betFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}/bet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(betFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { index, show, createEvent, bet, update };
