import axios from 'axios';

export const callCreateaccount = async (requestData: { studentId: string }): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  try {
    const response = await axios.post('http://localhost:8000/api/accounts', requestData, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const callCreateLibraryAccount = async (requestData: { studentId: string }): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  try {
    const response = await axios.post('http://localhost/api/register', requestData, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const callCreateInvoice = async (requestData: {
  amount: number;
  dueDate: any;
  type: string;
  account: {
    studentId: string;
  };
}): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  try {
    const response = await axios.post('http://localhost:8000/api/invoices', requestData, config);
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response.status, error.response.data);
    throw error;
  }
};
export const callgetStatus = async ( studentId: string ): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    
    }
  };

  try {
    const response = await axios.get(`http://localhost:8000/api/accounts/student/${studentId}`,config);
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response.status, error.response.data);
    throw error;
  }
};
