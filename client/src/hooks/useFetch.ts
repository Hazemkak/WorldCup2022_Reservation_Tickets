import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/variables";

axios.defaults.baseURL = API_BASE_URL;

const useFetch = (dataName: string, params: AxiosRequestConfig<any>) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        try {
            const response = await axios.request(params);
            setData(response.data[dataName]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError(error);
            }

            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const refetchData = () => setRefetch(!refetch);

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch]);

    return [data, error, loading, refetchData] as const;
};

export default useFetch;
