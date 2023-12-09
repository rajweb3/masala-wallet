const hostURL = 'https://e50e-106-222-203-16.ngrok-free.app';
const lookUp = 'social-connect/lookup';

export const lookupAddress = async identifier => {
  let response = await fetch(
    `${hostURL}/${lookUp}?${new URLSearchParams({
      handle: 'niravboghra-nord',
      identifierType: 'GITHUB',
    })}`,
    {
      method: 'GET',
    },
  )
    .then(res => {
      console.log('res', res);
    })
    .catch(err => {
      console.log('err catch', err);
    });
  console.log('response', response);
};
