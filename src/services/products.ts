import apiClient from '.';

export const getCategories = async () => {
  try {
    try {
      const response = await apiClient.get('products/categories');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getCategoriyItem = async (categoryName: string) => {
  try {
    try {
      const response = await apiClient.get(`products/category/${categoryName}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
};
