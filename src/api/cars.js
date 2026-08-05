export const API_URL = "https://cars-api-a83h.onrender.com/cars";

export const addCar = async (car) => {
  const response = await fetch(`${API_URL}/${car.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inCart: true }),
  });
  return response;
};

export const removeCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inCart: false }),
  });
  return response;
};

export const removeAll = async (car) => {
  const response = await fetch(`${API_URL}/${car.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inCart: false }),
  });
  return response;
};
