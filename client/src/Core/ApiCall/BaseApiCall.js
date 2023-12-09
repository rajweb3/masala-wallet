import instance from './apiConfig';

export const baseApiCall = async config => {
  return await new Promise(async (resolve, reject) => {
    await instance(config)
      .then(response => {
        if (response?.status === 200) {
          resolve(response?.data);
        } else if (response?.data?.status === 200) {
          resolve(response?.data);
        }
      })
      .catch(async e => {
        reject(e?.response?.data);
      });
  });
};
