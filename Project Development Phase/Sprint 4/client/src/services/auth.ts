export const login = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
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

export const logout = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/logout`, {
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

export const getUser = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
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

export const register = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/register`, {
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
