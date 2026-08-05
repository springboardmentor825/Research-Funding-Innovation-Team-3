import client from './client';

export const getUsers = async () => {
  const response = await client.get('/admin/users');
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await client.get('/admin/audit-logs');
  return response.data;
};

export const getSystemMetrics = async () => {
  const response = await client.get('/admin/metrics');
  return response.data;
};
