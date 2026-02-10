import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (config) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            const response = await axios(config);
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Terjadi kesalahan pada sistem.";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, request };
};

export default useApi;
