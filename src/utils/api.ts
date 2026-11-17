import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach tokens if we implement client-side auth storage
api.interceptors.request.use((config) => {
    // For now, we assume simple usage. In a real app, retrieve token from localStorage here.
    // const token = localStorage.getItem('adminToken');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginAdmin = async (credentials: any) => {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
};

export const fetchOrders = async (token?: string) => {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get('/admin/orders', config);
    return response.data;
};

export const updateOrderStatus = async (id: string, status: string, token?: string) => {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.patch(`/admin/orders/${id}`, { status }, config);
    return response.data;
};

export const fetchCustomers = async (token?: string) => {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get('/admin/customers', config);
    return response.data;
};

export const createOrder = async (items: { name: string; qty: number }[], token?: string) => {
    // Session-based auth usually relies on cookies or a header. 
    // For this demo, we might pass a sessionId if the backend expects it in headers.
    // However, our backend middleware `protectSession` looks for `Session-Id` header.
    const sessionId = localStorage.getItem('sessionId');
    console.log("Creating Order. Found Session ID:", sessionId); // DEBUG LOG

    const config = {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(sessionId ? { 'Session-Id': sessionId } : {})
        }
    };

    try {
        const response = await api.post('/orders/create', { items }, config);
        return response.data;
    } catch (error: any) {
        console.error("Create Order Error Payload:", error.response?.data);
        console.error("Headers Sent:", config.headers);
        throw error;
    }
};

export const fetchMyOrders = async () => {
    const sessionId = localStorage.getItem('sessionId');
    const config = sessionId ? { headers: { 'Session-Id': sessionId } } : {};
    const response = await api.get('/orders/my-orders', config);
    return response.data;
};

export const loginCustomer = async (details: any) => {
    const response = await api.post('/auth/customer/login', details);
    return response.data;
};

export const skipCustomer = async () => {
    const response = await api.post('/auth/customer/skip');
    return response.data;
};

export const createInvoice = async (orderId: string, token?: string) => {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.post('/invoices/create', { orderId }, config);
    return response.data;
}

export const fetchTables = async () => {
    const response = await api.get('/tables');
    return response.data;
};

export const updateTableStatus = async (id: string, status: string) => {
    const response = await api.patch(`/tables/${id}`, { status });
    return response.data;
};

export const updateTableCount = async (count: number) => {
    const response = await api.post('/tables/resize', { count });
    return response.data;
};

export default api;
