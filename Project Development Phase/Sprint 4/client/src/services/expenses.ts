export const getExpenses = async (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}`, {
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

export const addExpenses = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses`, {
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

export const expenseCategories = async (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/expenses/category/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      await response.json().then((data) => {
        if (data.success) resolve(data);
        reject(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
