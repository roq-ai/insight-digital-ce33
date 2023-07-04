import axios from 'axios';
import queryString from 'query-string';
import { AnalyticsDataInterface, AnalyticsDataGetQueryInterface } from 'interfaces/analytics-data';
import { GetQueryInterface } from '../../interfaces';

export const getAnalyticsData = async (query?: AnalyticsDataGetQueryInterface) => {
  const response = await axios.get(`/api/analytics-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAnalyticsData = async (analyticsData: AnalyticsDataInterface) => {
  const response = await axios.post('/api/analytics-data', analyticsData);
  return response.data;
};

export const updateAnalyticsDataById = async (id: string, analyticsData: AnalyticsDataInterface) => {
  const response = await axios.put(`/api/analytics-data/${id}`, analyticsData);
  return response.data;
};

export const getAnalyticsDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/analytics-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAnalyticsDataById = async (id: string) => {
  const response = await axios.delete(`/api/analytics-data/${id}`);
  return response.data;
};
