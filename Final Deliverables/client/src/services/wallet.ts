export const getWallet = async (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/wallet/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await response.json().then((data) => {
        if (data.success) resolve(data);
        reject(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const addWallet = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/wallet`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await response.json().then((data) => {
        if (data.success) resolve(data);
        reject(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateWallet = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/wallet`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await response.json().then((data) => {
        if (data.success) resolve(data);
        reject(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
